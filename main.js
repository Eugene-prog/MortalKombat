/*
Создай два объекта с именем разных игроков, где будут поля
 - name - это строка;
 - hp - это число;
 - img - это строка;
 - weapon - это массив строк (пока можно написать любое оружие, которое вы сможете придумать, не имеет пока значение какое);
 - attack - это функция, внутри которой нужно поместить console.log, который будет выводить сконкатинированную строку имя вашего персонажа + fight (<имя вашего персонажа> + ‘Fight...’);
 */
const player1 = {
	name: "Scorpion",
	hp: 100,
	img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
	weapon: ["Кунай на цепи", "Меч с корзинчатой гардой", "Ниндзято"],
	attack: function () {
		console.log(`${player1.name}` + " Fight...");
	},
};

const player2 = {
	name: "Kitana",
	hp: 80,
	img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
	weapon: ["Стальные веера", "Летящий клинок", "Бо", "Разоранг", "Саи"],
	attack: function () {
		console.log(`${player2.name}` + " Fight...");
	},
};

function createPlayer(classPlayer, obj) {
	const { hp: life, name: namePlayer, img } = obj;

	const $player = document.createElement("div");
	$player.classList.add(classPlayer);

	const $arenas = document.querySelector(".arenas");
	$arenas.appendChild($player);

	const $progressbar = document.createElement("div");
	$progressbar.classList.add("progressbar");
	$player.appendChild($progressbar);

	const $life = document.createElement("div");
	$life.style.width = `${life}` + "%";
	$life.classList.add("life");
	$progressbar.appendChild($life);

	const $name = document.createElement("div");
	$name.innerText = namePlayer;
	$name.classList.add("name");
	$progressbar.appendChild($name);

	const $character = document.createElement("div");
	$character.classList.add("character");
	$player.appendChild($character);

	const $img = document.createElement("img");
	$img.src = img;
	$character.appendChild($img);
}

createPlayer("player1", player1);
createPlayer("player2", player2);
