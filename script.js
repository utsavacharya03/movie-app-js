// TMDb

const API_KEY = 'db25bbd9e30527bb78ea20fc27439a28';
const image_path = 'https://image.tmdb.org/t/p/w1280';
const trailer_path = 'https://www.youtube.com/watch?v=';


// Lets give app ability to search

const input = document.querySelector('.search input')
const btn = document.querySelector('.search button')
const main_grid_title = document.querySelector('.favourites h1')
const main_grid = document.querySelector('.favourites .movies-grid')

function add_click_effect_to_card(cards) {
    cards.forEach(card => {
        card.addEventListener('click', () => show_popup(card))
    });
}

async function get_movies_by_search(search_term) {
    const resp = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search_term}`)

    const respData = await resp.json()
    console.log(respData.results)
    return respData.results
    
}

btn.addEventListener('click', add_searched_movies_to_dom)

async function add_searched_movies_to_dom() {
    const data = await get_movies_by_search(input.value)
    console.log(data)

    main_grid_title.innerText = `Search Resultes...`
    main_grid.innerHTML = data.map(e => {
        return `
        <div class="card" data-id="${e.id}">
        <div class="img">
          <img src="${image_path + e.poster_path}" alt="" />
        </div>
        <div class="info">
          <h2>${e.title}</h2>
          <div class="single-info">
            <span>Rate: </span>
            <span>${e.vote_average} / 10</span>
          </div>
          <div class="single-info">
            <span>Release Date: </span>
            <span>${e.release_date}</span>
          </div>
        </div>
      </div>`
    }).join( ' ')

    // now when we click in the card we want to show a popup with the movie info

    const cards = document.querySelectorAll('.card')
    add_click_effect_to_card(cards)
}

// now lets create the popup in the HTML..
function show_popup(card) {
    console.log('popup' + card)
}

