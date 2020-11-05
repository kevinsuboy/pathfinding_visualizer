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

/***/ "./src/lib/algos/bfs.js":
/*!******************************!*\
  !*** ./src/lib/algos/bfs.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("class BFS {\n    constructor(gridSize){\n        this.grid = new Array(gridSize[0]);\n        for (let i = 0; i < this.grid.length; i++) {\n            this.grid[i] = new Array(gridSize[1]);\n            for(let j=0; j<gridSize[1];j++)\n                this.grid[i][j] = 0;\n        }\n        const stop = document.getElementsByClassName(\"stop\")[0].id.split(\"-\").map(el => parseInt(el));\n        this.grid[stop[0]][stop[1]] = 3;\n        const walls = document.getElementsByClassName(\"wall\");\n        // debugger\n        for(let w of walls){\n            let [x,y] = w.id.split(\"-\").map(el => parseInt(el));\n            this.grid[x][y] = -1;\n        }\n        // debugger\n        this.dir = [\n            [ 0, 1],\n            [ 1, 0],\n            [-1, 0],\n            [ 0,-1]\n        ];\n    }\n    execute(nodesToAnimate, instant){\n        const instantvisited = [];\n        let cur = document.getElementsByClassName(`start`)[0].id.split(\"-\").map(el=>parseInt(el));\n        let newPos = undefined;\n        const queue = [cur];\n        \n        while(queue.length > 0){\n            cur = queue.shift();\n            // debugger\n            if (instant) instantvisited.push(cur);\n            else nodesToAnimate.push(cur)\n            if (this.getSquare(cur) === 5){\n                return true; // if done, exit\n            }\n            this.grid[cur[0]][cur[1]] = 1;\n            for(let d of this.dir){\n                newPos = this.move(cur, d);\n                // debugger\n                if(this.validMove(newPos)){\n                    this.grid[newPos[0]][newPos[1]] += 2;\n                    queue.push(newPos);\n                }\n            }\n            // debugger\n        }\n    }\n    move(pos, d){\n        return [pos[0]+d[0],pos[1]+d[1]];\n    }\n    getSquare(pos){\n        // debugger\n        return this.grid[pos[0]][pos[1]]\n    }\n    validMove(pos){\n        // debugger\n        if (pos[0] >= 0 && pos[0] < this.grid.length &&\n                pos[1] >= 0 && pos[1] < this.grid[0].length)\n            return this.getSquare(pos) === 0 || this.getSquare(pos) === 3;\n        return false;\n    }\n}\n\nmodule.exports = {\n    BFS\n}\n\n//# sourceURL=webpack://pathfinding_visualizer/./src/lib/algos/bfs.js?");

/***/ }),

/***/ "./src/lib/animations/gridAnimations.js":
/*!**********************************************!*\
  !*** ./src/lib/animations/gridAnimations.js ***!
  \**********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("class gridAnimations {\n    constructor(speed, nodesToAnimate){\n        this.nodesToAnimate = nodesToAnimate;\n        this.speed = speed === \"fast\" ? 0 :\n                    speed === \"average\" ? 10 : 50;\n    }\n    animateNodes(type){\n        // for(let i=0;i<this.nodesToAnimate.length;i++)\n        //     this.animateNode(i);\n        //     // setTimeout(()=>this.animateNode(i), i*this.speed);\n        // debugger\n        setTimeout(()=>this.animateNode(0,type), this.speed);\n    }\n    animateNode(idx,type){\n        if(idx >= this.nodesToAnimate.length) return;\n        let cur = this.nodesToAnimate[idx];\n        cur = document.getElementById(`${cur[0]}-${cur[1]}`);\n        // debugger\n        switch(type){\n            case \"current\":\n                cur.classList.remove(\"unvisited\");\n                cur.classList.add(\"current\");\n                break;\n            case \"queued\":\n                cur.classList.remove(\"current\");\n                cur.classList.add(\"queued\");\n                break;\n            case \"visited\":\n                cur.classList.remove(\"queued\");\n                cur.classList.add(\"visited\");\n                break;\n            default:\n                break;\n        }\n        setTimeout(()=>this.animateNode(idx+1,type),this.speed);\n    }\n}\n\nmodule.exports = {\n    gridAnimations\n}\n\n//# sourceURL=webpack://pathfinding_visualizer/./src/lib/animations/gridAnimations.js?");

/***/ }),

