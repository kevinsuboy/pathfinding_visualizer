const toggleDropdown = (el) => {
    const isClicked  = el.classList.contains("clicked");
    const clicked = document.getElementsByClassName("clicked");
    for(let c of clicked){
        c.classList.remove("clicked");
        for (let i of c.getElementsByClassName("dropdown-content")) i.classList.remove("show");
    }
    if(!isClicked){
        el.classList.add("clicked");
        for(let i of el.getElementsByClassName("dropdown-content")) i.classList.add("show");
    }
}
const watchDropdown = () => {
    const dropdown = document.getElementsByClassName("dropdown");
    for(let d of dropdown){
        d.addEventListener("click", () => toggleDropdown(d))
    }
}

module.exports = {
    watchDropdown
}