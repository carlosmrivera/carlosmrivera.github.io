// // ES5 Global Constants
// var PI = 3.14;
// PI = 42; // stop me from doing this!

const PI = 3.14
PI = 42 //this will throw an error


// Quiz
// What is the difference between var and let?
// var has a function scope and let has block scope. Both can be reassigned. var can be redeclared but let dont allow that. var variables are hoisted.

// What is the difference between var and const?
// var has a function scope and const has block scope. var can be reassigned and redeclared. const variables aren't hoisted. const scope is the same than let.

// What is the difference between let and const?
//let can be reassigned but no redeclared. const cant be reassigned nor redeclared. both have block scope. 

// What is hoisting?

// It's how JS works. Variables declared with var and functions are "popped" to the top of the scope even before it initialization.