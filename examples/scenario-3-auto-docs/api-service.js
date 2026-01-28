// Example code for Scenario 3: Auto Documentation
// This file needs comprehensive documentation

class APIService {
  constructor(baseUrl, apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.cache = new Map();
  }

  async fetchUser(userId) {
    const cacheKey = `user_${userId}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const response = await fetch(`${this.baseUrl}/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    const user = await response.json();
    this.cache.set(cacheKey, user);

    return user;
  }

  async createUser(userData) {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to create user: ${error.message}`);
    }

    return await response.json();
  }

  async updateUser(userId, updates) {
    this.cache.delete(`user_${userId}`);

    const response = await fetch(`${this.baseUrl}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.statusText}`);
    }

    return await response.json();
  }

  async deleteUser(userId) {
    this.cache.delete(`user_${userId}`);

    const response = await fetch(`${this.baseUrl}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }

    return { success: true };
  }

  clearCache() {
    this.cache.clear();
  }
}

module.exports = APIService;
