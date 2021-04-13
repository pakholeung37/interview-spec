/**
 * 节流函数，在特定时间内只有一个fn执行
 * @param {*} fn
 * @param {*} delay
 */
export function throttle(fn, delay) {
  let timer = null;
  return function throttleFn(...args) {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...args)
      timer = null;
    }, delay)
  };
}
/**
 * 防抖函数，在特定时间内重复触发fn，fn不执行
 * @param {*} fn 
 * @param {*} delay 
 */
export function debounce(fn, delay) {
  let timer = null;
  return function debounceFn(...args) {
    if(timer) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args)
      }, delay)
    }
  }
}
