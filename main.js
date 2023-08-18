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
        multiplier: 20
    }
    {
        name: 'fleet',
        price: 2000,
        quantity: 0,
        multiplier: 10
    }
];


let cheese = 350


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
}


// #endregion


function updateStats() {
    let pickaxe = clickUpgrades.find(upgrade => upgrade.name == 'pickaxe')
    let titanium = clickUpgrades.find(upgrade => upgrade.name == 'titanium')

    // let upgrades = clickUpgrades.forEach(upgrade => upgrade.quantity)
    //  ^ try to get this to work later in refactoring

    document.getElementById('totalMined').innerText = cheese.toString()
    document.getElementById('totalPickaxes').innerText = pickaxe.quantity.toString()
    document.getElementById('pickaxePower').innerText = titanium.quantity.toString()

    document.getElementById('costNext').innerText = pickaxe.price.toString()
    document.getElementById('costNextForge').innerText = titanium.price.toString()
    ///find latest cheese count
    // draw updated cheese count to screen
    // let keyStatsElem = document.getElementById('updateStats')
    // keyStatsElem = `Cheese: ${cheese}
    // <div>Cheese Spent: Inset string w/ cheese - purchases</div>
    // <div>Click Level: ${clickUpgrades.multiplier}</div>
    // <div></div>`
}
// if (pickaxe.quantity % 4 == 0) {
//     pickaxe.multiplier = (pickaxe.multiplier * 1.5)
// }