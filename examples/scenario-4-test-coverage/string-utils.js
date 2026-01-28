// Example code for Scenario 4: Test Coverage
// This file has NO tests - AI should generate comprehensive tests

class StringUtils {
  /**
   * Capitalizes the first letter of a string
   */
  static capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  /**
   * Reverses a string
   */
  static reverse(str) {
    if (!str) return '';
    return str.split('').reverse().join('');
  }

  /**
   * Checks if a string is a palindrome
   */
  static isPalindrome(str) {
    if (!str) return false;
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
  }

  /**
   * Truncates a string to a specified length
   */
  static truncate(str, length, suffix = '...') {
    if (!str) return '';
    if (str.length <= length) return str;
    return str.slice(0, length) + suffix;
  }

  /**
   * Counts the number of words in a string
   */
  static wordCount(str) {
    if (!str) return 0;
    return str.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  /**
   * Converts a string to camelCase
   */
  static toCamelCase(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
  }

  /**
   * Converts a string to snake_case
   */
  static toSnakeCase(str) {
    if (!str) return '';
    return str
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
      .replace(/^_/, '')
      .replace(/\s+/g, '_');
  }

  /**
   * Checks if a string contains only alphanumeric characters
   */
  static isAlphanumeric(str) {
    if (!str) return false;
    return /^[a-zA-Z0-9]+$/.test(str);
  }

  /**
   * Extracts all email addresses from a string
   */
  static extractEmails(str) {
    if (!str) return [];
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    return str.match(emailRegex) || [];
  }

  /**
   * Removes all HTML tags from a string
   */
  static stripHtml(str) {
    if (!str) return '';
    return str.replace(/<[^>]*>/g, '');
  }
}

module.exports = StringUtils;
