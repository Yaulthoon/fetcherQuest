const shopAvalon =
	"<select id = 'currentItem'>" +
	"<option value = 'campingSupplies'>Camping Supplies</option>" +
	"<option value = 'cypressStick'>Cypress Stick</option>" +
	"<option value = 'bronzeSword'>Bronze Sword</option>" +
	"<option value = 'travelersTunic'>Traveler's Tunic</option>" +
	"</select>" + "</br>" +
	"<button onclick = 'addToCart()'>Purchase</button>" +
	"<button onclick = 'sellBack()'>Sell</button>";

function openShop (cFunction, town) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState === 4 & this.status === 200) {
			cFunction(this, town);
		}
	};
	xhttp.open('GET', 'fetcherShops.xml', true);
	xhttp.send();
}

function stockShop (xml, town) {
	var i = 0;
	var table = "<tr><th>Item</th><th>Cost</th><th>Description</th></tr>";
	var xmlDoc = xml.responseXML;
	var products = xmlDoc.getElementsByTagName('product');
	document.getElementById('eventboard').innerHTML +=
	"<table id ='shop' cellspacing = '0' cellpadding = '0'></table>";
	for (i; i < products.length; i++) {
	table += "<tr><td>" +
	products[i].getElementsByTagName('id')[0].innerHTML + 
	"</td><td>" +
	products[i].getElementsByTagName('price')[0].innerHTML + 
	"</td><td>" +
	products[i].getElementsByTagName('description')[0].innerHTML + "</td></tr>";
	}
	document.getElementById('shop').innerHTML = table;
	document.getElementById('eventboard').innerHTML += town;
	
}

function addToCart () {
	var selection = document.getElementById('currentItem').selectedIndex;
	var choice = document.getElementById('currentItem').options;
	var item = user.inventory[choice[selection].value];
	console.log(choice[selection].value);
	var cost = item.price;
	console.log(cost);
	if (user.gold < cost) {
		alert("You do not have enough gold for this item");
	} else {
	item.quantity += 1;
	user.gold -= cost;
	document.getElementById('userGold').innerHTML = "Gold: " + user.gold;
	document.getElementById(choice[selection].value).innerHTML = 
	"<strong>" + choice[selection].innerHTML + ":</strong> " + 
	item.quantity + "</br>";
	console.log(item);
	}
}

function sellBack () {
	var selection = document.getElementById('currentItem').selectedIndex;
	var choice = document.getElementById('currentItem').options;
	var item = user.inventory[choice[selection].value];
	var cost = item.price;
	if (item.quantity < 1) {
		alert("You have none of these to sell");
	} else {
	item.quantity -= 1;
	user.gold += cost;
	document.getElementById('userGold').innerHTML = "Gold: " + user.gold;
	document.getElementById(choice[selection].value).innerHTML = 
	"<strong>" + choice[selection].innerHTML + ": </strong>" + item.quantity;
	}
}

function tutorial () {
	document.getElementById('eventboard').innerHTML = "";
	loadEvents(events, "introduction.xml", 'scene', 1);
	openShop(stockShop, shopAvalon);
	insertButton("Continue", "tutorial2");
}

function tutorial2 () {
	document.getElementById('eventboard').innerHTML = "";
	loadEvents(events, "introduction.xml", 'scene', 2);
}
