/**
 *
 * @param {*} array Array to paginate
 * @param {*} page_size  number of row to display
 * @param {*} page_number current page number
 */
export function paginate(array, page_size, page_number) {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}
