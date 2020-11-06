const clearDropdown = () => {
    const clicked = document.getElementsByClassName("clicked");
    while (clicked.length > 0) {
        for (let i of clicked[0].getElementsByClassName("dropdown-content")) i.classList.remove("show");
        clicked[0].classList.remove("clicked");
    }
}

const toggleDropdown = (e) => {
    const isClicked  = e.currentTarget.classList.contains("clicked");
    clearDropdown();
    if(!isClicked){
        e.currentTarget.classList.add("clicked");
        for(let i of e.currentTarget.getElementsByClassName("dropdown-content")) i.classList.add("show");
    }
}
const watchDropdown = () => {
    const dropdown = document.getElementsByClassName("dropdown");
    for(let d of dropdown)
        d.addEventListener("click", (e) => toggleDropdown(e))
    document.addEventListener("click", (e) => {
    if (!document.getElementById("global-nav").contains(e.target)){
        clearDropdown();
        // debugger
    }
    })
}

const watchMaze = () => {
    const maze = document.getElementById("maze");
    const none = document.getElementById("no-maze");
    const rD = document.getElementById("recursive-division");
    const rM = document.getElementById("random-maze");
    maze.addEventListener("click", e => {
        // debugger
        const noneT = none.contains(e.target);
        const rDT = rD.contains(e.target);
        const rMT = rM.contains(e.target);
        if (noneT || rDT || rMT) { none.classList.remove("selected"); rD.classList.remove("selected"); rM.classList.remove("selected"); }
        if (noneT) none.classList.add("selected");
        if (rDT) rD.classList.add("selected");
        if (rMT) rM.classList.add("selected");
    })
}
const watchDensity = () => {
    const maze = document.getElementById("density");
    const none = document.getElementById("dense");
    const rD = document.getElementById("normal");
    const rM = document.getElementById("sparse");
    maze.addEventListener("click", e => {
        // debugger
        const noneT = none.contains(e.target);
        const rDT = rD.contains(e.target);
        const rMT = rM.contains(e.target);
        if (noneT || rDT || rMT) { none.classList.remove("selected"); rD.classList.remove("selected"); rM.classList.remove("selected"); }
        if (noneT) none.classList.add("selected");
        if (rDT) rD.classList.add("selected");
        if (rMT) rM.classList.add("selected");
    })
}
const watchAlgo = () => {
    const algo = document.getElementById("algo");
    const bfs = document.getElementById("bfs");
    const dfs = document.getElementById("dfs");
    const dijkstra = document.getElementById("dijkstra");
    algo.addEventListener("click", e => {
        const bfsT = bfs.contains(e.target);
        const dfsT = dfs.contains(e.target);
        const dijT = dijkstra.contains(e.target);
        // debugger
        const header = document.getElementById("algo-title");
        if (bfsT || dfsT || dijT) { bfs.classList.remove("selected"); dfs.classList.remove("selected"); dijkstra.classList.remove("selected"); }
        if (bfsT) { bfs.classList.add("selected"); header.innerText = "Breadth-First Search"}
        if (dfsT) { dfs.classList.add("selected"); header.innerText = "Depth-First Search"}
        if (dijT) { dijkstra.classList.add("selected"); header.innerText = "Dijkstra's Algorithm"}
    })
}
const watchSpeed = () => {
    const speed = document.getElementById("speed");
    const fast = document.getElementById("speed-fast");
    const average = document.getElementById("speed-average");
    const slow = document.getElementById("speed-slow");
    const caret = `<i class="fas fa-angle-down"></i>`
    speed.addEventListener("click",e=>{
        // debugger
        const f = fast.contains(e.target); const a = average.contains(e.target); const s = slow.contains(e.target);
        if(f || a || s) {fast.classList.remove("selected"); average.classList.remove("selected"); slow.classList.remove("selected");}
        if (f) {
            speed.getElementsByTagName("p")[0].innerHTML = `Speed: Fast${caret}`;
            fast.classList.add("selected");
        }
        if (a) {
            speed.getElementsByTagName("p")[0].innerHTML = `Speed: Average${caret}`;
            average.classList.add("selected");
        }
        if (s) {
            speed.getElementsByTagName("p")[0].innerHTML = `Speed: Slow${caret}`;
            slow.classList.add("selected");
        }
    })
}

const watchAll = () => {
    watchDropdown();
    watchSpeed();
    watchAlgo();
    watchMaze();
    watchDensity();
}

module.exports = {
    watchAll
}