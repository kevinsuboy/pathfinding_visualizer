const { algoParent } = require("./algoParent");

class BFS extends algoParent {
    constructor(gridSize){
        super(gridSize)
    }
    genSearch(nodesToAnimate){
        this.genGrid();
        let cur = document.getElementsByClassName(`start`)[0].id.split("-").map(el=>parseInt(el));
        let newPos = undefined;
        const queue = [cur]; this.grid[cur[0]][cur[1]] = 1;
        
        while(queue.length > 0){
            cur = queue.shift();
            // debugger
            nodesToAnimate.push(cur)
            if (this.getSquare(cur) === "s"){
                // debugger
                this.grid[cur[0]][cur[1]] = this.maxCnt;
                this.endPos = cur;
                return true; // if done, exit
            }
            // if (this.getSquare(cur)!=="s") this.grid[cur[0]][cur[1]] = 1;
            for(let d of this.dir){
                newPos = this.move(cur, d);
                // debugger
                if(this.validMove(newPos)){
                    if (this.getSquare(newPos) !== "s") { this.grid[newPos[0]][newPos[1]] = this.getSquare(cur)+1;}
                    else this.maxCnt = this.getSquare(cur) + 1; 
                    queue.push(newPos);
                }
            }
        }
        // debugger
        return false;
    }
    validBacktrace(pos, val){
        if (this.inBounds(pos))
            return this.getSquare(pos) === val-1;
        return false;
    }
    getShortestPath(nodesToAnimate){
        // debugger
        if(!this.endPos) return false;
        let newPos; let cur = this.endPos;
        nodesToAnimate.unshift(cur);
        while(this.getSquare(cur) !== 1){
            // debugger
            for(let d of this.dir){
                newPos = this.move(cur, d);
                if (this.validBacktrace(newPos, this.getSquare(cur))){
                    nodesToAnimate.unshift(newPos);
                    cur = newPos;
                    break;
                }
            }
        }
        // debugger
        return true;
    }
}

module.exports = {
    BFS
}