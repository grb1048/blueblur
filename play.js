
const name = "student";
const game = "auto-" + name + "-" + roll(999);

function roll(xx) {
  return Math.floor(xx * Math.random());
}

const alphabet = new Set("abcdefghijklmnopqrstuvwxyz".split(''));

function onView(view) {
  const guesses = new Set(view.guesses);
  const moves = alphabet.difference(guesses);

  console.log("alphabet", alphabet);
  console.log("puzzle:", view.puzzle);
  console.log("guesses:", guesses);
  console.log("moves:", moves);
}


let { Socket } = require('phoenix-channels');
let socket = new Socket("wss://words.homework.quest/socket");

socket.connect();

let channel = socket.channel("game:" + game, {name});

channel.join()
  .receive("ok", (msg) => console.log("Connected to game:", msg.game))
  .receive("error", (msg) => console.log("Error:", msg));

channel.on("view", onView);
