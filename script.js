const map = {}

function createCheckersField(x, y) {
    const bx = document.createElement("div")

    if (x % 2 != y % 2) {
        bx.classList.add("box")
    } else {
        bx.classList.add("box", "black")
    }

    bx.style.left = (x * 52) + "px"
    bx.style.top = (y * 52) + "px"

    document.querySelector("body").appendChild(bx)

    map[x + "-" + y] = {
        box: bx,
        chip: null
    }


    bx.addEventListener("click", ev => {
        const chp = document.querySelector(".chip.selected")
        if (chp != undefined) {
            if (map[x + "-" + y].chip == null){
                chp.classList.remove("selected")
                moveChip(x, y, chp)
            }
        }
    })
}

function moveChip(x, y, chp) {
    chp.style.left = (x * 52) + "px"
    chp.style.top = (y * 52) + "px"
    map[chp.x + "-" + chp.y].chip = null
    map[x + "-" + y].chip = chp
    chp.x = x
    chp.y = y
}


function createPlayingChip(x, y, isWhite) {
    const chp = document.createElement("div")
    if (x % 2 == y % 2) {
        if (isWhite != true) {
            chp.classList.add("chip", "pink")
        } else {
            chp.classList.add("chip", "white", "pink")
        }
    }

    chp.style.left = (x * 52) + "px"
    chp.style.top = (y * 52) + "px"
    document.querySelector("body").appendChild(chp)

    map[x + "-" + y].chip = chp
    chp.x = x
    chp.y = y

    chp.addEventListener("click", ev => {
        addSelected(chp)
    })
    chp.addEventListener("mouseout", ev => {
        chp.classList.remove("red")
    })
}


function addSelected(chp) {
    const oldChip = document.querySelector(".chip.selected")
    if (oldChip != undefined){
        chp.classList.add("red")
    }else {
        chp.classList.add("selected")
    }

}



const size = 8
for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
        createCheckersField(x, y)
        if (y < 3) {
            createPlayingChip(x, y, false)
        }
        if (y > size - 4) {
            createPlayingChip(x, y, true)
        }
    }
}
console.log(map)
