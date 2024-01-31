const createTable = (movies) => {
    let table = document.createElement('table');
    table.setAttribute('border','1px')
    
    let row = table.insertRow(); 
    let cell1 = row.insertCell(); 
    let cell2 = row.insertCell();
    cell1.innerHTML = "Название фильма"
    cell2.innerHTML = "Оценка"

    for (let elem in movies) {
        let row = table.insertRow(); 
    
        let cell1 = row.insertCell(); 
        let cell2 = row.insertCell();
        
        cell1.innerHTML = elem; 
        cell2.innerHTML = movies[elem];   
    }
    
    document.body.appendChild(table);
}

let personalMovieDB = {
    privat: false,
    movies: {}
};

let i = 0
do {
    let movieName = prompt("Один из последних просмотренных фильмов?");
    let score = prompt("На сколько оцените его?");
    if (movieName != null && score != null && movieName != '' && score != '' && movieName.length < 51) {
        personalMovieDB.movies[movieName] = score;
        i++
    }
} while (i != 3);
 if (personalMovieDB.privat == false) createTable(personalMovieDB.movies);