const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if (!gl) {
  alert("WebGL not supported");
}

const vsSource = `
  attribute vec3 position;
  attribute vec3 color;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  varying vec3 vColor;

  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vColor = color;
  }
`;

const fsSource = `
  precision mediump float;
  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

function createShader(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }
  return shader;
}

const vertexShader = createShader(gl.VERTEX_SHADER, vsSource);
const fragmentShader = createShader(gl.FRAGMENT_SHADER, fsSource);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
gl.useProgram(program);

const vertices = new Float32Array([
  -1, -1, -1,          1, 0, 0,
   1, -1, -1,          0, 1, 0,
   1,  1, -1,          0, 0, 1,
  -1,  1, -1,          1, 1, 0,
  -1, -1,  1,          1, 0, 1,
   1, -1,  1,          0, 1, 1,
   1,  1,  1,          1, 1, 1,
  -1,  1,  1,          0.5, 0.5, 0.5
]);

const indices = new Uint16Array([
  0, 1, 2,  2, 3, 0,
  4, 5, 6,  6, 7, 4,
  0, 4, 7,  7, 3, 0,
  1, 5, 6,  6, 2, 1,
  3, 2, 6,  6, 7, 3,
  0, 1, 5,  5, 4, 0
]);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const indexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

const positionLocation = gl.getAttribLocation(program, "position");
const colorLocation = gl.getAttribLocation(program, "color");

gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 24, 0);
gl.enableVertexAttribArray(positionLocation);

gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 24, 12);
gl.enableVertexAttribArray(colorLocation);

const uProjection = gl.getUniformLocation(program, "projectionMatrix");
const uModelView = gl.getUniformLocation(program, "modelViewMatrix");

function perspectiveMatrix(fov, aspect, near, far) {
  const f = 1.0 / Math.tan(fov / 2);
  const nf = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, (2 * far * near) * nf, 0
  ]);
}

function identityMatrix() {
  return new Float32Array([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
}

function rotateMatrixY(m, angle) {
  const c = Math.cos(angle), s = Math.sin(angle);
  m[0] = c; m[2] = -s;
  m[8] = s; m[10] = c;
}

function rotateMatrixX(m, angle) {
  const c = Math.cos(angle), s = Math.sin(angle);
  m[5] = c; m[6] = -s;
  m[9] = s; m[10] *= c;
}

function translateZ(m, z) {
  m[14] = z;
}

function render(time) {
  time *= 0.001;

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const aspect = canvas.width / canvas.height;
  const projection = perspectiveMatrix(Math.PI / 4, aspect, 0.1, 100);
  const modelView = identityMatrix();
  translateZ(modelView, -6);
  rotateMatrixY(modelView, time);
  rotateMatrixX(modelView, time / 2);

  gl.uniformMatrix4fv(uProjection, false, projection);
  gl.uniformMatrix4fv(uModelView, false, modelView);

  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
  requestAnimationFrame(render);
}

requestAnimationFrame(render);
