// #region - arrays and objects

let clickUpgrades = [
    {
        name: 'speargun',
        price: 100,
        quantity: 0,
        multiplier: 1
    },
    {
        name: 'titanium',
        price: 250,
        quantity: 0,
        multiplier: 4,

    }
];

let automaticUpgrades = [
    {
        name: 'penguin',
        price: 600,
        quantity: 0,
        multiplier: 250,
        img: 'https://media2.giphy.com/media/jbVIvd88wslIepMC1e/giphy.gif?cid=ecf05e47s28t40macs7wnrdqry65ki4r0pas33bxyr45bm9n&ep=v1_stickers_search&rid=giphy.gif&ct=s'
    },
    {
        name: 'fleet',
        price: 2000,
        quantity: 0,
        multiplier: 0,
        booster: 1000,
        img: 'https://media4.giphy.com/media/WbV12NEGCooYOYkm07/giphy.gif?cid=ecf05e47a2tr7bodu3qa2vi5utkad20uyasr6vfcq6h244m1&ep=v1_stickers_search&rid=giphy.gif&ct=s'
    }
];

let purchase =
{
    name: 'sashimi',
    price: 8000,
    quantity: 0,

    img: 'https://media0.giphy.com/media/XIoaQjPAWLITuiz2XN/giphy.gif?cid=ecf05e47vl18pfz6bh8yc8uhsy25nnbqwgd8b94tj6j6ji0j&ep=v1_stickers_search&rid=giphy.gif&ct=s'
}

let endGame =
{
    win: 'https://media3.giphy.com/media/bW7WgIA6WBxXVYAXub/giphy.gif?cid=ecf05e47hdof96ftfhcevpoyfak0qiymfw8qi8vhvxgywslz&ep=v1_gifs_related&rid=giphy.gif&ct=g',
    lose: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWs3MDV3NnYybHljcmlwMTV3N2NsZzY3Z2VseWlnaXR5b2swMjg0aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/loSCq3ARI8HGnVAMqk/giphy.gif'
}

// #endregion
// *FIXME - this needs serious refactoring, hahaha

let caviar = 0
let gameLength = 180000
let timeRemaining = 0
let clockID = 0
// let players = []
// let currentPlayer = {}
// loadPlayers()


// *ANCHOR -
// #region - timing
// function setPlayer(event) {
//     event.preventDefault()
//     let form = event.target

//     let playerName = form.playerName.value
//     currentPlayer = players.find(player => player.name == playerName)

//     if (!currentPlayer) {
//         currentPlayer = { name: playerName, topScore: 0 }
//         players.push(currentPlayer)
//         savePlayers()
//     }
//     form.reset()

//     document.getElementById('player-form').classList.add('hidden')

// }

function startGame() {
    // document.getElementById('target').classList.remove('hidden')
    // document.getElementById('upgrades').classList.remove('hidden')
    // console.log("Let's go caviaring!")
    let caviar = 0
    document.getElementById('totalMined').innerText = caviar.toFixed(0)
    clickUpgrades.forEach(upgrade => upgrade.quantity == 0)
    automaticUpgrades.forEach(upgrade => upgrade.quantity == 0)
    updateStats()
    startClock()
    setTimeout(stopGame, gameLength)
}

function startClock() {
    let caviar = 0
    timeRemaining = gameLength
    drawClock()
    clockID = setInterval(drawClock, 1000)
    // gameReset()
    updateStats()
}

function stopClock() {
    clearInterval(clockID)

}

function drawClock() {
    let countdownElem = document.getElementById('countdown')
    countdownElem.innerText = (timeRemaining / 1000).toString()
    timeRemaining -= 1000
}

function stopGame() {
    window.alert("The curtain is rising!")
    let endTemplate = ``

    if (purchase.quantity >= 10) {
        endTemplate += `
        <img src="${endGame.win}">
        `
        confirm("Congratulations, you did it! Take your free tickets to closing night, let someone else handle the next run.")
        document.location.reload()

    } else if (purchase.quantity < 10) {
        endTemplate += `
        <img src="${endGame.lose}">
        `
        confirm("The director would like a word..., perhaps you can convince him to give you another shot?")
        document.location.reload()

    }
    // document.getElementById('target').innerHTML = endTemplate
    // stopClock()
}

