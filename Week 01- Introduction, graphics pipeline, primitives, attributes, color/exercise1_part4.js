function main() {

    var ANGLE = 0.0;

    function tick() { 
        ANGLE += 3.0 ;
        render(ANGLE); 
        requestAnimationFrame(tick); 
    }

    tick();

}
    
function render(angle) {
    
    // Retrieve <canvas> element
    var canvas = document.getElementById('c');

    // Get the rendering context for WebGL
    var gl = canvas.getContext("webgl");
  
    // Initialize shader
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Init vertex buffer
    var vertices = new Float32Array([
        -0.5, 0.0,   0.0, 0.5,   0.5, 0.0,　0.0, -0.5,  -0.5, 0.0
      ]);
    var n = 5;

    // Create buffer object
    var vertexBuffer = gl.createBuffer();

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(program, "a_Position");

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);

    // // Pass the data required to rotate the shape to the vertex shader
    var radian = Math.PI * angle / 180.0; // Convert to radians
    var cosB = Math.cos(radian);
    var sinB = Math.sin(radian);

    var u_CosB = gl.getUniformLocation(program, 'u_CosB');
    var u_SinB = gl.getUniformLocation(program, 'u_SinB');

    gl.uniform1f(u_CosB, cosB);
    gl.uniform1f(u_SinB, sinB);
    
    // Set clear color
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw triangle
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);

  }

