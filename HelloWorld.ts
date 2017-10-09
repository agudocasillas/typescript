var p = document.createElement('p');
var hello: string = "Hello";
var world: string = "World!";
p.textContent = hello + " " + world;

document.body.appendChild(p);

function add(arg1: number, ...args: number[]): number;
function add(arg1: string, ...args: string[]): string;
function add(arg1: any, ...args: any[]): any{
  var total = arg1;
  for(var i = 0; i < args.length; i++){
    total += args[i];
  }
  return total;
}

function substract(arg1: number, ...args: number[]): number{
  var total =  arg1;
  for(var i = 0; i < args.length; i++) {
    total -= args[i];
  }
  return total;
}

function multiply(arg1: number, ...args: number[]): number{
  var total = arg1;
  for(var i = 0; i < args.length; i++){
    total = total * args[i];
  }
  return total;
}

// Divides the numbers
function divide(arg1: number,  arg2: number): number{
  return arg1 / arg2;
}

interface IAdder {
  add(arg1: number, ...args: number[]): number;
}

interface ISubstractor {
  substract(arg1: number, ...args: number[]): number;
}

interface ICalculator extends IAdder, ISubstractor {
  multiply(arg1: number, ...args: number[]): number;
  divide(arg1: number, arg2: number): number;
}
