const { Board } = require("./board");
const { generateInt } = require("./mathUtil");

class Game extends Board {
    constructor(size, algoList, gridAnimations) {
        super(size);
        this.algoList = algoList;
        this.gridAnimations = gridAnimations;
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
        // debugger
        this.backTrace = backTrace;
        return {nodesToAnimate, queueToAnimate,backTrace};
    }
    animateInstant(nodesToAnimate, queueToAnimate, backTrace){
        const gridA = new this.gridAnimations("fast", nodesToAnimate);
        const gridC = new this.gridAnimations("fast", queueToAnimate);
        const gridB = new this.gridAnimations("fast", backTrace);
        gridC.animateInstant("queued");
        gridA.animateInstant("instantvisited");
        // debugger
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
            // debugger
            // this.instant = false;
            if(newDense){
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
        let walls = {};
        for (let y = 0; y < w; y++) {
            cur = document.getElementById(`${0}-${y}`);
            if (cur.classList.contains("unvisited") && !this.isStartStop(cur)) {
                nodes.push([0, y]);
                walls[`${0}-${y}`] = true;
            }
        }
        for (let x = 0; x < h; x++) {
            cur = document.getElementById(`${x}-${0}`);
            if (cur.classList.contains("unvisited") && !this.isStartStop(cur)) {
                nodes.push([x, 0]);
                walls[`${x}-${0}`] = true;
            }
            cur = document.getElementById(`${x}-${w-1}`);
            if (cur.classList.contains("unvisited") && !this.isStartStop(cur)) {
                nodes.push([x, w-1]);
                walls[`${x}-${w-1}`] = true;
            }
        }
        for (let y = 0; y < w; y++) {
            cur = document.getElementById(`${h-1}-${y}`);
            if (cur.classList.contains("unvisited") && !this.isStartStop(cur)) {
                nodes.push([h - 1, y]);
                walls[`${h-1}-${y}`] = true;
            }
        }
        return {nodes, walls};
    }
    genRecursiveWalls(){
        let {nodes,walls} = this.genBorderWall();
        let [x,y] = this.size;
        this.genRecursiveWalls_ind([1,1],[x-1,y-1],nodes,walls,-1)
        this.animateWalls(nodes, this.density === "dense");
        // this.animateWalls(nodes, true);
        // this.run();
    }
    validXLine(line,l,r, walls){
        const left = walls[`${line}-${l-1}`];
        const right = walls[`${line}-${r}`];
        return left && right;
    }
    validYLine(line,l,r, walls){
        const left = walls[`${l-1}-${line}`];
        const right = walls[`${r}-${line}`];
        return left && right;
    }
    hSkips(h,H,w,W,line){
        let skips = [];
        skips[0] = generateInt(line - w) + w; // left side
        skips[1] = generateInt(W - line - 1) + line + 1; // right side
        skips[2] = generateInt(H - h) + h;
        return skips;
    }
    vSkips(h, H, w, W, line) {
        let skips = [];
        skips[0] = generateInt(line - w) + w; // left side
        skips[1] = generateInt(W - line - 1) + line + 1; // right side
        skips[2] = generateInt(H - h) + h;
        return skips;
    }
    genRecursiveWalls_ind(lBound,uBound, nodesToAnimate, walls){
        const [h,w] = lBound;
        const [H,W] = uBound;
        // debugger
        if (W - w < 3 || H - h < 3 ) return;
        let yLine = generateInt(W - w - 2) + w + 1;
        let xLine = generateInt(H - h - 2) + h + 1;
        let i=0;
        // if (W - w === 3 && !this.validYLine(w+1, h, H, walls)) return;
        while (!this.validYLine(yLine,h,H,walls)){
            // debugger
            i++;
            if(i===W-w){
                debugger;
                return
            }
            yLine = generateInt(W - w - 2) + w + 1;
        }
        i=0;
        // if (H - h === 3 && !this.validXLine(h + 1, w, W, walls)) return;
        while (!this.validXLine(xLine, w, W,walls)) {
            i++;
            if(i===H-h){
                debugger;
                return
            }
            xLine = generateInt(H - h - 2) + h + 1;
        }
        let x, y;
        let skips = this.hSkips(h,H,w,W,yLine);
        while (skips[2] === xLine) skips[2] = generateInt(H - h) + h;
        let cur;
        //!
        y = yLine;
        for(let x=h;x<H;x++){ // line 2
            if(x !== skips[2]){
                cur = document.getElementById(`${x}-${y}`);
                if (cur.classList.contains("unvisited") && !this.isStartStop(cur)) {
                    nodesToAnimate.push([x, y]);
                    walls[`${x}-${y}`] = true;
                }
            }
        }
        x = xLine;
        for (let y = w; y < W; y++) { // line 1
            if (y !== skips[0] && y !== skips[1]) {
                cur = document.getElementById(`${x}-${y}`);
                if (cur.classList.contains("unvisited") && !this.isStartStop(cur)) {
                    nodesToAnimate.push([x, y]);
                    walls[`${x}-${y}`] = true;
                }
            }
        }
        this.genRecursiveWalls_ind(lBound,[x,y],                    nodesToAnimate, walls); //Q1
        this.genRecursiveWalls_ind([lBound[0],y+1],[x,uBound[1]],   nodesToAnimate, walls); //Q2
        this.genRecursiveWalls_ind([x+1,lBound[1]],[uBound[0],y],   nodesToAnimate, walls); //Q3
        this.genRecursiveWalls_ind([x+1,y+1],uBound,                nodesToAnimate, walls); //Q4
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