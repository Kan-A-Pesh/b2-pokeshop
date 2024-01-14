// Get cart from localstorage
const getCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart) {
        return {};
    }

    return cart;
};

// Add element to cart (with qty)
const addToCart = (pokemonId, quantity) => {
    const cart = getCart();
    const pokemon = cart[pokemonId];
    console.log(pokemonId, quantity);

    if (pokemon) {
        pokemon.quantity += quantity;
    } else {
        cart[pokemonId] = {
            quantity: quantity,
        };
    }

    saveCart(cart);
};

// Change cart element quantity
const changeQuantity = (pokemonId, quantity) => {
    const cart = getCart();
    const pokemon = cart[pokemonId];

    if (pokemon) {
        pokemon.quantity = quantity;
    }

    saveCart(cart);
};

// Remove element from cart
const removeFromCart = (pokemonId) => {
    const cart = getCart();
    delete cart[pokemonId];
    saveCart(cart);
};

// Save cart to localstorage
const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Cleat cart (completly)
const clearCart = () => {
    localStorage.removeItem("cart");
};
