// Math utilities for common calculations

class MathUtils {
  // Add two numbers
  add(a, b) {
    return a + b;
  }

  // Subtract two numbers
  subtract(a, b) {
    return a - b;
  }

  // Multiply two numbers
  multiply(a, b) {
    return a * b;
  }

  // Divide two numbers
  divide(a, b) {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }

  // Calculate factorial
  factorial(n) {
    if (n < 0) return -1;
    if (n === 0 || n === 1) return 1;
    return n * this.factorial(n - 1);
  }

  // Calculate fibonacci
  fibonacci(n) {
    if (n <= 1) return n;
    return this.fibonacci(n - 1) + this.fibonacci(n - 2);
  }

  // Check if number is prime
  isPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
  }
}

module.exports = MathUtils;
