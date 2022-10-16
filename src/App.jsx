// 
import './assets/styles/App.css';
// Pages
import Navbar from './components/pages/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Project from './components/pages/Project';
import Contact from './components/pages/Contact';
import Footer from './components/pages/Footer';
import SelectedProject from './components/pages/SelectedProject';
import Scroll from './components/animation/SmoothScrollbar';

function App() {
  return (
    <>
      <Navbar/>
      <Home/>
      <About/>
      <Project/>
      {/* <SelectedProject/> */}
      <Contact/>
      <Footer/>
    </>
  );
}

export default App;
