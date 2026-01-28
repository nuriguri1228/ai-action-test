// String utilities - needs test coverage

class StringUtils {
  // Capitalize first letter
  capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // Reverse string
  reverse(str) {
    if (!str) return '';
    return str.split('').reverse().join('');
  }

  // Check if palindrome
  isPalindrome(str) {
    if (!str) return false;
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
  }

  // Truncate string
  truncate(str, length, suffix = '...') {
    if (!str || str.length <= length) return str || '';
    return str.substring(0, length) + suffix;
  }

  // Count words
  wordCount(str) {
    if (!str) return 0;
    return str.trim().split(/\s+/).filter(w => w.length > 0).length;
  }
}

module.exports = StringUtils;
