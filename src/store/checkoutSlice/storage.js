
export const loadStateCheckout = () => {
    try {
        const serializedState = localStorage.getItem("checkoutState");
        if (!serializedState) return undefined;
    } catch (error) {
        console.warn ('Could not load from Local Storage' , error);
        return undefined;
    }
};

export const saveStateCheckout = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("checkoutState", serializedState);
} catch (error) {
    console.warn ('Could not save state to localStorage' , error);}
};

export const clearStateCheckout = () => {
    try {
        localStorage.removeItem("checkoutState");
    } catch (error) {
        console.warn ('Clear localStorage error:' , error);
    }
}