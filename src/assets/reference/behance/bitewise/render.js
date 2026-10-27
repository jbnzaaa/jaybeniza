// Exports each module of index.html as a 2x PNG (2800px wide) into ./export,
// ready to upload to Behance in order. Run: node render.js
// Drives a headless Chrome over the DevTools protocol, so nothing to install.
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const CHROME = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
].find(fs.existsSync);
const PORT = 9333;
const OUT = path.join(__dirname, 'export');
const PAGE = pathToFileURL(path.join(__dirname, 'index.html')).href;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const profile = fs.mkdtempSync(path.join(require('os').tmpdir(), 'bw-'));
  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
    '--hide-scrollbars', 'about:blank',
  ]);

  let targets;
  for (let i = 0; i < 50 && !targets; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json`)).json(); } catch { await wait(200); }
  }
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r));

  let id = 0;
  const pending = new Map();
  let onLoad = null;
  ws.addEventListener('message', (e) => {
    const msg = JSON.parse(e.data);
    if (msg.method === 'Page.loadEventFired' && onLoad) { onLoad(); onLoad = null; }
    if (pending.has(msg.id)) { if (msg.error) console.error(msg.error); pending.get(msg.id)(msg.result); pending.delete(msg.id); }
  });
  const send = (method, params = {}) => new Promise((r) => {
    pending.set(++id, r);
    ws.send(JSON.stringify({ id, method, params }));
  });
  // navigates and resolves once the page has loaded, so nothing is evaluated mid-navigation
  const open = (url) => new Promise(async (r) => { onLoad = r; await send('Page.navigate', { url }); });
  const evaluate = async (expression) =>
    (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value;

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1400, height: 1000, deviceScaleFactor: 2, mobile: false });

  const count = await (async () => {
    await open(PAGE);
    return evaluate('document.querySelectorAll(".slide").length');
  })();

  for (let n = 1; n <= count; n++) {
    await open(`${PAGE}?s=${n}`);
    // fonts and every image loaded before measuring
    await evaluate(`(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 5000); })));
    })()`);
    await wait(300);
    const h = await evaluate('Math.ceil(document.querySelector(".slide.on").getBoundingClientRect().height)');
    await send('Emulation.setDeviceMetricsOverride', { width: 1400, height: h, deviceScaleFactor: 2, mobile: false });
    await wait(200);
    // tall modules can fail the first capture while the resized viewport settles
    let shot;
    for (let tries = 0; tries < 4 && !shot?.data; tries++) {
      if (tries) await wait(500);
      shot = await send('Page.captureScreenshot', {
        format: 'png', captureBeyondViewport: true,
        clip: { x: 0, y: 0, width: 1400, height: h, scale: 1 },
      });
    }
    if (!shot?.data) throw new Error(`module ${n} (1400x${h}) could not be captured`);
    const file = path.join(OUT, `bitewise-${String(n).padStart(2, '0')}.png`);
    fs.writeFileSync(file, Buffer.from(shot.data, 'base64'));
    console.log(path.basename(file), `1400x${h}`);
  }

  ws.close();
  chrome.kill();
}

main().catch((e) => { console.error(e); process.exit(1); });
