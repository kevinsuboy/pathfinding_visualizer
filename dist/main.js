/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/util/board_util.js":
/*!************************************!*\
  !*** ./src/lib/util/board_util.js ***!
  \************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("\nconst genBoard = (h, w) => {\n    const mainGrid = document.getElementById(\"mainGrid\");\n    mainGrid.innerHTML = '';\n    const table = document.createElement(\"table\");\n    table.id = \"board\";\n    const tbody = document.createElement(\"tbody\");\n    table.appendChild(tbody);\n    for(let i=0;i<h;i++){\n        let trow = document.createElement(\"tr\");\n        trow.id = `row_${i}`;\n        for(let j=0;j<w;j++){\n            let td = document.createElement(\"td\");\n            td.id = `${i}-${j}`;\n            td.classList.add(\"unvisited\")\n            trow.appendChild(td);\n        }\n        tbody.appendChild(trow);\n    }\n    mainGrid.appendChild(table);\n    return mainGrid;\n}\nconst toggleWall = (e) => {\n    console.log(e.type)\n    if(e.type === \"mousedown\") e.currentTarget.classList.add(\"mousedown\");\n    if(e.target.tagName === \"TD\" && e.currentTarget.classList.contains(\"mousedown\")) {\n        if(e.target.classList.contains(\"wall\")){\n            e.target.classList.remove(\"wall\");\n            e.target.classList.add(\"unvisited\");\n        } else {\n            e.target.classList.add(\"wall\");\n            e.target.classList.remove(\"unvisited\");\n            e.target.classList.remove(\"visited\");\n        }\n    }\n}\nconst watchWall = (grid) => {\n    // for(let el of grid){\n        debugger\n        grid.addEventListener(\"mousedown\",(e) => toggleWall(e))\n        grid.addEventListener(\"mouseover\",(e) => toggleWall(e))\n        grid.addEventListener(\"mouseup\", (e) => { isClicked = false; e.currentTarget.classList.remove(\"mousedown\")})\n    // }\n}\nconst execAll = (size) => {\n    watchWall(genBoard(size[0], size[1]));\n}\nmodule.exports = {\n    execAll\n}\n\n//# sourceURL=webpack://pathfinding_visualizer/./src/lib/util/board_util.js?");

/***/ }),

/***/ "./src/lib/util/navbar.js":
/*!********************************!*\
  !*** ./src/lib/util/navbar.js ***!
  \********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("const toggleDropdown = (e) => {\n    const isClicked  = e.currentTarget.classList.contains(\"clicked\");\n    const clicked = document.getElementsByClassName(\"clicked\");\n    for(let c of clicked){\n        c.classList.remove(\"clicked\");\n        for (let i of c.getElementsByClassName(\"dropdown-content\")) i.classList.remove(\"show\");\n    }\n    if(!isClicked){\n        e.currentTarget.classList.add(\"clicked\");\n        for(let i of e.currentTarget.getElementsByClassName(\"dropdown-content\")) i.classList.add(\"show\");\n    }\n}\nconst watchDropdown = () => {\n    const dropdown = document.getElementsByClassName(\"dropdown\");\n    for(let d of dropdown)\n        d.addEventListener(\"click\", (e) => toggleDropdown(e))\n}\n\nconst watchSpeed = () => {\n    \n}\n\nconst watchAll = () => {\n    watchDropdown();\n    watchSpeed();\n}\n\nmodule.exports = {\n    watchAll\n}\n\n//# sourceURL=webpack://pathfinding_visualizer/./src/lib/util/navbar.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
eval("const NavBar = __webpack_require__(/*! ./lib/util/navbar */ \"./src/lib/util/navbar.js\");\nconst BoardUtil = __webpack_require__(/*! ./lib/util/board_util */ \"./src/lib/util/board_util.js\")\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    // debugger\n    NavBar.watchAll();\n    BoardUtil.execAll([25,50]);\n    // BoardUtil.execAll([2,5]);\n})\n\n//# sourceURL=webpack://pathfinding_visualizer/./src/index.js?");
})();

/******/ })()
;