
import request from 'app/lib/request';
import { smartNairaUrl } from 'app/lib/smartNairaUrl';
export const auditApprove = ({ ...other } = {}, config = {}) =>
	request(smartNairaUrl('/api/collection/audit/approve', { ...other }), {
		data: {},
		method: 'post',
		showToast: false,
		showLoading: false,
		...other,
		...config,
	});