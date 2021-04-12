/**
 * 快排实现，虽然已经实现过很多次了，但是记忆还是有些模糊，这里重新实现一次
 * @param {*} arr
 * @returns
 */
/**
 * quick sort
 */
export default function quickSort(nums) {
  let arr = [...nums];
  if (arr.length <= 1) return arr;
  let pivot = arr.shift();
  const leftArray = [];
  const rightArray = [];
  arr.forEach((num) => {
    num < pivot ? leftArray.push(num) : rightArray.push(num);
  });

  return [...quickSort(leftArray), pivot, ...quickSort(rightArray)];
}
