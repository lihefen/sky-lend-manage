
import request from 'app/lib/request';
import { smartNairaUrl } from 'app/lib/smartNairaUrl';
export const auditReject = ({ ...other } = {}, config = {}) =>
	request(smartNairaUrl('/api/collection/audit/reject', { ...other }), {
		data: {},
		method: 'post',
		showToast: false,
		showLoading: false,
		...other,
		...config,
	});