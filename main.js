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

        let count = 0;
        for (let r = 0; r < data.results.length; r++) {
            if (count == 5)
                break;
            try {
                const articleImageURL = data.results[r].media[0]["media-metadata"][0].url;
                const firstCardImage = document.getElementById(r+"-card-image");
                firstCardImage.innerHTML = "<img src=" + articleImageURL + ">"
            }
            catch (error) {
                console.log(error);
                continue;
            }
            const articleTitle = data.results[r].title;
            const firstCardTitle = document.getElementById(r+"-card-title");
            firstCardTitle.innerHTML = (r+1)+") " + articleTitle;
            
            const articleDate = new Date(data.results[r].published_date).toISOString().slice(0, 10);
            const firstCardDate = document.getElementById(r+"-card-date");
            firstCardDate.innerHTML = articleDate;
            
            const articleAbstract = data.results[r].abstract;
            const firstCardAbstract = document.getElementById(r+"-card-text");
            firstCardAbstract.innerHTML = articleAbstract;
            count += 1;
        }
    
    } 
    
    catch (error) {
        console.log(error);
    }
}
