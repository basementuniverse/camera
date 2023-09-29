(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@basementuniverse/utils/utils.js":
/*!*******************************************************!*\
  !*** ./node_modules/@basementuniverse/utils/utils.js ***!
  \*******************************************************/
/***/ ((module) => {

/**
 * @overview A library of useful functions
 * @author Gordon Larrigan
 */

/**
 * Check if two numbers are approximately equal
 * @param {number} a Number a
 * @param {number} b Number b
 * @param {number} [p=Number.EPSILON] The precision value
 * @return {boolean} True if numbers a and b are approximately equal
 */
const floatEquals = (a, b, p = Number.EPSILON) => Math.abs(a - b) < p;

/**
 * Clamp a number between min and max
 * @param {number} a The number to clamp
 * @param {number} [min=0] The minimum value
 * @param {number} [max=1] The maximum value
 * @return {number} A clamped number
 */
const clamp = (a, min = 0, max = 1) => a < min ? min : (a > max ? max : a);

/**
 * Get the fractional part of a number
 * @param {number} a The number from which to get the fractional part
 * @return {number} The fractional part of the number
 */
const frac = a => a >= 0 ? a - Math.floor(a) : a - Math.ceil(a);

/**
 * Do a linear interpolation between a and b
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolation value, should be in the interval [0, 1]
 * @return {number} An interpolated value in the interval [a, b]
 */
const lerp = (a, b, i) => a + (b - a) * i;

/**
 * Get the position of i between a and b
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolated value in the interval [a, b]
 * @return {number} The position of i between a and b
 */
const unlerp = (a, b, i) => (i - a) / (b - a);

/**
 * Do a bilinear interpolation
 * @param {number} c00 Top-left value
 * @param {number} c10 Top-right value
 * @param {number} c01 Bottom-left value
 * @param {number} c11 Bottom-right value
 * @param {number} ix Interpolation value along x
 * @param {number} iy Interpolation value along y
 * @return {number} A bilinear interpolated value
 */
const blerp = (c00, c10, c01, c11, ix, iy) => lerp(lerp(c00, c10, ix), lerp(c01, c11, ix), iy);

/**
 * Re-map a number i from range a1...a2 to b1...b2
 * @param {number} i The number to re-map
 * @param {number} a1
 * @param {number} a2
 * @param {number} b1
 * @param {number} b2
 * @return {number}
 */
const remap = (i, a1, a2, b1, b2) => b1 + (i - a1) * (b2 - b1) / (a2 - a1);

/**
 * Do a smooth interpolation between a and b
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolation value
 * @return {number} An interpolated value in the interval [a, b]
 */
const smoothstep = (a, b, i) => lerp(a, b, 3 * Math.pow(i, 2) - 2 * Math.pow(i, 3));

/**
 * Get an angle in radians
 * @param {number} degrees The angle in degrees
 * @return {number} The angle in radians
 */
const radians = degrees => (Math.PI / 180) * degrees;

/**
 * Get an angle in degrees
 * @param {number} radians The angle in radians
 * @return {number} The angle in degrees
 */
const degrees = radians => (180 / Math.PI) * radians;

/**
 * Get a random float in the interval [min, max)
 * @param {number} min Inclusive min
 * @param {number} max Exclusive max
 * @return {number} A random float in the interval [min, max)
 */
const randomBetween = (min, max) => Math.random() * (max - min) + min;

/**
 * Get a random integer in the interval [min, max]
 * @param {number} min Inclusive min
 * @param {number} max Inclusive max
 * @return {number} A random integer in the interval [min, max]
 */
const randomIntBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Get a normally-distributed random number
 * @param {number} [mu=0.5] The mean value
 * @param {number} [sigma=0.5] The standard deviation
 * @param {number} [samples=2] The number of samples
 * @return {number} A normally-distributed random number
 */
const cltRandom = (mu = 0.5, sigma = 0.5, samples = 2) => {
  let total = 0;
  for (let i = samples; i--;) {
    total += Math.random();
  }
  return mu + (total - samples / 2) / (samples / 2) * sigma;
};

/**
 * Get a normally-distributed random integer in the interval [min, max]
 * @param {number} min Inclusive min
 * @param {number} max Inclusive max
 * @return {number} A normally-distributed random integer
 */
const cltRandomInt = (min, max) => Math.floor(min + cltRandom(0.5, 0.5, 2) * (max + 1 - min));

/**
 * Return a weighted random integer
 * @param {Array<number>} w An array of weights
 * @return {number} An index from w
 */
const weightedRandom = w => {
  let total = w.reduce((a, i) => a + i, 0), n = 0;
  const r = Math.random() * total;
  while (total > r) {
    total -= w[n++];
  }
  return n - 1;
};

/**
 * An interpolation function
 * @callback interpolationCallback
 * @param {number} a The minimum number
 * @param {number} b The maximum number
 * @param {number} i The interpolation value, should be in the interval [0, 1]
 * @return {number} The interpolated value in the interval [a, b]
 */

/**
 * Return an interpolated value from an array
 * @param {Array<number>} a An array of values interpolate
 * @param {number} i A number in the interval [0, 1]
 * @param {interpolationCallback} [f=Math.lerp] The interpolation function to use
 * @return {number} An interpolated value in the interval [min(a), max(a)]
 */
const lerpArray = (a, i, f = lerp) => {
  const s = i * (a.length - 1);
  const p = clamp(Math.trunc(s), 0, a.length - 1);
  return f(a[p] || 0, a[p + 1] || 0, frac(s));
};

/**
 * Get the dot product of two vectors
 * @param {Array<number>} a Vector a
 * @param {Array<number>} b Vector b
 * @return {number} a ∙ b
 */
const dot = (a, b) => a.reduce((n, v, i) => n + v * b[i], 0);

/**
 * Get the factorial of a number
 * @param {number} a
 * @return {number} a!
 */
const factorial = a => {
  let result = 1;
  for (let i = 2; i <= a; i++) {
    result *= i;
  }
  return result;
};

/**
 * Get the number of permutations of r elements from a set of n elements
 * @param {number} n
 * @param {number} r
 * @return {number} nPr
 */
const permutation = (n, r) => factorial(n) / factorial(n - r);

/**
 * Get the number of combinations of r elements from a set of n elements
 * @param {number} n
 * @param {number} r
 * @return {number} nCr
 */
const combination = (n, r) => factorial(n) / (factorial(r) * factorial(n - r));

/**
 * A function for generating array values
 * @callback timesCallback
 * @param {number} i The array index
 * @return {*} The array value
 */

/**
 * Return a new array with length n by calling function f(i) on each element
 * @param {timesCallback} f
 * @param {number} n The size of the array
 * @return {Array<*>}
 */
const times = (f, n) => Array(n).fill(0).map((_, i) => f(i));

/**
 * Return an array containing numbers 0->(n - 1)
 * @param {number} n The size of the array
 * @return {Array<number>} An array of integers 0->(n - 1)
 */
const range = n => times(i => i, n);

/**
 * Zip 2 arrays together, i.e. ([1, 2, 3], [a, b, c]) => [[1, a], [2, b], [3, c]]
 * @param {Array<*>} a
 * @param {Array<*>} b
 * @return {Array<Array<*>>}
 */
const zip = (a, b) => a.map((k, i) => [k, b[i]]);

/**
 * Return array[i] with positive and negative wrapping
 * @param {Array<*>} a
 * @param {number} i The positively/negatively wrapped array index
 * @return {*} An element from the array
 */
const at = (a, i) => a[i < 0 ? a.length - (Math.abs(i + 1) % a.length) - 1 : i % a.length];

/**
 * Chop an array into chunks of size n
 * @param {Array<*>} a
 * @param {number} n The chunk size
 * @return {Array<Array<*>>} An array of array chunks
 */
const chunk = (a, n) => times(i => a.slice(i * n, i * n + n), Math.ceil(a.length / n));

/**
 * Randomly shuffle a shallow copy of an array
 * @param {Array<*>} a
 * @return {Array<*>} The shuffled array
 */
const shuffle = a => a.slice().sort(() => Math.random() - 0.5);

if (true) {
  module.exports = {
    floatEquals,
    clamp,
    frac,
    lerp,
    unlerp,
    blerp,
    remap,
    smoothstep,
    radians,
    degrees,
    randomBetween,
    randomIntBetween,
    cltRandom,
    cltRandomInt,
    weightedRandom,
    lerpArray,
    dot,
    factorial,
    permutation,
    combination,
    times,
    range,
    zip,
    at,
    chunk,
    shuffle,
  };
}


/***/ }),

/***/ "./node_modules/@basementuniverse/vec/vec.js":
/*!***************************************************!*\
  !*** ./node_modules/@basementuniverse/vec/vec.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { times, chunk, dot } = __webpack_require__(/*! @basementuniverse/utils */ "./node_modules/@basementuniverse/utils/utils.js");

/**
 * @overview A library of useful functions
 * @author Gordon Larrigan
 */

/**
 * A 2d vector
 * @typedef {Object} vec
 * @property {number} x The x component of the vector
 * @property {number} y The y component of the vector
 */

/**
 * Create a new vector
 * @param {number|vec} [x] The x component of the vector, or a vector to copy
 * @param {number} [y] The y component of the vector
 * @return {vec} A new vector
 * @example <caption>Various ways to initialise a vector</caption>
 * let a = vec(3, 2);  // (3, 2)
 * let b = vec(4);     // (4, 4)
 * let c = vec(a);     // (3, 2)
 * let d = vec();      // (0, 0)
 */
const vec = (x, y) => (!x && !y ?
  { x: 0, y: 0 } : (typeof x === 'object' ?
    { x: x.x || 0, y: x.y || 0 } : (y === null || y === undefined ?
      { x: x, y: x } : { x: x, y: y })
  )
);

/**
 * Get the components of a vector as an array
 * @param {vec} a The vector to get components from
 * @return {Array<number>} The vector components as an array
 */
vec.components = a => [a.x, a.y];

/**
 * Return a unit vector (1, 0)
 * @return {vec} A unit vector (1, 0)
 */
vec.ux = () => vec(1, 0);

/**
 * Return a unit vector (0, 1)
 * @return {vec} A unit vector (0, 1)
 */
vec.uy = () => vec(0, 1);

/**
 * Add vectors
 * @param {vec} a Vector a
 * @param {vec} b Vector b
 * @return {vec} a + b
 */
vec.add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });

/**
 * Scale a vector
 * @param {vec} a Vector a
 * @param {number} b Scalar b
 * @return {vec} a * b
 */
vec.mul = (a, b) => ({ x: a.x * b, y: a.y * b });

/**
 * Subtract vectors
 * @param {vec} a Vector a
 * @param {vec} b Vector b
 * @return {vec} a - b
 */
vec.sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });

/**
 * Get the length of a vector
 * @param {vec} a Vector a
 * @return {number} |a|
 */
vec.len = a => Math.sqrt(a.x * a.x + a.y * a.y);

/**
 * Get the length of a vector using taxicab geometry
 * @param {vec} a Vector a
 * @return {number} |a|
 */
vec.manhattan = a => Math.abs(a.x) + Math.abs(a.y);

/**
 * Normalise a vector
 * @param {vec} a The vector to normalise
 * @return {vec} ^a
 */
vec.nor = a => {
  let len = vec.len(a);
  return len ? { x: a.x / len, y: a.y / len } : vec();
};

/**
 * Get a dot product of vectors
 * @param {vec} a Vector a
 * @param {vec} b Vector b
 * @return {number} a ∙ b
 */
vec.dot = (a, b) => a.x * b.x + a.y * b.y;

/**
 * Rotate a vector by r radians
 * @param {vec} a The vector to rotate
 * @param {number} r The angle to rotate by, measured in radians
 * @return {vec} A rotated vector
 */
vec.rot = (a, r) => {
  let s = Math.sin(r),
    c = Math.cos(r);
  return { x: c * a.x - s * a.y, y: s * a.x + c * a.y };
}

