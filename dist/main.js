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

/***/ "./src/lib/util/board.js":
/*!*******************************!*\
  !*** ./src/lib/util/board.js ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/*! CommonJS bailout: module.exports is used directly at 125:0-14 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {generateInt} = __webpack_require__(/*! ./mathUtil */ \"./src/lib/util/mathUtil.js\");\n\nclass Board {\n    constructor(size){\n        this.size = size;\n        this.browserWidth = 2000;\n        this.mainGrid = this.genBoard(size[0],size[1]);\n        this.dropStartStop(this.mainGrid);\n        this.allEventListeners();\n    }\n    genBoard(h, w) {\n        const mainGrid = document.getElementById(\"mainGrid\");\n        mainGrid.innerHTML = '';\n        const table = document.createElement(\"table\");\n        table.id = \"board\";\n        const tbody = document.createElement(\"tbody\");\n        table.appendChild(tbody);\n        for(let i=0;i<h;i++){\n            let trow = document.createElement(\"tr\");\n            trow.id = `row_${i}`;\n            for(let j=0;j<w;j++){\n                let td = document.createElement(\"td\");\n                td.id = `${i}-${j}`;\n                td.classList.add(\"unvisited\")\n                trow.appendChild(td);\n            }\n            tbody.appendChild(trow);\n        }\n        mainGrid.appendChild(table);\n        return mainGrid;\n    }\n    allEventListeners() {\n        this.watchWall(this.mainGrid);\n        this.watchClearWall();\n        this.watchStartStop(this.mainGrid);\n    }\n    isStartStop(e, start, stop) {\n        // debugger\n        return (start ? start.contains(e.target):false) || (stop ? stop.contains(e.target):false);\n    }\n    toggleWall(e) {\n        const start = document.getElementsByClassName(\"start\")[0];\n        const stop = document.getElementsByClassName(\"stop\")[0];\n        const notSt = !this.isStartStop(e, start, stop);\n        if(e.type === \"mousedown\" && notSt) e.currentTarget.classList.add(\"mouse_wall\");\n        if(e.target.tagName === \"TD\" && e.currentTarget.classList.contains(\"mouse_wall\")) {\n            if(e.target.classList.contains(\"wall\")){\n                e.target.classList.remove(\"wall\");\n                e.target.classList.add(\"unvisited\");\n            } else if(notSt){\n                e.target.classList.add(\"wall\");\n                e.target.classList.remove(\"unvisited\");\n                e.target.classList.remove(\"visited\");\n            }\n        }\n    }\n    watchClearWall() {\n        const button = document.getElementById(\"clearWalls\");\n        button.addEventListener(\"click\",(e) => this.clearWalls(e))\n    }\n    clearWalls(e) {\n        const walls = document.getElementsByClassName(\"wall\");\n        while(walls.length > 0){\n            walls[0].classList.add(\"unvisited\");\n            walls[0].classList.remove(\"wall\");\n        }\n    }\n    watchWall(grid) {\n        grid.addEventListener(\"mousedown\",(e) => this.toggleWall(e))\n        grid.addEventListener(\"mouseover\",(e) => this.toggleWall(e))\n        grid.addEventListener(\"mouseup\", (e) => { e.currentTarget.classList.remove(\"mouse_wall\")})\n    }\n    dropStartStop(){\n        const [h, w] = this.size;\n        let starttd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`);\n        while(!starttd.classList.contains(\"unvisited\")) \n            starttd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`);\n        let stoptd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`);\n        while(!starttd.classList.contains(\"unvisited\")) \n            stoptd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`);\n        //\n        this.addStartStop(starttd);\n        this.addStartStop(stoptd,\"stop\");\n    }\n    watchStartStop(grid){\n        grid.addEventListener(\"mousedown\", (e) => this.moveStartStop(e))\n        grid.addEventListener(\"mouseover\", (e) => this.moveStartStop(e))\n        grid.addEventListener(\"mouseup\", (e) => {\n            e.currentTarget.classList.remove(\"mouse_start\");\n            e.currentTarget.classList.remove(\"mouse_stop\");\n        })\n    }\n    moveStartStop(e) {\n        const start = document.getElementsByClassName(\"start\")[0];\n        const stop = document.getElementsByClassName(\"stop\")[0];\n        const isSt = this.isStartStop(e, start, stop);\n        debugger\n        if (e.type === \"mousedown\" && isSt){\n            if (start.contains(e.target)) e.currentTarget.classList.add(\"mouse_start\");\n            if (stop.contains(e.target)) e.currentTarget.classList.add(\"mouse_stop\");\n        }\n        if (e.currentTarget.classList.contains(\"mouse_start\")) {\n            this.removeStartStop(start);\n            this.addStartStop(e.target)\n        }\n        if (e.currentTarget.classList.contains(\"mouse_stop\")) {\n            this.removeStartStop(stop,\"stop\");\n            this.addStartStop(e.target,\"stop\")\n        }\n    }\n    addStartStop(start, str = \"start\"){\n        start.className = ''; start.classList.add(str);\n        start.innerHTML = str === \"start\" ? '<i class=\"fas fa-angle-right\"></i>' : '<i class=\"far fa-dot-circle\"></i>'\n    }\n    removeStartStop(start, str = \"start\"){\n        // debugger\n        if(start){\n            start.innerHTML = '';\n            start.classList.add(\"unvisited\"); start.classList.remove(str);\n        }\n    }\n}\n\n\nmodule.exports = {\n    Board\n}\n\n//# sourceURL=webpack://pathfinding_visualizer/./src/lib/util/board.js?");

