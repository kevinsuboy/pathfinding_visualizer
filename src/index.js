const NavBar = require("./lib/util/navbar");
const {Board} = require("./lib/util/board")
const {BFS} = require("./lib/algos/bfs")
const {gridAnimations} = require("./lib/animations/gridAnimations")

document.addEventListener("DOMContentLoaded", () => {
    NavBar.watchAll();
    // const size = [25, 50];
    const size = [2, 1];
    const algos = {};
    algos["bfs"] = BFS;
    const board = new Board(size,algos, gridAnimations);
})