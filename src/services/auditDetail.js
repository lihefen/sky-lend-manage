
import request from 'app/lib/request';
import { smartNairaUrl } from 'app/lib/smartNairaUrl';
export const auditDetail = ({ ...other } = {}, config = {}) =>{
    const { appId } = other;
    console.log(other)
    return request(smartNairaUrl(`/api/collection/audit/detail/${appId}`, { ...other }), {
		data: {},
		method: 'get',
		showToast: false,
		showLoading: false,
		...other,
		...config,
	});
}