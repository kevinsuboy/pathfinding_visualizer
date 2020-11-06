const { algoParent } = require("./algoParent");

class DFS extends algoParent {
    constructor(gridSize){
        super(gridSize)
    }
    genSearch(nodesToAnimate){
        this.genGrid();
        let cur = document.getElementsByClassName(`start`)[0].id.split("-").map(el=>parseInt(el));
        let newPos = undefined;
        const stack = [cur]; this.grid[cur[0]][cur[1]] = 1;
        
        while(stack.length > 0){
            cur = stack.pop();
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
    DFS
}