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
            this.instant = false;
            document.getElementById("clearPath").innerText = "Clear Path"
            const{nodesToAnimate,backTrace} = this.execute();
            this.animateVisualize(this.getSpeed(), nodesToAnimate, backTrace);
        })
    }
    watchInstant(){
        const { nodesToAnimate, backTrace } = this.execute();
        this.animateInstant(nodesToAnimate, backTrace);
    }
    execute(){
        this.clearPath(null, "instantvisited", false);
        this.clearVisited();
        const nodesToAnimate = [];
        const backTrace = [];
        const algo = new this.algoList[this.getAlgo()](this.size)
        algo.execute(nodesToAnimate, backTrace);
        this.backTrace = backTrace;
        return {nodesToAnimate, backTrace};
    }
    animateInstant(nodesToAnimate, backTrace){
        const gridA = new this.gridAnimations("fast", nodesToAnimate);
        const gridB = new this.gridAnimations("fast", backTrace);
        gridA.animateInstant("instantvisited");
        debugger
        if(this.path) gridB.animateInstant("instantpath");
    }
    animateWalls(nodesToAnimate){
        const gridA = new this.gridAnimations("fast", nodesToAnimate);
        gridA.animateInstant("walls");
        if (this.instant)
            this.watchInstant();
        // gridA.animateNodes("walls", ()=>{
        //     if (this.instant)
        //         this.watchInstant();
        // });
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
    animateVisualize(speed, nodesToAnimate, backTrace){
        const gridA = new this.gridAnimations(speed, nodesToAnimate);
        const gridB = new this.gridAnimations(speed, backTrace);
        gridA.animateNodes("current");
        // debugger
        window.timeouts.push(setTimeout(() => gridA.animateNodes("queued"), gridA.speed));
        window.timeouts.push(
        setTimeout(() => {
            gridA.animateNodes("visited",
                () => gridB.animateNodes("path", () => setTimeout(() => this.convert2Insta(), 2000)));
        }, 10 * gridA.speed)
        )        
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
        this.animateWalls(nodes);
    }
    wallGen(e){
        const rM = document.getElementById("random-maze");
        // debugger
        if (rM.contains(e.target) && rM.classList.contains("selected")){
            this.clearWalls(e,false);
            window.timeouts.push(
                setTimeout(() => 
            this.genRandomWalls(), 0)
            )
        }
    }
    watchMaze(){
        const maze = document.getElementById("maze");
        maze.addEventListener("click",e=>{
            // debugger
            this.wallGen(e);
        })
    }
}


module.exports = {
    Game
}