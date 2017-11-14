/**
 * Function for sorting the elements of an array
 *
 * @param {object} firstElement first element of the array
 * @param {object} nextElement next element in the array
 *
 * @return {Array} returns a sorted array
 */
function customSort(firstElement, nextElement) {
  return firstElement.id > nextElement.id;
}

export default customSort;
