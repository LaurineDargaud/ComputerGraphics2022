var max_verts = 1000;
var index = 0; var numPoints = 0;
var p;
var vertices = [ vec2(0.0, 0.0), vec2(0.0, 1.0), vec2(1.0, 0.0) ];

function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('c');
    var translationX = canvas.width/2;
    var translationY = canvas.height/2;

    // Get the rendering context for WebGL
    var gl = canvas.getContext("webgl");

    // Add event listener on click
    canvas.addEventListener("click", function (ev) {
        // Callback function
        console.log('click', canvas.width);
        console.log(ev.target.getBoundingClientRect());  
        p = vec2(
            (ev.clientX - translationX - ev.target.getBoundingClientRect().x) / translationX, 
            (translationY + ev.target.getBoundingClientRect().y - ev.clientY) / translationY
        );
        vertices.push(p);
        console.log(vertices);
        main();
    });
  
    // Initialize shader
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Set clear color
    gl.clearColor(0.3921, 0.5843, 0.9294, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "a_Position");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // Draw point(s)
    gl.drawArrays(gl.POINTS, 0, vertices.length);

  }
  