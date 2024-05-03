const url = 'https://api.nytimes.com/svc/mostpopular/v2/';
var sortOption = '';
var timeOption = '';
const apiKey = '.json?api-key=WOurXSGPYOGvLJy2DjGirkxRrWDZnYgP';

async function getResponse() {
    var mostFilter = document.getElementsByName('sort-type');
    for (let i = 0; i < mostFilter.length; i++) {
        if (i == 0 && mostFilter[i].checked) {
            sortOption = 'viewed'; 
            console.log("Most option = " + sortOption);
        }
    }

    var timeFilter = document.getElementsByName('time-type');
    for (let j = 0; j < timeFilter.length; j++) {
        if (j == 0 && timeFilter[j].checked){
            timeOption = '/1';
            console.log("Time option = " + timeOption);
        }    
    }
    console.log(url);
    console.log(sortOption);
    console.log(timeOption);
    console.log(apiKey);
    var filterURL = url + sortOption + timeOption + apiKey;
    console.log(filterURL);

    try {
        const response = await fetch(filterURL);

        if (!response.ok){
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        console.log(data);

        const articleTitle = data.results[0].title;
        const firstCardTitle = document.querySelector("#first-card-title");
        firstCardTitle.innerHTML = "1) " + articleTitle;
        
        const articleDate = new Date(data.results[0].published_date).toISOString().slice(0, 10);
        const firstCardDate = document.querySelector("#first-card-date");
        firstCardDate.innerHTML = articleDate;

        const articleImageURL = data.results[0].media[0]["media-metadata"][0].url;
        const firstCardImage = document.querySelector("#first-card-image");
        firstCardImage.innerHTML = "<img src=" + articleImageURL + ">"

        const articleAbstract = data.results[0].abstract;
        const firstCardAbstract = document.querySelector("#first-card-text");
        firstCardAbstract.innerHTML = articleAbstract;
    
    } 
    
    catch (error) {
        console.log(error);
    }
}
