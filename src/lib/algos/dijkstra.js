const { algoParent } = require("./algoParent");
const { getQMin, getQStop, generateInt } = require("../util/mathUtil");


class Dijkstra extends algoParent {
    constructor(gridSize) {
        // super(gridSize, Number.MAX_SAFE_INTEGER)
        super(gridSize)
        // debugger
    }
    genSearch(nodesToAnimate, queueToAnimate) {
        this.genGrid();
        this.genEdges();
        let cur = document.getElementsByClassName(`start`)[0].id.split("-").map(el => parseInt(el));
        let newPos = undefined;
        const queue = {[cur]: 1}; this.grid[cur[0]][cur[1]] = 1;
        // debugger
        let done = false;
        
        while (Object.keys(queue).length > 0) {
            if (done) {
                cur = getQStop(queue);
                this.grid[cur[0]][cur[1]] = this.maxCnt;
                this.endPos = cur;
                // debugger
                return true; // if done, exit
            }
            cur = getQMin(queue);
            // debugger
            nodesToAnimate.push(cur)
            // if (this.getSquare(cur)!=="s") this.grid[cur[0]][cur[1]] = 1;
            for (let i=0;i<4;i++) {
                let d = this.dir[i];
                let e = this.edges[cur[0]][cur[1]][i];
                newPos = this.move(cur, d);
                if (e !== Number.MAX_SAFE_INTEGER && this.validMove(newPos)){ // valid edge and move
                    // debugger
                    if (this.getSquare(newPos) !== "s") { queueToAnimate.push(newPos); this.grid[newPos[0]][newPos[1]] = this.getSquare(cur) + e; }
                    else {
                        done = true;
                        this.maxCnt = this.getSquare(cur) + e;
                    }
                    queue[newPos] = this.getSquare(newPos);
                }
            }
        }
        // debugger
        return false;
    }
    validBacktrace(pos, val) {
        if (this.inBounds(pos) && this.notWall(pos))
            return this.getSquare(pos) !== 0 && this.getSquare(pos) <= val - 1;
        return false;
    }
    getShortestPath(nodesToAnimate) {
        // debugger
        if (!this.endPos) return false;
        let newPos; let cur = this.endPos;
        nodesToAnimate.unshift(cur);
        while (this.getSquare(cur) !== 1) {
            // debugger
            let min = Number.MAX_SAFE_INTEGER;
            let res = undefined;
            for (let d of this.dir) {
                newPos = this.move(cur, d);
                if (this.validBacktrace(newPos, this.getSquare(cur))) {
                    if(this.getSquare(newPos) <= min){
                        min = this.getSquare(newPos);
                        res = newPos;
                    }
                }
            }
            nodesToAnimate.unshift(res);
            cur = res;
        }
        // debugger
        return true;
    }
}

module.exports = {
    Dijkstra
}