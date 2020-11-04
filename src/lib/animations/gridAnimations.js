class gridAnimations {
    constructor(speed, nodesToAnimate){
        // debugger
        this.nodesToAnimate = nodesToAnimate;
        this.speed = speed === "fast" ? 0 :
                    speed === "average" ? 100 : 500;
    }
    animateNodes(){
        debugger
        for(let i=0;i<this.nodesToAnimate.length;i++)
            setTimeout(()=>this.animateNode(i), i*this.speed);
    }
    animateNode(idx){
        if(idx >= this.nodesToAnimate.length) return;
        let {cur,type} = this.nodesToAnimate[idx];
        cur = document.getElementById(`${cur[0]}-${cur[1]}`);
        switch(type){
            case "queued":
                cur.classList.add("queued");
            case "visited":
                cur.classList.remove("queued");
                cur.classList.add("visited");
        }
        // this.timeout(idx+1);
    }
}

module.exports = {
    gridAnimations
}