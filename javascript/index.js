// This event listener ensures that the JavaScript code executes
document.addEventListener('DOMContentLoaded', () => {
  // Get references to the necessary HTML elements  
    const pokemonNameInput = document.getElementById('pokemon-name');
    const generateCardButton = document.getElementById('generate-card');
    const pokemonCard = document.getElementById('pokemon-card');
  // Event listener for the "Generate Card" button
    generateCardButton.addEventListener('click', () => {
      const pokemonName = pokemonNameInput.value.toLowerCase();
  // Fetch data from the PokeAPI using the provided Pokemon name
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
       .then(response => response.json())
       .then(data => {
  // If the response contains the ID of the Pokemon, generate the card      
          if (data.id) {
            generateCard(data);
  // If no ID is found, display an error message          
          } else {
            pokemonCard.innerHTML = 'Enter Pokemon Name!';
          }
        })
  // If an error occurs during the fetch request, display an error message
       .catch(error => {
          pokemonCard.innerHTML = 'Pokemon not found!';
        });
    });
  // Function to generate the Pokemon card
    function generateCard(pokemonData) {
  // Fetch the URL for the Pokemon sprite image
      fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`)
       .then(response => response.url)
       .then(spriteUrl => {
  // Creating the HTML for the Pokemon card using the fetched data
          const cardHTML = `
            <img src="${spriteUrl}" alt="${pokemonData.name}">
            <h2>${pokemonData.name}</h2>
            <p>Type: ${pokemonData.types[0].type.name}</p>
            <div id="satisfaction">
            <div id="like"> 
            <button id="like-button">👍</button>
            <button id="dislike-button">👎</button>
            </div>
            <div id="comment">
            <textarea id="comment-box" placeholder="Write your comment here"></textarea> 
            <button id="submit-comment">comment</button>
            </div>
            </div>
          `;
  // Insert the HTML into the Pokemon card element
          pokemonCard.innerHTML = cardHTML;
  // Get references to the like and dislike buttons, comment box, and submit button
          const likeButton = document.getElementById('like-button');
          const dislikeButton = document.getElementById('dislike-button');
          const commentBox = document.getElementById('comment-box');
          const submitButton = document.getElementById('submit-comment');
  
  // Event listener for the like and dislike buttons and alert for either
          likeButton.addEventListener('click', () => {
            alert(`You liked ${pokemonData.name}!`);
          });
  
          dislikeButton.addEventListener('click', () => {
            alert(`You disliked ${pokemonData.name}!`);
          });
  // Event listener for the submit button
          submitButton.addEventListener('click', () => {
            const comment = commentBox.value.trim(); 
  // If a comment was entered, alert the user with the comment text
            if (comment) {
              alert(`Comment received: ${comment}`);
  // If no comment was entered, alert the user to enter a comment
            } else {
              alert("Please enter a comment.");
            }
          });
        });
    }
  });