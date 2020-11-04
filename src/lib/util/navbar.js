const clearDropdown = () => {
    const clicked = document.getElementsByClassName("clicked");
    while (clicked.length > 0) {
        for (let i of clicked[0].getElementsByClassName("dropdown-content")) i.classList.remove("show");
        clicked[0].classList.remove("clicked");
    }
}

const toggleDropdown = (e) => {
    const isClicked  = e.currentTarget.classList.contains("clicked");
    clearDropdown();
    if(!isClicked){
        e.currentTarget.classList.add("clicked");
        for(let i of e.currentTarget.getElementsByClassName("dropdown-content")) i.classList.add("show");
    }
}
const watchDropdown = () => {
    const dropdown = document.getElementsByClassName("dropdown");
    for(let d of dropdown)
        d.addEventListener("click", (e) => toggleDropdown(e))
    document.addEventListener("click", (e) => {
        if (!document.getElementById("global-nav").contains(e.target)){
            clearDropdown();
            // debugger
        }
    })
}

const watchSpeed = () => {
    
}

const watchAll = () => {
    watchDropdown();
    watchSpeed();
}

module.exports = {
    watchAll
}