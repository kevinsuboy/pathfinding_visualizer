const watchAll = () => {
    watchOutside();
}
const watchOutside = () => {
    document.addEventListener("click", (e) => {
        debugger
        let outside = false;
        const modal_content = document.getElementsByClassName("modal-content");
        for(let mc of modal_content){
            if(!mc.contains(e.target)){
                outside = true;
                break;
            }
        }

        if (outside) {
            clearModal();
            // debugger
        }
    })
}
const clearModal = () => {
    for(let el of document.getElementsByClassName("modal")){
        el.style.display = "none";
    }
}
module.exports = {
    watchAll
}