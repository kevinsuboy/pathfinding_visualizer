class gridAnimations {
    constructor(speed, nodesToAnimate){
        this.nodesToAnimate = nodesToAnimate;
        this.speed = speed === "fast" ? 0 :
                    speed === "average" ? 20 : 50;
    }
    animateNodes(type){
        // for(let i=0;i<this.nodesToAnimate.length;i++)
        //     this.animateNode(i);
        //     // setTimeout(()=>this.animateNode(i), i*this.speed);
        // debugger
        setTimeout(()=>this.animateNode(0,type), this.speed);
    }
    animateNode(idx,type){
        if(idx >= this.nodesToAnimate.length) return;
        let cur = this.nodesToAnimate[idx];
        cur = document.getElementById(`${cur[0]}-${cur[1]}`);
        // debugger
        switch(type){
            case "current":
                cur.classList.remove("unvisited");
                cur.classList.add("current");
                break;
            case "queued":
                cur.classList.remove("current");
                cur.classList.add("queued");
                break;
            case "visited":
                cur.classList.remove("queued");
                cur.classList.add("visited");
                break;
            default:
                break;
        }
        setTimeout(()=>this.animateNode(idx+1,type),this.speed);
    }
}

module.exports = {
    gridAnimations
}