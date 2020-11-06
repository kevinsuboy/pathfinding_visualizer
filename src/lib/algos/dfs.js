const {shuffle} = require('../util/mathUtil')
const { algoParent } = require("./algoParent");

class DFS extends algoParent {
    constructor(gridSize){
        super(gridSize)
    }
    genSearch(nodesToAnimate,stackToAnimate){
        this.nodesToAnimate = [];
        this.genGrid();
        let cur = document.getElementsByClassName(`start`)[0].id.split("-").map(el=>parseInt(el));
        let newPos = undefined;
        const stack = [cur];
        this.grid[cur[0]][cur[1]] = 1;
        while(stack.length > 0){
            cur = stack.pop();
            nodesToAnimate.push(cur);
            this.nodesToAnimate.push(cur);
            if (this.getSquare(cur) === "s") {
                this.grid[cur[0]][cur[1]] = this.maxCnt;
                this.endPos = cur;
                debugger
                this.solved = true;
                return true; // if done, exit
            }
            // this.grid[cur[0]][cur[1]] += 1;
            shuffle(this.dir);
            for (let d of this.dir) {
                newPos = this.move(cur, d);
                // debugger
                if (this.validMove(newPos)) {
                    if (this.getSquare(newPos) !== "s") {
                        stackToAnimate.push(newPos);
                        // this.grid[newPos[0]][newPos[1]] = this.getSquare(cur);
                        this.grid[newPos[0]][newPos[1]] = 1;
                    }
                    // else this.maxCnt = this.getSquare(cur) + 1;
                    stack.push(newPos);
                    // break;
                }
            }
        }
        debugger
        return false;
    }
    getShortestPath(nodesToAnimate){
        debugger
        if(this.solved) this.nodesToAnimate.forEach(el => nodesToAnimate.push(el))
        return true;
    }
}

module.exports = {
    DFS
}