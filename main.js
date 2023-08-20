// #region - arrays and objects

let clickUpgrades = [
    {
        name: 'pickaxe',
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
        name: 'rover',
        price: 600,
        quantity: 0,
        multiplier: 20,
        img: 'https://media2.giphy.com/media/jbVIvd88wslIepMC1e/giphy.gif?cid=ecf05e47s28t40macs7wnrdqry65ki4r0pas33bxyr45bm9n&ep=v1_stickers_search&rid=giphy.gif&ct=s'
    },
    {
        name: 'fleet',
        price: 2000,
        quantity: 0,
        multiplier: 0,
        booster: 10,
        img: 'https://media4.giphy.com/media/WbV12NEGCooYOYkm07/giphy.gif?cid=ecf05e47a2tr7bodu3qa2vi5utkad20uyasr6vfcq6h244m1&ep=v1_stickers_search&rid=giphy.gif&ct=s'
    }
];

let purchase =
{
    name: 'sashimi',
    price: 10000,
    quantity: 0,

    img: 'https://media0.giphy.com/media/XIoaQjPAWLITuiz2XN/giphy.gif?cid=ecf05e47vl18pfz6bh8yc8uhsy25nnbqwgd8b94tj6j6ji0j&ep=v1_stickers_search&rid=giphy.gif&ct=s'
}
// #endregion
// *FIXME - this needs serious refactoring, hahaha

let fish = 0
let gameLength = 120000
let timeRemaining = 0
let players = []
let currentPlayer = {}
loadPlayers()


// #region - timing
function setPlayer(event) {
    event.preventDefault()
    let form = event.target

    let playerName = form.playerName.value
    currentPlayer = players.find(player => player.name == playerName)

    if (!currentPlayer) {
        currentPlayer = { name: playerName, topScore: 0 }
        players.push(currentPlayer)
        savePlayers()
    }
    form.reset()

    document.getElementById('target').classList.remove('hidden')
    document.getElementById('upgrades').classList.remove('hidden')
    console.log("Let's go fishing!")
    document.getElementById('player-form').classList.add('hidden')

}

function startGame() {
}

// #endregion

function mine() {
    let clickPower = 1
    let pickaxePower = 0

    clickUpgrades.forEach(upgrade => pickaxePower += upgrade.multiplier * upgrade.quantity)
    console.log(clickPower, pickaxePower)
    fish += clickPower + pickaxePower
    // fish += pickaxePower.multiplier
    // console.log('clicking moon')

    updateStats()
}


// #region - purchases

function buyPickaxe() {
    // do we have the resources?
    //  if yes, increase quant
    // if no, window alert
    let pickaxe = clickUpgrades.find(upgrade => upgrade.name == 'pickaxe')
    if (fish >= pickaxe.price) {

        pickaxe.quantity++
        fish = fish - pickaxe.price
        pickaxe.price = (pickaxe.price * 2.1).toFixed(0)

        console.log("did the buy")
    } else if (fish < pickaxe.price) {
        window.alert("You're short on cheddar")
        console.log('buy failed');
    }
    pickaxe.multiplier = pickaxe.multiplier * pickaxe.quantity
    updateStats()
}
function pickaxePower() {
    let pickaxePower = clickUpgrades.find(upgrade => upgrade.name == 'titanium')
    if (fish >= pickaxePower.price) {

        pickaxePower.quantity++
        fish = fish - pickaxePower.price
        pickaxePower.price = (pickaxePower.price * 5.3).toFixed(0)
        console.log('reforged ax life')
    } else if (fish < pickaxePower.price) {
        window.alert('Too poor, more sore')
        console.log("Turned away at smithy's");
    }
    let pickaxe = clickUpgrades.find(upgrade => upgrade.name == 'pickaxe')

    pickaxe.multiplier = pickaxe.quantity * (pickaxe.multiplier + pickaxePower.multiplier)
    updateStats()
}

function buySashimi() {
    if (fish >= purchase.price) {
        purchase.quantity++
        fish = fish - purchase.price
        purchase.price = (purchase.price * 7)
        console.log("Opera-goers sing your praises");
    }
    else if (fish < purchase.price) {
        window.alert("You can't serve such a trifling amount to opera-goers!")
        console.log("We cast at dawn!");
    }
    debugger
    drawSashimi()
    updateStats()
}
// #endregion



// #region - buy autos

function buyRover() {
    let rover = automaticUpgrades.find(upgrade => upgrade.name == 'rover')
    if (fish >= rover.price) {
        rover.quantity++
        fish = fish - rover.price
        rover.price = (rover.price * 4.1).toFixed(0)
        console.log("Expanding into the managerial class")
    } else if (fish < rover.price) {
        window.alert("You're not ready to delegate work to others")
        console.log("Back to the grind")
    }

    // rover.multiplier = rover.multiplier * rover.quantity
    // *FIXME - need to add draw or update functions and stats, probably both
    //   ^DRAW EACH ALLY OUT IN OWN FUNCTION <-- PHOTOS MESS UP OTHERWISE

    drawRover()
    updateStats()
}

