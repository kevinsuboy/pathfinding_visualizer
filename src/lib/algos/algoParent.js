class algoParent {
    constructor(gridSize, initVal=0) {
        this.initVal = initVal;
        this.grid = new Array(gridSize[0]);
        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Array(gridSize[1]);
            for (let j = 0; j < gridSize[1]; j++)
                this.grid[i][j] = initVal;
        }
        this.nodesToAnimate = [];
        this.backtraceToAnimate = [];
        // debugger
        this.dir = [
            [0, 1],
            [-1, 0],
            [0, -1],
            [1, 0]
        ];
    }
    genGrid() {
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
    resetGrid() {
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++)
                this.grid[i][j] = this.initVal;
        }
    }
    execute(nodesToAnimate, queueToAnimate, backtraceToAnimate) {
        // debugger
        this.genSearch(nodesToAnimate,queueToAnimate);
        this.getShortestPath(backtraceToAnimate);
    }
    move(pos, d) {
        return [pos[0] + d[0], pos[1] + d[1]];
    }
    getSquare(pos) {
        // debugger
        return this.grid[pos[0]][pos[1]]
    }
    inBounds(pos) { return (pos[0] >= 0 && pos[0] < this.grid.length && pos[1] >= 0 && pos[1] < this.grid[0].length) }
    notWall(pos){ return this.getSquare(pos) !== -1}
    validMove(pos) {
        if (this.inBounds(pos) && this.notWall(pos))
            return this.getSquare(pos) === 0 || this.getSquare(pos) === "s";
        return false;
    }
}

module.exports = {
    algoParent
}