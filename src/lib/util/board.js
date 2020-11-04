const {generateInt} = require("./mathUtil");

class Board {
    constructor(size){
        this.size = size;
        this.browserWidth = 2000;
        this.mainGrid = this.genBoard(size[0],size[1]);
        this.initStartStop(this.mainGrid);
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
    }
    isStartStop(e, start, stop) {
        // debugger
        return (start ? start.contains(e.target):false) || (stop ? stop.contains(e.target):false);
    }
    toggleWall(e) {
        const start = document.getElementsByClassName("start")[0];
        const stop = document.getElementsByClassName("stop")[0];
        const notSt = !this.isStartStop(e, start, stop);
        if(e.type === "mousedown" && notSt) e.currentTarget.classList.add("mouse_wall");
        if(e.target.tagName === "TD" && e.currentTarget.classList.contains("mouse_wall")) {
            if(e.target.classList.contains("wall")){
                e.target.classList.remove("wall");
                e.target.classList.add("unvisited");
            } else if(notSt){
                e.target.classList.add("wall");
                e.target.classList.remove("unvisited");
                e.target.classList.remove("visited");
            }
        }
    }
    watchClearWall() {
        const button = document.getElementById("clearWalls");
        button.addEventListener("click",(e) => this.clearWalls(e))
    }
    clearWalls(e) {
        const walls = document.getElementsByClassName("wall");
        while(walls.length > 0){
            walls[0].classList.add("unvisited");
            walls[0].classList.remove("wall");
        }
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
        let stoptd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`); if (stoptd.classList.length === 0) return;
        while(!starttd.classList.contains("unvisited")) 
            stoptd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`);
        //
        this.addStartStop(starttd);
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
        debugger
        if (e.type === "mousedown" && isSt){
            if (start.contains(e.target)) e.currentTarget.classList.add("mouse_start");
            if (stop.contains(e.target)) e.currentTarget.classList.add("mouse_stop");
        }
        if (e.target.tagName === "TD" && e.currentTarget.classList.contains("mouse_start")) {
            this.removeStartStop(start);
            this.addStartStop(e.target)
        }
        if (e.target.tagName === "TD" && e.currentTarget.classList.contains("mouse_stop")) {
            this.removeStartStop(stop,"stop");
            this.addStartStop(e.target,"stop")
        }
    }
    addStartStop(start, str = "start"){
        start.className = ''; start.classList.add(str);
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