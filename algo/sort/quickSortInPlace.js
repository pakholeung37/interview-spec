/**
 * quick sort in place
 */
export default function quickSortInPlace(nums) {
  const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);
  const sort = (arr, l, r) => {
    if (l < r) {
      let index = patition(arr, l, r);
      sort(arr, l, index - 1);
      sort(arr, index + 1, r);
    }
  };

  const patition = (arr, l, r) => {
    const p = arr[l];
    let i = l;
    let j = r;
    while (i < j) {
      while (arr[j] >= p && i < j) {
        j--;
      }
      while (arr[i] <= p && i < j) {
        i++;
      }
      swap(arr, i, j);
    }
    swap(arr, l, i);
    return i;
  };

  sort(nums, 0, nums.length - 1);
  return nums;
}
