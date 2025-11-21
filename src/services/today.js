
import request from 'app/lib/request';
import { smartNairaUrl } from 'app/lib/smartNairaUrl';
export const today = ({ ...other } = {}, config = {}) =>
	request(smartNairaUrl('/api/collection/cases/today', { ...other }), {
		data: {},
		method: 'get',
		showToast: false,
		showLoading: false,
		...other,
		...config,
	});