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

    // Init vertex buffer
    var verticesColors = new Float32Array([
        // Vertex coordinates and color
         1.0,  1.0,  0.0,  0.0,  1.0, 
         0.0, 0.0,  1.0,  0.0,  0.0, 
         1.0, 0.0,  0.0,  1.0,  0.0, 
      ]);
    var n = 3;

    // Create buffer object
    var vertexColorBuffer = gl.createBuffer();

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);

    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, flatten(verticesColors), gl.STATIC_DRAW);

    var FSIZE = verticesColors.BYTES_PER_ELEMENT;

    var a_Position = gl.getAttribLocation(program, "a_Position");

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*5, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // Get the storage location of a_Position, assign buffer and enable
    var a_Color = gl.getAttribLocation(program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
    gl.enableVertexAttribArray(a_Color);

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // Draw triangle
    gl.drawArrays(gl.TRIANGLES, 0, n);

  }