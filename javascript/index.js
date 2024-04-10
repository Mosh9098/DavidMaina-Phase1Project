document.addEventListener('DOMContentLoaded', () => {
const pokemonNameInput = document.getElementById('pokemon-name');
const generateCardButton = document.getElementById('generate-card');
const pokemonCard = document.getElementById('pokemon-card');

generateCardButton.addEventListener('click', () => {
  const pokemonName = pokemonNameInput.value.toLowerCase();
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => response.json())
    .then(data => {
      if (data.id) {
        generateCard(data);
      } else {
        pokemonCard.innerHTML = 'Enter Pokemon Name!';
      }
      console.log(data);
    })
    .catch(error => {
      pokemonCard.innerHTML = 'Pokemon not found!';
    });
});
function generateCard(pokemonData) {
  fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`)
    .then(response => response.url)
    .then(spriteUrl => {
      const cardHTML = `
        <img src="${spriteUrl}" alt="${pokemonData.name}">
        <h2>${pokemonData.name}</h2>
        <p>Type: ${pokemonData.types[0].type.name}</p>
      `;
      pokemonCard.innerHTML = cardHTML;
    });}
});