/***/ }),

/***/ "./src/lib/util/mathUtil.js":
/*!**********************************!*\
  !*** ./src/lib/util/mathUtil.js ***!
  \**********************************/
/*! namespace exports */
/*! export generateInt [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"generateInt\": () => /* binding */ generateInt\n/* harmony export */ });\nconst generateInt = (int) => Math.floor(Math.random() * int); \n\n//# sourceURL=webpack://pathfinding_visualizer/./src/lib/util/mathUtil.js?");

/***/ }),

/***/ "./src/lib/util/navbar.js":
/*!********************************!*\
  !*** ./src/lib/util/navbar.js ***!
  \********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("const clearDropdown = () => {\n    const clicked = document.getElementsByClassName(\"clicked\");\n    while (clicked.length > 0) {\n        for (let i of clicked[0].getElementsByClassName(\"dropdown-content\")) i.classList.remove(\"show\");\n        clicked[0].classList.remove(\"clicked\");\n    }\n}\n\nconst toggleDropdown = (e) => {\n    const isClicked  = e.currentTarget.classList.contains(\"clicked\");\n    clearDropdown();\n    if(!isClicked){\n        e.currentTarget.classList.add(\"clicked\");\n        for(let i of e.currentTarget.getElementsByClassName(\"dropdown-content\")) i.classList.add(\"show\");\n    }\n}\nconst watchDropdown = () => {\n    const dropdown = document.getElementsByClassName(\"dropdown\");\n    for(let d of dropdown)\n        d.addEventListener(\"click\", (e) => toggleDropdown(e))\n        document.addEventListener(\"click\", (e) => {\n        if (!document.getElementById(\"global-nav\").contains(e.target)){\n            clearDropdown();\n            // debugger\n        }\n    })\n}\n\nconst watchSpeed = () => {\n    \n}\n\nconst watchAll = () => {\n    watchDropdown();\n    watchSpeed();\n}\n\nmodule.exports = {\n    watchAll\n}\n\n//# sourceURL=webpack://pathfinding_visualizer/./src/lib/util/navbar.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
eval("const NavBar = __webpack_require__(/*! ./lib/util/navbar */ \"./src/lib/util/navbar.js\");\nconst {Board} = __webpack_require__(/*! ./lib/util/board */ \"./src/lib/util/board.js\")\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    NavBar.watchAll();\n    const board = new Board([25,50]);\n})\n\n//# sourceURL=webpack://pathfinding_visualizer/./src/index.js?");
})();

/******/ })()
;