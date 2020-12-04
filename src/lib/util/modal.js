class Modal {
    constructor(){
        this.modal = 1;
        document.getElementsByClassName("modal-content-1")[0].style.display = "flex";
        document.getElementById("prev-tutorial").style.display = "none";
    }
    watchAll() {
        this.watchOutside();
        this.watchnextModal();
        this.watchprevModal();
        this.watchskipModal();
    }
    watchOutside() {
        document.addEventListener("click", (e) => {
            // debugger
            const modal_content = document.getElementsByClassName("modal-content");
            for(let mc of modal_content){
                // debugger
                if(!mc.contains(e.target)){
                    this.clearModal();
                }
            }
        })
    }
    clearModal() {
        for(let el of document.getElementsByClassName("modal")){
            el.style.display = "none";
        }
    }
    updateModal(tutorial, i) {
        if (this.modal + i < 1) return 
        if (this.modal + i > 8) this.clearModal();
        tutorial.getElementsByClassName(`modal-content-${this.modal}`)[0].style.display = "none"
        this.modal += i;
        tutorial.getElementsByClassName(`modal-content-${this.modal}`)[0].style.display = "flex"
        tutorial.getElementsByClassName(`modal-content-pg`)[0].innerHTML = `<p>${this.modal}/9</p>`
        if (this.modal === 1){
            document.getElementById("prev-tutorial").style.display = "none";
        }else{
            document.getElementById("prev-tutorial").style.display = "flex";
        }
        if (this.modal === 8){
            document.getElementById("next-tutorial").innerText = "Finish";
        }else{
            document.getElementById("next-tutorial").innerText = "Next";
        }
    }
    watchprevModal() {
        const prev = document.getElementById("prev-tutorial");
        const tutorial = document.getElementById("tutorial");
        prev.addEventListener("click", (e) => {
            this.updateModal(tutorial, -1);
        })
    }
    watchnextModal() {
        const next = document.getElementById("next-tutorial");
        const tutorial = document.getElementById("tutorial");
        next.addEventListener("click", (e) => {
            this.updateModal(tutorial, 1);
        })    
    }
    watchskipModal() {
        const skip = document.getElementById("skip-tutorial");
        skip.addEventListener("click", (e) => {
            this.clearModal();
        })
    }
}

module.exports = {
    Modal
}