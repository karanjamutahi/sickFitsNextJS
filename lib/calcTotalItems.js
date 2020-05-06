function totalItems(cart) {
    return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)
}

export default totalItems;