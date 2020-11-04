const toggleDropdown = (e) => {
    const isClicked  = e.currentTarget.classList.contains("clicked");
    const clicked = document.getElementsByClassName("clicked");
    for(let c of clicked){
        c.classList.remove("clicked");
        for (let i of c.getElementsByClassName("dropdown-content")) i.classList.remove("show");
    }
    if(!isClicked){
        e.currentTarget.classList.add("clicked");
        for(let i of e.currentTarget.getElementsByClassName("dropdown-content")) i.classList.add("show");
    }
}
const watchDropdown = () => {
    const dropdown = document.getElementsByClassName("dropdown");
    for(let d of dropdown)
        d.addEventListener("click", (e) => toggleDropdown(e))
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