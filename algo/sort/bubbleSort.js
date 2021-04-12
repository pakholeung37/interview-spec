/**
 * bubble sort
 */
export default function bubbleSort(nums) {
  for(let i = 0; i < nums.length; i++) {
      for(let j = i; j < nums.length; j++) {
          nums[i] > nums[j] && ([nums[i], nums[j]] = [nums[j], nums[i]])
      }
  }
  return nums;
}