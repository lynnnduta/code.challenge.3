// Your code here
fetch('http://localhost:3000/films/1')
 .then(response => response.json())
 .then(data => {
    const filmDetails = document.getElementById('film-details');
    filmDetails.innerHTML = `
      <img src="${data.poster}" alt="${data.title}" />
      <h2>${data.title}</h2>
      <p>Runtime: ${data.runtime} minutes</p>
      <p>Showtime: ${data.showtime}</p>
      <p>Available tickets: ${data.capacity - data.tickets_sold}</p>
    `;
  });

  fetch('http://localhost:3000/films')
 .then(response => response.json())
 .then(data => {
    const filmsList = document.getElementById('films');
    data.forEach(film => {
      const filmItem = document.createElement('li');
      filmItem.classList.add('film', 'item');
      filmItem.textContent = film.title;
      filmsList.appendChild(filmItem);
    });
  });
  const buyTicketButton = document.getElementById('buy-ticket-button');
buyTicketButton.addEventListener('click', () => {
  fetch(`http://localhost:3000/films/${filmId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tickets_sold: ticketsSold + 1
    })
  })
 .then(response => response.json())
 .then(data => {
    // Update the available tickets count in the UI
    const availableTickets = document.getElementById('available-tickets');
    availableTickets.textContent = data.capacity - data.tickets_sold;
  });

  fetch('http://localhost:3000/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      film_id: filmId,
      number_of_tickets: 1
    })
  })
 .then(response => response.json())
 .then(data => {
    
  });
});
const deleteButton = document.getElementById('delete-button');
deleteButton.addEventListener('click', () => {
  fetch(`http://localhost:3000/films/${filmId}`, {
    method: 'DELETE'
  })
 .then(response => {
    // Remove the film from the UI
    const filmItem = document.getElementById(`film-${filmId}`);
    filmItem.remove();
  });
});
if (ticketsSold === capacity) {
    const filmItem = document.getElementById(`film-${filmId}`);
    filmItem.classList.add('sold-out');
    const buyTicketButton = document.getElementById('buy-ticket-button');
    buyTicketButton.textContent = 'Sold Out';
  }
