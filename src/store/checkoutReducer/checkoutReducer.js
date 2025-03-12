const freeShipping = 'Free shipping, Arrives by Mon, Jun 17'

const initialCheckoutState = {
    step: 'shipping',
    shippingMethod: 'ship',
    deliverySpeed: freeShipping,
    customerData: [],
    isEditing: false,
    isSubmitted: false
}

export default function checkoutReducer(state = initialCheckoutState, action) {
    switch (action.type) {
        case 'SET_STEP':
               return {...state, step:action.payload};

        case 'SET_SHIPPING_METHOD':
                return {...state, shippingMethod: action.payload};

        case 'SET_DELIVERY_SPEED':
            return {...state, deliverySpeed: action.payload};

        case 'SET_CUSTOMER_DATA':
                return {...state, customerData: action.payload};

        case 'TOGGLE_EDITING':
            return {...state, isEditing: !state.isEditing};

        case 'FORM_CHECKOUT_IS_SUBMITTED':
            return {...state, isSubmitted: true};
                default:
                    return state;

    }
}