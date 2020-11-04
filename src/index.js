const NavBar = require("./lib/util/navbar");
const {Board} = require("./lib/util/board")
const {BFS} = require("./lib/algos/bfs")
const {gridAnimations} = require("./lib/animations/gridAnimations")

document.addEventListener("DOMContentLoaded", () => {
    NavBar.watchAll();
    // const board = new Board([5,5]);
    const board = new Board([25,50]);
    const bfs = new BFS(board.size);
    const nodesToAnimate = [];
    bfs.execute(nodesToAnimate);
    debugger
    const gridA = new gridAnimations("fast", nodesToAnimate);
    gridA.animateNodes("queued");
    setTimeout(() => gridA.animateNodes("current"),3*gridA.speed);
    setTimeout(() => gridA.animateNodes("visited"),4*gridA.speed);
})