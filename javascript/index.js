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
          <div id="like"> 
          <button id="like-button">👍</button>
          <button id="dislike-button">👎</button>
          <div>
          <textarea id="comment-box" placeholder="Write your comment here"></textarea> <!-- Added comment box -->
          <button id="submit-comment">Submit</button>
        `;
        pokemonCard.innerHTML = cardHTML;

        const likeButton = document.getElementById('like-button');
        const dislikeButton = document.getElementById('dislike-button');

        likeButton.addEventListener('click', () => {
          alert(`You liked ${pokemonData.name}!`);
        });

        dislikeButton.addEventListener('click', () => {
          alert(`You disliked ${pokemonData.name}!`);
        });
      });
  }
});