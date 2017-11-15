/**
 * Get the pagination data
 *
 * @param {Number} count total number of records matching the search query
 * @param {Number} limit maximum number of records to be returned for each page
 * @param {Number} offset number of records before beginning to return rows
 *
 * @returns {Object} pagination data
 */
export default function paginate(count, limit, offset) {
  const currentPage = Math.floor(offset / limit) + 1;
  const numberOfPages = Math.ceil(count / limit);
  const pageSize = (count - offset) > limit ? limit : (count - offset);

  return {
    totalRows: count,
    numberOfPages,
    currentPage,
    pageSize,
  };
}
