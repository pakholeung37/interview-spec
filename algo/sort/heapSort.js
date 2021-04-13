/**
 * heap sort
 * 堆是具有以下性质的完全二叉树，每个节点的值都大于或等于其左右孩子节点的值，称为大顶堆
 * 或者每个节点的值都少于或等于其孩子节点的值，称为小顶堆。
 */
export default function heapSort(nums) {
  const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);
  function sort(arr) {
    //1. 构建大顶堆
    for (let i = arr.length / 2 - 1; i >= 0; i--) {
      // 从第一个非叶子结点从下至上，从右到左调整结构
      adjustHeap(arr, i, arr.length);
    }

    // 2. 调整对结构，交换堆顶和末尾
    swap(arr, 0, arr.length - 1);
    for (let j = arr.length - 1; j > 0; j--) {
      adjustHeap(arr, 0, j);
      swap(arr, 0, j);
    }
  }
  function adjustHeap(arr, i, length) {
    let temp = arr[i]; // 根节点
    for (let k = i * 2 + 1; k < length; k = k * 2 + 1) {
      //从i节点的左子节点开始
      if (k + 1 < length && arr[k] < arr[k + 1]) {
        // 如果左子节点小于右子节点，k指向右子节点
        k++;
      }
      if (arr[k] > temp) {
        arr[i] = arr[k];
        i = k;
      } else break;
    }
    arr[i] = temp;
  }
  sort(nums);
  return nums;
}
