const NavBar = require("./lib/util/navbar");
const {Game} = require("./lib/util/game")
const {BFS} = require("./lib/algos/bfs")
const {DFS} = require("./lib/algos/dfs")
const { Dijkstra } = require("./lib/algos/dijkstra");
const {gridAnimations} = require("./lib/animations/gridAnimations");

document.addEventListener("DOMContentLoaded", () => {
    NavBar.watchAll();
    window.timeouts = [];
    // const size = [25, 50];
    const denseTd = document.getElementById("dense").classList.contains("selected");
    const sparseTd = document.getElementById("sparse").classList.contains("selected");
    const normalTd = document.getElementById("normal").classList.contains("selected");
    const size = denseTd ? "dense" : sparseTd ? "sparse" : "normal";
    // const size = [5, 5];
    const algos = {};
    algos["bfs"] = BFS;
    algos["dfs"] = DFS;
    algos["dijkstra"] = Dijkstra;
    const board = new Game(size,algos, gridAnimations);
})