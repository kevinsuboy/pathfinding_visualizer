const {generateInt} = require("./mathUtil");
const {watchSpeed} = require("./navbar");

class Board {
    constructor(size, algoList, gridAnimations){
        this.size = size;
        this.browserWidth = 2000;
        this.speed = "fast";
        this.algo = "";
        this.algoList = algoList;
        this.gridAnimations = gridAnimations;
        this.mainGrid = this.genBoard(size[0],size[1]);
        this.initStartStop();
        this.allEventListeners();
    }
    genBoard(h, w) {
        const mainGrid = document.getElementById("mainGrid");
        mainGrid.innerHTML = '';
        const table = document.createElement("table");
        table.id = "board";
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
        for(let i=0;i<h;i++){
            let trow = document.createElement("tr");
            trow.id = `row_${i}`;
            for(let j=0;j<w;j++){
                let td = document.createElement("td");
                td.id = `${i}-${j}`;
                td.classList.add("unvisited")
                trow.appendChild(td);
            }
            tbody.appendChild(trow);
        }
        mainGrid.appendChild(table);
        return mainGrid;
    }
    allEventListeners() {
        this.watchWall(this.mainGrid);
        this.watchClearWall();
        this.watchStartStop(this.mainGrid);
        this.watchVisualize();
        this.watchClearBoard();
        this.watchClearPath();
    }
    getSpeed() {
        const fast = document.getElementById("speed-fast").classList.contains("selected");
        const average = document.getElementById("speed-average").classList.contains("selected");
        const slow = document.getElementById("speed-slow").classList.contains("selected");
        if (fast) this.speed = "fast";
        if (average) this.speed = "average";
        if (slow) this.speed = "slow";
    }
    getAlgo() {
        const bfs = document.getElementById("bfs").classList.contains("selected");
        if (bfs) this.algo = "bfs";

    }
    convert2Insta(){
        const visited = document.getElementsByClassName("visited");
        // debugger
        while (visited.length > 0) {
            visited[0].classList.add("instantvisited");
            visited[0].classList.remove("visited");
        }
        const path = document.getElementsByClassName("path");
        // debugger
        while (path.length > 0) {
            path[0].classList.add("instantpath");
            path[0].classList.remove("path");
        }

    }
    watchVisualize() {
        document.getElementById("visualize").addEventListener("click",e=>{
            this.getSpeed();
            this.getAlgo();
            this.clearPath();
            this.clearVisited();
            const nodesToAnimate = [];
            const algo = new this.algoList[this.algo](this.size)
            // debugger
            algo.execute(nodesToAnimate);
            const backTrace = [];
            algo.getShortestPath(backTrace);
            const gridA = new this.gridAnimations(this.speed, nodesToAnimate);
            const gridB = new this.gridAnimations(this.speed, backTrace);
            // gridA.animateNodes("queued");
            gridA.animateNodes("current");
            // debugger
            setTimeout(() => gridA.animateNodes("queued"), gridA.speed);
            setTimeout(() => {
                gridA.animateNodes("visited",
                    () => gridB.animateNodes("path", () => setTimeout(() => this.convert2Insta(),2000)));
            }, 10 * gridA.speed);
        })
    }
    isStartStop(e, start, stop) {
        // debugger
        return (start ? start.contains(e.target):false) || (stop ? stop.contains(e.target):false);
    }
    toggleWall(e) {
        // debugger
        const start = document.getElementsByClassName("start")[0];
        const stop = document.getElementsByClassName("stop")[0];
        const notSt = !this.isStartStop(e, start, stop);
        if(e.type === "mousedown" && notSt) e.currentTarget.classList.add("mouse_wall");
        if(e.target.tagName === "TD" && e.currentTarget.classList.contains("mouse_wall")) {
            if(e.target.classList.contains("wall")){
                e.target.classList.remove("wall");
                // e.target.classList.add("unvisited");
            } else if(notSt){
                e.target.classList.add("wall");
                // e.target.classList.remove("unvisited");
                // e.target.classList.remove("visited");
            }
        }
    }
    watchClearWall() {
        const button = document.getElementById("clearWalls");
        button.addEventListener("click",(e) => this.clearWalls(e))
    }
    watchClearBoard() {
        const button = document.getElementById("clearBoard");
        button.addEventListener("click",(e) => this.clearBoard(e))
    }
    watchClearPath() {
        const button = document.getElementById("clearPath");
        button.addEventListener("click",(e) => this.clearPath(e))
    }
    clearWalls(e) {
        const walls = document.getElementsByClassName("wall");
        while(walls.length > 0){
            walls[0].classList.add("unvisited");
            walls[0].classList.remove("wall");
        }
    }
    clearVisited(e) {
        const visited = document.getElementsByClassName("visited");
        while(visited.length > 0){
            visited[0].classList.add("unvisited");
            visited[0].classList.remove("visited");
        }
        const instantvisited = document.getElementsByClassName("instantvisited");
        // debugger
        while(instantvisited.length > 0){
            instantvisited[0].classList.add("unvisited");
            instantvisited[0].classList.remove("instantvisited");
        }
    }
    clearPath(e, newClass = "instantvisited") {
        // debugger
        const path = document.getElementsByClassName("path");
        while(path.length > 0){
            path[0].classList.add(newClass);
            path[0].classList.remove("path");
        }
        const instantpath = document.getElementsByClassName("instantpath");
        while(instantpath.length > 0){
            instantpath[0].classList.add(newClass);
            instantpath[0].classList.remove("instantpath");
        }
    }
    clearBoard(e){
        debugger
        this.clearPath(e,"unvisited");
        this.clearVisited(e);
        this.clearWalls(e);
    }
    watchWall(grid) {
        grid.addEventListener("mousedown",(e) => this.toggleWall(e))
        grid.addEventListener("mouseover",(e) => this.toggleWall(e))
        grid.addEventListener("mouseup", (e) => { e.currentTarget.classList.remove("mouse_wall")})
    }
    initStartStop(){
        const [h, w] = this.size;
        let starttd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`); if (starttd.classList.length === 0) return;
        while(!starttd.classList.contains("unvisited")) 
            starttd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`);
        this.addStartStop(starttd);
        //
        let stoptd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`); if (stoptd.classList.length === 0) return;
        while ((!stoptd.classList.contains("unvisited")) || stoptd.classList.contains("start"))
            stoptd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`);
        //
        this.addStartStop(stoptd,"stop");
    }
    watchStartStop(grid){
        grid.addEventListener("mousedown", (e) => this.moveStartStop(e))
        grid.addEventListener("mouseover", (e) => this.moveStartStop(e))
        grid.addEventListener("mouseup", (e) => {
            e.currentTarget.classList.remove("mouse_start");
            e.currentTarget.classList.remove("mouse_stop");
        })
    }
    moveStartStop(e) {
        const start = document.getElementsByClassName("start")[0];
        const stop = document.getElementsByClassName("stop")[0];
        const isSt = this.isStartStop(e, start, stop);
        // debugger
        if (e.type === "mousedown" && isSt){
            if (start.contains(e.target)) e.currentTarget.classList.add("mouse_start");
            if (stop.contains(e.target)) e.currentTarget.classList.add("mouse_stop");
        }
        if (!(e.target.tagName === "TD" && !e.target.classList.contains("wall"))) return;
        if (e.currentTarget.classList.contains("mouse_start")) {
            this.removeStartStop(start);
            this.addStartStop(e.target)
        }
        if (e.currentTarget.classList.contains("mouse_stop")) {
            this.removeStartStop(stop,"stop");
            this.addStartStop(e.target,"stop")
        }
    }
    addStartStop(start, str = "start"){
        // start.className = '';
        start.classList.add(str);
        start.innerHTML = str === "start" ? '<i class="fas fa-angle-right"></i>' : '<i class="far fa-dot-circle"></i>'
    }
    removeStartStop(start, str = "start"){
        // debugger
        if(start){
            start.innerHTML = '';
            start.classList.add("unvisited"); start.classList.remove(str);
        }
    }
}


module.exports = {
    Board
}