const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

const player1 = {
	player: 1,
	name: "Scorpion",
	hp: 100,
	img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
	weapon: ["Кунай на цепи", "Меч с корзинчатой гардой", "Ниндзято"],
	attack: function () {
		console.log(`${player1.name}` + " Fight...");
	},
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

function playerWin(name) {
	const $winTitle = createElement("div", "winTitle");
	$winTitle.innerText = name + " wins";
	return $winTitle;
}

function randomHP() {
	return Math.floor(Math.random() * 20) + 1;
}

function whoIsWin(player) {
	if (player.hp <= 0) {
		if (player.player === 1) {
			$arenas.appendChild(playerWin(player2.name));
		} else {
			$arenas.appendChild(playerWin(player1.name));
		}
		$randomButton.disabled = true;
	}
}

function changeHP(player) {
	const $playerLife = document.querySelector(
		".player" + player.player + " .life"
	);
	player.hp -= randomHP();
	if (player.hp < 0) {
		player.hp = 0;
	}
	$playerLife.style.width = player.hp + "%";
}

$randomButton.addEventListener("click", () => {
	changeHP(player1);
	changeHP(player2);
	whoIsWin(player1);
	whoIsWin(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
