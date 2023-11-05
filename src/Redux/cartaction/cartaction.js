// cartItemAction.js
export default function cartItem(ctitem) {
  console.log("resturentData inside action", ctitem);
  return {
    type: 'cartitem',
    data: ctitem
  };
}


// cartActions.js
export const clearCart = () => ({
  type: 'CLEAR_CART',
});

export const resetCartReducer = () => ({
  type:'RESET_CART_REDUCER',
});