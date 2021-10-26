import { generateLogs } from "./logs.js";
import { changeHP, elHP, renderHP } from "./hp.js";
import { createPlayer } from "./create.js";
import {
	playerAttack,
	enemyAttack,
	whoIsWin,
	getRoundResult,
} from "./logicGames.js";

const $arenas = document.querySelector(".arenas");
const $formFight = document.querySelector(".control");

export { player1, player2, $arenas, $formFight };

const player1 = {
	player: 1,
	name: "Scorpion",
	hp: 100,
	img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
	weapon: ["hand", "leg", "head"],
	attack: function () {
		console.log(`${player1.name}  Fight...`);
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
	weapon: ["hand", "leg", "head"],
	attack: function () {
		console.log(`${player2.name}  Fight...`);
	},
	changeHP,
	elHP,
	renderHP,
};

$formFight.addEventListener("submit", function (e) {
	e.preventDefault();
	const enemy = enemyAttack();
	const attack = playerAttack();
	getRoundResult(attack, enemy);
	if (player1.hp === 0 || player2.hp === 0) {
		whoIsWin();
	}
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs("start", player1, player2);
