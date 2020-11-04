class BFS {
    constructor(gridSize){
        this.grid = new Array(gridSize[0]);
        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Array(gridSize[1]);
            for(let j=0; j<gridSize[1];j++)
                this.grid[i][j] = 0;
        }
        const stop = document.getElementsByClassName("stop")[0].id.split("-").map(el => parseInt(el));
        this.grid[stop[0]][stop[1]] = 3;
        const walls = document.getElementsByClassName("wall");
        // debugger
        for(let w of walls){
            let [x,y] = w.id.split("-").map(el => parseInt(el));
            this.grid[x][y] = -1;
        }
        // debugger
        this.dir = [
            [ 0, 1],
            [ 1, 0],
            [-1, 0],
            [ 0,-1]
        ];
    }
    execute(nodesToAnimate, instant){
        const instantvisited = [];
        let cur = document.getElementsByClassName(`start`)[0].id.split("-").map(el=>parseInt(el));
        let newPos = undefined;
        const queue = [cur];
        
        while(queue.length > 0){
            cur = queue.shift();
            // debugger
            if (instant) instantvisited.push(cur);
            else nodesToAnimate.push(cur)
            if (this.getSquare(cur) === 5){
                return true; // if done, exit
            }
            this.grid[cur[0]][cur[1]] = 1;
            for(let d of this.dir){
                newPos = this.move(cur, d);
                // debugger
                if(this.validMove(newPos)){
                    this.grid[newPos[0]][newPos[1]] += 2;
                    queue.push(newPos);
                }
            }
            // debugger
        }
    }
    move(pos, d){
        return [pos[0]+d[0],pos[1]+d[1]];
    }
    getSquare(pos){
        // debugger
        return this.grid[pos[0]][pos[1]]
    }
    validMove(pos){
        // debugger
        if (pos[0] >= 0 && pos[0] < this.grid.length &&
                pos[1] >= 0 && pos[1] < this.grid[0].length)
            return this.getSquare(pos) === 0 || this.getSquare(pos) === 3;
        return false;
    }
}

module.exports = {
    BFS
}