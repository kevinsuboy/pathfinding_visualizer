
const genBoard = (h, w) => {
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
const toggleWall = (e) => {
    console.log(e.type)
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
const watchWall = (grid) => {
    // for(let el of grid){
        debugger
        grid.addEventListener("mousedown",(e) => toggleWall(e))
        grid.addEventListener("mouseover",(e) => toggleWall(e))
        grid.addEventListener("mouseup", (e) => { isClicked = false; e.currentTarget.classList.remove("mousedown")})
    // }
}
const execAll = (size) => {
    watchWall(genBoard(size[0], size[1]));
}
module.exports = {
    execAll
}