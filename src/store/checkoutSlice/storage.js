/**
 * Load checkout state from localStorage
 * @returns {Object|undefined} Parsed state or undefined if not found/error
 */
export const loadStateCheckout = () => {
    try {
        const serializedState = localStorage.getItem("checkoutState");
        if (!serializedState) return undefined;
        return JSON.parse(serializedState); // NOTE: Return statement was missing in original
    } catch (error) {
        console.warn('Could not load from Local Storage', error);
        return undefined;
    }
};

/**
 * Save checkout state to localStorage
 * @param {Object} state - Checkout state to persist
 */
export const saveStateCheckout = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("checkoutState", serializedState);
    } catch (error) {
        console.warn('Could not save state to localStorage', error);
    }
};

/**
 * Clear checkout state from localStorage
 * Use it After successes order
 */
export default function clearStateCheckout() {
    try {
        localStorage.removeItem("checkoutState");
    } catch (error) {
        console.warn('Clear localStorage error:', error);
    }
}