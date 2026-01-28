// Array utilities for common array operations

class ArrayUtils {
  // Get unique values from array
  unique(arr) {
    if (!Array.isArray(arr)) return [];
    return [...new Set(arr)];
  }

  // Flatten nested arrays
  flatten(arr, depth = Infinity) {
    if (!Array.isArray(arr)) return [];
    return arr.flat(depth);
  }

  // Group array by key
  groupBy(arr, key) {
    if (!Array.isArray(arr)) return {};
    return arr.reduce((groups, item) => {
      const group = item[key];
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    }, {});
  }

  // Chunk array into smaller arrays
  chunk(arr, size) {
    if (!Array.isArray(arr) || size < 1) return [];
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }

  // Calculate sum of numeric array
  sum(arr) {
    if (!Array.isArray(arr)) return 0;
    return arr.reduce((total, num) => total + (Number(num) || 0), 0);
  }

  // Calculate average of numeric array
  average(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return 0;
    return this.sum(arr) / arr.length;
  }

  // Find min value in numeric array
  min(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return Math.min(...arr.filter(n => typeof n === 'number'));
  }

  // Find max value in numeric array
  max(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;
    return Math.max(...arr.filter(n => typeof n === 'number'));
  }
}

module.exports = ArrayUtils;
