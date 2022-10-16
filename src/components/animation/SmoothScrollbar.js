// 
import { React, useEffect } from "react";
import Scrollbar from 'smooth-scrollbar';

var options = {
  damping: 0.01,
}

function Scroll() {
  useEffect(() => {
    Scrollbar.init(document.body, options);
  }, []);

  return null;
}

export default Scroll