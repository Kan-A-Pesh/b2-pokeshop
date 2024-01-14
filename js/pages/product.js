const getParameterByName = (name, url = window.location.href) => {
    name = name.replace(/[\[\]]/g, "\\$&");
    const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

const pokemonId = getParameterByName("id");
fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then((response) => response.json())
    .then((data) => {
        document.querySelector("#pokemon-name").textContent = data.name;
        document.querySelector("#pokemon-image").src = data.sprites.front_default;

        document.querySelector("#add-to-cart").addEventListener("click", () => {
            const quantity = document.querySelector("#quantity").value;
            addToCart(pokemonId, quantity);
            window.location.href = "cart.html";
        });
    })
    .catch((error) => console.log(error));
