const NavBar = require("./lib/util/navbar");
const {Game} = require("./lib/util/game")
const {BFS} = require("./lib/algos/bfs")
const {gridAnimations} = require("./lib/animations/gridAnimations")

document.addEventListener("DOMContentLoaded", () => {
    NavBar.watchAll();
    window.timeouts = [];
    // const size = [25, 50];
    const size = "normal";
    // const size = [5, 5];
    const algos = {};
    algos["bfs"] = BFS;
    const board = new Game(size,algos, gridAnimations);
})