const {generateInt} = require("./mathUtil");

class Board {
    constructor(size){
        this.size = size;
        this.browserWidth = 2000;
        this.mainGrid = this.genBoard(size[0],size[1]);
        this.dropStartStop(this.mainGrid);
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
    }
    toggleWall(e) {
        const startTd = document.getElementsByClassName("start")[0];
        const stopTd = document.getElementsByClassName("stop")[0];
        // debugger
        const notSt = !(startTd.contains(e.target) || stopTd.contains(e.target));
        debugger
        if(e.type === "mousedown" && notSt) e.currentTarget.classList.add("mousedown");
        if(e.target.tagName === "TD" && e.currentTarget.classList.contains("mousedown")) {
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
        grid.addEventListener("mouseup", (e) => { e.currentTarget.classList.remove("mousedown")})
    }
    dropStartStop(){
        const [h, w] = this.size;
        let starttd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`);
        while(!starttd.classList.contains("unvisited")) 
            starttd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`);
        let stoptd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`);
        while(!starttd.classList.contains("unvisited")) 
            stoptd = document.getElementById(`${generateInt(h)}-${generateInt(w)}`);
        //
        starttd.className = ''; starttd.classList.add("start");
        starttd.innerHTML = '<i class="fas fa-angle-right"></i>'
        stoptd.className = ''; stoptd.classList.add("stop");
        stoptd.innerHTML = '<i class="far fa-dot-circle"></i>';
    }
}


module.exports = {
    Board
}