
import request from 'app/lib/request';
import { smartNairaUrl } from 'app/lib/smartNairaUrl';
export const audit = ({ ...other } = {}, config = {}) =>
	request(smartNairaUrl('/api/collection/audit', { ...other }), {
		data: {},
		method: 'post',
		showToast: false,
		showLoading: false,
		...other,
		...config,
	});