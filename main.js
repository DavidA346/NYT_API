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
        else if (i == 1 && mostFilter[i].checked) {
            sortOption = 'shared'; 
            console.log("Most option = " + sortOption);
        }
        else if (i == 2 && mostFilter[i].checked) {
            sortOption = 'emailed'; 
            console.log("Most option = " + sortOption);
        }
    }

    var timeFilter = document.getElementsByName('time-type');
    for (let j = 0; j < timeFilter.length; j++) {
        if (j == 0 && timeFilter[j].checked){
            timeOption = '/1';
            console.log("Time option = " + timeOption);
        }
        else if (j == 1 && timeFilter[j].checked){
            timeOption = '/7';
            console.log("Time option = " + timeOption);
        }
        else if (j == 2 && timeFilter[j].checked){
            timeOption = '/30';
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

        for (let k = 0; k < 5; k++) {
            const articleTitle = data.results[k].title;
            const firstCardTitle = document.getElementById(k+"-card-title");
            firstCardTitle.innerHTML = (k+1)+") " + articleTitle;
            
            const articleDate = new Date(data.results[k].published_date).toISOString().slice(0, 10);
            const firstCardDate = document.getElementById(k+"-card-date");
            firstCardDate.innerHTML = articleDate;

            const articleImageURL = data.results[k].media[0]["media-metadata"][0].url;
            const firstCardImage = document.getElementById(k+"-card-image");
            firstCardImage.innerHTML = "<img src=" + articleImageURL + ">"

            const articleAbstract = data.results[k].abstract;
            const firstCardAbstract = document.getElementById(k+"-card-text");
            firstCardAbstract.innerHTML = articleAbstract;
        }
    
    } 
    
    catch (error) {
        console.log(error);
    }
}