// *FIXME - poorly functioning pass at logic that still doesn't work

// function gameReset() {

//     let caviar = 0
//     debugger
//     document.getElementById('totalMined').innerText = caviar.toString()
//     console.log(caviar)
//     clickUpgrades.forEach(upgrade => upgrade.quantity = 0)
//     automaticUpgrades.forEach(upgrade => upgrade.quantity = 0)
//     // let countdownElem = document.getElementById('countdown')
//     // document.getElementById('autoMining').innerText = autoPower.toString()
//     // countdownElem.innerText = countdownElem.toString()
//     timeRemaining = gameLength
//     clearInterval(clockID)
//     updateStats()
// }
// #endregion

function mine() {
    let clickPower = 1
    let speargunPower = 0

    if (caviar == 0) {
        startGame()
    }

    clickUpgrades.forEach(upgrade => speargunPower += upgrade.multiplier * upgrade.quantity)
    console.log(clickPower, speargunPower)
    caviar += clickPower + speargunPower
    // caviar += speargunPower.multiplier
    // console.log('clicking moon')

    updateStats()
}


// *ANCHOR -  #region - purchases

function buySpeargun() {
    // do we have the resources?
    //  if yes, increase quant
    // if no, window alert
    let speargun = clickUpgrades.find(upgrade => upgrade.name == 'speargun')
    if (caviar >= speargun.price) {

        speargun.quantity++
        caviar = caviar - speargun.price
        if (speargun.price < 10000) {
            speargun.price = ((speargun.price * 2) ** 1.2).toFixed(0)
        } else if (speargun.price >= 10000) { speargun.price = ((speargun.price * 2) ** 1.2).toExponential(4) }


        console.log("did the buy")
    } else if (caviar < speargun.price) {
        window.alert("You're short on cheddar")
        console.log('buy failed');
    }
    speargun.multiplier = speargun.multiplier * speargun.quantity
    updateStats()
}
function speargunPower() {
    let speargunPower = clickUpgrades.find(upgrade => upgrade.name == 'titanium')
    if (caviar >= speargunPower.price) {

        speargunPower.quantity++
        caviar = caviar - speargunPower.price
        if (speargunPower.price < 10000) {
            speargunPower.price = ((speargunPower.price * 2.3) ** 1.5).toFixed(0)
        } else if (speargunPower.price >= 10000) { speargunPower.price = ((speargunPower.price * 2.3) ** 1.5).toExponential(4) }

        console.log('reforged ax life')
    } else if (caviar < speargunPower.price) {
        window.alert('Too poor, more sore')
        console.log("Turned away at smithy's");
    }
    let speargun = clickUpgrades.find(upgrade => upgrade.name == 'speargun')

    speargun.multiplier = speargun.quantity * (speargun.multiplier + speargunPower.multiplier)
    updateStats()
}

function buySashimi() {
    if (caviar >= purchase.price) {
        purchase.quantity++
        caviar = caviar - purchase.price
        if (purchase.price < 10000) { purchase.price = (purchase.price * 7).toFixed(0) }
        else if (purchase.price >= 10000) {
            purchase.price = (purchase.price * 7).toExponential(4)
        }
        console.log("Opera-goers sing your praises");
    }
    else if (caviar < purchase.price) {
        window.alert("You can't serve such a trifling amount to opera-goers!")
        console.log("We cast at dawn!");
    }

    drawSashimi()
    updateStats()
}
// #endregion



// *ANCHOR -  #region - buy autos

