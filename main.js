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
        multiplier: 10,
        img: 'https://media4.giphy.com/media/WbV12NEGCooYOYkm07/giphy.gif?cid=ecf05e47a2tr7bodu3qa2vi5utkad20uyasr6vfcq6h244m1&ep=v1_stickers_search&rid=giphy.gif&ct=s'
    }
];

// *FIXME - this needs serious refactoring, hahaha

let cheese = 10000


function mine() {
    let pickaxePower = 1

    clickUpgrades.forEach(upgrade => pickaxePower += upgrade.multiplier * upgrade.quantity)
    console.log(pickaxePower)
    cheese += pickaxePower
    // cheese += pickaxePower.multiplier
    // console.log('clicking moon')

    updateStats()
}


// #region - purchases

function buyPickaxe() {
    // do we have the resources?
    //  if yes, increase quant
    // if no, window alert
    let pickaxe = clickUpgrades.find(upgrade => upgrade.name == 'pickaxe')
    if (cheese >= pickaxe.price) {

        pickaxe.quantity++
        cheese = cheese - pickaxe.price
        pickaxe.price = (pickaxe.price * 2.1).toFixed(0)

        console.log("did the buy")
    } else if (cheese < pickaxe.price) {
        window.alert("You're short on cheddar")
        console.log('buy failed');
    }
    pickaxe.multiplier = pickaxe.multiplier * pickaxe.quantity
    updateStats()
}
function pickaxePower() {
    let pickaxePower = clickUpgrades.find(upgrade => upgrade.name == 'titanium')
    if (cheese >= pickaxePower.price) {

        pickaxePower.quantity++
        cheese = cheese - pickaxePower.price
        pickaxePower.price = (pickaxePower.price * 5.3).toFixed(0)
        console.log('reforged ax life')
    } else if (cheese < pickaxePower.price) {
        window.alert('Too poor, more sore')
        console.log("Turned away at smithy's");
    }
    let pickaxe = clickUpgrades.find(upgrade => upgrade.name == 'pickaxe')

    pickaxe.multiplier = pickaxe.quantity * (pickaxe.multiplier + pickaxePower.multiplier)
    updateStats()
}

// #endregion



// #region - autos

function buyRover() {
    let rover = automaticUpgrades.find(upgrade => upgrade.name == 'rover')
    if (cheese >= rover.price) {
        rover.quantity++
        cheese = cheese - rover.price
        rover.price = (rover.price * 4.1).toFixed(0)
        console.log("Expanding into the managerial class")
    } else if (cheese < rover.price) {
        window.alert("You're not ready to delegate work to others")
        console.log("Back to the grind")
    }

    rover.multiplier = rover.multiplier * rover.quantity
    // *FIXME - need to add draw or update functions and stats, probably both
    //   ^DRAW EACH ALLY OUT IN OWN FUNCTION <-- PHOTOS MESS UP OTHERWISE

    drawRover()
}

function polishFleet() {
    let fleet = automaticUpgrades.find(upgrade => upgrade.name == 'fleet')

    if (cheese >= fleet.price) {
        fleet.quantity++
        cheese = cheese - fleet.price
        fleet.price = (fleet.price * 7.1).toFixed(0)
        console.log("Wax on, wax off");
    } else if (cheese < fleet.price) {
        window.alert("Have you tried our competitors?")
        console.log("Still striving")
    }
    let rover = automaticUpgrades.find(upgrade => upgrade.name = 'rover')

    rover.multiplier = rover.quantity * (rover.multiplier + fleet.multiplier)
    drawFleet()
    updateStats()
}

//  will need get elem by id to be placed correctly

function applyRover() {
    let rover = automaticUpgrades.find(upgrade => upgrade.name == 'rover')
    if (rover.quantity > 0) {
        cheese += rover.multiplier
    }
    updateStats()
}

// function buyAutos(upgradeName) {

//     let autos = automaticUpgrades.find(upgrade => upgrade.name = upgradeName)
//     if (cheese >= autos.price) {
//         autos.quantity++
//         cheese = cheese - autos.price
//         autos.price = (autos.price * 4.1).toFixed(0)
//         console.log("Expanding into the managerial class")
//     } else if (cheese < autos.price) {
//         window.alert("You're not ready to delegate work to others")
//         console.log("Back to the grind")
//     }


//     drawAutos()
//     updateStats()
// }

// function applyAutos() {
//     let autoPower = 0
//     automaticUpgrades.forEach(auto => autoPower == auto.quantity * auto.multiplier)
//     cheese += autoPower
//     console.log(autoPower);
//     document.getElementById('autoMining').innerText = autoPower.toString()

// }
// * FIXME - collective draw
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
function updateStats() {
    let pickaxe = clickUpgrades.find(upgrade => upgrade.name == 'pickaxe')
    let titanium = clickUpgrades.find(upgrade => upgrade.name == 'titanium')
    let rover = automaticUpgrades.find(auto => auto.name == 'rover')
    let fleet = automaticUpgrades.find(auto => auto.name == 'fleet')


    // clickUpgrades.forEach(upgrade => upgrade.multiplier == rover.multiplier + fleet.multiplier)
    // document.getElementById('autos').innerText = clickUpgrades.toString()
    //  ^ try to get this to work later in refactoring

    document.getElementById('totalMined').innerText = cheese.toString()
    document.getElementById('minedPerClick').innerText = pickaxe.multiplier.toString()
    // document.getElementById('autoMining').innerText = ((rover.multiplier) + (fleet.multiplier)).toString()


    document.getElementById('totalPickaxes').innerText = pickaxe.quantity.toString()
    document.getElementById('pickaxePower').innerText = titanium.quantity.toString()

    document.getElementById('costNext').innerText = pickaxe.price.toString()
    document.getElementById('costNextForge').innerText = titanium.price.toString()

    // document.getElementById('penguinTotal').innerText = rover.quantity.toString()
    // document.getElementById('fleetTotal').innerText = fleet.quantity.toString()
    ///find latest cheese count
    // draw updated cheese count to screen
    // let keyStatsElem = document.getElementById('updateStats')
    // keyStatsElem = `Cheese: ${cheese}
    // <div>Cheese Spent: Inset string w/ cheese - purchases</div>
    // <div>Click Level: ${clickUpgrades.multiplier}</div>
    // <div></div>`
}


// setInterval(applyAutos, 3000)
// if (pickaxe.quantity % 4 == 0) {
//     pickaxe.multiplier = (pickaxe.multiplier * 1.5)
// }