const url = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=WOurXSGPYOGvLJy2DjGirkxRrWDZnYgP';

async function getResponse() {
    try {
        const response = await fetch(url);

        if (!response.ok){
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();
        console.log(data);

        var filter = document.getElementsByName('sort-type');

        for (let i = 0; i < filter.length; ++i) {
            if (filter[i].checked) {
                const articleTitle = data.results[0].title;
                const articleDate = new Date(data.results[0].published_date).toISOString().slice(0, 10);

                const firstCardTitle = document.querySelector("#first-card-title");
                firstCardTitle.innerHTML = "1) " + articleTitle;

                const firstCardDate = document.querySelector("#first-card-date");
                firstCardDate.innerHTML = articleDate;
            }
        }
    } 
    
    catch (error) {
        console.log(error);
    }
}
