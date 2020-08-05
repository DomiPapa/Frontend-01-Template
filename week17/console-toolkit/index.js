var tty = require("tty");
var ttys = require("ttys");
var rl = require("readline");

var stdin = ttys.stdin;
var stdout = ttys.stdout;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding("utf8");


function getChar() {
  return new Promise((resolve) => {
    stdin.once("data", function (key) {
      resolve(key)
    });
  });
}

function up(n = 1) {
  stdout.write('\033[' + n + 'A')
}

function down(n = 1) {
  stdout.write('\033[' + n + 'B')
}

function right(n = 1) {
  stdout.write('\033[' + n + 'C')
}

function left(n = 1) {
  stdout.write('\033[' + n + 'D')
}

async function select(choices) {
  let selected = 0
  for(let i = 0; i < choices.length; i++){
    let choice = choices[i]
    if(i === selected){
      stdout.write("[x] " + choice + "\n")
    }else{
      stdout.write("[ ] " + choice + "\n")
    }
  }
  up(choices.length);
  right();  
  while(true) {
    let char = await getChar();
    if(char === "\u0003"){
      process.exit();
      break;
    }
    if(char === "w" && selected > 0){
      stdout.write(" ")
      left()
      selected --;
      up();
      stdout.write("x")
      left();
    }
    if(char === "s" && selected < choices.length - 1){
      stdout.write(" ")
      left()
      selected ++;
      down();
      stdout.write("x")
      left()
    }
    if(char === "\r"){
      down(choices.length - selected)
      left()
      return choices[selected];
    }
    // console.log(char.split(""),map( c => c.charCodeAt(0)))
  }
   
}


void async function () {
  stdout.write("which framework do you want to use?\n")
  let answer = await select(["vue","react","angular"])
  stdout.write("you selected " + answer + "\b")
  process.exit()
}();




/*
var tty = require("tty");
var ttys = require("ttys");
const readline = require("readline");

var stdin = ttys.stdin;
var stdout = ttys.stdout;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function ask(question) {
  return new Promise((res, rej) => {
    rl.question(question, (answer) => {
      res(answer)
    });
  });
}

void async function () {
  console.log(await ask("Your project name?"))
}();
*/

/*
stdout.write("Hello  world!\n");
stdout.write("\033[1A");
stdout.write("bomb");
*/
