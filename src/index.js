const NavBar = require("./lib/util/navbar");
const {Board} = require("./lib/util/board")

document.addEventListener("DOMContentLoaded", () => {
    NavBar.watchAll();
    // const board = new Board([5,5]);
    const board = new Board([25,50]);
})