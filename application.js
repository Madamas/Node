// File contains a small piece of the source to demonstrate main module
// of a sample application to be executed in the sandboxed context by
// another pice of code from `framework.js`. Read README.md for tasks.

console.log('From application global context');

module.exports = function() {
	// Print from the exported function context
  console.log('From application exported function');
};
