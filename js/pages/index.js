// Function to fetch data from the PokeAPI
const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

// Function to create a Pokemon card element
const createPokemonCard = (pokemon) => {
    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    const name = document.createElement("h2");
    name.textContent = pokemon.name;
    card.appendChild(name);

    const image = document.createElement("img");
    image.src = pokemon.sprites.front_default;
    card.appendChild(image);

    const link = document.createElement("a");
    link.classList.add("button");
    link.href = `product.html?id=${pokemon.id}`;
    link.textContent = "View Details";
    card.appendChild(link);

    return card;
};

// Function to populate the HTML with Pokemon data
const populatePokemonData = async () => {
    const main = document.querySelector("main");

    // Fetch the initial data
    const initialData = await fetchData("https://pokeapi.co/api/v2/pokemon?limit=20");

    // Create Pokemon cards for the initial data
    initialData.results.forEach(async (pokemon) => {
        const pokemonData = await fetchData(pokemon.url);
        const card = createPokemonCard(pokemonData);
        main.appendChild(card);
    });

    // Infinite scroll and lazy loading
    window.addEventListener("scroll", async () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 10) {
            const nextData = await fetchData(initialData.next);

            nextData.results.forEach(async (pokemon) => {
                const pokemonData = await fetchData(pokemon.url);
                const card = createPokemonCard(pokemonData);
                main.appendChild(card);
            });
        }
    });
};

// Call the function to populate the HTML with Pokemon data
populatePokemonData();
