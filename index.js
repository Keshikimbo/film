const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;
const tagsEl = document.getElementById('tags');


const main = document.getElementById('main');

getMovies(API_URL)


function getMovies(url){
	lastUrl = url;

  fetch(url).then(res => res.json()).then(data => {
	console.log(data.results)
	if(data.results.length !== 0){
		showMovies(data.results);
		 currentPage = data.page;
		 nextPage = currentPage + 1;
		 prevPage = currentPage - 1;
		 totalPages = data.total_pages;

			current.innerText = currentPage;

		 if(currentPage <= 1){
			prev.classList.add('disabled');
			next.classList.remove('disabled')
		 }else if(currentPage>= totalPages){
			prev.classList.remove('disabled');
			next.classList.add('disabled')
		 }else{
			prev.classList.remove('disabled')
			next.classList.remove('disabled')
		 }

		 tagsEl.scrollIntoView({behavior : 'smooth'})

	}else{
		main.innerHTML = `<h1 class='no-result'>No Results Found</h1>`
	}
    
  })
}

function showMovies(data) {
	main.innerHTML = '';

data.forEach(movie => {
	const{title, poster_path} = movie;
	const movieEl = document.createElement('div');
	movieEl.classList.add('movie');
	movieEl.innerHTML = `
	<img src="${IMG_URL+poster_path}" alt="${title}">
	  
		  <div class="movie-info">
			<h3>${title}</h3>
		  </div>
	
	`
	main.appendChild(movieEl);
})
}

//Для пошуку
const form = document.getElementById('form')
const search = document.getElementById('search')

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const searchTerm = search.value;
	if(searchTerm){
		getMovies(searchURL+'&query='+searchTerm)
	}else{
		getMovies(API_URL)
	}
})

//pagination



const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')



prev.addEventListener('click', ()=>{
	if(prevPage > 0){
		pageCall(prevPage);
	}
})


next.addEventListener('click', ()=>{
	if(nextPage <= totalPages){
		pageCall(nextPage);
	}
})

function pageCall(page){
	let urlSplit = lastUrl.split('?');
	let queryParams = urlSplit[1].split('&');
	let key = queryParams[queryParams.length - 1].split('=');
	if(key[0] != 'page'){
		let url = lastUrl + '&page='+page;
		getMovies(url);
	}else{
		key[1]= page.toString();
		let a = key.join('=');
		queryParams[queryParams.length - 1] = a;
		let b = queryParams.join('&')
		let url = urlSplit[0] +'?'+ b
		getMovies(url)
	}
}