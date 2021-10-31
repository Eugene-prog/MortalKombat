import { generateLogs } from "./logs.js";
import { createPlayer } from "./create.js";
import { Player } from "./player.js";
import { whoIsWin, getRoundResult } from "./logicGames.js";

export const $arenas = document.querySelector(".arenas");
export const $formFight = document.querySelector(".control");

export let player1;
export let player2;

class Game {
	getPlayers = async () => {
		const body = fetch(
			"https://reactmarathon-api.herokuapp.com/api/mk/players"
		).then((res) => res.json());
		return body;
	};

	takePlayerStorage = (key) => JSON.parse(localStorage.getItem(key));

	getRandomPlayer = async () => {
		const rndPlayer = fetch(
			"https://reactmarathon-api.herokuapp.com/api/mk/player/choose"
		).then((res) => res.json());
		return rndPlayer;
	};

	start = async () => {
		const players = await this.getPlayers();
		//const p1 = players[getRandom(players.length) - 1];
		const p1 = this.takePlayerStorage("player1");
		const p2 = await this.getRandomPlayer();

		player1 = new Player({ ...p1, player: 1 });
		player2 = new Player({ ...p2, player: 2 });

		$formFight.addEventListener("submit", function (e) {
			e.preventDefault();
			getRoundResult();
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
