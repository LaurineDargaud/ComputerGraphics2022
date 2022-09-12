// HelloCanvas.js (c) 2012 matsuda
function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('c');
  
    // Get the rendering context for WebGL
    var gl = canvas.getContext("webgl");
  
    // Set clear color
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);
  
    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
  