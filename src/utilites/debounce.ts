const debounce = (callback: Function, timeout: number = 2000) => {
	let timer: any;
	return (...args: any[]) => {
		clearTimeout(timer);
		timer = setTimeout(() => callback(...args), timeout);
	};
};

export default debounce;
