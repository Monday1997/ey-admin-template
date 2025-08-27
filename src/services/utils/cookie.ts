/**
 * @description 获取某一项cookie
 * @param key 需要获取的key
 * @returns 该项cookie
 */
export const getCookieItem = (key: string) => {
  const cookieStr = decodeURIComponent(document.cookie.replace(/;s*/gi, ';'));
  if (!cookieStr) {
    return '';
  }
  const cookies = cookieStr.split('; ');
  const curItem = cookies.find(item => item.indexOf(key) !== -1);
  if (!curItem) {
    return '';
  }
  return curItem;
};

/**
 * @description 获取cookie
 * @param key 需要获取的key
 * @returns str 对应的cookie的值
 */
export const getCookie = (key: string) => {
  key = `${key}=`;
  const cookie = getCookieItem(key);
  return cookie.replace(key, '');
};

