const container = document.getElementById('container');
const imgTemp = document.getElementById('imgTemp').innerHTML.trim();

const prom = fetch('https://jsonplaceholder.typicode.com/photos?_limit=50');
let photos;

prom.then((resp) => {
    resp.json().then((data) => {
        photos = data;

        for( let i = 0; i < photos.length; i++ ) {
            let newImg = document.createElement('img');
            newImg.innerHTML = imgTemp.replace('{{thumbURL}}', photos[i].thumbnailUrl)
                                      .replace('{{title}}', photos[i].title)
                                      .replace('{{fullURL}}', photos[i].url)
                                      .replace('{{index}}', photos[i].id);

            container.firstElementChild.append(newImg);
        }
    });
});

