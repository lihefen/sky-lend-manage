export let getQueryString = (name, url) => {
	let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	let search = window.location && window.location.search;
	if (url) {
		search = url.split('?')[1];
		search = search ? '?' + search : '';
	}

	let r = search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
};
