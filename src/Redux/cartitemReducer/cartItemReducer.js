

const initialState = {
  cartItemsArray: [],
};

export default function cartItemReducer(state = initialState, action) {
  switch (action.type) {
    case 'cartitem':
    
      return {
        ...state,
        cartItemsArray: [...state.cartItemsArray, action.data]
      };
      case 'CLEAR_CART':
        case 'RESET_CART_REDUCER':
          console.log("clearing array")
          return {
            ...state,
            cartItemsArray: [],
          };
  
    default:
      return state;
  }
}
