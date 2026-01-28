// Example code for Scenario 2: Auto Bug Fix
// This file contains a bug that should be automatically fixed

class UserAuth {
  constructor() {
    this.users = new Map();
  }

  /**
   * Register a new user
   * BUG: Password is stored in plain text!
   */
  register(username, password) {
    if (this.users.has(username)) {
      throw new Error('User already exists');
    }

    // BUG: Storing password in plain text
    this.users.set(username, {
      username: username,
      password: password  // Should be hashed!
    });

    return { success: true, message: 'User registered successfully' };
  }

  /**
   * Login user
   * BUG: Redirect URL is not validated (potential open redirect vulnerability)
   */
  login(username, password, redirectUrl) {
    const user = this.users.get(username);

    if (!user || user.password !== password) {
      return { success: false, message: 'Invalid credentials' };
    }

    // BUG: No validation of redirect URL
    // This could lead to open redirect vulnerability
    return {
      success: true,
      message: 'Login successful',
      redirect: redirectUrl  // Should validate this URL!
    };
  }

  /**
   * Reset password
   * BUG: No email verification before reset
   */
  resetPassword(username, newPassword) {
    if (!this.users.has(username)) {
      return { success: false, message: 'User not found' };
    }

    // BUG: No email verification
    // Anyone can reset anyone's password if they know the username
    const user = this.users.get(username);
    user.password = newPassword;  // Still storing in plain text

    return { success: true, message: 'Password reset successfully' };
  }
}

module.exports = UserAuth;
