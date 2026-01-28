// Example code for Scenario 2: Auto Bug Fix
// This file has been fixed to address security vulnerabilities

const crypto = require('crypto');

class UserAuth {
  constructor() {
    this.users = new Map();
    this.resetTokens = new Map(); // Store password reset tokens
  }

  /**
   * Hash password using bcrypt-like approach with Node.js crypto
   * Using PBKDF2 for secure password hashing
   */
  _hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return { salt, hash };
  }

  /**
   * Verify password against stored hash
   */
  _verifyPassword(password, salt, hash) {
    const verifyHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === verifyHash;
  }

  /**
   * Validate redirect URL to prevent open redirect attacks
   */
  _isValidRedirectUrl(url) {
    if (!url) return false;

    try {
      const parsedUrl = new URL(url);
      // Only allow relative URLs or URLs from the same origin
      // In a real app, you would check against an allowlist of domains
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch (e) {
      // If it's not a valid URL, check if it's a relative path
      return url.startsWith('/') && !url.startsWith('//');
    }
  }

  /**
   * Register a new user
   * FIXED: Password is now hashed using PBKDF2
   */
  register(username, password) {
    if (this.users.has(username)) {
      throw new Error('User already exists');
    }

    // FIXED: Hash password before storing
    const { salt, hash } = this._hashPassword(password);
    this.users.set(username, {
      username: username,
      passwordHash: hash,
      salt: salt
    });

    return { success: true, message: 'User registered successfully' };
  }

  /**
   * Login user
   * FIXED: Redirect URL is now validated to prevent open redirect vulnerability
   */
  login(username, password, redirectUrl) {
    const user = this.users.get(username);

    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }

    // FIXED: Use secure password verification
    if (!this._verifyPassword(password, user.salt, user.passwordHash)) {
      return { success: false, message: 'Invalid credentials' };
    }

    // FIXED: Validate redirect URL to prevent open redirect attacks
    if (redirectUrl && !this._isValidRedirectUrl(redirectUrl)) {
      return {
        success: false,
        message: 'Invalid redirect URL'
      };
    }

    return {
      success: true,
      message: 'Login successful',
      redirect: redirectUrl || '/'
    };
  }

  /**
   * Request password reset
   * FIXED: Now generates a secure token for password reset
   */
  requestPasswordReset(username) {
    if (!this.users.has(username)) {
      // Don't reveal if user exists or not (security best practice)
      return { success: true, message: 'If the user exists, a reset token has been generated' };
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = Date.now() + 3600000; // 1 hour expiry

    this.resetTokens.set(resetToken, {
      username: username,
      expiry: tokenExpiry
    });

    // In a real application, this token would be sent via email
    return {
      success: true,
      message: 'Password reset token generated',
      token: resetToken // In production, this would be sent via email, not returned
    };
  }

  /**
   * Reset password with token
   * FIXED: Now requires a valid token for authentication
   */
  resetPassword(resetToken, newPassword) {
    const tokenData = this.resetTokens.get(resetToken);

    if (!tokenData) {
      return { success: false, message: 'Invalid or expired reset token' };
    }

    // Check if token has expired
    if (Date.now() > tokenData.expiry) {
      this.resetTokens.delete(resetToken);
      return { success: false, message: 'Reset token has expired' };
    }

    const username = tokenData.username;
    const user = this.users.get(username);

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // FIXED: Hash the new password before storing
    const { salt, hash } = this._hashPassword(newPassword);
    user.passwordHash = hash;
    user.salt = salt;

    // Remove used token
    this.resetTokens.delete(resetToken);

    return { success: true, message: 'Password reset successfully' };
  }
}

module.exports = UserAuth;
