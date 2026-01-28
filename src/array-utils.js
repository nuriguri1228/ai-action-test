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

  // Shuffle array randomly
  shuffle(arr) {
    if (!Array.isArray(arr)) return [];
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Get first n elements
  take(arr, n = 1) {
    if (!Array.isArray(arr)) return [];
    return arr.slice(0, n);
  }

  // Get last n elements
  takeLast(arr, n = 1) {
    if (!Array.isArray(arr)) return [];
    return arr.slice(-n);
  }

  // Remove duplicates keeping first occurrence
  uniqBy(arr, key) {
    if (!Array.isArray(arr)) return [];
    const seen = new Set();
    return arr.filter(item => {
      const k = typeof key === 'function' ? key(item) : item[key];
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }
}

module.exports = ArrayUtils;
