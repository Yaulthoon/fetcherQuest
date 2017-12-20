const tiles = 
document.getElementById("gameboard").querySelectorAll('.piecesPath');

const pathway = [
tiles[0], tiles[1], tiles[2], tiles[3], tiles[4],tiles[5], 
tiles[6], tiles[7], tiles[8], tiles[9], tiles[11], tiles[10],
tiles[12], tiles[13], tiles[14], tiles[15], tiles[16], tiles[17], tiles[18],
tiles[19], tiles[20], tiles[21], tiles[22], tiles[23], tiles[24], tiles[25],
tiles[26], tiles[27], tiles[28], tiles[29], tiles[34], tiles[41], tiles[40],
tiles[39], tiles[38], tiles[37], tiles[36], tiles[33], tiles[32], tiles[31],
tiles[30], tiles[35], tiles[42], tiles[43], tiles[44], tiles[45], tiles[46],
tiles[47], tiles[48], tiles[49], tiles[50], tiles[51], tiles[52], tiles[53],
tiles[54], tiles[55], tiles[56], tiles[57], tiles[59], tiles[58], tiles[60],
tiles[61], tiles[62], tiles[63], tiles[64], tiles[65], tiles[66], tiles[67]
];

const user = {};
user.level = 1;
user.currentHp = 10;
user.maxHp = 10;
user.gold = 100;
user.position = -1;
user.characterSheet = 
document.getElementById("characterSheet").querySelectorAll("p");
user.characterSheet[0].innerHTML = "Character Level: " + user.level;
user.characterSheet[1].innerHTML = "Hp: " + user.currentHp + "/" + user.maxHp;
user.characterSheet[2].innerHTML = "Gold: " + user.gold;
user.movement = function () {
	for (i = 0; i < pathway.length; i++) {
		pathway[i].style.background = "url('pathway.png')";
		pathway[i].style.backgroundRepeat = "no-repeat";
		pathway[i].style.backgroundSize = "100%";
	}
	var roll = Math.floor((Math.random()*6)+1);
	user.position += roll;
	if (user.position >= pathway.length) {
		user.position = (pathway.length - 1);
	}
	console.log(user.position);
	pathway[user.position].style.background = "url('piecesAvatar.png')";
	pathway[user.position].style.backgroundSize = "contain";
	pathway[user.position].style.backgroundRepeat = "no-repeat";
	pathway[user.position].style.backgroundPosition = "center";
};

window.onload = function() {
	loadEvents(events, 'introduction.xml', 'scene', 0);
	gEvent();
}

function returnButton () {
var eventBoard = document.getElementById('eventboard');
	eventBoard.innerHTML += "</br></br>" + 
	"<button onclick = 'gGame()'><u>Continue</u></button>";
}

function loadEvents(cFunction, file, scene, number) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      cFunction(this, scene, number);
    }
  };
  xhttp.open("GET", file, true);
  xhttp.send();
}

function events(xml, scene, number) {
	var xmlDoc = xml.responseXML;
	var x = xmlDoc.getElementsByTagName(scene)[number].innerHTML;
	document.getElementById("eventboard").innerHTML = x;
	console.log(x);
	returnButton();
}

function gEvent () {
        var eventBoard = document.getElementById("eventboard");
        document.getElementById("gameboard").style.visibility = "hidden";
        eventBoard.style.visibility = "visible";
        document.getElementById('roll').style.visibility = 'hidden';
}

function gGame () {
	var eventBoard = document.getElementById("eventboard");
	eventBoard.style.visibility = "hidden";
	eventBoard.innerHTML = "";
	document.getElementById("gameboard").style.visibility = "visible";
	document.getElementById('roll').style.visibility = "visible";
}
