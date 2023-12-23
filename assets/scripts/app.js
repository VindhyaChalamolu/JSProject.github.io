let movies = [];
const addMovie = document.querySelector('header button');
const addModalId = document.querySelector('#add-modal');
const backdrop = document.querySelector('#backdrop');
const ul = document.querySelector('main ul');
const entryText = document.querySelector('#entry-text');
const deleteModalId = document.querySelector('#delete-modal');

const addModalToggleHandler = () => {
    backdrop.classList.toggle("visible");
    addModalId.classList.toggle('visible');
    clearInput();
}

closeAddModal = addModalId.getElementsByClassName('btn btn--passive');
closeAddModal[0].addEventListener('click', addModalToggleHandler);

const inputTag = document.getElementsByTagName('input');

function deleteMovie(id) {
    let movieIndex=0;
    for(let i=0; i< movies.length; i++) {
        if(id === movies[i].id) {
            movieIndex = i;
            break;
        }
    }

    movies.splice(movieIndex,1);
    const m = document.getElementsByClassName('movie-element');
    console.log(m[movieIndex],id)
    m[movieIndex].remove();
    if(movies.length === 0) {
        entryText.style.display = '';
    }
}

const confirmationModalHandler = () => {
    deleteModalId.classList.remove('visible');
    
}
const renderNewMovie = (newMovie, id) => {
    const {imageUrl, rating, name} = newMovie;
    entryText.style.display = 'none';
    const li = document.createElement('li');
    li.className = 'movie-element'
    li.innerHTML = `
        <div class='movie-element__image'>
            <img src=${imageUrl} alt=${name}/>
        </div>
        <div class='movie-element__info'>
            <h2>${name}</h2>
            <p>Rating - ${rating}/5</p>
        </div>
        <div class='remove'>Remove</div>
    `;
    ul.append(li);
    li.addEventListener('click', () => {
        backdrop.classList.toggle("visible");
        deleteModalId.classList.toggle('visible');

        const confirmationNoModal = deleteModalId.getElementsByClassName('btn btn--passive');
        let confirmationYesModal = deleteModalId.getElementsByClassName('btn btn--danger');
        
        confirmationYesModal[0].replaceWith(confirmationYesModal[0].cloneNode(true));
        confirmationYesModal = deleteModalId.getElementsByClassName('btn btn--danger');

        confirmationYesModal[0].addEventListener('click', ()=> {
            confirmationModalHandler();
            backdrop.classList.remove("visible");
            deleteMovie(id);
        });
        confirmationNoModal[0].addEventListener('click', ()=> {
            confirmationModalHandler();
            backdrop.classList.remove("visible");
        });

        
    });
}
const clearInput = () => {
    inputTag[0].value = '';
    inputTag[1].value = '';
    inputTag[2].value = '';
}

addModalButton = addModalId.getElementsByClassName('btn btn--success');
addModalButton[0].addEventListener('click', () => {
    const inputMovieName = inputTag[0].value;
    const inputImageUrl = inputTag[1].value;
    const inputRating = inputTag[2].value;
    if(inputMovieName === '' || inputImageUrl === '' || inputRating === '') {
        alert("Enter Valid Details");
    } else {
        let movieDetails = {};
        movieDetails.id = Math.random()*100;
        movieDetails.name = inputMovieName;
        movieDetails.imageUrl = inputImageUrl;
        movieDetails.rating = inputRating;
        movies = [...movies, movieDetails];
        addModalToggleHandler();
        renderNewMovie(movieDetails, movieDetails.id);
        clearInput();
    }
    console.log("Movie ", movies);
})

addMovie.addEventListener('click',addModalToggleHandler );

backdrop.addEventListener('click', addModalToggleHandler)


