import { $arenas } from "../main.js";

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

function createPlayer(obj) {
	const { hp: life, name: namePlayer, img, player: playerNumber } = obj;

	const $player = createElement("div", `player${playerNumber}`);
	const $progressbar = createElement("div", "progressbar");
	const $life = createElement("div", "life");
	const $character = createElement("div", "character");
	const $name = createElement("div", "name");
	const $img = createElement("img");

	$life.style.width = `${life}%`;
	$name.innerText = namePlayer;
	$img.src = img;

	$player.appendChild($progressbar);
	$progressbar.appendChild($life);
	$progressbar.appendChild($name);
	$player.appendChild($character);
	$character.appendChild($img);
	return $player;
}

const createElement = (tag, className) => {
	const $tag = document.createElement(tag);
	if (className) {
		$tag.classList.add(className);
	}
	return $tag;
};

export { createReloadButton, createPlayer, createElement };