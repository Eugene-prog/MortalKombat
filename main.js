const $arenas = document.querySelector(".arenas");
const $formFight = document.querySelector(".control");
const $fightButton = document.querySelector(".button");

const HIT = {
	head: 30,
	body: 25,
	foot: 20,
};

const ATTACK = ["head", "body", "foot"];

const player1 = {
	player: 1,
	name: "Scorpion",
	hp: 100,
	img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
	weapon: ["Кунай на цепи", "Меч с корзинчатой гардой", "Ниндзято"],
	attack: function () {
		console.log(`${player1.name}` + " Fight...");
	},
	changeHP,
	elHP,
	renderHP,
};

const player2 = {
	player: 2,
	name: "Kitana",
	hp: 100,
	img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
	weapon: ["Стальные веера", "Летящий клинок", "Бо", "Разоранг", "Саи"],
	attack: function () {
		console.log(`${player2.name}` + " Fight...");
	},
	changeHP,
	elHP,
	renderHP,
};

function createElement(tag, className) {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
	return $tag;
}

function createPlayer(obj) {
	const { hp: life, name: namePlayer, img, player: playerNumber } = obj;

	const $player = createElement("div", "player" + playerNumber);
	const $progressbar = createElement("div", "progressbar");
	const $life = createElement("div", "life");
	const $character = createElement("div", "character");
	const $name = createElement("div", "name");
	const $img = createElement("img");

	$life.style.width = `${life}` + "%";
	$name.innerText = namePlayer;
	$img.src = img;

	$player.appendChild($progressbar);
	$progressbar.appendChild($life);
	$progressbar.appendChild($name);
	$player.appendChild($character);
	$character.appendChild($img);
	return $player;
}

function playerLose(name) {
	const $loseTitle = createElement("div", "loseTitle");
	$loseTitle.innerText = name + " lose";
	return $loseTitle;
}

function playerWins(name) {
	const $winTitle = createElement("div", "winTitle");
	if (name) {
		$winTitle.innerText = name + " wins";
	} else {
		$winTitle.innerText = "draw";
	}
	return $winTitle;
}

function createReloadButton() {
	const $reloadWrap = createElement("div", "reloadWrap");
	const $reloadButton = createElement("button", "button");
	$reloadButton.innerText = "Restart";
	$reloadWrap.appendChild($reloadButton);
	$reloadButton.addEventListener("click", () => {
		window.location.reload();
	});
	$arenas.appendChild($reloadWrap);
}

function getRandom(num) {
	return Math.floor(Math.random() * num) + 1;
}

function changeHP(changeValue) {
	this.hp -= changeValue;
	if (this.hp <= 0) {
		this.hp = 0;
	}
}

function elHP() {
	return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
	let $hpBar = this.elHP();
	$hpBar.style.width = `${this.hp}%`;
}

function whoIsWin() {
	$fightButton.disabled = true;
	createReloadButton();
	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(playerWins(player2.name));
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWins(player1.name));
	} else if (player1.hp === 0 && player1.hp === 0) {
		$arenas.appendChild(playerWins());
	}
}
function enemyAttack() {
	const hit = ATTACK[getRandom(3) - 1];
	const defence = ATTACK[getRandom(3) - 1];
	return {
		value: getRandom(HIT[hit]),
		hit,
		defence,
	};
}

function getRoundResult(attack, enemy) {
	if (attack.hit !== enemy.defence) {
		player2.changeHP(attack.value);
		player2.renderHP();
	}
	if (enemy.hit !== attack.defence) {
		player1.changeHP(enemy.value);
		player1.renderHP();
	}
}

$formFight.addEventListener("submit", function (e) {
	e.preventDefault();
	const enemy = enemyAttack();
	const attack = {};
	for (let item of $formFight) {
		if (item.checked && item.name === "hit") {
			attack.value = getRandom(HIT[item.value]);
			attack.hit = item.value;
		}
		if (item.checked && item.name === "defence") {
			attack.defence = item.value;
		}
		item.checked = false;
	}
	getRoundResult(attack, enemy);
	if (player1.hp === 0 || player2.hp === 0) {
		whoIsWin();
	}
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
