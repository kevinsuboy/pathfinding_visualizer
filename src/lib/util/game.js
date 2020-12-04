const { Board } = require("./board");
const { generateInt } = require("./mathUtil");

class Game extends Board {
    constructor(size, algoList, gridAnimations) {
        super(size);
        this.algoList = algoList;
        this.gridAnimations = gridAnimations;
        this.density = "normal";
    }
    watchVisualize() {
        document.getElementById("visualize").addEventListener("click", e => {
            this.run();
        })
    }
    watchEnter() {
        document.addEventListener("keypress", e => {
            this.run();
        })
    }
    run(){
        this.instant = false;
        this.stopAnimations(); this.clearMisc();
        document.getElementById("clearPath").innerText = "Clear Path"
        const { nodesToAnimate, queueToAnimate, backTrace } = this.execute();
        this.animateVisualize(this.getSpeed(), nodesToAnimate, queueToAnimate, backTrace);
    }
    watchInstant(){
        const { nodesToAnimate, queueToAnimate, backTrace } = this.execute();
        this.animateInstant(nodesToAnimate, queueToAnimate, backTrace);
    }
    execute(){
        this.clearPath(null, "instantvisited", false);
        this.clearVisited();
        const nodesToAnimate = [];
        const queueToAnimate = [];
        const backTrace = [];
        const algo = new this.algoList[this.getAlgo()](this.size)
        algo.execute(nodesToAnimate, queueToAnimate, backTrace);
        debugger
        this.backTrace = backTrace;
        return {nodesToAnimate, queueToAnimate,backTrace};
    }
    animateInstant(nodesToAnimate, queueToAnimate, backTrace){
        const gridA = new this.gridAnimations("fast", nodesToAnimate);
        const gridC = new this.gridAnimations("fast", queueToAnimate);
        const gridB = new this.gridAnimations("fast", backTrace);
        gridC.animateInstant("queued");
        gridA.animateInstant("instantvisited");
        debugger
        gridB.animateInstant("instantpath");
    }
    animateWalls(nodesToAnimate, instant = true){
        const gridA = new this.gridAnimations("fast", nodesToAnimate);
        // const gridA = new this.gridAnimations("slow", nodesToAnimate);
        if(instant){
            gridA.animateInstant("walls");
            if (this.instant)
                this.watchInstant();
        }else{
            gridA.animateNodes("walls", ()=>{
                if (this.instant)
                    this.watchInstant();
            });
        }
    }
    animatePath() {
        this.path = true;
        const gridB = new this.gridAnimations(this.getSpeed(), this.backTrace);
        window.timeouts.push(
            setTimeout(() => {
            gridB.animateNodes("path",
                () => setTimeout(() => this.convert2Insta(), 2000));
        }
        )
        )
    }
    animateVisualize(speed, nodesToAnimate, queueToAnimate, backTrace){
        const gridA = new this.gridAnimations(speed, nodesToAnimate);
        const gridC = new this.gridAnimations(speed, queueToAnimate);
        const gridB = new this.gridAnimations(speed, backTrace);
        window.timeouts.push(setTimeout(()=>gridA.animateNodes("current")));
        // debugger
        window.timeouts.push(setTimeout(() => gridC.animateNodes("queued"), gridA.speed));
        window.timeouts.push(
        setTimeout(() => {
            gridA.animateNodes("visited",
                () => gridB.animateNodes("path", () => setTimeout(() => this.convert2Insta(), 2000)));
        }, 10 * gridA.speed)
        )        
    }
    watchDensity(){
        const density = document.getElementById("density");
        density.addEventListener("click", e => {
            const newDense = this.getDensity(e);
            debugger
            // this.instant = false;
            if(newDense){
                this.density = newDense;
                this.genBoard(newDense);
            }

        })
    }
    getDensity(e){
        const dense = document.getElementById("dense");
        const sparse = document.getElementById("sparse");
        const normal = document.getElementById("normal");
        const denseTd = dense.classList.contains("selected");
        const sparseTd = sparse.classList.contains("selected");
        const normalTd = normal.classList.contains("selected");
        // debugger
        if (!dense.contains(e.target) && !sparse.contains(e.target) && !normal.contains(e.target) ) return false;
        if (denseTd) return "dense";
        if (sparseTd) return "sparse";
        if (normalTd) return "normal";
    }
    genRandomWalls(){
        const [ h, w ] = this.size;
        const n = h*w;
        let wCnt = n/2;
        // let wCnt = generateInt(n);
        let x,y;
        let cur; let nodes = [];
        // debugger
        while(wCnt > 0){
            [x,y] = [generateInt(h),generateInt(w)];
            cur = document.getElementById(`${x}-${y}`);
            if(cur.classList.contains("unvisited") && !this.isStartStop(cur)){
                wCnt--;
                nodes.push([x,y]);
            }
        }
        this.animateWalls(nodes, this.density === "dense");
    }
    genBorderWall(){
        const [h, w] = this.size;
        let x = 0, y = 0;
        let cur; let nodes = [];
        for (let y = 0; y < w; y++) {
            cur = document.getElementById(`${0}-${y}`);
            if (cur.classList.contains("unvisited") && !this.isStartStop(cur)) {
                nodes.push([0, y]);
            }
        }
        for (let x = 0; x < h; x++) {
            cur = document.getElementById(`${x}-${0}`);
            if (cur.classList.contains("unvisited") && !this.isStartStop(cur)) {
                nodes.push([x, 0]);
            }
            cur = document.getElementById(`${x}-${w-1}`);
            if (cur.classList.contains("unvisited") && !this.isStartStop(cur)) {
                nodes.push([x, w-1]);
            }
        }
        for (let y = 0; y < w; y++) {
            cur = document.getElementById(`${h-1}-${y}`);
            if (cur.classList.contains("unvisited") && !this.isStartStop(cur)) {
                nodes.push([h - 1, y]);
            }
        }
        return nodes;
    }
    genRecursiveWalls(){
        let nodes = this.genBorderWall();
        this.genRecursiveWalls_indY([1,1],this.size,nodes,-1)
        this.animateWalls(nodes, this.density === "dense");
    }
    genRecursiveWalls_indX(lBound,uBound, nodes, gap){
        const [h,w] = lBound;
        const [H,W] = uBound;
        if (H - h < 3) return;
        let x = generateInt(H - h-3) + h + 1;
        let skip = generateInt(W - w-1) + w;
        if(!gap) debugger;
        // while (x === gap) x = generateInt(W - w - 1) + w;
        let cur;
        for(let y=w;y<W;y++){
            if(y !== skip){
                cur = document.getElementById(`${x}-${y}`);
                if (cur.classList.contains("unvisited") && !this.isStartStop(cur)) {
                    nodes.push([x, y]);
                }
            }
        }
        this.genRecursiveWalls_indY([x+1,lBound[1]], uBound, nodes, skip); // bottom half
        this.genRecursiveWalls_indY(lBound, [x,uBound[1]], nodes, skip); // upper half
    }
    genRecursiveWalls_indY(lBound,uBound, nodes, gap){
        const [h,w] = lBound;
        const [H,W] = uBound;
        if (W - w < 3) return;
        let skip = generateInt(H - h-1) + h;
        let y = generateInt(W - w-3) + w + 1;
        if (!gap) debugger;
        // while (y === gap) y = generateInt(H - h - 1) + h;
        // debugger
        let cur;
        for(let x=h;x<H;x++){
            if(x !== skip){
                cur = document.getElementById(`${x}-${y}`);
                if (cur.classList.contains("unvisited") && !this.isStartStop(cur)) {
                    nodes.push([x, y]);
                }
            }
        }
        this.genRecursiveWalls_indX([lBound[0], y+1], uBound, nodes, skip); // right half
        this.genRecursiveWalls_indX(lBound, [uBound[0], y], nodes, skip); // left half
    }
    wallGen(e, instant = false){
        const none = document.getElementById("no-maze");
        const rM = document.getElementById("random-maze");
        const rD = document.getElementById("recursive-division");
        // debugger
        if ((instant || rM.contains(e.target)) && rM.classList.contains("selected")){
            this.clearWalls(e,false);
            window.timeouts.push(
                setTimeout(() => 
            this.genRandomWalls(), 0)
            )
        }
        if ((instant || rD.contains(e.target)) && rD.classList.contains("selected")){
            this.clearWalls(e,false);
            window.timeouts.push(
                setTimeout(() => 
            this.genRecursiveWalls(), 0)
            )
        }
        if ((instant || none.contains(e.target)) && none.classList.contains("selected")){
            this.clearWalls(e,false);
        }
    }
    watchMaze(){
        const maze = document.getElementById("maze");
        maze.addEventListener("click",e=>{
            // debugger
            this.wallGen(e);
        })
    }
    watchAlgo(){
        const maze = document.getElementById("algo");
        maze.addEventListener("click",e=>{
            const bfsT = document.getElementById("bfs").contains(e.target);
            const dfsT = document.getElementById("dfs").contains(e.target);
            const dijkstraT = document.getElementById("dijkstra").contains(e.target);
            if(bfsT || dfsT || dijkstraT){
                document.getElementsByClassName("start")[0].innerHTML = this.getStartSymbol();
                document.getElementsByClassName("key-start")[0].innerHTML = this.getStartSymbol();
                if(this.instant) this.watchInstant();
                // else this.run();
            }
        })
    }
}


module.exports = {
    Game
}