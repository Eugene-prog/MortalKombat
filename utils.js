const getTime = () => {
	const date = new Date();
	let HH = date.getHours().toString();
	let MM = date.getMinutes().toString();
	let SS = date.getSeconds().toString();
	const twoDigits = (num) => ("0" + num).slice(-2);
	return `${twoDigits(HH)}:${twoDigits(MM)}:${twoDigits(SS)}`;
};

const getRandom = (num) => Math.floor(Math.random() * num) + 1;

export { getTime, getRandom };
