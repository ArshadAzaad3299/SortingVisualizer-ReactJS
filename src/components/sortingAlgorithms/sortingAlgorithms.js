/*Below is the MergeSort Function Wihtout Animations*/

export const mergeSortwithoutAnim = array => {
    if (array.length === 1) return array;
    const middleIdx = Math.floor(array.length / 2);
    const firstHalf = mergeSortwithoutAnim(array.slice(0, middleIdx));
    const secondHalf = mergeSortwithoutAnim(array.slice(middleIdx));
    const sortedArray = [];
    let i = 0,
        j = 0;
    while (i < firstHalf.length && j < secondHalf.length) {
        if (firstHalf[i] < secondHalf[j]) {
            sortedArray.push(firstHalf[i++]);
        }
        else {
            sortedArray.push(secondHalf[j++])
        }
    }
    while (i < firstHalf.length) sortedArray.push(firstHalf[i++])
    while (j < secondHalf.length) sortedArray.push(secondHalf[j++]);
    return sortedArray;
};

/*Below is the MergeSort Function With Animations*/

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}
function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

export function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations
) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

export const bubbleSortWithoutAnime = array => {
    let i = 0;

    for (let x = 0; x < array.length; x++) {
        if (i < array.length) {
            for (let j = 0; j < array.length - i - 1; j++) {
                let a = array[j];
                let b = array[j + 1];
                if (a > b) {
                    swapArray(array, j, j + 1)
                }
            }
        }
    }
    return array;
}

function swapArray(arr, a, b) {
    let temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
}



export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    if (arraysAreEqual(javaScriptSortedArray, array)) return animations;
    const auxiliaryArray = array.slice();
    doQuickSort(animations, auxiliaryArray, 0, auxiliaryArray.length - 1);
    return animations;
}
function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) {
            return false;
        }
    }
    return true;
}

function swap(animations, items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;

    animations.push([leftIndex, rightIndex]);
}
export function quickSortPartition(items, left, right, animations) {
    var pivot = items[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(animations, items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

export function doQuickSort(animations, items, left, right) {
    var index;
    if (items.length > 1) {
        index = quickSortPartition(items, left, right, animations); //index returned from partition
        if (left < index - 1) {
            //more elements on the left side of the pivot
            doQuickSort(animations, items, left, index - 1);
        }
        if (index < right) {
            //more elements on the right side of the pivot
            doQuickSort(animations, items, index, right);
        }
    }
    console.log(items);
    return items;
}


export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    doBubbleSort(animations, auxiliaryArray);
    return animations;
}

export function doBubbleSort(animations, auxiliaryArray) {
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < auxiliaryArray.length - 1; i++) {
            if (auxiliaryArray[i] > auxiliaryArray[i + 1]) {
                var temp = auxiliaryArray[i];
                auxiliaryArray[i] = auxiliaryArray[i + 1];
                auxiliaryArray[i + 1] = temp;
                animations.push([i, i + 1]);
                swapped = true;
            }
        }
    } while (swapped);
    return auxiliaryArray;
}