/**
 * Check if two vectors are equal
 * @param {vec} a Vector a
 * @param {vec} b Vector b
 * @return {boolean} True if vectors a and b are equal, false otherwise
 */
vec.eq = (a, b) => a.x === b.x && a.y === b.y;

/**
 * Get the angle of a vector
 * @param {vec} a Vector a
 * @return {number} The angle of vector a in radians
 */
vec.rad = a => Math.atan2(a.y, a.x);

/**
 * Copy a vector
 * @param {vec} a The vector to copy
 * @return {vec} A copy of vector a
 */
vec.cpy = a => vec(a);

/**
 * A function to call on each component of a vector
 * @callback vectorMapCallback
 * @param {number} value The component value
 * @param {'x' | 'y'} label The component label (x or y)
 * @return {number} The mapped component
 */

/**
 * Call a function on each component of a vector and build a new vector from the results
 * @param {vec} a Vector a
 * @param {vectorMapCallback} f The function to call on each component of the vector
 * @return {vec} Vector a mapped through f
 */
vec.map = (a, f) => ({ x: f(a.x, 'x'), y: f(a.y, 'y') });

/**
 * Convert a vector into a string
 * @param {vec} a The vector to convert
 * @param {string} [s=', '] The separator string
 * @return {string} A string representation of the vector
 */
vec.str = (a, s = ', ') => `${a.x}${s}${a.y}`;

/**
 * A matrix
 * @typedef {Object} mat
 * @property {number} m The number of rows in the matrix
 * @property {number} n The number of columns in the matrix
 * @property {Array<number>} entries The matrix values
 */

/**
 * Create a new matrix
 * @param {number} [m=4] The number of rows
 * @param {number} [n=4] The number of columns
 * @param {Array<number>} [entries=[]] Matrix values in reading order
 * @return {mat} A new matrix
 */
const mat = (m = 4, n = 4, entries = []) => ({
  m, n,
  entries: entries.concat(Array(m * n).fill(0)).slice(0, m * n)
});

/**
 * Get an identity matrix of size n
 * @param {number} n The size of the matrix
 * @return {mat} An identity matrix
 */
mat.identity = n => mat(n, n, Array(n * n).fill(0).map((v, i) => +(Math.floor(i / n) === i % n)));

/**
 * Get an entry from a matrix
 * @param {mat} a Matrix a
 * @param {number} i The row offset
 * @param {number} j The column offset
 * @return {number} The value at position (i, j) in matrix a
 */
mat.get = (a, i, j) => a.entries[(j - 1) + (i - 1) * a.n];

/**
 * Set an entry of a matrix
 * @param {mat} a Matrix a
 * @param {number} i The row offset
 * @param {number} j The column offset
 * @param {number} v The value to set in matrix a
 */
mat.set = (a, i, j, v) => { a.entries[(j - 1) + (i - 1) * a.n] = v; };

/**
 * Get a row from a matrix as an array
 * @param {mat} a Matrix a
 * @param {number} m The row offset
 * @return {Array<number>} Row m from matrix a
 */
mat.row = (a, m) => {
  const s = (m - 1) * a.n;
  return a.entries.slice(s, s + a.n);
};

/**
 * Get a column from a matrix as an array
 * @param {mat} a Matrix a
 * @param {number} n The column offset
 * @return {Array<number>} Column n from matrix a
 */
mat.col = (a, n) => times(i => mat.get(a, (i + 1), n), a.m);

/**
 * Add matrices
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {mat} a + b
 */
mat.add = (a, b) => a.m === b.m && a.n === b.n && mat.map(a, (v, i) => v + b.entries[i]);

/**
 * Subtract matrices
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {mat} a - b
 */
mat.sub = (a, b) => a.m === b.m && a.n === b.n && mat.map(a, (v, i) => v - b.entries[i]);

/**
 * Multiply matrices
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {mat|boolean} ab or false if the matrices cannot be multiplied
 */
mat.mul = (a, b) => {
  if (a.n !== b.m) { return false; }
  const result = mat(a.m, b.n);
  for (let i = 1; i <= a.m; i++) {
    for (let j = 1; j <= b.n; j++) {
      mat.set(result, i, j, dot(mat.row(a, i), mat.col(b, j)));
    }
  }
  return result;
};

/**
 * Scale a matrix
 * @param {mat} a Matrix a
 * @param {number} b Scalar b
 * @return {mat} a * b
 */
mat.scale = (a, b) => mat.map(a, v => v * b);

/**
 * Transpose a matrix
 * @param {mat} a The matrix to transpose
 * @return {mat} A transposed matrix
 */
mat.trans = a => mat(a.n, a.m, times(i => mat.col(a, (i + 1)), a.n).flat());

/**
 * Get the minor of a matrix
 * @param {mat} a Matrix a
 * @param {number} i The row offset
 * @param {number} j The column offset
 * @return {mat|boolean} The (i, j) minor of matrix a or false if the matrix is not square
 */
mat.minor = (a, i, j) => {
  if (a.m !== a.n) { return false; }
  const entries = [];
  for (let ii = 1; ii <= a.m; ii++) {
    if (ii === i) { continue; }
    for (let jj = 1; jj <= a.n; jj++) {
      if (jj === j) { continue; }
      entries.push(mat.get(a, ii, jj));
    }
  }
  return mat(a.m - 1, a.n - 1, entries);
};

/**
 * Get the determinant of a matrix
 * @param {mat} a Matrix a
 * @return {number|boolean} |a| or false if the matrix is not square
 */
mat.det = a => {
  if (a.m !== a.n) { return false; }
  if (a.m === 1) {
    return a.entries[0];
  }
  if (a.m === 2) {
    return a.entries[0] * a.entries[3] - a.entries[1] * a.entries[2];
  }
  let total = 0, sign = 1;
  for (let j = 1; j <= a.n; j++) {
    total += sign * a.entries[j - 1] * mat.det(mat.minor(a, 1, j));
    sign *= -1;
  }
  return total;
};

/**
 * Normalise a matrix
 * @param {mat} a The matrix to normalise
 * @return {mat|boolean} ^a or false if the matrix is not square
 */
mat.nor = a => {
  if (a.m !== a.n) { return false; }
  const d = mat.det(a);
  return mat.map(a, i => i * d);
};

/**
 * Get the adjugate of a matrix
 * @param {mat} a The matrix from which to get the adjugate
 * @return {mat} The adjugate of a
 */
mat.adj = a => {
  const minors = mat(a.m, a.n);
  for (let i = 1; i <= a.m; i++) {
    for (let j = 1; j <= a.n; j++) {
      mat.set(minors, i, j, mat.det(mat.minor(a, i, j)));
    }
  }
  const cofactors = mat.map(minors, (v, i) => v * (i % 2 ? -1 : 1));
  return mat.trans(cofactors);
};

/**
 * Get the inverse of a matrix
 * @param {mat} a The matrix to invert
 * @return {mat|boolean} a^-1 or false if the matrix has no inverse
 */
mat.inv = a => {
  if (a.m !== a.n) { return false; }
  const d = mat.det(a);
  if (d === 0) { return false; }
  return mat.scale(mat.adj(a), 1 / d);
};

/**
 * Check if two matrices are equal
 * @param {mat} a Matrix a
 * @param {mat} b Matrix b
 * @return {boolean} True if matrices a and b are identical, false otherwise
 */
mat.eq = (a, b) => a.m === b.m && a.n === b.n && mat.str(a) === mat.str(b);

/**
 * Copy a matrix
 * @param {mat} a The matrix to copy
 * @return {mat} A copy of matrix a
 */
mat.cpy = a => mat(a.m, a.n, [...a.entries]);

/**
 * A function to call on each entry of a matrix
 * @callback matrixMapCallback
 * @param {number} value The entry value
 * @param {number} index The entry index
 * @param {Array<number>} entries The array of matrix entries
 * @return {number} The mapped entry
 */

/**
 * Call a function on each entry of a matrix and build a new matrix from the results
 * @param {mat} a Matrix a
 * @param {matrixMapCallback} f The function to call on each entry of the matrix
 * @return {mat} Matrix a mapped through f
 */
mat.map = (a, f) => mat(a.m, a.n, a.entries.map(f));

/**
 * Convert a matrix into a string
 * @param {mat} a The matrix to convert
 * @param {string} [ms=', '] The separator string for columns
 * @param {string} [ns='\n'] The separator string for rows
 * @return {string} A string representation of the matrix
 */
mat.str = (a, ms = ', ', ns = '\n') => chunk(a.entries, a.n).map(r => r.join(ms)).join(ns);

if (true) {
  module.exports = { vec, mat };
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
/*!******************!*\
  !*** ./index.ts ***!
  \******************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const vec_1 = __webpack_require__(/*! @basementuniverse/vec */ "./node_modules/@basementuniverse/vec/vec.js");
