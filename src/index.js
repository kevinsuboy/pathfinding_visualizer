const NavBar = require("./lib/util/navbar");
const {Board} = require("./lib/util/board")

document.addEventListener("DOMContentLoaded", () => {
    debugger
    NavBar.watchAll();
    const board = new Board([25,50]);
    // BoardUtil.execAll([2,5]);
})