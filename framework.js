// Example showing us how the framework creates an environment (sandbox) for
// appication runtime, load an application code and passes a sandbox into app
// as a global context and receives exported application interface

// The framework can require core libraries
var fs = require('fs'),
    vm = require('vm');
 //функция которая создаёт обёртку вокруг функции fn таким образом чтобы 
 //она делала именно то, что нам нужно
 function wrapFunction(fnName, fn) {
    return function wrapper() {
      var args = [];
      Array.prototype.push.apply(args, arguments);
      console.log('Call: ' + fnName);
      console.dir(args);
      return fn.apply(undefined, args);
    }
  };
//функция которая поочерёдно берёт каждый метод из оригинального интерфейса
//и записывает её в новый хеш предварительно сделав нужную нам обёртку вокруг неё
  function cloneInterface(newInterface) {
    var clone = {};
    for (var key in newInterface) {
      clone[key] = wrapFunction(key,newInterface[key]);
    }
    return clone;
  };


// Create a hash and turn it into the sandboxed context which will be
// the global context of an application
var context = { module: {}, console: cloneInterface(console),
	 setTimeout: setTimeout,
	 setInterval: setInterval };
context.global = context;
var sandbox = vm.createContext(context);

// Read an application source code from the file
var fileName = './application.js';
fs.readFile(fileName, function(err, src) {
  // We need to handle errors here
  
  // Run an application in sandboxed context
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
  // We can access a link to exported interface from sandbox.module.exports
  // to execute, save to the cache, print to console, etc.
  sandbox.module.exports();
});
