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

export { changeHP, elHP, renderHP };
