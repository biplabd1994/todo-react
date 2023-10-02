export const fileToBase64 = (file) => {
	return new Promise((resolve) => {
		let fileInfo;
		let baseURL = '';
		// Make new FileReader
		let reader = new FileReader();

		// Convert the file to base64 text
		reader.readAsDataURL(file);

		// on reader load somthing...
		reader.onload = () => {
			// Make a fileInfo Object
			baseURL = reader.result;
			// console.log(baseURL);
			resolve(baseURL);
		};
		console.log(fileInfo);
	});
};
export const isValidUrl = (str) => {
	const pattern = new RegExp(
		'^([a-zA-Z]+:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', // fragment locator
		'i'
	);
	if (!pattern.test(str)) {
		return false;
	}
	// fetch(str).then((res) => {
	// 	if (res.status !== 200) {
	// 		return false;
	// 	}
	// 	return true;
	// });
	// console.log(res);

	/* var request;
	if (typeof window !== 'undefined') {
		if (window.XMLHttpRequest) request = new XMLHttpRequest();
		else request = new ActiveXObject('Microsoft.XMLHTTP');
		request.open('GET', str, false);
		request.send(); // there will be a 'pause' here until the response to come.
		// the object request will be actually modified
		if (request.status === 404) {
			return false;
		}
	} */
	return true;
};

function convertImageToBase64(imgUrl, callback) {
	const image = new Image();
	image.crossOrigin = 'anonymous';
	image.onload = () => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		canvas.height = image.naturalHeight;
		canvas.width = image.naturalWidth;
		ctx.drawImage(image, 0, 0);
		const dataUrl = canvas.toDataURL();
		callback && callback(dataUrl);
	};
	image.src = imgUrl;
}
export function imgSrcToBase64(imagUrl) {
	return new Promise((resolve) => convertImageToBase64(imagUrl, resolve));
}

export const stringMask = (str) => {
	return `${str.slice(0, 6)}...${str.slice(-4)}`;
};
