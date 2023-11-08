// utils.js

/**
 * Truncate a string to a specified length and append an ellipsis if necessary.
 * @param {string} str - The string to truncate.
 * @param {number} length - The maximum length of the truncated string, including ellipsis.
 * @return {string} - The truncated string.
 */
export const truncateText = (str, length) => {
    if (str.length <= length) {
      return str;
    }
    return str.substring(0, length) + '...';
  };
  
  // You can add other utility functions here as needed.
  
  