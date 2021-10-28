import { generateLogs } from "./logs.js";
import { createPlayer } from "./create.js";
import { Player } from "./player.js";
import {
	playerAttack,
	enemyAttack,
	whoIsWin,
	getRoundResult,
} from "./logicGames.js";

export const $arenas = document.querySelector(".arenas");
export const $formFight = document.querySelector(".control");

export const player1 = new Player({
	player: 1,
	name: "Scorpion",
	hp: 100,
	img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
});

export const player2 = new Player({
	player: 2,
	name: "Sonya",
	hp: 100,
	img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
});

class Game {
	constructor(props) {}
	start = () => {
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
	};
}

export default Game;
