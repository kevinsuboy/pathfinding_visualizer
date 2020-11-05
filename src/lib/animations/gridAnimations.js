class gridAnimations {
    constructor(speed, nodesToAnimate){
        this.nodesToAnimate = nodesToAnimate;
        this.speed = speed === "fast" ? 0 :
                    speed === "average" ? 20 : 50;
    }
    animateNodes(type, pathAnimate = () => {}){
        // for(let i=0;i<this.nodesToAnimate.length;i++)
        //     this.animateNode(i);
        //     // setTimeout(()=>this.animateNode(i), i*this.speed);
        // debugger
        setTimeout(() => this.animateNode(0, type, pathAnimate), this.speed);
    }
    animateNode(idx,type, pathAnimate){
        if(!(pathAnimate instanceof Function)) debugger;
        if(idx >= this.nodesToAnimate.length) return pathAnimate();
        let cur = this.nodesToAnimate[idx];
        if (!cur) debugger
        cur = document.getElementById(`${cur[0]}-${cur[1]}`);
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
            case "path":
                cur.classList.remove("visited");
                cur.classList.add("path");
                break;
            default:
                break;
        }
        setTimeout(()=>this.animateNode(idx+1,type, pathAnimate),this.speed);
    }
}

module.exports = {
    gridAnimations
}