export const generateInt = (int) => Math.floor(Math.random() * int); 

export const getQStop = (queue) => {
    // debugger
    let keys = Object.keys(queue);
    for(let pos of keys){
        if (queue[pos] === "s") return pos.split(",").map(el => parseInt(el));
    }
    return null;
}
export const getQMin = (queue) => {
    let min = Number.MAX_SAFE_INTEGER;
    let res = undefined;
    Object.keys(queue).forEach(pos => {
        if(queue[pos] < min){
            res = pos;
            min = queue[pos];
        }
    })
    // debugger
    delete queue[res];
    return res.split(",").map(el => parseInt(el));
}

export const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}