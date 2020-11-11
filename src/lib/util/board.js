const {generateInt} = require("./mathUtil");
const {watchSpeed} = require("./navbar");

class Board {
    constructor(density){
        this.browserWidth = 2000;
        this.mainGrid = document.getElementById("mainGrid");
        // debugger
        this.genBoard(density);
        this.density = density;
        this.allEventListeners();
        this.instant = false;
        this.path = true;
    }
    getSize(density){
        this.size = density === "normal" ? [25, 50] :
            // density === "dense" ? [55, 120] : [5, 5];
            density === "dense" ? [55, 120] : [12, 25];
    }
    genBoard(density) {
        this.density = density;
        this.getSize(density);
        // debugger
        const [h,w] = this.size;
        // const mainGrid = document.getElementById("mainGrid");
        this.mainGrid.innerHTML = '';
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
                td.classList.add(density)
                trow.appendChild(td);
            }
            tbody.appendChild(trow);
        }
        this.mainGrid.appendChild(table);
        this.initStartStop(density);
        this.wallGen(null,true)
        if(this.instant)
            this.watchInstant()
        // return mainGrid;
    }
    allEventListeners() {
        this.watchWall(this.mainGrid);
        this.watchClearWall();
        this.watchStartStop(this.mainGrid);
        this.watchVisualize();
        this.watchClearBoard();
        this.watchClearPath();
        this.watchMaze();
        this.watchAlgo();
        this.watchDensity();
        this.watchEnter();
    }
    getSpeed() {
        const average = document.getElementById("speed-average").classList.contains("selected");
        if (average) return "average";
        const slow = document.getElementById("speed-slow").classList.contains("selected");
        if (slow) return "slow";
        return "fast";
    }
    getAlgo() {
        const bfs = document.getElementById("bfs").classList.contains("selected");
        if (bfs) return "bfs";
        const dfs = document.getElementById("dfs").classList.contains("selected");
        if (dfs) return "dfs";
        return "dijkstra"
    }
    getStartSymbol() {
        const symbols = {
            "bfs": '<i class="fas fa-star-of-life"></i>',
            "dfs": '<i class="fas fa-angle-right"></i>',
            "dijkstra": '<i class="fas fa-project-diagram"></i>' 
        }
        return symbols[this.getAlgo()];
    }
    convert2Insta(){
        const visited = document.getElementsByClassName("visited");
        // debugger
        this.pruneQueue();
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
        const current = document.getElementsByClassName("current");
        // debugger
        while (current.length > 0) {
            current[0].classList.remove("current");
        }
        this.instant = true;
        this.path = true;

    }
    pruneQueue(){
        // const visited = document.getElementsByClassName("visited");
        const queueVisited = document.getElementsByClassName("queued visited");
        while(queueVisited.length > 0) queueVisited[0].classList.remove("queued");
        const queuePath = document.getElementsByClassName("queued path");
        while(queuePath.length > 0) queuePath[0].classList.remove("queued");
    }
    isStartStop(el) {
        const start = document.getElementsByClassName("start")[0];
        const stop = document.getElementsByClassName("stop")[0];
        if(!(start instanceof Node)) debugger;
        if(!(stop instanceof Node)) debugger;
        return (start ? start.contains(el):false) || (stop ? stop.contains(el):false);
    }
    toggleWall(e) {
        // debugger
        const notSt = !this.isStartStop(e.target);
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
        button.addEventListener("click",(e) => {
            // debugger
            if(!this.instant) return;
            const clearPathBTN = document.getElementById("clearPath");
                clearPathBTN.innerText = "Clear Path";
                this.clearVisited(e)
                this.clearPath(e)
                this.instant = false;
        })
    }
    stopAnimations(){
        let i = 0;
        while(i < window.timeouts.length){
            clearTimeout(window.timeouts[i++]);
            // debugger
        }
    }
    clearWallMenu(){
        document.getElementById("no-maze").classList.add("selected");
        document.getElementById("recursive-division").classList.remove("selected");
        document.getElementById("random-maze").classList.remove("selected");

    }
    clearMisc(){
        const current = document.getElementsByClassName("current");
        while (current.length > 0) {
            current[0].classList.add("unvisited");
            current[0].classList.remove("current");
        }
        const queued = document.getElementsByClassName("queued");
        while (queued.length > 0) {
            queued[0].classList.add("unvisited");
            queued[0].classList.remove("queued");
        }
    }
    clearWalls(e, clearMenu = true) {
        // this.stopAnimations();
        // this.clearMisc();
        const walls = document.getElementsByClassName("wall");
        if(clearMenu)
            this.clearWallMenu();
        while(walls.length > 0){
            walls[0].classList.add("unvisited");
            walls[0].classList.remove("wall");
        }
        // debugger
        if (this.instant)
            this.watchInstant();
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
        const queued = document.getElementsByClassName("queued");
        // debugger
        while(queued.length > 0){
            queued[0].classList.add("unvisited");
            queued[0].classList.remove("queued");
        }
    }
    clearPath(e, newClass = "unvisited") {
        const clearPathBTN = document.getElementById("clearPath");
        // this.instant = false;
        // debugger
        // console.log("FLAG")
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
        // debugger
        this.stopAnimations();
        this.instant = false;
        this.clearPath(e,"unvisited");
        this.clearVisited(e);
        this.clearWalls(e);
        this.clearMisc(e);
    }
    watchWall(grid) {
        grid.addEventListener("mousedown",(e) => this.toggleWall(e))
        grid.addEventListener("mouseover",(e) => this.toggleWall(e))
        grid.addEventListener("mouseup", (e) => {
            e.currentTarget.classList.remove("mouse_wall");
            if (this.instant)
                this.watchInstant();
        })
    }
    initStartStop(density){
        const [h, w] = this.size;
        let starttd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`); if (starttd.classList.length === 0) return;
        while(!starttd.classList.contains("unvisited")) 
            starttd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`);
        this.addStartStop(starttd);
        starttd.classList.add(`${density}-start`)
        //
        let stoptd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`); if (stoptd.classList.length === 0) return;
        while ((!stoptd.classList.contains("unvisited")) || stoptd.classList.contains("start"))
            stoptd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`);
        //
        this.addStartStop(stoptd,"stop");
        stoptd.classList.add(`${density}-stop`)
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
        const isSt = this.isStartStop(e.target);
        // debugger
        const start = document.getElementsByClassName("start")[0];
        const stop = document.getElementsByClassName("stop")[0];
        if (e.type === "mousedown" && isSt){
            if (start.contains(e.target)) e.currentTarget.classList.add("mouse_start");
            if (stop.contains(e.target)) e.currentTarget.classList.add("mouse_stop");
        }
        if (!(e.target.tagName === "TD" && !e.target.classList.contains("wall"))) return;
        if (e.currentTarget.classList.contains("mouse_start")) {
            this.removeStartStop(start);
            this.addStartStop(e.target);
            if (this.instant)
                this.watchInstant();
        }
        if (e.currentTarget.classList.contains("mouse_stop")) {
            this.removeStartStop(stop,"stop");
            this.addStartStop(e.target,"stop")
            if(this.instant)
                this.watchInstant();
        }
    }
    addStartStop(start, str = "start"){
        // start.className = '';
        const key = document.getElementsByClassName(`key-${str}`)[0]
        // debugger
        start.classList.add(str);
        start.innerHTML = str === "start" ? this.getStartSymbol() : '<i class="far fa-dot-circle"></i>'
        key.innerHTML = start.innerHTML;
        start.classList.add(`${this.density}-${str}`)
    }
    removeStartStop(start, str = "start"){
        // debugger
        if(start){
            start.innerHTML = '';
            start.classList.add("unvisited"); start.classList.remove(str);
            start.classList.remove(`${this.density}-${str}`)
        }
    }
}


module.exports = {
    Board
}