function buyPenguin() {
    let penguin = automaticUpgrades.find(upgrade => upgrade.name == 'penguin')
    if (caviar >= penguin.price) {
        penguin.quantity++
        caviar = caviar - penguin.price
        if (penguin.price < 10000) {
            penguin.price = (penguin.price * 2.8).toFixed(0)
        } else if (penguin.price >= 10000) {
            penguin.price = (penguin.price * 2.8).toExponential(4)
        }
        console.log("Expanding into the managerial class")
    } else if (caviar < penguin.price) {
        window.alert("You're not ready to delegate work to others")
        console.log("Back to the grind")
    }

    // penguin.multiplier = penguin.multiplier * penguin.quantity
    // *FIXME - need to add draw or update functions and stats, probably both
    //   ^DRAW EACH ALLY OUT IN OWN FUNCTION <-- PHOTOS MESS UP OTHERWISE

    drawPenguin()
    updateStats()
}

function polishFleet() {
    let fleet = automaticUpgrades.find(upgrade => upgrade.name == 'fleet')

    if (caviar >= fleet.price) {
        fleet.quantity++
        caviar = caviar - fleet.price
        if (fleet.price < 10000) {
            fleet.price = (fleet.price * 6.8).toFixed(0)
        } else if (fleet.price >= 10000) {
            fleet.price = (fleet.price * 6.8).toExponential(4)
        }
        let penguin = automaticUpgrades.find(upgrade => upgrade.name = 'penguin')

        penguin.multiplier = penguin.multiplier + (fleet.quantity * (fleet.booster) ** 1.8)
        console.log("Wax on, wax off");
    } else if (caviar < fleet.price) {
        window.alert("Have you tried our competitors?")
        console.log("Still striving")
    }
    drawFleet()
    updateStats()
}
// #endregion


//  will need get elem by id to be placed correctly

// function applyPenguin() {
//     let penguin = automaticUpgrades.find(upgrade => upgrade.name == 'penguin')
//     if (penguin.quantity > 0) {
//         caviar += penguin.multiplier
//     }
//     updateStats()
// }

// function buyAutos(upgradeName) {

//     let autos = automaticUpgrades.find(upgrade => upgrade.name = upgradeName)
//     if (caviar >= autos.price) {
//         autos.quantity++
//         caviar = caviar - autos.price
//         autos.price = (autos.price * 4.1).toFixed(0)
//         console.log("Expanding into the managerial class")
//     } else if (caviar < autos.price) {
//         window.alert("You're not ready to delegate work to others")
//         console.log("Back to the grind")
//     }


//     drawAutos()
//     updateStats()
// }

//  *ANCHOR - 
//  #region - draws
// * FIXME - collective draw (failed)

function drawPenguin() {


    let autosTemplate = ``
    let penguin = automaticUpgrades.find(auto => auto.name == 'penguin')
    if (penguin.quantity >= 1) {
        autosTemplate += `
        <div class="col-3 text-center">
<div>${penguin.name}</div>
<img class="autos-card" src="${penguin.img}" alt="">
</div>
`

    }
    document.getElementById('drawPenguin').innerHTML = autosTemplate
}

function drawFleet() {


    let autosTemplate = ``
    let fleet = automaticUpgrades.find(auto => auto.name == 'fleet')
    if (fleet.quantity >= 1) {
        autosTemplate += `
        <div class="col-3 text-center">
        <div>${fleet.name}</div>
        <img class="autos-card" src="${fleet.img}" alt="">
        </div>
`

    }
    document.getElementById('drawFleet').innerHTML = autosTemplate
}

function drawSashimi() {
    let purchaseTemplate = ``
    if (purchase.quantity >= 1) {
        purchaseTemplate +=
            `
        <div class="col-3 text-center">
        <div>${purchase.name}</div>
        <img class="autos-card" src="${purchase.img}" alt="">
        </div>
        `
    }
    document.getElementById('drawSashimi').innerHTML = purchaseTemplate
}
// function drawAutos() {


