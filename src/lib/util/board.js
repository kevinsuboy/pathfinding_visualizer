class Board {
    constructor(size){
        this.mainGrid = this.genBoard(size[0],size[1])
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
    toggleWall(e) {
        // console.log(e.type)
        if(e.type === "mousedown") e.currentTarget.classList.add("mousedown");
        if(e.target.tagName === "TD" && e.currentTarget.classList.contains("mousedown")) {
            if(e.target.classList.contains("wall")){
                e.target.classList.remove("wall");
                e.target.classList.add("unvisited");
            } else {
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
        // for(let el of grid){
            debugger
            grid.addEventListener("mousedown",(e) => this.toggleWall(e))
            grid.addEventListener("mouseover",(e) => this.toggleWall(e))
            grid.addEventListener("mouseup", (e) => { e.currentTarget.classList.remove("mousedown")})
        // }
    }
    allEventListeners() {
        this.watchWall(this.mainGrid);
        this.watchClearWall();
    }
}


module.exports = {
    Board
}