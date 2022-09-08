let input = "";



let contenedor = document.getElementById('contenedor');
let busqueda=document.getElementById('inputBuscar');
const NASA = `https://images-api.nasa.gov/search?q=`;
let btn=document.getElementById(btnBuscar);
let url = localStorage.getItem('Json');
let lista_imagenes = [];
//let NASAurl=NASA+(busqueda.value.toLowerCase());

function mostrarImagenes(array) {
    console.log(array);
    
  
     for (let i = 0; i < array.length; i++) {
          //console.log(array.length)
          let item = array[i].data[0];
          //item=array[49];
          let image = array[i].links[0].href;
          //console.log(image);
          contenedor.innerHTML += `
          <div class="card buscador_nasa">
               <img src="${image}" class="card-img-top" alt="">
          <div class="card-body">
               <h5 class="card-title">${item.title}</h5>
               <p class="card-text textobuscador">${item.description}</p>
          </div>
          <div class="card-body">
               <p class="card-text">${item.date_created}</p>
               </div>
          </div>
     `

     }
}




let getJSONData = function (url) {
     let result = {};
     return fetch(url)
          .then(response => {
               if (response.ok) {
                    return response.json();
               } else {
                    throw Error(response.statusText);
               }
          })
          .then(function (response) {
               result.status = 'ok';
               result.data = response;

               return result;
          })
          .catch(function (error) {
               result.status = 'error';
               result.data = error;

               return result;
          });
}

function newUrl(){
          input = busqueda.value.toLowerCase();

          let NASAurl= NASA+input;

          localStorage.setItem("Json",NASAurl);
          location.reload();
}
function myUrl(){
     url=localStorage.getItem("Json");
     return url;
}

busqueda.addEventListener("keypress", function(event) {
     // If the user presses the "Enter" key on the keyboard
     if (event.key === "Enter") {
       // Cancel the default action, if needed
       event.preventDefault();
       // Trigger the button element with a click
       newUrl();
     }
});



document.addEventListener("DOMContentLoaded", function (e) {

     getJSONData(myUrl()).then(function (resultObj) {
          if (resultObj.status === "ok") {
               lista_imagenes = resultObj.data.collection.items;
               mostrarImagenes(lista_imagenes);
              // console.log(NASAurl);
               const NASA = 'https://images-api.nasa.gov/search?q=';

          }
     });
});