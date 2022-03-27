let kino = films;

let header = document.createElement("header");
header.classList.add("header");
document.body.appendChild(header);

let searchForm = document.createElement("form");
searchForm.classList.add("form");
searchForm.setAttribute("autocomplete", "off");
searchForm.setAttribute("method", "POST");
header.appendChild(searchForm);

let searchInput = document.createElement("input");
searchInput.classList.add("form-input");
searchInput.setAttribute("type", "text");
searchInput.setAttribute("placeholder", "write the cinema name...");
searchInput.setAttribute("required", "true");
searchForm.appendChild(searchInput);

let searchBtn = document.createElement("button");
searchBtn.classList.add("search-btn");
searchBtn.setAttribute("type", "submit");
searchBtn.textContent = "Search";
searchForm.appendChild(searchBtn);

let select = document.createElement("select");
select.classList.add("select");
select.setAttribute("name", "Genres of films");
header.appendChild(select);

let optionAllGenres = document.createElement("option");
optionAllGenres.setAttribute("value","All genres");
optionAllGenres.textContent = "All genres";
select.appendChild(optionAllGenres);

let sort = document.createElement("select");
sort.classList.add("sort");
sort.setAttribute("name", "sort");
header.appendChild(sort);

let sortAll = document.createElement("option");
sortAll.setAttribute("value","sotAll");
sortAll.textContent = "All types";
sort.appendChild(sortAll);

let sortById = document.createElement("option");
sortById.setAttribute("value","id");
sortById.textContent = "Sort by id";
sort.appendChild(sortById);

let sortByName = document.createElement("option");
sortByName.setAttribute("value","name");
sortByName.textContent = "Sort by name";
sort.appendChild(sortByName);

let sortByGenres = document.createElement("option");
sortByGenres.setAttribute("value","genres");
sortByGenres.textContent = "Sort by genres";
sort.appendChild(sortByGenres);

let addFilm = document.createElement("div");
addFilm.classList.add("add-film");
document.body.appendChild(addFilm);

let main = document.createElement("main");
main.classList.add("main");
document.body.appendChild(main);

let moviesList = document.createElement("ol");
moviesList.classList.add("list");
main.appendChild(moviesList);

let add = document.createElement("form");
  add.classList.add("add");
  add.setAttribute("method","POST");
  add.setAttribute("autocomplete", "off");
  addFilm.appendChild(add);

  let addImg = document.createElement("input");
  addImg.setAttribute("placeholder","write film's img url..");
  addImg.setAttribute("required", "true");
  add.appendChild(addImg);

  let addId = document.createElement("input");
  addId.setAttribute("placeholder","write film's id...");
  addId.setAttribute("required", "true");
  add.appendChild(addId);

  let addTitle = document.createElement("input");
  addTitle.setAttribute("placeholder","write film's title...");
  addTitle.setAttribute("required", "true");
  add.appendChild(addTitle);

  let addOver = document.createElement("input");
  addOver.setAttribute("placeholder","write film's overwiew...");
  addOver.setAttribute("required", "true");
  add.appendChild(addOver);

  let addDate = document.createElement("input");
  addDate.setAttribute("placeholder","write film's release_date...");
  addDate.setAttribute("required", "true");
  add.appendChild(addDate);

  let addGenre = document.createElement("input");
  addGenre.setAttribute("placeholder","write film's genres with probel");
  addGenre.setAttribute("value","Action Comedy");
  addGenre.setAttribute("required", "true");
  add.appendChild(addGenre);

  let addBtn = document.createElement("button");
  addBtn.setAttribute("type", "submit");
  addBtn.textContent = "Add film";
  addBtn.classList.add("add-btn");
  add.appendChild(addBtn);

  add.addEventListener("submit", function(evt){
      evt.preventDefault();

      let addImgVal = addImg.value.trim();
      let addIdVal = addId.value.trim();
      let addTitleVal = addTitle.value.trim();
      let addOverVal = addOver.value.trim();
      let addDateVal = addDate.value.trim();
      let addGenreVal = addGenre.value.trim();
    


    let todo = {
        id: addIdVal,
        title: addTitleVal,
        poster: addImgVal,
        overview: addOverVal,
        release_date: addDateVal,
        genres: addGenreVal,
    }

    console.log(todo);
    console.log(films);
    films.push(todo);
  })

function filterGenres(array , obj){
    let filteredGenres = [];
    array.forEach((film) => {
      film.genres.forEach(genreArr => {
        if(!filteredGenres.includes(genreArr)){
          filteredGenres.push(genreArr);
        }
      });
    });

    filteredGenres.forEach(genres => {
      let selectOption = document.createElement("option");
      selectOption.setAttribute("value", genres);
      selectOption.textContent = genres;
      obj.appendChild(selectOption);
    });
  }
filterGenres(kino, select);  

function filterFilms(array, obj){
   obj.innerHTML = "";
  
    array.forEach(movies =>{
      let moviesItem = document.createElement("li");
      moviesItem.classList.add("list-item");
      obj.appendChild(moviesItem);

      let moviesItemImg = document.createElement("img");
      moviesItemImg.classList.add("list-item-img");
      moviesItemImg.setAttribute("src", movies.poster);
      moviesItem.appendChild(moviesItemImg);

      let moviesItemBody = document.createElement("div");
      moviesItemBody.classList.add("list-item-body");
      moviesItem.appendChild(moviesItemBody);

      let moviesItemBodyId = document.createElement("time");
      moviesItemBodyId.textContent = movies.id;
      moviesItemBody.appendChild(moviesItemBodyId);

      function getTime(){
        var date = new Date(movies.release_date);
        var day = date.getDate();
        var month = String(date.getMonth() +1).padStart(2,0);
        var year = date.getFullYear();
        return `${day}.${month}.${year}`;
      }

      let moviesItemBodyDate = document.createElement("time");
      moviesItemBodyDate.textContent = getTime();
      moviesItemBodyDate.classList.add("list-item-body-date");
      moviesItemBody.appendChild(moviesItemBodyDate);

      let moviesItemBodyTitle = document.createElement("h3");
      moviesItemBodyTitle.textContent = movies.title;
      moviesItemBodyTitle.classList.add("list-item-body-title");
      moviesItemBody.appendChild(moviesItemBodyTitle);

      let moviesItemBodyOver = document.createElement("p");
      moviesItemBodyOver.textContent = movies.overview.split(" ").slice(0 ,45).join(" ") + "...";
      moviesItemBody.appendChild(moviesItemBodyOver);

      let moviesItemBodygenres  = document.createElement("h4");
      moviesItemBodygenres.textContent = movies.genres.join(", ");
      moviesItemBodygenres.classList.add("list-item-body-genres");
      moviesItemBody.appendChild(moviesItemBodygenres);  
    });
  }
  filterFilms(kino, moviesList);

searchForm.addEventListener("submit", function(evt){
      evt.preventDefault();
      let inputval = searchInput.value;
      searchInput.value = "";

      let filterMovies = films.filter(object => object.title.includes(inputval));
      filterFilms(filterMovies, moviesList);
});

select.addEventListener("change", function(){
    let selectVal = select.value;
   
    let filteredGenres =  films.filter(object => object.genres.includes(selectVal));
    filterFilms(filteredGenres, moviesList);

    if(selectVal == "All genres"){
        filterFilms(films, moviesList);
    }
})

sort.addEventListener("change", function(){
    let sortVal = sort.value;
    console.log(sortVal);
    
})