// Your code here
const movieDetails = document.getElementById('movie-details');
const movieTitle = document.getElementById('movie-title');
const movieRuntime = document.getElementById('movie-runtime');
const movieShowtime = document.getElementById('movie-showtime');
const movieAvailableTickets = document.getElementById('movie-available-tickets');
const buyTicketButton = document.getElementById('buy-ticket-button');
const filmsList = document.getElementById('films');

// Get the first movie's details when the page loads
fetch('db.json')
 .then(response => response.json())
 .then(data => {
    movieTitle.textContent = data.title;
    movieRuntime.textContent = `Runtime: ${data.runtime} minutes`;
    movieShowtime.textContent = `Showtime: ${data.showtime}`;
    movieAvailableTickets.textContent = `Available tickets: ${data.capacity - data.tickets_sold}`;
    buyTicketButton.addEventListener('click', () => buyTicket(data.id));
  });

// Get the list of all movies when the page loads
fetch('db.json')
 .then(response => response.json())
 .then(data => {
    data.forEach(film => {
      const filmItem = document.createElement('li');
      filmItem.classList.add('film', 'item');
      filmItem.textContent = film.title;
      if (film.capacity === film.tickets_sold) {
        filmItem.classList.add('sold-out');
        film.tickets_sold = null;
      }
      filmItem.addEventListener('click', () => showMovieDetails(film.id));
      filmsList.appendChild(filmItem);
    });
  });

function buyTicket(movieId) {
  // Make a PATCH request to update the number of tickets sold
  fetch(`/films/${movieId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tickets_sold: (parseInt(filmAvailableTickets.textContent.split)) +1
    })
  })
 .then(response => response.json())
 .then(data => {
    movieAvailableTickets.textContent = `Available tickets: ${data.capacity - data.tickets_sold}`;
    buyTicketButton.removeEventListener('click', () => buyTicket(movieId));
    if (data.tickets_sold === data.capacity) {
      buyTicketButton.textContent = 'Sold Out';
      filmItem.classList.add('sold-out');
    }
  });

  // Make a POST request to create a new ticket
  fetch('/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      film_id: movieId,
      number_of_tickets: 1
    })
  })
 .then(response => response.json())
 .then(data => console.log(data));
}

function showMovieDetails(movieId) {
  
  fetch(`/films/${movieId}`)
   .then(response => response.json())
   .then(data => {
      movieTitle.textContent = data.title;
      movieRuntime.textContent = `Runtime: ${data.runtime} minutes`;
      movieShowtime.textContent = `Showtime: ${data.showtime}`;
      movieAvailableTickets.textContent = `Available tickets: ${data.capacity - data.tickets_sold}`;
      buyTicketButton.addEventListener('click', () => buyTicket(data.id));
    });
}