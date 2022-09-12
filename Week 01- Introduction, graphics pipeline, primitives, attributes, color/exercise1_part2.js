function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('c');

    // Get the rendering context for WebGL
    var gl = canvas.getContext("webgl");
  
    // Initialize shader
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Set clear color
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);


    var vertices = [ vec2(0.0, 0.0), vec2(0.0, 1.0), vec2(1.0, 0.0) ];
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // Draw point(s)
    gl.drawArrays(gl.POINTS, 0, vertices.length);

  }
  