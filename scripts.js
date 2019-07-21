const allItems = document.querySelectorAll('*');
const blankItem = document.createElement('iframe');
blankItem.style.cssText = 'position: absolute; right: -200px';
document.body.appendChild(blankItem);
const displayCss = document.createElement('div');
displayCss.style.cssText =
	'overflow-x: scroll;position: fixed; top: 0; right: 0;width: 25vw; z-index: 9999; background-color: black; color: white;';
document.body.appendChild(displayCss);

for (let item of allItems) {
	item.addEventListener('click', clicked => {
		let x = clicked.clientX;
		let y = clicked.clientY;
		clicked.preventDefault();
		let element = document.elementFromPoint(x, y);
		grabStyling(element);
	});
}

function grabStyling(element) {
	let styles = {};
	let currStyle = this.getComputedStyle(element);
	let defStyle = getDefaultStyles(element);
	for (let item of currStyle) {
		if (currStyle[item] !== defStyle[item]) {
			styles[item] = currStyle[item];
		}
	}
	createEl(styles);
}

function getDefaultStyles(object) {
	let testItem = document.createElement(object.tagName);
	blankItem.appendChild(testItem);
	return this.getComputedStyle(testItem);
}

function createEl(cssList) {
	displayCss.innerHTML = '';
	for (let text in cssList) {
		displayCss.innerHTML += `${text} is ${cssList[text]}<br/>`;
	}
}
