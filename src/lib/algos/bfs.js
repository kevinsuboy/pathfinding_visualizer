class BFS {
    constructor(gridSize){
        this.grid = new Array(gridSize[0]);
        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Array(gridSize[1]);
            for (let j = 0; j < gridSize[1]; j++)
                this.grid[i][j] = 0;
        }
        this.nodesToAnimate = [];
        this.backtraceToAnimate = [];
        // debugger
        this.dir = [
            [ 0, 1],
            [ 1, 0],
            [-1, 0],
            [ 0,-1]
        ];
    }
    genGrid(){
        this.resetGrid();
        //! Drop Stop
        const stop = document.getElementsByClassName("stop")[0].id.split("-").map(el => parseInt(el));
        this.grid[stop[0]][stop[1]] = "s";
        // Drop Walls
        const walls = document.getElementsByClassName("wall");
        for (let w of walls) {
            let [x, y] = w.id.split("-").map(el => parseInt(el));
            this.grid[x][y] = -1;
        }
    }
    resetGrid(){
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++)
                this.grid[i][j] = 0;
        }
    }
    execute(nodesToAnimate, backtraceToAnimate){
        this.genSearch(nodesToAnimate); this.getShortestPath(backtraceToAnimate);
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
    move(pos, d){
        return [pos[0]+d[0],pos[1]+d[1]];
    }
    getSquare(pos){
        // debugger
        return this.grid[pos[0]][pos[1]]
    }
    inBounds(pos){ return (pos[0] >= 0 && pos[0] < this.grid.length && pos[1] >= 0 && pos[1] < this.grid[0].length)}
    validMove(pos){
        if (this.inBounds(pos))
            return this.getSquare(pos) === 0 || this.getSquare(pos) === "s";
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