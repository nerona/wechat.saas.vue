/**
 * 时间转换的公共逻辑
 *
 * @author  suyanping
 *
 */

const dateChange = (data) => {
  //eslint-disable-next-line
  const date = new Date(data.replace(/\-/g, '/'));
  const year = `${date.getFullYear()}-`;
  const month = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-`;
  const day = (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate());
  return year + month + day;
};

export default {
  dateChange,
};