//     let autosTemplate = ``
//     automaticUpgrades.forEach(auto => {
//         if (auto.quantity >= 1) {
//             autosTemplate += `
// <div class="col-3 text-center">
// <div>${auto.name}</div>
// <img class="autos-card" src="${auto.img}" alt="">
// </div>
// `
//         }
//     })
//     document.getElementById('drawAutos').innerHTML = autosTemplate
// }
// #endregion


// maybe separate click and auto stats

function applyAutos() {
    let autoPower = 0
    // for (let i = 0; i <= automaticUpgrades.length; i++) {
    //     let upgrade = automaticUpgrades[i]
    //     autoPower += upgrade.quantity * upgrade.multiplier
    // }

    // caviar += autoPower
    let penguin = automaticUpgrades.find(auto => auto.name == 'penguin')
    // automaticUpgrades.forEach(auto =>
    {
        if (penguin.quantity >= 1) {
            autoPower += penguin.multiplier * penguin.quantity
            // caviar += autoPower
            // document.getElementById('autoMining').innerText = autoPower.toString()
            caviar += autoPower
        }
        // else if (penguin.quantity > 1) {      }
        //     autoPower += penguin.multiplier    }<---back when I tried to combine auto upgrades
        //     caviar += autoPower             }
        // }
        // debugger
    }
    if (caviar < 10000) {
        document.getElementById('autoMining').innerText = autoPower.toFixed(0)
    } else if (caviar >= 10000) {
        document.getElementById('autoMining').innerText = autoPower.toExponential(4)
    }

    // autoPower == auto.quantity * auto.multiplier)
    // caviar += autoPower

    updateStats()
}

function updateStats() {
    let speargun = clickUpgrades.find(upgrade => upgrade.name == 'speargun')
    let titanium = clickUpgrades.find(upgrade => upgrade.name == 'titanium')
    let penguin = automaticUpgrades.find(auto => auto.name == 'penguin')
    let fleet = automaticUpgrades.find(auto => auto.name == 'fleet')
    let clickPower = 1

    // clickUpgrades.forEach(upgrade => upgrade.multiplier == penguin.multiplier + fleet.multiplier)
    // document.getElementById('autos').innerText = clickUpgrades.toString()
    //  ^ try to get this to work later in refactoring
    // debugger
    if (caviar < 10000) {
        document.getElementById('totalMined').innerText = caviar.toFixed(0)
        document.getElementById('minedPerClick').innerText = (clickPower + (speargun.quantity * speargun.multiplier)).toFixed(0)
    }
    else if (caviar >= 10000) {
        document.getElementById('totalMined').innerText = caviar.toExponential(4)
        document.getElementById('minedPerClick').innerText = (clickPower + (speargun.quantity * speargun.multiplier)).toExponential(4)
    }

    // document.getElementById('autoMining').innerText = ((penguin.multiplier) + (fleet.multiplier)).toString()


    document.getElementById('totalSpearguns').innerText = speargun.quantity.toString()
    document.getElementById('speargunPower').innerText = titanium.quantity.toString()

    document.getElementById('costNext').innerText = speargun.price.toString()
    document.getElementById('costNextForge').innerText = titanium.price.toString()
    document.getElementById('costNextPenguin').innerText = penguin.price.toString()
    document.getElementById('costNextShip').innerText = fleet.price.toString()
    document.getElementById('costNextSashimi').innerText = purchase.price.toString()

    document.getElementById('penguinTotal').innerText = penguin.quantity.toString()
    document.getElementById('fleetTotal').innerText = fleet.quantity.toString()
    document.getElementById('sashimiTotal').innerText = purchase.quantity.toString()

    ///find latest caviar count
    // draw updated caviar count to screen
    // let keyStatsElem = document.getElementById('updateStats')
    // keyStatsElem = `caviar: ${caviar}
    // <div>caviar Spent: Inset string w/ caviar - purchases</div>
    // <div>Click Level: ${clickUpgrades.multiplier}</div>
    // <div></div>`
}


setInterval(applyAutos, 3000)
// if (speargun.quantity % 4 == 0) {
//     speargun.multiplier = (speargun.multiplier * 1.5)
// }