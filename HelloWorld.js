var p = document.createElement('p');
var hello = "Hello";
var world = "World!";
p.textContent = hello + " " + world;
document.body.appendChild(p);
function add(arg1) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var total = arg1;
    for (var i = 0; i < args.length; i++) {
        total += args[i];
    }
    return total;
}
function substract(arg1) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var total = arg1;
    for (var i = 0; i < args.length; i++) {
        total -= args[i];
    }
    return total;
}
function multiply(arg1) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var total = arg1;
    for (var i = 0; i < args.length; i++) {
        total = total * args[i];
    }
    return total;
}
// Divides the numbers
function divide(arg1, arg2) {
    return arg1 / arg2;
}
