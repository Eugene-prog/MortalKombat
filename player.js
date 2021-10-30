class Player {
	constructor(props) {
		this.player = props.player;
		this.name = props.name;
		this.hp = props.hp;
		this.img = props.img;
	}

	attack = () => {
		console.log(`${this.name}  Fight...`);
	};

	changeHP = (changeValue) => {
		this.hp -= changeValue;
		if (this.hp <= 0) {
			this.hp = 0;
		}
	};

	elHP = () => {
		return document.querySelector(`.player${this.player} .life`);
	};

	renderHP = () => {
		let $hpBar = this.elHP();
		$hpBar.style.width = `${this.hp}%`;
	};
}

export { Player };
