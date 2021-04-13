export default function instanceOf(left, right) {
  let leftVal = Object.getPrototypeOf(left);
  const rightVal = right.prototype;

  while(leftVal != null) {
    if(leftVal === rightVal) return true;
    leftVal = Object.getPrototypeOf(leftVal);
  }
}