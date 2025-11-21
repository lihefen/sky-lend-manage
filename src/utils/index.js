/**
 * 工具函数集合
 */

/**
 * 页面跳转函数
 * @param {string} pageName - 目标页面名称，不需要包含.html后缀
 * @param {Object} [params] - URL参数对象
 * @returns {void}
 */
export const navigateTo = (pageName, params = {}) => {
  let url = `/${pageName}/index.html`;
  
  // 如果有参数，添加到URL中
  if (Object.keys(params).length > 0) {
    const queryString = Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    url = `${url}?${queryString}`;
  }
  
  window.location.href = url;
};

/**
 * 获取URL参数
 * @param {string} [name] - 参数名称，如果不提供则返回所有参数对象
 * @returns {string|Object|null} 返回参数值、参数对象或null
 */
export const getUrlParam = (name) => {
  const queryString = window.location.search.substring(1);
  const params = {};
  
  if (queryString) {
    const pairs = queryString.split('&');
    for (const pair of pairs) {
      const [key, value] = pair.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  }
  
  return name ? (params[name] || null) : params;
};

/**
 * 格式化日期
 * @param {Date|string|number} date - 日期对象、日期字符串或时间戳
 * @param {string} [format='YYYY-MM-DD'] - 格式化模板
 * @returns {string} 格式化后的日期字符串
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  const d = new Date(date);
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};