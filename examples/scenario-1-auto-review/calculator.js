// Example code for Scenario 1: Auto Code Review
// This file intentionally has some issues that AI code review should catch

class Calculator {
  // Issue 1: Missing JSDoc comments
  add(a, b) {
    return a + b;
  }

  // Issue 2: No input validation
  divide(a, b) {
    return a / b;  // Potential division by zero
  }

  // Issue 3: Inefficient algorithm
  calculateFactorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result = result * i;
    }
    return result;
  }

  // Issue 4: Security vulnerability - potential XSS
  renderResult(result) {
    document.getElementById('result').innerHTML = result;
  }

  // Issue 5: Poor error handling
  parseNumber(input) {
    return parseInt(input);  // No error handling for invalid input
  }
} 

module.exports = Calculator;
