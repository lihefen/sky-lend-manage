
import request from 'app/lib/request';
import { smartNairaUrl } from 'app/lib/smartNairaUrl';
export const auditList = ({ data,...other } = {}, config = {}) =>
	request(smartNairaUrl('/api/collection/audit/list', { ...other }), {
		params: { ...data },
		method: 'get',
		showToast: false,
		showLoading: false,
		...other,
		...config,
	});