function polishFleet() {
    let fleet = automaticUpgrades.find(upgrade => upgrade.name == 'fleet')

    if (fish >= fleet.price) {
        fleet.quantity++
        fish = fish - fleet.price
        fleet.price = (fleet.price * 7.1).toFixed(0)
        let rover = automaticUpgrades.find(upgrade => upgrade.name = 'rover')

        rover.multiplier = rover.multiplier + (fleet.quantity * fleet.booster)
        console.log("Wax on, wax off");
    } else if (fish < fleet.price) {
        window.alert("Have you tried our competitors?")
        console.log("Still striving")
    }
    drawFleet()
    updateStats()
}
// #endregion


//  will need get elem by id to be placed correctly

// function applyRover() {
//     let rover = automaticUpgrades.find(upgrade => upgrade.name == 'rover')
//     if (rover.quantity > 0) {
//         fish += rover.multiplier
//     }
//     updateStats()
// }

// function buyAutos(upgradeName) {

//     let autos = automaticUpgrades.find(upgrade => upgrade.name = upgradeName)
//     if (fish >= autos.price) {
//         autos.quantity++
//         fish = fish - autos.price
//         autos.price = (autos.price * 4.1).toFixed(0)
//         console.log("Expanding into the managerial class")
//     } else if (fish < autos.price) {
//         window.alert("You're not ready to delegate work to others")
//         console.log("Back to the grind")
//     }


//     drawAutos()
//     updateStats()
// }

// * FIXME - collective draw (failed)
function drawRover() {


    let autosTemplate = ``
    let rover = automaticUpgrades.find(auto => auto.name == 'rover')
    if (rover.quantity >= 1) {
        autosTemplate += `
        <div class="col-3 text-center">
<div>${rover.name}</div>
<img class="autos-card" src="${rover.img}" alt="">
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

    // fish += autoPower
    let rover = automaticUpgrades.find(auto => auto.name == 'rover')
    // automaticUpgrades.forEach(auto =>
    {
        if (rover.quantity >= 1) {
            autoPower += rover.multiplier * rover.quantity
            // fish += autoPower
            // document.getElementById('autoMining').innerText = autoPower.toString()
            fish += autoPower
        }
        // else if (rover.quantity > 1) {      }
        //     autoPower += rover.multiplier    }<---back when I tried to combine auto upgrades
        //     fish += autoPower             }
        // }
        // debugger
    }

    document.getElementById('autoMining').innerText = autoPower.toString()
    // autoPower == auto.quantity * auto.multiplier)
    // fish += autoPower
    console.log(autoPower);

    updateStats()
}

function updateStats() {
    let pickaxe = clickUpgrades.find(upgrade => upgrade.name == 'pickaxe')
    let titanium = clickUpgrades.find(upgrade => upgrade.name == 'titanium')
    let rover = automaticUpgrades.find(auto => auto.name == 'rover')
    let fleet = automaticUpgrades.find(auto => auto.name == 'fleet')
    let clickPower = 1

    // clickUpgrades.forEach(upgrade => upgrade.multiplier == rover.multiplier + fleet.multiplier)
    // document.getElementById('autos').innerText = clickUpgrades.toString()
    //  ^ try to get this to work later in refactoring
    // debugger
    document.getElementById('totalMined').innerText = fish.toString()
    document.getElementById('minedPerClick').innerText = (clickPower + (pickaxe.quantity * pickaxe.multiplier)).toString()
    // document.getElementById('autoMining').innerText = ((rover.multiplier) + (fleet.multiplier)).toString()


    document.getElementById('totalPickaxes').innerText = pickaxe.quantity.toString()
    document.getElementById('pickaxePower').innerText = titanium.quantity.toString()

    document.getElementById('costNext').innerText = pickaxe.price.toString()
    document.getElementById('costNextForge').innerText = titanium.price.toString()
    document.getElementById('costNextPenguin').innerText = rover.price.toString()
    document.getElementById('costNextShip').innerText = fleet.price.toString()
    document.getElementById('costNextSashimi').innerText = purchase.price.toString()

    document.getElementById('penguinTotal').innerText = rover.quantity.toString()
    document.getElementById('fleetTotal').innerText = fleet.quantity.toString()
    document.getElementById('sashimiTotal').innerText = purchase.quantity.toString()

    ///find latest fish count
    // draw updated fish count to screen
    // let keyStatsElem = document.getElementById('updateStats')
    // keyStatsElem = `fish: ${fish}
    // <div>fish Spent: Inset string w/ fish - purchases</div>
    // <div>Click Level: ${clickUpgrades.multiplier}</div>
    // <div></div>`
}


setInterval(applyAutos, 3000)
// if (pickaxe.quantity % 4 == 0) {
//     pickaxe.multiplier = (pickaxe.multiplier * 1.5)
// }