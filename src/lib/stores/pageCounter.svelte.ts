// You should remember this syntax. It replaces the Store API from Svelte 4.
function createPageCounter(initialValue: number) {
	let pageCounter: number = $state(initialValue);

	return {
		get currentValue() {
			return pageCounter;
		},
		set setValue(newValue: number) {
			pageCounter = newValue;
		},
		increase() {
			pageCounter++;
		},
		decrease() {
			if (pageCounter > 1) pageCounter--;
		},
		reset() {
			pageCounter = 1;
		}
	};
}


export const pageCounter = createPageCounter(1);
