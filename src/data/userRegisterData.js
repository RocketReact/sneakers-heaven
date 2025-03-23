// In-memory storage for user registration data
let userRegisterData = [];

// Initialize from localStorage if data exists
const storedData = localStorage.getItem("userRegisterData");
if (storedData) {
    userRegisterData = JSON.parse(storedData);
}

/**
 * Add new user to storage and persist to localStorage
 * @param {Object} newData - User data to store
 */
const addUserData = (newData) => {
    userRegisterData.push(newData);
    localStorage.setItem("userRegisterData", JSON.stringify(userRegisterData));
};

/**
 * Get all registered user data
 * @returns {Array} Array of user data objects
 */
const getUserRegisterData = () => {
    return userRegisterData;
};

export { addUserData, getUserRegisterData };