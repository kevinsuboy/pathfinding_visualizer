const NavBar = require("./lib/util/navbar");
const BoardUtil = require("./lib/util/board_util")

document.addEventListener("DOMContentLoaded", () => {
    // debugger
    NavBar.watchAll();
    BoardUtil.execAll([25,50]);
    // BoardUtil.execAll([2,5]);
})