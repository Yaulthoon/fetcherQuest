function openShop (cFunction) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState === 4 & this.status === 200) {
			cFunction(this);
		}
	};
	xhttp.open('GET', 'fetcherShops.xml', true);
	xhttp.send();
}

function stockShop (xml) {
	var i = 0;
	var table = "<tr><th>Item</th><th>Cost</th><th>Description</th></tr>";
	var xmlDoc = xml.responseXML;
	var x = xmlDoc.getElementsByTagName('product');
	document.getElementById('eventboard').innerHTML =
	"<table id ='shop' cellspacing = '0' cellpadding = '0'></table>";
	for (i; i < x.length; i++) {
	table += "<tr><td>" +
	x[i].getElementsByTagName('id')[0].innerHTML + 
	"</td><td>" +
	x[i].getElementsByTagName('price')[0].innerHTML + 
	"</td><td>" +
	x[i].getElementsByTagName('description')[0].innerHTML + "</td></tr>";
	}
	document.getElementById('shop').innerHTML = table;
}