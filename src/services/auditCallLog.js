
import request from 'app/lib/request';
import { smartNairaUrl } from 'app/lib/smartNairaUrl';
export const auditCallLog = ({ ...other } = {}, config = {}) =>
	request(smartNairaUrl('/api/collection/audit/callLog', { ...other }), {
		data: {},
		method: 'post',
		showToast: false,
		showLoading: false,
		...other,
		...config,
	});