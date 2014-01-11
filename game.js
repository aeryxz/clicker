//resources
var bullshit = 0;
var code = 0;
var money = 20000;
var maintenance = 0;

//resource generators
var product = 0;
var developer = 0;
var productRate = 0.05;
var developerRate = 0.10;

//cost of next resource
var productCost = (product+1)*1.5;
var developerCost = (developer+1)*2;
var ideaCost = 5;
var incomeProducts = 0;

//
var ideasContainer = null;
var developerBuySellContainer = null;
var developerUnlocked = false;

//stop timer if player loses
var timer = 1000;

function printEconomy() {
    updateEconomy();
    if (developerUnlocked == false) {
	document.getElementById('playerEconomy').innerHTML = "<b>Economy</b></br>Lines of Bullshit: " + bullshit +"</br></p>";
	document.getElementById('playerGenerators').innerHTML = "<b>Eric GmbH</b></br>Money:  " + money + "</br>Product Managers: " + product +" </br>Maintenance Cost: " + maintenance + "</br>";
    }
    else {
	document.getElementById('playerEconomy').innerHTML = "<b>Economy</b></br>Lines of Bullshit: " + bullshit +"</br>Lines of Code: " + code +"</p>";
	document.getElementById('playerGenerators').innerHTML = "<b>Eric GmbH</b></br>Money:  " + money + "</br>Product Managers: " + product +" </br>Developers: " + developer + "</br>" + "</br>Maintenance Cost: " + maintenance + "</br>";
    }
    checkIdeas();
}

function updateEconomy() {
    //update costs
    productCost = (product+1)*1.5;
    developerCost = (developer+1)*2;
    //update economy
    bullshit += product*productRate;
    code += developer*developerRate;
    maintenance = (product*1.5) + (developer*3);
    money -= maintenance;

    if (money < 0) {
	alert("You LOSE!");
	timer = 0;
    }
}

function buyProductManager(){
    if (money > productCost) {
	money -= productCost;
	product++;
    }
}

function sellProductManager() {
    if (product > 0) {
	product--;
    }
}

function checkIdeas() {
    //check if bullshit is higher than the next idea cost, then increase idea cost
    //give a list of randomised ideas -> they have randomised values for: money, maintenance cost
    if (bullshit < ideaCost) {
	ideasContainer.innerHTML = '';
    }

    if (bullshit > ideaCost) {
	ideasContainer.innerHTML = '';
	var idea1 = document.createElement('button');
	idea1.innerHTML = 'f2p game';
	idea1.setAttribute('data-ideachosen', 'idea1');
	ideasContainer.appendChild(idea1);
	var idea2 = document.createElement('button');
	idea2.innerHTML = 'web 2.0 service';
	idea2.setAttribute('data-ideachosen', 'idea2');
	ideasContainer.appendChild(idea2);
    }

    //show dev buttons if unlocked
    
    if (developerUnlocked == true) {
	developerBuySellContainer = document.getElementById('developerBuySell');
	developerBuySellContainer.addEventListener('click', onDevClick, false);

	developerBuySellContainer.innerHTML = '';
	var buyDev = document.createElement('button');
	buyDev.innerHTML = '+1 DEV';
	buyDev.setAttribute('data-buttonchosen', 'buyDev');
	developerBuySellContainer.appendChild(buyDev);
	var sellDev = document.createElement('button');
	sellDev.innerHTML = '-1 DEV';
	sellDev.setAttribute('data-buttonchosen', 'sellDev');
	developerBuySellContainer.appendChild(sellDev);
    }
}

function startIdea() {
    alert("Idea starting");
}

//once idea has been chosen, unlock new resource generator -> developer. Dev makes new source: lines of code
//lines of code used to complete ideas
//completed ideas give randomised bonus to money and incomeProducts but then increase maintenance cost
//after first product, unlock maintenance tech tree (outsourcing)
//buying more outsource costs money but reduces maintenance
//if product is a successful one when income products > maintenance cost

//future: ABTest product -> randomise incomeProduct, randomise maintenance cost
//product + developer cap -> increase building size to increase population

function onChoiceClick(ev) {
    //console.log(ev.target.dataset.ideachosen);
    if (ev.target.dataset.ideachosen = 'idea1') {
	if (developerUnlocked == false) {
	    alert("You can now hire developers! Turn bullshit into code!")
	}
	developerUnlocked = true;
	bullshit -= ideaCost;
	ideaCost += 5;
    }
}

function onDevClick(ev) {
    console.log(ev.target.dataset.buttonchosen);
    if (ev.target.dataset.buttonchosen = 'buyDev') {
	if (bullshit > developerCost) {
	    bullshit -= developerCost;
	    alert("bullshit is "+bullshit + "dev cost is " + developerCost);
	    developer = developer + 1;
	    alert("developers: "+developer);
	}
    }

    if (ev.target.dataset.buttonchosen = 'sellDev') {
	if (developer > 0) {
	    //developer--; 
	    alert("developer: "+developer);
	}
    }
}

var buyProductManagerButton = document.getElementById('buyProductManagerButton');
buyProductManagerButton.addEventListener('click', buyProductManager, false);

var sellProductManagerButton = document.getElementById('sellProductManagerButton');
sellProductManagerButton.addEventListener('click', sellProductManager, false);

developerBuySellContainer = document.getElementById('developerBuySell');
developerBuySellContainer.addEventListener('click', onDevClick, false);
ideasContainer = document.getElementById('ideaChoices');
ideasContainer.addEventListener('click', onChoiceClick, false);

setInterval(printEconomy, timer);
