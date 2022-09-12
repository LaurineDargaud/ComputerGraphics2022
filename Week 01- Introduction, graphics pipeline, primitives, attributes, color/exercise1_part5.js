function main() {

    var VALUE = 0.0;

    function tick() { 
        render(0.5*Math.sin(VALUE)); 
        VALUE += 0.1 ;
        
        requestAnimationFrame(tick); 
    }

    tick();

}

var noOfFans = 30 ;
var radiusOfCircle = 0.5 ;
var vertices;
    
function render(value) {
    
    // Retrieve <canvas> element
    var canvas = document.getElementById('c');

    // Get the rendering context for WebGL
    var gl = canvas.getContext("webgl");
  
    // Initialize shader
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Init vertex buffer
    drawCircle(value);
    var n = noOfFans + 2 ;
    console.log(vertices);

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

    // Set clear color
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw triangle
    gl.drawArrays(gl.TRIANGLE_FAN, 0, n);

  }

function drawCircle(value){
    var xCenterOfCircle = 0.0;
    var yCenterOfCircle = value;
    var anglePerFan = (2*Math.PI) / noOfFans;
    vertices = [xCenterOfCircle, yCenterOfCircle];
  
    for(var i = 0; i <= noOfFans; i++){
        var angle = anglePerFan * (i+1);
        var xCoordinate = xCenterOfCircle + Math.cos(angle) * radiusOfCircle;
        var yCoordinate = yCenterOfCircle + Math.sin(angle) * radiusOfCircle;
        vertices.push(xCoordinate);
        vertices.push(yCoordinate);
    }

    vertices = new Float32Array(vertices);
}