/***/ "./src/lib/util/board.js":
/*!*******************************!*\
  !*** ./src/lib/util/board.js ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const {generateInt} = __webpack_require__(/*! ./mathUtil */ \"./src/lib/util/mathUtil.js\");\nconst {watchSpeed} = __webpack_require__(/*! ./navbar */ \"./src/lib/util/navbar.js\");\n\nclass Board {\n    constructor(size, algoList, gridAnimations){\n        this.size = size;\n        this.browserWidth = 2000;\n        this.speed = \"fast\";\n        this.algo = \"\";\n        this.algoList = algoList;\n        this.gridAnimations = gridAnimations;\n        this.mainGrid = this.genBoard(size[0],size[1]);\n        this.initStartStop();\n        this.allEventListeners();\n    }\n    genBoard(h, w) {\n        const mainGrid = document.getElementById(\"mainGrid\");\n        mainGrid.innerHTML = '';\n        const table = document.createElement(\"table\");\n        table.id = \"board\";\n        const tbody = document.createElement(\"tbody\");\n        table.appendChild(tbody);\n        for(let i=0;i<h;i++){\n            let trow = document.createElement(\"tr\");\n            trow.id = `row_${i}`;\n            for(let j=0;j<w;j++){\n                let td = document.createElement(\"td\");\n                td.id = `${i}-${j}`;\n                td.classList.add(\"unvisited\")\n                trow.appendChild(td);\n            }\n            tbody.appendChild(trow);\n        }\n        mainGrid.appendChild(table);\n        return mainGrid;\n    }\n    allEventListeners() {\n        this.watchWall(this.mainGrid);\n        this.watchClearWall();\n        this.watchStartStop(this.mainGrid);\n        this.watchVisualize();\n    }\n    getSpeed() {\n        const fast = document.getElementById(\"speed-fast\").classList.contains(\"selected\");\n        const average = document.getElementById(\"speed-average\").classList.contains(\"selected\");\n        const slow = document.getElementById(\"speed-slow\").classList.contains(\"selected\");\n        if (fast) this.speed = \"fast\";\n        if (average) this.speed = \"average\";\n        if (slow) this.speed = \"slow\";\n    }\n    getAlgo() {\n        const bfs = document.getElementById(\"bfs\").classList.contains(\"selected\");\n        if (bfs) this.algo = \"bfs\";\n\n    }\n    watchVisualize() {\n        document.getElementById(\"startButtonStart\").addEventListener(\"click\",e=>{\n            this.getSpeed();\n            this.getAlgo();\n            const nodesToAnimate = [];\n            const algo = new this.algoList[this.algo](this.size)\n            debugger\n            algo.execute(nodesToAnimate);\n            const gridA = new this.gridAnimations(this.speed, nodesToAnimate);\n            // gridA.animateNodes(\"queued\");\n            gridA.animateNodes(\"current\");\n            // setTimeout(() => gridA.animateNodes(\"current\"),3*gridA.speed);\n            setTimeout(() => gridA.animateNodes(\"visited\"), 4 * gridA.speed);\n        })\n    }\n    isStartStop(e, start, stop) {\n        // debugger\n        return (start ? start.contains(e.target):false) || (stop ? stop.contains(e.target):false);\n    }\n    toggleWall(e) {\n        debugger\n        const start = document.getElementsByClassName(\"start\")[0];\n        const stop = document.getElementsByClassName(\"stop\")[0];\n        const notSt = !this.isStartStop(e, start, stop);\n        if(e.type === \"mousedown\" && notSt) e.currentTarget.classList.add(\"mouse_wall\");\n        if(e.target.tagName === \"TD\" && e.currentTarget.classList.contains(\"mouse_wall\")) {\n            if(e.target.classList.contains(\"wall\")){\n                e.target.classList.remove(\"wall\");\n                e.target.classList.add(\"unvisited\");\n            } else if(notSt){\n                e.target.classList.add(\"wall\");\n                e.target.classList.remove(\"unvisited\");\n                e.target.classList.remove(\"visited\");\n            }\n        }\n    }\n    watchClearWall() {\n        const button = document.getElementById(\"clearWalls\");\n        button.addEventListener(\"click\",(e) => this.clearWalls(e))\n    }\n    clearWalls(e) {\n        const walls = document.getElementsByClassName(\"wall\");\n        while(walls.length > 0){\n            walls[0].classList.add(\"unvisited\");\n            walls[0].classList.remove(\"wall\");\n        }\n    }\n    watchWall(grid) {\n        grid.addEventListener(\"mousedown\",(e) => this.toggleWall(e))\n        grid.addEventListener(\"mouseover\",(e) => this.toggleWall(e))\n        grid.addEventListener(\"mouseup\", (e) => { e.currentTarget.classList.remove(\"mouse_wall\")})\n    }\n    initStartStop(){\n        const [h, w] = this.size;\n        let starttd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`); if (starttd.classList.length === 0) return;\n        while(!starttd.classList.contains(\"unvisited\")) \n            starttd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`);\n        let stoptd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`); if (stoptd.classList.length === 0) return;\n        while(!starttd.classList.contains(\"unvisited\")) \n            stoptd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`);\n        //\n        this.addStartStop(starttd);\n        this.addStartStop(stoptd,\"stop\");\n    }\n    watchStartStop(grid){\n        grid.addEventListener(\"mousedown\", (e) => this.moveStartStop(e))\n        grid.addEventListener(\"mouseover\", (e) => this.moveStartStop(e))\n        grid.addEventListener(\"mouseup\", (e) => {\n            e.currentTarget.classList.remove(\"mouse_start\");\n            e.currentTarget.classList.remove(\"mouse_stop\");\n        })\n    }\n    moveStartStop(e) {\n        const start = document.getElementsByClassName(\"start\")[0];\n        const stop = document.getElementsByClassName(\"stop\")[0];\n        const isSt = this.isStartStop(e, start, stop);\n        // debugger\n        if (e.type === \"mousedown\" && isSt){\n            if (start.contains(e.target)) e.currentTarget.classList.add(\"mouse_start\");\n            if (stop.contains(e.target)) e.currentTarget.classList.add(\"mouse_stop\");\n        }\n        if (e.target.tagName === \"TD\" && e.currentTarget.classList.contains(\"mouse_start\")) {\n            this.removeStartStop(start);\n            this.addStartStop(e.target)\n        }\n        if (e.target.tagName === \"TD\" && e.currentTarget.classList.contains(\"mouse_stop\")) {\n            this.removeStartStop(stop,\"stop\");\n            this.addStartStop(e.target,\"stop\")\n        }\n    }\n    addStartStop(start, str = \"start\"){\n        // start.className = '';\n        start.classList.add(str);\n        start.innerHTML = str === \"start\" ? '<i class=\"fas fa-angle-right\"></i>' : '<i class=\"far fa-dot-circle\"></i>'\n    }\n    removeStartStop(start, str = \"start\"){\n        // debugger\n        if(start){\n            start.innerHTML = '';\n            start.classList.add(\"unvisited\"); start.classList.remove(str);\n        }\n    }\n}\n\n\nmodule.exports = {\n    Board\n}\n\n//# sourceURL=webpack://pathfinding_visualizer/./src/lib/util/board.js?");

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
/*! CommonJS bailout: module.exports is used directly at 70:0-14 */
/***/ ((module) => {

eval("const clearDropdown = () => {\n    const clicked = document.getElementsByClassName(\"clicked\");\n    while (clicked.length > 0) {\n        for (let i of clicked[0].getElementsByClassName(\"dropdown-content\")) i.classList.remove(\"show\");\n        clicked[0].classList.remove(\"clicked\");\n    }\n}\n\nconst toggleDropdown = (e) => {\n    const isClicked  = e.currentTarget.classList.contains(\"clicked\");\n    clearDropdown();\n    if(!isClicked){\n        e.currentTarget.classList.add(\"clicked\");\n        for(let i of e.currentTarget.getElementsByClassName(\"dropdown-content\")) i.classList.add(\"show\");\n    }\n}\nconst watchDropdown = () => {\n    const dropdown = document.getElementsByClassName(\"dropdown\");\n    for(let d of dropdown)\n        d.addEventListener(\"click\", (e) => toggleDropdown(e))\n    document.addEventListener(\"click\", (e) => {\n    if (!document.getElementById(\"global-nav\").contains(e.target)){\n        clearDropdown();\n        // debugger\n    }\n    })\n}\n\nconst watchAlgo = () => {\n    const algo = document.getElementById(\"algo\");\n    const bfs = document.getElementById(\"bfs\");\n    algo.addEventListener(\"click\", e => {\n        const bfsT = bfs.contains(e.target);\n        debugger\n        if (bfsT) { bfs.classList.remove(\"selected\"); }\n        if (bfsT) bfs.classList.add(\"selected\");\n    })\n}\nconst watchSpeed = () => {\n    const speed = document.getElementById(\"speed\");\n    const fast = document.getElementById(\"speed-fast\");\n    const average = document.getElementById(\"speed-average\");\n    const slow = document.getElementById(\"speed-slow\");\n    const caret = `<i class=\"fas fa-angle-down\"></i>`\n    speed.addEventListener(\"click\",e=>{\n        // debugger\n        const f = fast.contains(e.target); const a = average.contains(e.target); const s = slow.contains(e.target);\n        if(f || a || s) {fast.classList.remove(\"selected\"); average.classList.remove(\"selected\"); slow.classList.remove(\"selected\");}\n        if (f) {\n            speed.getElementsByTagName(\"p\")[0].innerHTML = `Speed: Fast${caret}`;\n            fast.classList.add(\"selected\");\n        }\n        if (a) {\n            speed.getElementsByTagName(\"p\")[0].innerHTML = `Speed: Average${caret}`;\n            average.classList.add(\"selected\");\n        }\n        if (s) {\n            speed.getElementsByTagName(\"p\")[0].innerHTML = `Speed: Slow${caret}`;\n            slow.classList.add(\"selected\");\n        }\n    })\n}\n\nconst watchAll = () => {\n    watchDropdown();\n    watchSpeed();\n    watchAlgo();\n}\n\nmodule.exports = {\n    watchAll\n}\n\n//# sourceURL=webpack://pathfinding_visualizer/./src/lib/util/navbar.js?");

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
eval("const NavBar = __webpack_require__(/*! ./lib/util/navbar */ \"./src/lib/util/navbar.js\");\nconst {Board} = __webpack_require__(/*! ./lib/util/board */ \"./src/lib/util/board.js\")\nconst {BFS} = __webpack_require__(/*! ./lib/algos/bfs */ \"./src/lib/algos/bfs.js\")\nconst {gridAnimations} = __webpack_require__(/*! ./lib/animations/gridAnimations */ \"./src/lib/animations/gridAnimations.js\")\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    NavBar.watchAll();\n    const size = [25, 50];\n    const algos = {};\n    algos[\"bfs\"] = BFS;\n    const board = new Board(size,algos, gridAnimations);\n})\n\n//# sourceURL=webpack://pathfinding_visualizer/./src/index.js?");
})();

/******/ })()
;