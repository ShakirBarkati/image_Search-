const accessKey = `tJMwWw8CimxnWPShEBioI23msGsU4rATlkd1E2h7J0Q`;
const formEl = document.querySelector(`form`);
const searchEl = document.querySelector(`#search-input`);
const searchInpBtnEl = document.querySelector(`#search-button`);
const searchResultsEl = document.querySelector(`.search-results`);
const showMoreBtnEl = document.querySelector(`#show-more-button`);


let inputData = "";
let page = 1;
let searchImages = async () => {
    inputData = searchEl.value;
    // let URL = `https://api.unsplash.com/search/photos?page=${page}& query=${inputData}&client_id=${accessKey}`;
    let URL = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    const response = await fetch(URL);
    let data = await response.json();
    if (page === 1) {
        searchResultsEl.innerHTML = "";
    }
    const results = data.results;

    results.map((result) => {
        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add('search-result');
        const image = document.createElement(`img`);
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement(`a`);
        imageLink.href = result.links.html;
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultsEl.appendChild(imageWrapper)

        page++;
    })

    if (page > 1) {
        showMoreBtnEl.style.display = `block`;
    }


}

formEl.addEventListener(`submit`, (event) => {
    event.preventDefault();
    page = 1;
    console.log(`Sumitted`);
    searchImages();
})


showMoreBtnEl.addEventListener(`click`, (event) => {
    console.log(event)

    searchImages()
})
