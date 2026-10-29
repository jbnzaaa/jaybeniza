// ---- pictures in halftone dots
// the site's halftone: a picture drawn as light dots on the dark ground of
// whatever it sits in, each as large as the picture under it is light. the
// gifs (HalftoneGif.jsx) - the services' and the process steps' - are
// drawn with this

// a cell's side in CSS pixels, and the dots' colour (the site's light text)
export const CELL = 5;
const INK = [229 / 255, 228 / 255, 227 / 255];
// how far the picture's tones are pulled apart before they are dotted
const CONTRAST = 1.25;
// and bent (a gamma): above 1, mid tones get smaller dots. kept near 1 so
// the picture reads bright enough to make out
const GAMMA = 1.15;
// a full dot's radius, as a share of its cell
const MOST = .6;
// the canvas is drawn at no more than this many device pixels a CSS pixel
const MAX_RATIO = 1.5;

// the dots are drawn on the graphics card: one pass over the canvas, each
// pixel working out which cell it is in, how light the picture is at that
// cell's middle, and whether it falls inside that cell's dot. (drawn on
// the page's own thread instead - a circle a cell, some twelve thousand a
// frame - it held up scrolling while a gif played)
const VERTEX = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }`;
const FRAGMENT = `
precision mediump float;
uniform sampler2D u_tex;
uniform vec2 u_size;
uniform float u_cell;
uniform vec4 u_crop;
uniform vec3 u_ink;
void main() {
  vec2 p = vec2(gl_FragCoord.x, u_size.y - gl_FragCoord.y);
  vec2 center = (floor(p / u_cell) + 0.5) * u_cell;
  vec2 uv = u_crop.xy + (center / u_size) * u_crop.zw;
  float grey = dot(texture2D(u_tex, uv).rgb, vec3(0.299, 0.587, 0.114));
  float light = clamp((grey - 0.5) * ${CONTRAST.toFixed(3)} + 0.5, 0.0, 1.0);
  float radius = u_cell * ${MOST.toFixed(3)} * pow(light, ${GAMMA.toFixed(3)});
  float alpha = clamp(radius - length(p - center) + 0.5, 0.0, 1.0);
  gl_FragColor = vec4(u_ink * alpha, alpha);
}`;

function program(gl) {
  const shader = (type, source) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = shader(gl.VERTEX_SHADER, VERTEX);
  const fs = shader(gl.FRAGMENT_SHADER, FRAGMENT);
  if (!vs || !fs) return null;
  const p = gl.createProgram();
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
}

// where the picture is cropped to the box's proportions, from its middle,
// as object-fit: cover would: [left, top, width, height], as shares of it
// - less any bars across its top and bottom (`trim`, [top, bottom] shares
// of its height), cut off first
function crop(boxW, boxH, pw, ph, [top, bottom] = [0, 0]) {
  const keep = 1 - top - bottom;
  const [x, y, w, h] = cover(boxW, boxH, pw, ph * keep);
  return [x, top + y * keep, w, h * keep];
}
function cover(boxW, boxH, pw, ph) {
  const box = boxW / boxH;
  const pic = pw / ph;
  if (pic > box) return [(1 - box / pic) / 2, 0, box / pic, 1];
  return [0, (1 - pic / box) / 2, 1, pic / box];
}

/**
 * Something to draw a picture's dots with, onto one canvas covering a box:
 * `draw(picture, width, height, trim)` crops the picture to the box's
 * proportions from its middle (less `trim`, see crop) and draws a dot a
 * cell. The picture has to
 * be readable (the site's own, or from a host that allows it). Without
 * WebGL, nothing is drawn.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {Element} box - what the canvas covers, for its size
 * @param {number} [cell] - a cell's side in CSS pixels
 * @returns {((picture: CanvasImageSource, width: number, height: number, trim?: number[]) => void) & {dispose: () => void}}
 */
export function halftone(canvas, box, cell = CELL) {
  const gl = canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false, preserveDrawingBuffer: false });
  const prog = gl && program(gl);
  if (!prog) {
    const none = () => {};
    none.dispose = () => {};
    return none;
  }
  gl.useProgram(prog);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const a = gl.getAttribLocation(prog, 'a');
  gl.enableVertexAttribArray(a);
  gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  const at = (name) => gl.getUniformLocation(prog, name);
  const uSize = at('u_size');
  const uCell = at('u_cell');
  const uCrop = at('u_crop');
  gl.uniform3fv(at('u_ink'), INK);
  gl.uniform1i(at('u_tex'), 0);

  const draw = (picture, pw, ph, trim) => {
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_RATIO);
    const width = box.clientWidth;
    const height = box.clientHeight;
    if (!width || !height || !pw || !ph) return;
    const cw = Math.round(width * ratio);
    const ch = Math.round(height * ratio);
    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }
    try {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, picture);
    } catch (e) {
      return;
    }
    gl.viewport(0, 0, cw, ch);
    gl.uniform2f(uSize, cw, ch);
    gl.uniform1f(uCell, cell * ratio);
    gl.uniform4fv(uCrop, crop(cw, ch, pw, ph, trim));
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  draw.dispose = () => {
    gl.deleteTexture(texture);
    gl.deleteBuffer(buffer);
    gl.deleteProgram(prog);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  };
  return draw;
}
