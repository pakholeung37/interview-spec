import { create as _create } from "../../utils.js"
import quicksort from "./quicksort.js";
import quickSortInPlace from "./quickSortInPlace.js";
import bubbleSort from "./bubbleSort.js"
import heapSort from "./heapSort.js";

const originArray = [1,4,6,1,22,89,2,15,36,567,5,11,1];
const template = `
  <div>
    <h1>Sort</h1>
    <p>
      origin array: ${JSON.stringify(bubbleSort(originArray))}
    </p>
    <p>
      bubblesort: ${JSON.stringify(quicksort(originArray))}
    </p>
    <p>
      quicksort: ${JSON.stringify(quicksort(originArray))}
    </p>
    <p>
      quicksortInPlace: ${JSON.stringify(quickSortInPlace(originArray))}
    </p>
    <p>
    heapSort: ${JSON.stringify(heapSort(originArray))}
    </p>
  </div>
`;
export default function create() {
  _create(template)  
}