function clamp(a, min = 0, max = 1) {
    return a < min ? min : (a > max ? max : a);
}
class Camera {
    constructor(position, options) {
        this.size = (0, vec_1.vec)();
        this.actualPosition = (0, vec_1.vec)();
        this.targetPosition = (0, vec_1.vec)();
        this.actualScale = 1;
        this.targetScale = 1;
        this.actualPosition = position;
        this.targetPosition = position;
        this.options = Object.assign({}, Camera.defaultOptions, options !== null && options !== void 0 ? options : {});
    }
    get position() {
        return this.targetPosition;
    }
    set position(value) {
        this.targetPosition = value;
    }
    set positionImmediate(value) {
        this.actualPosition = value;
        this.targetPosition = value;
    }
    get scale() {
        return this.targetScale;
    }
    set scale(value) {
        this.targetScale = clamp(value, this.options.minScale, this.options.maxScale);
    }
    set scaleImmediate(value) {
        this.actualScale = clamp(value, this.options.minScale, this.options.maxScale);
        this.targetScale = this.actualScale;
    }
    /**
     * Get screen bounds based on the current camera position and scale
     */
    get bounds() {
        return {
            top: this.actualPosition.y - (this.size.y / 2) / this.actualScale,
            bottom: this.actualPosition.y + (this.size.y / 2) / this.actualScale,
            left: this.actualPosition.x - (this.size.x / 2) / this.actualScale,
            right: this.actualPosition.x + (this.size.x / 2) / this.actualScale
        };
    }
    /**
     * Convert a screen position to a world position
     */
    positionToWorld(position) {
        const bounds = this.bounds;
        return vec_1.vec.add({ x: bounds.left, y: bounds.top }, vec_1.vec.mul(position, 1 / this.scale));
    }
    /**
     * Update context transforms to match camera position and scale
     */
    draw(context, width, height) {
        this.size = (0, vec_1.vec)(width, height);
        const d = vec_1.vec.sub(this.actualPosition, this.targetPosition);
        this.actualPosition = vec_1.vec.add(this.position, vec_1.vec.mul(d, this.options.moveEaseAmount));
        const s = clamp(this.targetScale, this.options.minScale, this.options.maxScale);
        this.actualScale = s + (this.actualScale - s) * this.options.scaleEaseAmount;
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.translate((this.size.x / 2) - this.actualPosition.x * this.actualScale, (this.size.y / 2) - this.actualPosition.y * this.actualScale);
        context.scale(this.actualScale, this.actualScale);
    }
}
exports["default"] = Camera;
Camera.defaultOptions = {
    allowScale: true,
    minScale: 0.5,
    maxScale: 4,
    moveEaseAmount: 0.1,
    scaleEaseAmount: 0.1,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUE0QztBQXdDNUMsU0FBUyxLQUFLLENBQUMsQ0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDeEMsT0FBTyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBRUQsTUFBcUIsTUFBTTtJQXFCekIsWUFBbUIsUUFBYSxFQUFFLE9BQWdDO1FBVjFELFNBQUksR0FBUSxJQUFBLFNBQUcsR0FBRSxDQUFDO1FBRWxCLG1CQUFjLEdBQVEsSUFBQSxTQUFHLEdBQUUsQ0FBQztRQUU1QixtQkFBYyxHQUFRLElBQUEsU0FBRyxHQUFFLENBQUM7UUFFNUIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFFeEIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFHOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUM7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUMxQixFQUFFLEVBQ0YsTUFBTSxDQUFDLGNBQWMsRUFDckIsT0FBTyxhQUFQLE9BQU8sY0FBUCxPQUFPLEdBQUksRUFBRSxDQUNkLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBVyxRQUFRLENBQUMsS0FBVTtRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBVyxpQkFBaUIsQ0FBQyxLQUFVO1FBQ3JDLElBQUks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
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsK0JBQStCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsdXVJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGJhc2VtZW50dW5pdmVyc2UvY2FtZXJhL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9AYmFzZW1lbnR1bml2ZXJzZS9jYW1lcmEvLi9ub2RlX21vZHVsZXMvQGJhc2VtZW50dW5pdmVyc2UvdXRpbHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGJhc2VtZW50dW5pdmVyc2UvY2FtZXJhLy4vbm9kZV9tb2R1bGVzL0BiYXNlbWVudHVuaXZlcnNlL3ZlYy92ZWMuanMiLCJ3ZWJwYWNrOi8vQGJhc2VtZW50dW5pdmVyc2UvY2FtZXJhL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0BiYXNlbWVudHVuaXZlcnNlL2NhbWVyYS8uL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSB7XG5cdFx0dmFyIGEgPSBmYWN0b3J5KCk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KShzZWxmLCAoKSA9PiB7XG5yZXR1cm4gIiwiLyoqXG4gKiBAb3ZlcnZpZXcgQSBsaWJyYXJ5IG9mIHVzZWZ1bCBmdW5jdGlvbnNcbiAqIEBhdXRob3IgR29yZG9uIExhcnJpZ2FuXG4gKi9cblxuLyoqXG4gKiBDaGVjayBpZiB0d28gbnVtYmVycyBhcmUgYXBwcm94aW1hdGVseSBlcXVhbFxuICogQHBhcmFtIHtudW1iZXJ9IGEgTnVtYmVyIGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBiIE51bWJlciBiXG4gKiBAcGFyYW0ge251bWJlcn0gW3A9TnVtYmVyLkVQU0lMT05dIFRoZSBwcmVjaXNpb24gdmFsdWVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbnVtYmVycyBhIGFuZCBiIGFyZSBhcHByb3hpbWF0ZWx5IGVxdWFsXG4gKi9cbmNvbnN0IGZsb2F0RXF1YWxzID0gKGEsIGIsIHAgPSBOdW1iZXIuRVBTSUxPTikgPT4gTWF0aC5hYnMoYSAtIGIpIDwgcDtcblxuLyoqXG4gKiBDbGFtcCBhIG51bWJlciBiZXR3ZWVuIG1pbiBhbmQgbWF4XG4gKiBAcGFyYW0ge251bWJlcn0gYSBUaGUgbnVtYmVyIHRvIGNsYW1wXG4gKiBAcGFyYW0ge251bWJlcn0gW21pbj0wXSBUaGUgbWluaW11bSB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IFttYXg9MV0gVGhlIG1heGltdW0gdmFsdWVcbiAqIEByZXR1cm4ge251bWJlcn0gQSBjbGFtcGVkIG51bWJlclxuICovXG5jb25zdCBjbGFtcCA9IChhLCBtaW4gPSAwLCBtYXggPSAxKSA9PiBhIDwgbWluID8gbWluIDogKGEgPiBtYXggPyBtYXggOiBhKTtcblxuLyoqXG4gKiBHZXQgdGhlIGZyYWN0aW9uYWwgcGFydCBvZiBhIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGEgVGhlIG51bWJlciBmcm9tIHdoaWNoIHRvIGdldCB0aGUgZnJhY3Rpb25hbCBwYXJ0XG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBmcmFjdGlvbmFsIHBhcnQgb2YgdGhlIG51bWJlclxuICovXG5jb25zdCBmcmFjID0gYSA9PiBhID49IDAgPyBhIC0gTWF0aC5mbG9vcihhKSA6IGEgLSBNYXRoLmNlaWwoYSk7XG5cbi8qKlxuICogRG8gYSBsaW5lYXIgaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIGEgYW5kIGJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhIFRoZSBtaW5pbXVtIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGIgVGhlIG1heGltdW0gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgaW50ZXJwb2xhdGlvbiB2YWx1ZSwgc2hvdWxkIGJlIGluIHRoZSBpbnRlcnZhbCBbMCwgMV1cbiAqIEByZXR1cm4ge251bWJlcn0gQW4gaW50ZXJwb2xhdGVkIHZhbHVlIGluIHRoZSBpbnRlcnZhbCBbYSwgYl1cbiAqL1xuY29uc3QgbGVycCA9IChhLCBiLCBpKSA9PiBhICsgKGIgLSBhKSAqIGk7XG5cbi8qKlxuICogR2V0IHRoZSBwb3NpdGlvbiBvZiBpIGJldHdlZW4gYSBhbmQgYlxuICogQHBhcmFtIHtudW1iZXJ9IGEgVGhlIG1pbmltdW0gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gYiBUaGUgbWF4aW11bSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSBpbnRlcnBvbGF0ZWQgdmFsdWUgaW4gdGhlIGludGVydmFsIFthLCBiXVxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgcG9zaXRpb24gb2YgaSBiZXR3ZWVuIGEgYW5kIGJcbiAqL1xuY29uc3QgdW5sZXJwID0gKGEsIGIsIGkpID0+IChpIC0gYSkgLyAoYiAtIGEpO1xuXG4vKipcbiAqIERvIGEgYmlsaW5lYXIgaW50ZXJwb2xhdGlvblxuICogQHBhcmFtIHtudW1iZXJ9IGMwMCBUb3AtbGVmdCB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IGMxMCBUb3AtcmlnaHQgdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBjMDEgQm90dG9tLWxlZnQgdmFsdWVcbiAqIEBwYXJhbSB7bnVtYmVyfSBjMTEgQm90dG9tLXJpZ2h0IHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gaXggSW50ZXJwb2xhdGlvbiB2YWx1ZSBhbG9uZyB4XG4gKiBAcGFyYW0ge251bWJlcn0gaXkgSW50ZXJwb2xhdGlvbiB2YWx1ZSBhbG9uZyB5XG4gKiBAcmV0dXJuIHtudW1iZXJ9IEEgYmlsaW5lYXIgaW50ZXJwb2xhdGVkIHZhbHVlXG4gKi9cbmNvbnN0IGJsZXJwID0gKGMwMCwgYzEwLCBjMDEsIGMxMSwgaXgsIGl5KSA9PiBsZXJwKGxlcnAoYzAwLCBjMTAsIGl4KSwgbGVycChjMDEsIGMxMSwgaXgpLCBpeSk7XG5cbi8qKlxuICogUmUtbWFwIGEgbnVtYmVyIGkgZnJvbSByYW5nZSBhMS4uLmEyIHRvIGIxLi4uYjJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSBudW1iZXIgdG8gcmUtbWFwXG4gKiBAcGFyYW0ge251bWJlcn0gYTFcbiAqIEBwYXJhbSB7bnVtYmVyfSBhMlxuICogQHBhcmFtIHtudW1iZXJ9IGIxXG4gKiBAcGFyYW0ge251bWJlcn0gYjJcbiAqIEByZXR1cm4ge251bWJlcn1cbiAqL1xuY29uc3QgcmVtYXAgPSAoaSwgYTEsIGEyLCBiMSwgYjIpID0+IGIxICsgKGkgLSBhMSkgKiAoYjIgLSBiMSkgLyAoYTIgLSBhMSk7XG5cbi8qKlxuICogRG8gYSBzbW9vdGggaW50ZXJwb2xhdGlvbiBiZXR3ZWVuIGEgYW5kIGJcbiAqIEBwYXJhbSB7bnVtYmVyfSBhIFRoZSBtaW5pbXVtIG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGIgVGhlIG1heGltdW0gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgaW50ZXJwb2xhdGlvbiB2YWx1ZVxuICogQHJldHVybiB7bnVtYmVyfSBBbiBpbnRlcnBvbGF0ZWQgdmFsdWUgaW4gdGhlIGludGVydmFsIFthLCBiXVxuICovXG5jb25zdCBzbW9vdGhzdGVwID0gKGEsIGIsIGkpID0+IGxlcnAoYSwgYiwgMyAqIE1hdGgucG93KGksIDIpIC0gMiAqIE1hdGgucG93KGksIDMpKTtcblxuLyoqXG4gKiBHZXQgYW4gYW5nbGUgaW4gcmFkaWFuc1xuICogQHBhcmFtIHtudW1iZXJ9IGRlZ3JlZXMgVGhlIGFuZ2xlIGluIGRlZ3JlZXNcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGFuZ2xlIGluIHJhZGlhbnNcbiAqL1xuY29uc3QgcmFkaWFucyA9IGRlZ3JlZXMgPT4gKE1hdGguUEkgLyAxODApICogZGVncmVlcztcblxuLyoqXG4gKiBHZXQgYW4gYW5nbGUgaW4gZGVncmVlc1xuICogQHBhcmFtIHtudW1iZXJ9IHJhZGlhbnMgVGhlIGFuZ2xlIGluIHJhZGlhbnNcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGFuZ2xlIGluIGRlZ3JlZXNcbiAqL1xuY29uc3QgZGVncmVlcyA9IHJhZGlhbnMgPT4gKDE4MCAvIE1hdGguUEkpICogcmFkaWFucztcblxuLyoqXG4gKiBHZXQgYSByYW5kb20gZmxvYXQgaW4gdGhlIGludGVydmFsIFttaW4sIG1heClcbiAqIEBwYXJhbSB7bnVtYmVyfSBtaW4gSW5jbHVzaXZlIG1pblxuICogQHBhcmFtIHtudW1iZXJ9IG1heCBFeGNsdXNpdmUgbWF4XG4gKiBAcmV0dXJuIHtudW1iZXJ9IEEgcmFuZG9tIGZsb2F0IGluIHRoZSBpbnRlcnZhbCBbbWluLCBtYXgpXG4gKi9cbmNvbnN0IHJhbmRvbUJldHdlZW4gPSAobWluLCBtYXgpID0+IE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcblxuLyoqXG4gKiBHZXQgYSByYW5kb20gaW50ZWdlciBpbiB0aGUgaW50ZXJ2YWwgW21pbiwgbWF4XVxuICogQHBhcmFtIHtudW1iZXJ9IG1pbiBJbmNsdXNpdmUgbWluXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IEluY2x1c2l2ZSBtYXhcbiAqIEByZXR1cm4ge251bWJlcn0gQSByYW5kb20gaW50ZWdlciBpbiB0aGUgaW50ZXJ2YWwgW21pbiwgbWF4XVxuICovXG5jb25zdCByYW5kb21JbnRCZXR3ZWVuID0gKG1pbiwgbWF4KSA9PiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xuXG4vKipcbiAqIEdldCBhIG5vcm1hbGx5LWRpc3RyaWJ1dGVkIHJhbmRvbSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbXU9MC41XSBUaGUgbWVhbiB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IFtzaWdtYT0wLjVdIFRoZSBzdGFuZGFyZCBkZXZpYXRpb25cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc2FtcGxlcz0yXSBUaGUgbnVtYmVyIG9mIHNhbXBsZXNcbiAqIEByZXR1cm4ge251bWJlcn0gQSBub3JtYWxseS1kaXN0cmlidXRlZCByYW5kb20gbnVtYmVyXG4gKi9cbmNvbnN0IGNsdFJhbmRvbSA9IChtdSA9IDAuNSwgc2lnbWEgPSAwLjUsIHNhbXBsZXMgPSAyKSA9PiB7XG4gIGxldCB0b3RhbCA9IDA7XG4gIGZvciAobGV0IGkgPSBzYW1wbGVzOyBpLS07KSB7XG4gICAgdG90YWwgKz0gTWF0aC5yYW5kb20oKTtcbiAgfVxuICByZXR1cm4gbXUgKyAodG90YWwgLSBzYW1wbGVzIC8gMikgLyAoc2FtcGxlcyAvIDIpICogc2lnbWE7XG59O1xuXG4vKipcbiAqIEdldCBhIG5vcm1hbGx5LWRpc3RyaWJ1dGVkIHJhbmRvbSBpbnRlZ2VyIGluIHRoZSBpbnRlcnZhbCBbbWluLCBtYXhdXG4gKiBAcGFyYW0ge251bWJlcn0gbWluIEluY2x1c2l2ZSBtaW5cbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXggSW5jbHVzaXZlIG1heFxuICogQHJldHVybiB7bnVtYmVyfSBBIG5vcm1hbGx5LWRpc3RyaWJ1dGVkIHJhbmRvbSBpbnRlZ2VyXG4gKi9cbmNvbnN0IGNsdFJhbmRvbUludCA9IChtaW4sIG1heCkgPT4gTWF0aC5mbG9vcihtaW4gKyBjbHRSYW5kb20oMC41LCAwLjUsIDIpICogKG1heCArIDEgLSBtaW4pKTtcblxuLyoqXG4gKiBSZXR1cm4gYSB3ZWlnaHRlZCByYW5kb20gaW50ZWdlclxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSB3IEFuIGFycmF5IG9mIHdlaWdodHNcbiAqIEByZXR1cm4ge251bWJlcn0gQW4gaW5kZXggZnJvbSB3XG4gKi9cbmNvbnN0IHdlaWdodGVkUmFuZG9tID0gdyA9PiB7XG4gIGxldCB0b3RhbCA9IHcucmVkdWNlKChhLCBpKSA9PiBhICsgaSwgMCksIG4gPSAwO1xuICBjb25zdCByID0gTWF0aC5yYW5kb20oKSAqIHRvdGFsO1xuICB3aGlsZSAodG90YWwgPiByKSB7XG4gICAgdG90YWwgLT0gd1tuKytdO1xuICB9XG4gIHJldHVybiBuIC0gMTtcbn07XG5cbi8qKlxuICogQW4gaW50ZXJwb2xhdGlvbiBmdW5jdGlvblxuICogQGNhbGxiYWNrIGludGVycG9sYXRpb25DYWxsYmFja1xuICogQHBhcmFtIHtudW1iZXJ9IGEgVGhlIG1pbmltdW0gbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gYiBUaGUgbWF4aW11bSBudW1iZXJcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSBpbnRlcnBvbGF0aW9uIHZhbHVlLCBzaG91bGQgYmUgaW4gdGhlIGludGVydmFsIFswLCAxXVxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgaW50ZXJwb2xhdGVkIHZhbHVlIGluIHRoZSBpbnRlcnZhbCBbYSwgYl1cbiAqL1xuXG4vKipcbiAqIFJldHVybiBhbiBpbnRlcnBvbGF0ZWQgdmFsdWUgZnJvbSBhbiBhcnJheVxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBhIEFuIGFycmF5IG9mIHZhbHVlcyBpbnRlcnBvbGF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IGkgQSBudW1iZXIgaW4gdGhlIGludGVydmFsIFswLCAxXVxuICogQHBhcmFtIHtpbnRlcnBvbGF0aW9uQ2FsbGJhY2t9IFtmPU1hdGgubGVycF0gVGhlIGludGVycG9sYXRpb24gZnVuY3Rpb24gdG8gdXNlXG4gKiBAcmV0dXJuIHtudW1iZXJ9IEFuIGludGVycG9sYXRlZCB2YWx1ZSBpbiB0aGUgaW50ZXJ2YWwgW21pbihhKSwgbWF4KGEpXVxuICovXG5jb25zdCBsZXJwQXJyYXkgPSAoYSwgaSwgZiA9IGxlcnApID0+IHtcbiAgY29uc3QgcyA9IGkgKiAoYS5sZW5ndGggLSAxKTtcbiAgY29uc3QgcCA9IGNsYW1wKE1hdGgudHJ1bmMocyksIDAsIGEubGVuZ3RoIC0gMSk7XG4gIHJldHVybiBmKGFbcF0gfHwgMCwgYVtwICsgMV0gfHwgMCwgZnJhYyhzKSk7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgZG90IHByb2R1Y3Qgb2YgdHdvIHZlY3RvcnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gYSBWZWN0b3IgYVxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBiIFZlY3RvciBiXG4gKiBAcmV0dXJuIHtudW1iZXJ9IGEg4oiZIGJcbiAqL1xuY29uc3QgZG90ID0gKGEsIGIpID0+IGEucmVkdWNlKChuLCB2LCBpKSA9PiBuICsgdiAqIGJbaV0sIDApO1xuXG4vKipcbiAqIEdldCB0aGUgZmFjdG9yaWFsIG9mIGEgbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gYVxuICogQHJldHVybiB7bnVtYmVyfSBhIVxuICovXG5jb25zdCBmYWN0b3JpYWwgPSBhID0+IHtcbiAgbGV0IHJlc3VsdCA9IDE7XG4gIGZvciAobGV0IGkgPSAyOyBpIDw9IGE7IGkrKykge1xuICAgIHJlc3VsdCAqPSBpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgbnVtYmVyIG9mIHBlcm11dGF0aW9ucyBvZiByIGVsZW1lbnRzIGZyb20gYSBzZXQgb2YgbiBlbGVtZW50c1xuICogQHBhcmFtIHtudW1iZXJ9IG5cbiAqIEBwYXJhbSB7bnVtYmVyfSByXG4gKiBAcmV0dXJuIHtudW1iZXJ9IG5QclxuICovXG5jb25zdCBwZXJtdXRhdGlvbiA9IChuLCByKSA9PiBmYWN0b3JpYWwobikgLyBmYWN0b3JpYWwobiAtIHIpO1xuXG4vKipcbiAqIEdldCB0aGUgbnVtYmVyIG9mIGNvbWJpbmF0aW9ucyBvZiByIGVsZW1lbnRzIGZyb20gYSBzZXQgb2YgbiBlbGVtZW50c1xuICogQHBhcmFtIHtudW1iZXJ9IG5cbiAqIEBwYXJhbSB7bnVtYmVyfSByXG4gKiBAcmV0dXJuIHtudW1iZXJ9IG5DclxuICovXG5jb25zdCBjb21iaW5hdGlvbiA9IChuLCByKSA9PiBmYWN0b3JpYWwobikgLyAoZmFjdG9yaWFsKHIpICogZmFjdG9yaWFsKG4gLSByKSk7XG5cbi8qKlxuICogQSBmdW5jdGlvbiBmb3IgZ2VuZXJhdGluZyBhcnJheSB2YWx1ZXNcbiAqIEBjYWxsYmFjayB0aW1lc0NhbGxiYWNrXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgYXJyYXkgaW5kZXhcbiAqIEByZXR1cm4geyp9IFRoZSBhcnJheSB2YWx1ZVxuICovXG5cbi8qKlxuICogUmV0dXJuIGEgbmV3IGFycmF5IHdpdGggbGVuZ3RoIG4gYnkgY2FsbGluZyBmdW5jdGlvbiBmKGkpIG9uIGVhY2ggZWxlbWVudFxuICogQHBhcmFtIHt0aW1lc0NhbGxiYWNrfSBmXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgc2l6ZSBvZiB0aGUgYXJyYXlcbiAqIEByZXR1cm4ge0FycmF5PCo+fVxuICovXG5jb25zdCB0aW1lcyA9IChmLCBuKSA9PiBBcnJheShuKS5maWxsKDApLm1hcCgoXywgaSkgPT4gZihpKSk7XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IGNvbnRhaW5pbmcgbnVtYmVycyAwLT4obiAtIDEpXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgc2l6ZSBvZiB0aGUgYXJyYXlcbiAqIEByZXR1cm4ge0FycmF5PG51bWJlcj59IEFuIGFycmF5IG9mIGludGVnZXJzIDAtPihuIC0gMSlcbiAqL1xuY29uc3QgcmFuZ2UgPSBuID0+IHRpbWVzKGkgPT4gaSwgbik7XG5cbi8qKlxuICogWmlwIDIgYXJyYXlzIHRvZ2V0aGVyLCBpLmUuIChbMSwgMiwgM10sIFthLCBiLCBjXSkgPT4gW1sxLCBhXSwgWzIsIGJdLCBbMywgY11dXG4gKiBAcGFyYW0ge0FycmF5PCo+fSBhXG4gKiBAcGFyYW0ge0FycmF5PCo+fSBiXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTwqPj59XG4gKi9cbmNvbnN0IHppcCA9IChhLCBiKSA9PiBhLm1hcCgoaywgaSkgPT4gW2ssIGJbaV1dKTtcblxuLyoqXG4gKiBSZXR1cm4gYXJyYXlbaV0gd2l0aCBwb3NpdGl2ZSBhbmQgbmVnYXRpdmUgd3JhcHBpbmdcbiAqIEBwYXJhbSB7QXJyYXk8Kj59IGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSBwb3NpdGl2ZWx5L25lZ2F0aXZlbHkgd3JhcHBlZCBhcnJheSBpbmRleFxuICogQHJldHVybiB7Kn0gQW4gZWxlbWVudCBmcm9tIHRoZSBhcnJheVxuICovXG5jb25zdCBhdCA9IChhLCBpKSA9PiBhW2kgPCAwID8gYS5sZW5ndGggLSAoTWF0aC5hYnMoaSArIDEpICUgYS5sZW5ndGgpIC0gMSA6IGkgJSBhLmxlbmd0aF07XG5cbi8qKlxuICogQ2hvcCBhbiBhcnJheSBpbnRvIGNodW5rcyBvZiBzaXplIG5cbiAqIEBwYXJhbSB7QXJyYXk8Kj59IGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBjaHVuayBzaXplXG4gKiBAcmV0dXJuIHtBcnJheTxBcnJheTwqPj59IEFuIGFycmF5IG9mIGFycmF5IGNodW5rc1xuICovXG5jb25zdCBjaHVuayA9IChhLCBuKSA9PiB0aW1lcyhpID0+IGEuc2xpY2UoaSAqIG4sIGkgKiBuICsgbiksIE1hdGguY2VpbChhLmxlbmd0aCAvIG4pKTtcblxuLyoqXG4gKiBSYW5kb21seSBzaHVmZmxlIGEgc2hhbGxvdyBjb3B5IG9mIGFuIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5PCo+fSBhXG4gKiBAcmV0dXJuIHtBcnJheTwqPn0gVGhlIHNodWZmbGVkIGFycmF5XG4gKi9cbmNvbnN0IHNodWZmbGUgPSBhID0+IGEuc2xpY2UoKS5zb3J0KCgpID0+IE1hdGgucmFuZG9tKCkgLSAwLjUpO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZmxvYXRFcXVhbHMsXG4gICAgY2xhbXAsXG4gICAgZnJhYyxcbiAgICBsZXJwLFxuICAgIHVubGVycCxcbiAgICBibGVycCxcbiAgICByZW1hcCxcbiAgICBzbW9vdGhzdGVwLFxuICAgIHJhZGlhbnMsXG4gICAgZGVncmVlcyxcbiAgICByYW5kb21CZXR3ZWVuLFxuICAgIHJhbmRvbUludEJldHdlZW4sXG4gICAgY2x0UmFuZG9tLFxuICAgIGNsdFJhbmRvbUludCxcbiAgICB3ZWlnaHRlZFJhbmRvbSxcbiAgICBsZXJwQXJyYXksXG4gICAgZG90LFxuICAgIGZhY3RvcmlhbCxcbiAgICBwZXJtdXRhdGlvbixcbiAgICBjb21iaW5hdGlvbixcbiAgICB0aW1lcyxcbiAgICByYW5nZSxcbiAgICB6aXAsXG4gICAgYXQsXG4gICAgY2h1bmssXG4gICAgc2h1ZmZsZSxcbiAgfTtcbn1cbiIsImNvbnN0IHsgdGltZXMsIGNodW5rLCBkb3QgfSA9IHJlcXVpcmUoJ0BiYXNlbWVudHVuaXZlcnNlL3V0aWxzJyk7XG5cbi8qKlxuICogQG92ZXJ2aWV3IEEgbGlicmFyeSBvZiB1c2VmdWwgZnVuY3Rpb25zXG4gKiBAYXV0aG9yIEdvcmRvbiBMYXJyaWdhblxuICovXG5cbi8qKlxuICogQSAyZCB2ZWN0b3JcbiAqIEB0eXBlZGVmIHtPYmplY3R9IHZlY1xuICogQHByb3BlcnR5IHtudW1iZXJ9IHggVGhlIHggY29tcG9uZW50IG9mIHRoZSB2ZWN0b3JcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB5IFRoZSB5IGNvbXBvbmVudCBvZiB0aGUgdmVjdG9yXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgdmVjdG9yXG4gKiBAcGFyYW0ge251bWJlcnx2ZWN9IFt4XSBUaGUgeCBjb21wb25lbnQgb2YgdGhlIHZlY3Rvciwgb3IgYSB2ZWN0b3IgdG8gY29weVxuICogQHBhcmFtIHtudW1iZXJ9IFt5XSBUaGUgeSBjb21wb25lbnQgb2YgdGhlIHZlY3RvclxuICogQHJldHVybiB7dmVjfSBBIG5ldyB2ZWN0b3JcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlZhcmlvdXMgd2F5cyB0byBpbml0aWFsaXNlIGEgdmVjdG9yPC9jYXB0aW9uPlxuICogbGV0IGEgPSB2ZWMoMywgMik7ICAvLyAoMywgMilcbiAqIGxldCBiID0gdmVjKDQpOyAgICAgLy8gKDQsIDQpXG4gKiBsZXQgYyA9IHZlYyhhKTsgICAgIC8vICgzLCAyKVxuICogbGV0IGQgPSB2ZWMoKTsgICAgICAvLyAoMCwgMClcbiAqL1xuY29uc3QgdmVjID0gKHgsIHkpID0+ICgheCAmJiAheSA/XG4gIHsgeDogMCwgeTogMCB9IDogKHR5cGVvZiB4ID09PSAnb2JqZWN0JyA/XG4gICAgeyB4OiB4LnggfHwgMCwgeTogeC55IHx8IDAgfSA6ICh5ID09PSBudWxsIHx8IHkgPT09IHVuZGVmaW5lZCA/XG4gICAgICB7IHg6IHgsIHk6IHggfSA6IHsgeDogeCwgeTogeSB9KVxuICApXG4pO1xuXG4vKipcbiAqIEdldCB0aGUgY29tcG9uZW50cyBvZiBhIHZlY3RvciBhcyBhbiBhcnJheVxuICogQHBhcmFtIHt2ZWN9IGEgVGhlIHZlY3RvciB0byBnZXQgY29tcG9uZW50cyBmcm9tXG4gKiBAcmV0dXJuIHtBcnJheTxudW1iZXI+fSBUaGUgdmVjdG9yIGNvbXBvbmVudHMgYXMgYW4gYXJyYXlcbiAqL1xudmVjLmNvbXBvbmVudHMgPSBhID0+IFthLngsIGEueV07XG5cbi8qKlxuICogUmV0dXJuIGEgdW5pdCB2ZWN0b3IgKDEsIDApXG4gKiBAcmV0dXJuIHt2ZWN9IEEgdW5pdCB2ZWN0b3IgKDEsIDApXG4gKi9cbnZlYy51eCA9ICgpID0+IHZlYygxLCAwKTtcblxuLyoqXG4gKiBSZXR1cm4gYSB1bml0IHZlY3RvciAoMCwgMSlcbiAqIEByZXR1cm4ge3ZlY30gQSB1bml0IHZlY3RvciAoMCwgMSlcbiAqL1xudmVjLnV5ID0gKCkgPT4gdmVjKDAsIDEpO1xuXG4vKipcbiAqIEFkZCB2ZWN0b3JzXG4gKiBAcGFyYW0ge3ZlY30gYSBWZWN0b3IgYVxuICogQHBhcmFtIHt2ZWN9IGIgVmVjdG9yIGJcbiAqIEByZXR1cm4ge3ZlY30gYSArIGJcbiAqL1xudmVjLmFkZCA9IChhLCBiKSA9PiAoeyB4OiBhLnggKyBiLngsIHk6IGEueSArIGIueSB9KTtcblxuLyoqXG4gKiBTY2FsZSBhIHZlY3RvclxuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBiIFNjYWxhciBiXG4gKiBAcmV0dXJuIHt2ZWN9IGEgKiBiXG4gKi9cbnZlYy5tdWwgPSAoYSwgYikgPT4gKHsgeDogYS54ICogYiwgeTogYS55ICogYiB9KTtcblxuLyoqXG4gKiBTdWJ0cmFjdCB2ZWN0b3JzXG4gKiBAcGFyYW0ge3ZlY30gYSBWZWN0b3IgYVxuICogQHBhcmFtIHt2ZWN9IGIgVmVjdG9yIGJcbiAqIEByZXR1cm4ge3ZlY30gYSAtIGJcbiAqL1xudmVjLnN1YiA9IChhLCBiKSA9PiAoeyB4OiBhLnggLSBiLngsIHk6IGEueSAtIGIueSB9KTtcblxuLyoqXG4gKiBHZXQgdGhlIGxlbmd0aCBvZiBhIHZlY3RvclxuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEByZXR1cm4ge251bWJlcn0gfGF8XG4gKi9cbnZlYy5sZW4gPSBhID0+IE1hdGguc3FydChhLnggKiBhLnggKyBhLnkgKiBhLnkpO1xuXG4vKipcbiAqIEdldCB0aGUgbGVuZ3RoIG9mIGEgdmVjdG9yIHVzaW5nIHRheGljYWIgZ2VvbWV0cnlcbiAqIEBwYXJhbSB7dmVjfSBhIFZlY3RvciBhXG4gKiBAcmV0dXJuIHtudW1iZXJ9IHxhfFxuICovXG52ZWMubWFuaGF0dGFuID0gYSA9PiBNYXRoLmFicyhhLngpICsgTWF0aC5hYnMoYS55KTtcblxuLyoqXG4gKiBOb3JtYWxpc2UgYSB2ZWN0b3JcbiAqIEBwYXJhbSB7dmVjfSBhIFRoZSB2ZWN0b3IgdG8gbm9ybWFsaXNlXG4gKiBAcmV0dXJuIHt2ZWN9IF5hXG4gKi9cbnZlYy5ub3IgPSBhID0+IHtcbiAgbGV0IGxlbiA9IHZlYy5sZW4oYSk7XG4gIHJldHVybiBsZW4gPyB7IHg6IGEueCAvIGxlbiwgeTogYS55IC8gbGVuIH0gOiB2ZWMoKTtcbn07XG5cbi8qKlxuICogR2V0IGEgZG90IHByb2R1Y3Qgb2YgdmVjdG9yc1xuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEBwYXJhbSB7dmVjfSBiIFZlY3RvciBiXG4gKiBAcmV0dXJuIHtudW1iZXJ9IGEg4oiZIGJcbiAqL1xudmVjLmRvdCA9IChhLCBiKSA9PiBhLnggKiBiLnggKyBhLnkgKiBiLnk7XG5cbi8qKlxuICogUm90YXRlIGEgdmVjdG9yIGJ5IHIgcmFkaWFuc1xuICogQHBhcmFtIHt2ZWN9IGEgVGhlIHZlY3RvciB0byByb3RhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSByIFRoZSBhbmdsZSB0byByb3RhdGUgYnksIG1lYXN1cmVkIGluIHJhZGlhbnNcbiAqIEByZXR1cm4ge3ZlY30gQSByb3RhdGVkIHZlY3RvclxuICovXG52ZWMucm90ID0gKGEsIHIpID0+IHtcbiAgbGV0IHMgPSBNYXRoLnNpbihyKSxcbiAgICBjID0gTWF0aC5jb3Mocik7XG4gIHJldHVybiB7IHg6IGMgKiBhLnggLSBzICogYS55LCB5OiBzICogYS54ICsgYyAqIGEueSB9O1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHR3byB2ZWN0b3JzIGFyZSBlcXVhbFxuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEBwYXJhbSB7dmVjfSBiIFZlY3RvciBiXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHZlY3RvcnMgYSBhbmQgYiBhcmUgZXF1YWwsIGZhbHNlIG90aGVyd2lzZVxuICovXG52ZWMuZXEgPSAoYSwgYikgPT4gYS54ID09PSBiLnggJiYgYS55ID09PSBiLnk7XG5cbi8qKlxuICogR2V0IHRoZSBhbmdsZSBvZiBhIHZlY3RvclxuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIGFuZ2xlIG9mIHZlY3RvciBhIGluIHJhZGlhbnNcbiAqL1xudmVjLnJhZCA9IGEgPT4gTWF0aC5hdGFuMihhLnksIGEueCk7XG5cbi8qKlxuICogQ29weSBhIHZlY3RvclxuICogQHBhcmFtIHt2ZWN9IGEgVGhlIHZlY3RvciB0byBjb3B5XG4gKiBAcmV0dXJuIHt2ZWN9IEEgY29weSBvZiB2ZWN0b3IgYVxuICovXG52ZWMuY3B5ID0gYSA9PiB2ZWMoYSk7XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0byBjYWxsIG9uIGVhY2ggY29tcG9uZW50IG9mIGEgdmVjdG9yXG4gKiBAY2FsbGJhY2sgdmVjdG9yTWFwQ2FsbGJhY2tcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZSBUaGUgY29tcG9uZW50IHZhbHVlXG4gKiBAcGFyYW0geyd4JyB8ICd5J30gbGFiZWwgVGhlIGNvbXBvbmVudCBsYWJlbCAoeCBvciB5KVxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbWFwcGVkIGNvbXBvbmVudFxuICovXG5cbi8qKlxuICogQ2FsbCBhIGZ1bmN0aW9uIG9uIGVhY2ggY29tcG9uZW50IG9mIGEgdmVjdG9yIGFuZCBidWlsZCBhIG5ldyB2ZWN0b3IgZnJvbSB0aGUgcmVzdWx0c1xuICogQHBhcmFtIHt2ZWN9IGEgVmVjdG9yIGFcbiAqIEBwYXJhbSB7dmVjdG9yTWFwQ2FsbGJhY2t9IGYgVGhlIGZ1bmN0aW9uIHRvIGNhbGwgb24gZWFjaCBjb21wb25lbnQgb2YgdGhlIHZlY3RvclxuICogQHJldHVybiB7dmVjfSBWZWN0b3IgYSBtYXBwZWQgdGhyb3VnaCBmXG4gKi9cbnZlYy5tYXAgPSAoYSwgZikgPT4gKHsgeDogZihhLngsICd4JyksIHk6IGYoYS55LCAneScpIH0pO1xuXG4vKipcbiAqIENvbnZlcnQgYSB2ZWN0b3IgaW50byBhIHN0cmluZ1xuICogQHBhcmFtIHt2ZWN9IGEgVGhlIHZlY3RvciB0byBjb252ZXJ0XG4gKiBAcGFyYW0ge3N0cmluZ30gW3M9JywgJ10gVGhlIHNlcGFyYXRvciBzdHJpbmdcbiAqIEByZXR1cm4ge3N0cmluZ30gQSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICovXG52ZWMuc3RyID0gKGEsIHMgPSAnLCAnKSA9PiBgJHthLnh9JHtzfSR7YS55fWA7XG5cbi8qKlxuICogQSBtYXRyaXhcbiAqIEB0eXBlZGVmIHtPYmplY3R9IG1hdFxuICogQHByb3BlcnR5IHtudW1iZXJ9IG0gVGhlIG51bWJlciBvZiByb3dzIGluIHRoZSBtYXRyaXhcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgbWF0cml4XG4gKiBAcHJvcGVydHkge0FycmF5PG51bWJlcj59IGVudHJpZXMgVGhlIG1hdHJpeCB2YWx1ZXNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBtYXRyaXhcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbT00XSBUaGUgbnVtYmVyIG9mIHJvd3NcbiAqIEBwYXJhbSB7bnVtYmVyfSBbbj00XSBUaGUgbnVtYmVyIG9mIGNvbHVtbnNcbiAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gW2VudHJpZXM9W11dIE1hdHJpeCB2YWx1ZXMgaW4gcmVhZGluZyBvcmRlclxuICogQHJldHVybiB7bWF0fSBBIG5ldyBtYXRyaXhcbiAqL1xuY29uc3QgbWF0ID0gKG0gPSA0LCBuID0gNCwgZW50cmllcyA9IFtdKSA9PiAoe1xuICBtLCBuLFxuICBlbnRyaWVzOiBlbnRyaWVzLmNvbmNhdChBcnJheShtICogbikuZmlsbCgwKSkuc2xpY2UoMCwgbSAqIG4pXG59KTtcblxuLyoqXG4gKiBHZXQgYW4gaWRlbnRpdHkgbWF0cml4IG9mIHNpemUgblxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIHNpemUgb2YgdGhlIG1hdHJpeFxuICogQHJldHVybiB7bWF0fSBBbiBpZGVudGl0eSBtYXRyaXhcbiAqL1xubWF0LmlkZW50aXR5ID0gbiA9PiBtYXQobiwgbiwgQXJyYXkobiAqIG4pLmZpbGwoMCkubWFwKCh2LCBpKSA9PiArKE1hdGguZmxvb3IoaSAvIG4pID09PSBpICUgbikpKTtcblxuLyoqXG4gKiBHZXQgYW4gZW50cnkgZnJvbSBhIG1hdHJpeFxuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBpIFRoZSByb3cgb2Zmc2V0XG4gKiBAcGFyYW0ge251bWJlcn0gaiBUaGUgY29sdW1uIG9mZnNldFxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgdmFsdWUgYXQgcG9zaXRpb24gKGksIGopIGluIG1hdHJpeCBhXG4gKi9cbm1hdC5nZXQgPSAoYSwgaSwgaikgPT4gYS5lbnRyaWVzWyhqIC0gMSkgKyAoaSAtIDEpICogYS5uXTtcblxuLyoqXG4gKiBTZXQgYW4gZW50cnkgb2YgYSBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcGFyYW0ge251bWJlcn0gaSBUaGUgcm93IG9mZnNldFxuICogQHBhcmFtIHtudW1iZXJ9IGogVGhlIGNvbHVtbiBvZmZzZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSB2IFRoZSB2YWx1ZSB0byBzZXQgaW4gbWF0cml4IGFcbiAqL1xubWF0LnNldCA9IChhLCBpLCBqLCB2KSA9PiB7IGEuZW50cmllc1soaiAtIDEpICsgKGkgLSAxKSAqIGEubl0gPSB2OyB9O1xuXG4vKipcbiAqIEdldCBhIHJvdyBmcm9tIGEgbWF0cml4IGFzIGFuIGFycmF5XG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHtudW1iZXJ9IG0gVGhlIHJvdyBvZmZzZXRcbiAqIEByZXR1cm4ge0FycmF5PG51bWJlcj59IFJvdyBtIGZyb20gbWF0cml4IGFcbiAqL1xubWF0LnJvdyA9IChhLCBtKSA9PiB7XG4gIGNvbnN0IHMgPSAobSAtIDEpICogYS5uO1xuICByZXR1cm4gYS5lbnRyaWVzLnNsaWNlKHMsIHMgKyBhLm4pO1xufTtcblxuLyoqXG4gKiBHZXQgYSBjb2x1bW4gZnJvbSBhIG1hdHJpeCBhcyBhbiBhcnJheVxuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBjb2x1bW4gb2Zmc2V0XG4gKiBAcmV0dXJuIHtBcnJheTxudW1iZXI+fSBDb2x1bW4gbiBmcm9tIG1hdHJpeCBhXG4gKi9cbm1hdC5jb2wgPSAoYSwgbikgPT4gdGltZXMoaSA9PiBtYXQuZ2V0KGEsIChpICsgMSksIG4pLCBhLm0pO1xuXG4vKipcbiAqIEFkZCBtYXRyaWNlc1xuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bWF0fSBiIE1hdHJpeCBiXG4gKiBAcmV0dXJuIHttYXR9IGEgKyBiXG4gKi9cbm1hdC5hZGQgPSAoYSwgYikgPT4gYS5tID09PSBiLm0gJiYgYS5uID09PSBiLm4gJiYgbWF0Lm1hcChhLCAodiwgaSkgPT4gdiArIGIuZW50cmllc1tpXSk7XG5cbi8qKlxuICogU3VidHJhY3QgbWF0cmljZXNcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcGFyYW0ge21hdH0gYiBNYXRyaXggYlxuICogQHJldHVybiB7bWF0fSBhIC0gYlxuICovXG5tYXQuc3ViID0gKGEsIGIpID0+IGEubSA9PT0gYi5tICYmIGEubiA9PT0gYi5uICYmIG1hdC5tYXAoYSwgKHYsIGkpID0+IHYgLSBiLmVudHJpZXNbaV0pO1xuXG4vKipcbiAqIE11bHRpcGx5IG1hdHJpY2VzXG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHttYXR9IGIgTWF0cml4IGJcbiAqIEByZXR1cm4ge21hdHxib29sZWFufSBhYiBvciBmYWxzZSBpZiB0aGUgbWF0cmljZXMgY2Fubm90IGJlIG11bHRpcGxpZWRcbiAqL1xubWF0Lm11bCA9IChhLCBiKSA9PiB7XG4gIGlmIChhLm4gIT09IGIubSkgeyByZXR1cm4gZmFsc2U7IH1cbiAgY29uc3QgcmVzdWx0ID0gbWF0KGEubSwgYi5uKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gYS5tOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMTsgaiA8PSBiLm47IGorKykge1xuICAgICAgbWF0LnNldChyZXN1bHQsIGksIGosIGRvdChtYXQucm93KGEsIGkpLCBtYXQuY29sKGIsIGopKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG4vKipcbiAqIFNjYWxlIGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHtudW1iZXJ9IGIgU2NhbGFyIGJcbiAqIEByZXR1cm4ge21hdH0gYSAqIGJcbiAqL1xubWF0LnNjYWxlID0gKGEsIGIpID0+IG1hdC5tYXAoYSwgdiA9PiB2ICogYik7XG5cbi8qKlxuICogVHJhbnNwb3NlIGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBUaGUgbWF0cml4IHRvIHRyYW5zcG9zZVxuICogQHJldHVybiB7bWF0fSBBIHRyYW5zcG9zZWQgbWF0cml4XG4gKi9cbm1hdC50cmFucyA9IGEgPT4gbWF0KGEubiwgYS5tLCB0aW1lcyhpID0+IG1hdC5jb2woYSwgKGkgKyAxKSksIGEubikuZmxhdCgpKTtcblxuLyoqXG4gKiBHZXQgdGhlIG1pbm9yIG9mIGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBNYXRyaXggYVxuICogQHBhcmFtIHtudW1iZXJ9IGkgVGhlIHJvdyBvZmZzZXRcbiAqIEBwYXJhbSB7bnVtYmVyfSBqIFRoZSBjb2x1bW4gb2Zmc2V0XG4gKiBAcmV0dXJuIHttYXR8Ym9vbGVhbn0gVGhlIChpLCBqKSBtaW5vciBvZiBtYXRyaXggYSBvciBmYWxzZSBpZiB0aGUgbWF0cml4IGlzIG5vdCBzcXVhcmVcbiAqL1xubWF0Lm1pbm9yID0gKGEsIGksIGopID0+IHtcbiAgaWYgKGEubSAhPT0gYS5uKSB7IHJldHVybiBmYWxzZTsgfVxuICBjb25zdCBlbnRyaWVzID0gW107XG4gIGZvciAobGV0IGlpID0gMTsgaWkgPD0gYS5tOyBpaSsrKSB7XG4gICAgaWYgKGlpID09PSBpKSB7IGNvbnRpbnVlOyB9XG4gICAgZm9yIChsZXQgamogPSAxOyBqaiA8PSBhLm47IGpqKyspIHtcbiAgICAgIGlmIChqaiA9PT0gaikgeyBjb250aW51ZTsgfVxuICAgICAgZW50cmllcy5wdXNoKG1hdC5nZXQoYSwgaWksIGpqKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXQoYS5tIC0gMSwgYS5uIC0gMSwgZW50cmllcyk7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgZGV0ZXJtaW5hbnQgb2YgYSBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcmV0dXJuIHtudW1iZXJ8Ym9vbGVhbn0gfGF8IG9yIGZhbHNlIGlmIHRoZSBtYXRyaXggaXMgbm90IHNxdWFyZVxuICovXG5tYXQuZGV0ID0gYSA9PiB7XG4gIGlmIChhLm0gIT09IGEubikgeyByZXR1cm4gZmFsc2U7IH1cbiAgaWYgKGEubSA9PT0gMSkge1xuICAgIHJldHVybiBhLmVudHJpZXNbMF07XG4gIH1cbiAgaWYgKGEubSA9PT0gMikge1xuICAgIHJldHVybiBhLmVudHJpZXNbMF0gKiBhLmVudHJpZXNbM10gLSBhLmVudHJpZXNbMV0gKiBhLmVudHJpZXNbMl07XG4gIH1cbiAgbGV0IHRvdGFsID0gMCwgc2lnbiA9IDE7XG4gIGZvciAobGV0IGogPSAxOyBqIDw9IGEubjsgaisrKSB7XG4gICAgdG90YWwgKz0gc2lnbiAqIGEuZW50cmllc1tqIC0gMV0gKiBtYXQuZGV0KG1hdC5taW5vcihhLCAxLCBqKSk7XG4gICAgc2lnbiAqPSAtMTtcbiAgfVxuICByZXR1cm4gdG90YWw7XG59O1xuXG4vKipcbiAqIE5vcm1hbGlzZSBhIG1hdHJpeFxuICogQHBhcmFtIHttYXR9IGEgVGhlIG1hdHJpeCB0byBub3JtYWxpc2VcbiAqIEByZXR1cm4ge21hdHxib29sZWFufSBeYSBvciBmYWxzZSBpZiB0aGUgbWF0cml4IGlzIG5vdCBzcXVhcmVcbiAqL1xubWF0Lm5vciA9IGEgPT4ge1xuICBpZiAoYS5tICE9PSBhLm4pIHsgcmV0dXJuIGZhbHNlOyB9XG4gIGNvbnN0IGQgPSBtYXQuZGV0KGEpO1xuICByZXR1cm4gbWF0Lm1hcChhLCBpID0+IGkgKiBkKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBhZGp1Z2F0ZSBvZiBhIG1hdHJpeFxuICogQHBhcmFtIHttYXR9IGEgVGhlIG1hdHJpeCBmcm9tIHdoaWNoIHRvIGdldCB0aGUgYWRqdWdhdGVcbiAqIEByZXR1cm4ge21hdH0gVGhlIGFkanVnYXRlIG9mIGFcbiAqL1xubWF0LmFkaiA9IGEgPT4ge1xuICBjb25zdCBtaW5vcnMgPSBtYXQoYS5tLCBhLm4pO1xuICBmb3IgKGxldCBpID0gMTsgaSA8PSBhLm07IGkrKykge1xuICAgIGZvciAobGV0IGogPSAxOyBqIDw9IGEubjsgaisrKSB7XG4gICAgICBtYXQuc2V0KG1pbm9ycywgaSwgaiwgbWF0LmRldChtYXQubWlub3IoYSwgaSwgaikpKTtcbiAgICB9XG4gIH1cbiAgY29uc3QgY29mYWN0b3JzID0gbWF0Lm1hcChtaW5vcnMsICh2LCBpKSA9PiB2ICogKGkgJSAyID8gLTEgOiAxKSk7XG4gIHJldHVybiBtYXQudHJhbnMoY29mYWN0b3JzKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBpbnZlcnNlIG9mIGEgbWF0cml4XG4gKiBAcGFyYW0ge21hdH0gYSBUaGUgbWF0cml4IHRvIGludmVydFxuICogQHJldHVybiB7bWF0fGJvb2xlYW59IGFeLTEgb3IgZmFsc2UgaWYgdGhlIG1hdHJpeCBoYXMgbm8gaW52ZXJzZVxuICovXG5tYXQuaW52ID0gYSA9PiB7XG4gIGlmIChhLm0gIT09IGEubikgeyByZXR1cm4gZmFsc2U7IH1cbiAgY29uc3QgZCA9IG1hdC5kZXQoYSk7XG4gIGlmIChkID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuICByZXR1cm4gbWF0LnNjYWxlKG1hdC5hZGooYSksIDEgLyBkKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdHdvIG1hdHJpY2VzIGFyZSBlcXVhbFxuICogQHBhcmFtIHttYXR9IGEgTWF0cml4IGFcbiAqIEBwYXJhbSB7bWF0fSBiIE1hdHJpeCBiXG4gKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG1hdHJpY2VzIGEgYW5kIGIgYXJlIGlkZW50aWNhbCwgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbm1hdC5lcSA9IChhLCBiKSA9PiBhLm0gPT09IGIubSAmJiBhLm4gPT09IGIubiAmJiBtYXQuc3RyKGEpID09PSBtYXQuc3RyKGIpO1xuXG4vKipcbiAqIENvcHkgYSBtYXRyaXhcbiAqIEBwYXJhbSB7bWF0fSBhIFRoZSBtYXRyaXggdG8gY29weVxuICogQHJldHVybiB7bWF0fSBBIGNvcHkgb2YgbWF0cml4IGFcbiAqL1xubWF0LmNweSA9IGEgPT4gbWF0KGEubSwgYS5uLCBbLi4uYS5lbnRyaWVzXSk7XG5cbi8qKlxuICogQSBmdW5jdGlvbiB0byBjYWxsIG9uIGVhY2ggZW50cnkgb2YgYSBtYXRyaXhcbiAqIEBjYWxsYmFjayBtYXRyaXhNYXBDYWxsYmFja1xuICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIFRoZSBlbnRyeSB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IFRoZSBlbnRyeSBpbmRleFxuICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSBlbnRyaWVzIFRoZSBhcnJheSBvZiBtYXRyaXggZW50cmllc1xuICogQHJldHVybiB7bnVtYmVyfSBUaGUgbWFwcGVkIGVudHJ5XG4gKi9cblxuLyoqXG4gKiBDYWxsIGEgZnVuY3Rpb24gb24gZWFjaCBlbnRyeSBvZiBhIG1hdHJpeCBhbmQgYnVpbGQgYSBuZXcgbWF0cml4IGZyb20gdGhlIHJlc3VsdHNcbiAqIEBwYXJhbSB7bWF0fSBhIE1hdHJpeCBhXG4gKiBAcGFyYW0ge21hdHJpeE1hcENhbGxiYWNrfSBmIFRoZSBmdW5jdGlvbiB0byBjYWxsIG9uIGVhY2ggZW50cnkgb2YgdGhlIG1hdHJpeFxuICogQHJldHVybiB7bWF0fSBNYXRyaXggYSBtYXBwZWQgdGhyb3VnaCBmXG4gKi9cbm1hdC5tYXAgPSAoYSwgZikgPT4gbWF0KGEubSwgYS5uLCBhLmVudHJpZXMubWFwKGYpKTtcblxuLyoqXG4gKiBDb252ZXJ0IGEgbWF0cml4IGludG8gYSBzdHJpbmdcbiAqIEBwYXJhbSB7bWF0fSBhIFRoZSBtYXRyaXggdG8gY29udmVydFxuICogQHBhcmFtIHtzdHJpbmd9IFttcz0nLCAnXSBUaGUgc2VwYXJhdG9yIHN0cmluZyBmb3IgY29sdW1uc1xuICogQHBhcmFtIHtzdHJpbmd9IFtucz0nXFxuJ10gVGhlIHNlcGFyYXRvciBzdHJpbmcgZm9yIHJvd3NcbiAqIEByZXR1cm4ge3N0cmluZ30gQSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG1hdHJpeFxuICovXG5tYXQuc3RyID0gKGEsIG1zID0gJywgJywgbnMgPSAnXFxuJykgPT4gY2h1bmsoYS5lbnRyaWVzLCBhLm4pLm1hcChyID0+IHIuam9pbihtcykpLmpvaW4obnMpO1xuXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSB7IHZlYywgbWF0IH07XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB2ZWNfMSA9IHJlcXVpcmUoXCJAYmFzZW1lbnR1bml2ZXJzZS92ZWNcIik7XG5mdW5jdGlvbiBjbGFtcChhLCBtaW4gPSAwLCBtYXggPSAxKSB7XG4gICAgcmV0dXJuIGEgPCBtaW4gPyBtaW4gOiAoYSA+IG1heCA/IG1heCA6IGEpO1xufVxuY2xhc3MgQ2FtZXJhIHtcbiAgICBjb25zdHJ1Y3Rvcihwb3NpdGlvbiwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLnNpemUgPSAoMCwgdmVjXzEudmVjKSgpO1xuICAgICAgICB0aGlzLmFjdHVhbFBvc2l0aW9uID0gKDAsIHZlY18xLnZlYykoKTtcbiAgICAgICAgdGhpcy50YXJnZXRQb3NpdGlvbiA9ICgwLCB2ZWNfMS52ZWMpKCk7XG4gICAgICAgIHRoaXMuYWN0dWFsU2NhbGUgPSAxO1xuICAgICAgICB0aGlzLnRhcmdldFNjYWxlID0gMTtcbiAgICAgICAgdGhpcy5hY3R1YWxQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgICAgICB0aGlzLnRhcmdldFBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIENhbWVyYS5kZWZhdWx0T3B0aW9ucywgb3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgPyBvcHRpb25zIDoge30pO1xuICAgIH1cbiAgICBnZXQgcG9zaXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhcmdldFBvc2l0aW9uO1xuICAgIH1cbiAgICBzZXQgcG9zaXRpb24odmFsdWUpIHtcbiAgICAgICAgdGhpcy50YXJnZXRQb3NpdGlvbiA9IHZhbHVlO1xuICAgIH1cbiAgICBzZXQgcG9zaXRpb25JbW1lZGlhdGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5hY3R1YWxQb3NpdGlvbiA9IHZhbHVlO1xuICAgICAgICB0aGlzLnRhcmdldFBvc2l0aW9uID0gdmFsdWU7XG4gICAgfVxuICAgIGdldCBzY2FsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0U2NhbGU7XG4gICAgfVxuICAgIHNldCBzY2FsZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnRhcmdldFNjYWxlID0gY2xhbXAodmFsdWUsIHRoaXMub3B0aW9ucy5taW5TY2FsZSwgdGhpcy5vcHRpb25zLm1heFNjYWxlKTtcbiAgICB9XG4gICAgc2V0IHNjYWxlSW1tZWRpYXRlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWN0dWFsU2NhbGUgPSBjbGFtcCh2YWx1ZSwgdGhpcy5vcHRpb25zLm1pblNjYWxlLCB0aGlzLm9wdGlvbnMubWF4U2NhbGUpO1xuICAgICAgICB0aGlzLnRhcmdldFNjYWxlID0gdGhpcy5hY3R1YWxTY2FsZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2V0IHNjcmVlbiBib3VuZHMgYmFzZWQgb24gdGhlIGN1cnJlbnQgY2FtZXJhIHBvc2l0aW9uIGFuZCBzY2FsZVxuICAgICAqL1xuICAgIGdldCBib3VuZHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b3A6IHRoaXMuYWN0dWFsUG9zaXRpb24ueSAtICh0aGlzLnNpemUueSAvIDIpIC8gdGhpcy5hY3R1YWxTY2FsZSxcbiAgICAgICAgICAgIGJvdHRvbTogdGhpcy5hY3R1YWxQb3NpdGlvbi55ICsgKHRoaXMuc2l6ZS55IC8gMikgLyB0aGlzLmFjdHVhbFNjYWxlLFxuICAgICAgICAgICAgbGVmdDogdGhpcy5hY3R1YWxQb3NpdGlvbi54IC0gKHRoaXMuc2l6ZS54IC8gMikgLyB0aGlzLmFjdHVhbFNjYWxlLFxuICAgICAgICAgICAgcmlnaHQ6IHRoaXMuYWN0dWFsUG9zaXRpb24ueCArICh0aGlzLnNpemUueCAvIDIpIC8gdGhpcy5hY3R1YWxTY2FsZVxuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IGEgc2NyZWVuIHBvc2l0aW9uIHRvIGEgd29ybGQgcG9zaXRpb25cbiAgICAgKi9cbiAgICBwb3NpdGlvblRvV29ybGQocG9zaXRpb24pIHtcbiAgICAgICAgY29uc3QgYm91bmRzID0gdGhpcy5ib3VuZHM7XG4gICAgICAgIHJldHVybiB2ZWNfMS52ZWMuYWRkKHsgeDogYm91bmRzLmxlZnQsIHk6IGJvdW5kcy50b3AgfSwgdmVjXzEudmVjLm11bChwb3NpdGlvbiwgMSAvIHRoaXMuc2NhbGUpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlIGNvbnRleHQgdHJhbnNmb3JtcyB0byBtYXRjaCBjYW1lcmEgcG9zaXRpb24gYW5kIHNjYWxlXG4gICAgICovXG4gICAgZHJhdyhjb250ZXh0LCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuc2l6ZSA9ICgwLCB2ZWNfMS52ZWMpKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICBjb25zdCBkID0gdmVjXzEudmVjLnN1Yih0aGlzLmFjdHVhbFBvc2l0aW9uLCB0aGlzLnRhcmdldFBvc2l0aW9uKTtcbiAgICAgICAgdGhpcy5hY3R1YWxQb3NpdGlvbiA9IHZlY18xLnZlYy5hZGQodGhpcy5wb3NpdGlvbiwgdmVjXzEudmVjLm11bChkLCB0aGlzLm9wdGlvbnMubW92ZUVhc2VBbW91bnQpKTtcbiAgICAgICAgY29uc3QgcyA9IGNsYW1wKHRoaXMudGFyZ2V0U2NhbGUsIHRoaXMub3B0aW9ucy5taW5TY2FsZSwgdGhpcy5vcHRpb25zLm1heFNjYWxlKTtcbiAgICAgICAgdGhpcy5hY3R1YWxTY2FsZSA9IHMgKyAodGhpcy5hY3R1YWxTY2FsZSAtIHMpICogdGhpcy5vcHRpb25zLnNjYWxlRWFzZUFtb3VudDtcbiAgICAgICAgY29udGV4dC5zZXRUcmFuc2Zvcm0oMSwgMCwgMCwgMSwgMCwgMCk7XG4gICAgICAgIGNvbnRleHQudHJhbnNsYXRlKCh0aGlzLnNpemUueCAvIDIpIC0gdGhpcy5hY3R1YWxQb3NpdGlvbi54ICogdGhpcy5hY3R1YWxTY2FsZSwgKHRoaXMuc2l6ZS55IC8gMikgLSB0aGlzLmFjdHVhbFBvc2l0aW9uLnkgKiB0aGlzLmFjdHVhbFNjYWxlKTtcbiAgICAgICAgY29udGV4dC5zY2FsZSh0aGlzLmFjdHVhbFNjYWxlLCB0aGlzLmFjdHVhbFNjYWxlKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBDYW1lcmE7XG5DYW1lcmEuZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgYWxsb3dTY2FsZTogdHJ1ZSxcbiAgICBtaW5TY2FsZTogMC41LFxuICAgIG1heFNjYWxlOiA0LFxuICAgIG1vdmVFYXNlQW1vdW50OiAwLjEsXG4gICAgc2NhbGVFYXNlQW1vdW50OiAwLjEsXG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pYVc1a1pYZ3Vhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXBibVJsZUM1MGN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCTEN0RFFVRTBRenRCUVhkRE5VTXNVMEZCVXl4TFFVRkxMRU5CUVVNc1EwRkJVeXhGUVVGRkxFZEJRVWNzUjBGQlJ5eERRVUZETEVWQlFVVXNSMEZCUnl4SFFVRkhMRU5CUVVNN1NVRkRlRU1zVDBGQlR5eERRVUZETEVkQlFVY3NSMEZCUnl4RFFVRkRMRU5CUVVNc1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMRWRCUVVjc1EwRkJReXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRMRU5CUVVNc1EwRkJRenRCUVVNM1F5eERRVUZETzBGQlJVUXNUVUZCY1VJc1RVRkJUVHRKUVhGQ2VrSXNXVUZCYlVJc1VVRkJZU3hGUVVGRkxFOUJRV2RETzFGQlZqRkVMRk5CUVVrc1IwRkJVU3hKUVVGQkxGTkJRVWNzUjBGQlJTeERRVUZETzFGQlJXeENMRzFDUVVGakxFZEJRVkVzU1VGQlFTeFRRVUZITEVkQlFVVXNRMEZCUXp0UlFVVTFRaXh0UWtGQll5eEhRVUZSTEVsQlFVRXNVMEZCUnl4SFFVRkZMRU5CUVVNN1VVRkZOVUlzWjBKQlFWY3NSMEZCVnl4RFFVRkRMRU5CUVVNN1VVRkZlRUlzWjBKQlFWY3NSMEZCVnl4RFFVRkRMRU5CUVVNN1VVRkhPVUlzU1VGQlNTeERRVUZETEdOQlFXTXNSMEZCUnl4UlFVRlJMRU5CUVVNN1VVRkRMMElzU1VGQlNTeERRVUZETEdOQlFXTXNSMEZCUnl4UlFVRlJMRU5CUVVNN1VVRkRMMElzU1VGQlNTeERRVUZETEU5QlFVOHNSMEZCUnl4TlFVRk5MRU5CUVVNc1RVRkJUU3hEUVVNeFFpeEZRVUZGTEVWQlEwWXNUVUZCVFN4RFFVRkRMR05CUVdNc1JVRkRja0lzVDBGQlR5eGhRVUZRTEU5QlFVOHNZMEZCVUN4UFFVRlBMRWRCUVVrc1JVRkJSU3hEUVVOa0xFTkJRVU03U1VGRFNpeERRVUZETzBsQlJVUXNTVUZCVnl4UlFVRlJPMUZCUTJwQ0xFOUJRVThzU1VGQlNTeERRVUZETEdOQlFXTXNRMEZCUXp0SlFVTTNRaXhEUVVGRE8wbEJSVVFzU1VGQlZ5eFJRVUZSTEVOQlFVTXNTMEZCVlR0UlFVTTFRaXhKUVVGSkxFTkJRVU1zWTBGQll5eEhRVUZITEV0QlFVc3NRMEZCUXp0SlFVTTVRaXhEUVVGRE8wbEJSVVFzU1VGQlZ5eHBRa0ZCYVVJc1EwRkJReXhMUVVGVk8xRkJRM0pETEVsQlFVa3NRMEZCUXl4alFVRmpMRWRCUVVjc1MwRkJTeXhEUVVGRE8xRkJRelZDTEVsQlFVa3NRMEZCUXl4alFVRmpMRWRCUVVjc1MwRkJTeXhEUVVGRE8wbEJRemxDTEVOQlFVTTdTVUZGUkN4SlFVRlhMRXRCUVVzN1VVRkRaQ3hQUVVGUExFbEJRVWtzUTBGQlF5eFhRVUZYTEVOQlFVTTdTVUZETVVJc1EwRkJRenRKUVVWRUxFbEJRVmNzUzBGQlN5eERRVUZETEV0QlFXRTdVVUZETlVJc1NVRkJTU3hEUVVGRExGZEJRVmNzUjBGQlJ5eExRVUZMTEVOQlFVTXNTMEZCU3l4RlFVRkZMRWxCUVVrc1EwRkJReXhQUVVGUExFTkJRVU1zVVVGQlVTeEZRVUZGTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1VVRkJVU3hEUVVGRExFTkJRVU03U1VGRGFFWXNRMEZCUXp0SlFVVkVMRWxCUVZjc1kwRkJZeXhEUVVGRExFdEJRV0U3VVVGRGNrTXNTVUZCU1N4RFFVRkRMRmRCUVZjc1IwRkJSeXhMUVVGTExFTkJRVU1zUzBGQlN5eEZRVUZGTEVsQlFVa3NRMEZCUXl4UFFVRlBMRU5CUVVNc1VVRkJVU3hGUVVGRkxFbEJRVWtzUTBGQlF5eFBRVUZQTEVOQlFVTXNVVUZCVVN4RFFVRkRMRU5CUVVNN1VVRkRPVVVzU1VGQlNTeERRVUZETEZkQlFWY3NSMEZCUnl4SlFVRkpMRU5CUVVNc1YwRkJWeXhEUVVGRE8wbEJRM1JETEVOQlFVTTdTVUZGUkRzN1QwRkZSenRKUVVOSUxFbEJRVmNzVFVGQlRUdFJRVU5tTEU5QlFVODdXVUZEVEN4SFFVRkhMRVZCUVVVc1NVRkJTU3hEUVVGRExHTkJRV01zUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1YwRkJWenRaUVVOcVJTeE5RVUZOTEVWQlFVVXNTVUZCU1N4RFFVRkRMR05CUVdNc1EwRkJReXhEUVVGRExFZEJRVWNzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNWMEZCVnp0WlFVTndSU3hKUVVGSkxFVkJRVVVzU1VGQlNTeERRVUZETEdOQlFXTXNRMEZCUXl4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeERRVUZETEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zVjBGQlZ6dFpRVU5zUlN4TFFVRkxMRVZCUVVVc1NVRkJTU3hEUVVGRExHTkJRV01zUTBGQlF5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTXNSMEZCUnl4SlFVRkpMRU5CUVVNc1YwRkJWenRUUVVOd1JTeERRVUZETzBsQlEwb3NRMEZCUXp0SlFVVkVPenRQUVVWSE8wbEJRMGtzWlVGQlpTeERRVUZETEZGQlFXRTdVVUZEYkVNc1RVRkJUU3hOUVVGTkxFZEJRVWNzU1VGQlNTeERRVUZETEUxQlFVMHNRMEZCUXp0UlFVVXpRaXhQUVVGUExGTkJRVWNzUTBGQlF5eEhRVUZITEVOQlExb3NSVUZCUlN4RFFVRkRMRVZCUVVVc1RVRkJUU3hEUVVGRExFbEJRVWtzUlVGQlJTeERRVUZETEVWQlFVVXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSU3hGUVVOcVF5eFRRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEV0QlFVc3NRMEZCUXl4RFFVTnNReXhEUVVGRE8wbEJRMG9zUTBGQlF6dEpRVVZFT3p0UFFVVkhPMGxCUTBrc1NVRkJTU3hEUVVGRExFOUJRV2xETEVWQlFVVXNTMEZCWVN4RlFVRkZMRTFCUVdNN1VVRkRNVVVzU1VGQlNTeERRVUZETEVsQlFVa3NSMEZCUnl4SlFVRkJMRk5CUVVjc1JVRkJReXhMUVVGTExFVkJRVVVzVFVGQlRTeERRVUZETEVOQlFVTTdVVUZGTDBJc1RVRkJUU3hEUVVGRExFZEJRVWNzVTBGQlJ5eERRVUZETEVkQlFVY3NRMEZCUXl4SlFVRkpMRU5CUVVNc1kwRkJZeXhGUVVGRkxFbEJRVWtzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXp0UlFVTTFSQ3hKUVVGSkxFTkJRVU1zWTBGQll5eEhRVUZITEZOQlFVY3NRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hEUVVGRExGRkJRVkVzUlVGQlJTeFRRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRU5CUVVNc1JVRkJSU3hKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEdOQlFXTXNRMEZCUXl4RFFVRkRMRU5CUVVNN1VVRkZkRVlzVFVGQlRTeERRVUZETEVkQlFVY3NTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFVkJRVVVzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4UlFVRlJMRVZCUVVVc1NVRkJTU3hEUVVGRExFOUJRVThzUTBGQlF5eFJRVUZSTEVOQlFVTXNRMEZCUXp0UlFVTm9SaXhKUVVGSkxFTkJRVU1zVjBGQlZ5eEhRVUZITEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFZEJRVWNzUTBGQlF5eERRVUZETEVkQlFVY3NTVUZCU1N4RFFVRkRMRTlCUVU4c1EwRkJReXhsUVVGbExFTkJRVU03VVVGRk4wVXNUMEZCVHl4RFFVRkRMRmxCUVZrc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eEZRVUZGTEVOQlFVTXNSVUZCUlN4RFFVRkRMRVZCUVVVc1EwRkJReXhGUVVGRkxFTkJRVU1zUTBGQlF5eERRVUZETzFGQlEzWkRMRTlCUVU4c1EwRkJReXhUUVVGVExFTkJRMllzUTBGQlF5eEpRVUZKTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU1zUjBGQlJ5eEpRVUZKTEVOQlFVTXNZMEZCWXl4RFFVRkRMRU5CUVVNc1IwRkJSeXhKUVVGSkxFTkJRVU1zVjBGQlZ5eEZRVU0xUkN4RFFVRkRMRWxCUVVrc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF5eEhRVUZITEVOQlFVTXNRMEZCUXl4SFFVRkhMRWxCUVVrc1EwRkJReXhqUVVGakxFTkJRVU1zUTBGQlF5eEhRVUZITEVsQlFVa3NRMEZCUXl4WFFVRlhMRU5CUXpkRUxFTkJRVU03VVVGRFJpeFBRVUZQTEVOQlFVTXNTMEZCU3l4RFFVRkRMRWxCUVVrc1EwRkJReXhYUVVGWExFVkJRVVVzU1VGQlNTeERRVUZETEZkQlFWY3NRMEZCUXl4RFFVRkRPMGxCUTNCRUxFTkJRVU03TzBGQmJrZElMSGxDUVc5SFF6dEJRVzVIZVVJc2NVSkJRV01zUjBGQmEwSTdTVUZEZEVRc1ZVRkJWU3hGUVVGRkxFbEJRVWs3U1VGRGFFSXNVVUZCVVN4RlFVRkZMRWRCUVVjN1NVRkRZaXhSUVVGUkxFVkJRVVVzUTBGQlF6dEpRVU5ZTEdOQlFXTXNSVUZCUlN4SFFVRkhPMGxCUTI1Q0xHVkJRV1VzUlVGQlJTeEhRVUZITzBOQlEzSkNMRU5CUVVNaWZRPT0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=