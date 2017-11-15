/**
  * Capitalizes the first letter of words in a string
  *
  * @param {string} string - String to be transformed
  *
  * @returns {string} transformed string
  */
export default function capitalizeFirstLetter(string) {
  return string.replace(/\b[a-z]/g, letter => letter.toUpperCase());
}

