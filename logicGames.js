import { player1, player2, $arenas, $formFight } from "../game.js";
import { getRandom } from "./utils.js";
import { generateLogs } from "../logs.js";
import { HIT, ATTACK } from "../config.js";
import { createReloadButton, createElement } from "./create.js";

const $fightButton = document.querySelector(".button");

const getRoundResult = (attack, enemy) => {
	const { hit: hitEnemy, defence: defenceEnemy, value: valueEnemy } = enemy;
	const { hit, defence, value } = attack;

	if (hit !== defenceEnemy) {
		player2.changeHP(value);
		player2.renderHP();
		generateLogs("hit", player1, player2, getHPLog(value, player2.hp));
	} else if (hit === defenceEnemy) {
		generateLogs("defence", player1, player2);
	}

	if (hitEnemy !== defence) {
		player1.changeHP(valueEnemy);
		player1.renderHP();
		generateLogs("hit", player2, player1, getHPLog(valueEnemy, player1.hp));
	} else if (hitEnemy === defence) {
		generateLogs("defence", player2, player1);
	}
};

const whoIsWin = () => {
	$fightButton.disabled = true;
	createReloadButton();
	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(playerWins(player2.name));
		generateLogs("end", player2, player1);
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWins(player1.name));
		generateLogs("end", player1, player2);
	} else if (player1.hp === 0 && player1.hp === 0) {
		$arenas.appendChild(playerWins());
	}
};

const enemyAttack = () => {
	const hit = ATTACK[getRandom(3) - 1];
	const defence = ATTACK[getRandom(3) - 1];
	return {
		value: getRandom(HIT[hit]),
		hit,
		defence,
	};
};

const playerAttack = () => {
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
	return attack;
};

const playerWins = (name) => {
	const $winTitle = createElement("div", "winTitle");
	if (name) {
		$winTitle.innerText = `${name} wins`;
	} else {
		$winTitle.innerText = "draw";
		generateLogs("draw", player1, player2);
	}
	return $winTitle;
};

const getHPLog = (attack, hp) => `-${attack} [${hp}/100]`;

export { whoIsWin, enemyAttack, playerAttack, getRoundResult };
