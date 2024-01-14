// Get the cart div element
const cartDiv = document.querySelector(".cart");

// Create a new element for each item in the cart
const cart = getCart();
Object.keys(cart).forEach((key) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${key}`)
        .then((response) => response.json())
        .then((data) => {
            const card = document.createElement("div");
            card.classList.add("pokemon-card");

            const name = document.createElement("h2");
            name.textContent = data.name;
            card.appendChild(name);

            const image = document.createElement("img");
            image.src = data.sprites.front_default;
            card.appendChild(image);

            const actionContainer = document.createElement("div");
            actionContainer.classList.add("action-container");
            card.appendChild(actionContainer);

            const quantity = document.createElement("input");
            quantity.type = "number";
            quantity.value = cart[key].quantity;
            quantity.addEventListener("change", () => {
                changeQuantity(key, quantity.value);
            });
            actionContainer.appendChild(quantity);

            const remove = document.createElement("button");
            remove.classList.add("button");
            remove.innerText = "Remove";
            remove.addEventListener("click", () => {
                removeFromCart(key);
                card.remove();
            });
            actionContainer.appendChild(remove);

            cartDiv.appendChild(card);
        })
        .catch((error) => console.log(error));
});

// Add event listener to the pay button
const payButton = document.getElementById("pay");
payButton.addEventListener("click", () => {
    // Clear the cart
    clearCart();
    // Redirect to the home page
    window.location.href = ".";
});
