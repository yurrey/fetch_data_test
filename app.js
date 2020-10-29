const sbtn = document.querySelector('#subbtn');
const cityInp = document.querySelector('#city');
const form = document.querySelector('#cityForm')
const state = document.querySelector('#state');
const cityWeather = document.querySelector('#cityWeather');
const cityInfo = document.querySelector('#cityInfo');
const temp = document.querySelector('.temp');
const cityweather = document.querySelector('#cityweather');
const loader = document.querySelector('#loader');
const night = document.querySelector('#night');
const day = document.querySelector('#day');
const report = document.querySelector('#report');
const main = document.querySelector('#main');
const cities = document.querySelector('#cities');
const options = document.querySelector('#options');
const notification = document.querySelector('#notification');
const dataloader = document.querySelector('#data-loader');

dataloader.classList.add('d-none')

cityInp.addEventListener('input', (e)=>{

    if (e.target.value == '--choose a city--'){
        sbtn.setAttribute('disabled', 'true');
        sbtn.style.backgroundColor='#5c5e586f';
        
    } else {
        sbtn.removeAttribute('disabled');
        sbtn.style.background='#8ebf42';
        sbtn.style.cursor='pointer';
    }
})

let res;
let req = new XMLHttpRequest();

cities.addEventListener('click', ()=>{
    dataloader.classList = '';
    req.open('GET', 'https://raw.githubusercontent.com/alaouy/sql-moroccan-cities/master/json/ville.json');
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === 4) {
            res = JSON.parse(req.response);
            let citiesdata = [];
            for (let i of res['ville']){
                citiesdata.push(i['ville'])
            }
            citiesdata.map((citi)=>{
                city.innerHTML += `<option>${citi}</option>`
            }) 
            //alert('data')
            notification.style.display='block';

            notification.innerHTML = '<p>Data loaded, choose a city</p><button>close</button>'
            notification.addEventListener('click', ()=>{
                notification.style.display='none'
            })
            cities.style.display='none';
            
        }   

    }
})




//https://raw.githubusercontent.com/alaouy/sql-moroccan-cities/master/json/ville.json
//https://api.openweathermap.org/data/2.5/weather?q=' + chosenCity + '&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e

    


form.addEventListener('submit', ($event) => {
    loader.classList.remove('d-none')
    main.classList.add('h100');
    $event.preventDefault();
    const chosenCity = cityInp.value;
    req.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + chosenCity + '&APPID=b34fddd3dae4a2eb0ad363b62f98ba1e');
    req.send();
    req.onreadystatechange = () => {
        if (req.readyState === 4) {

            res = JSON.parse(req.response);
            
            
                if (res.cod == 404){                     
                    let div = document.createElement('div');
                    div.classList.add('card');
                    loader.classList.add('d-none');
                    div.innerHTML = `<p>No data found for ${cityInp.value}`;
                    report.appendChild(div);
                } else{
                    loader.classList.add('d-none')
                    //cityWeather.classList.add('borderlt');
                    const cel = Math.floor(res.main.temp - 273.15);
                    cityweather.innerHTML += (`<div class='card'>
                    <p>${res.name}</p>
                    <p>${cel}°</p>
                    <p>${res.coord.lat}</p>
                    <p>${res.coord.lon}</p>
                    `)
                    
                }
        
        } else{
            
        }
        
    
  };
});
