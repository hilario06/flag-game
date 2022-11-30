let countries = ["albania", "bolivia", "brasil", "canada", "catar", "cuba", "ghana", "israel", "peru", "uruguay"];
let optionsCountries = document.getElementById('options-countries');

//variable que guarda la posicion actual
let position = 0;

//variable que guarda la cantidad acertadas hasta el moemento
let correctAnswers = 0;
let valueRandom;
let optionsCountriesNames;

// desordena el orden de los paises
function unorderArray(array) {
  array.sort(function () { return Math.random() - 0.5 });
}

// el primer desorden del array
unorderArray(countries);

document.getElementById('button-start-game').addEventListener("click", even =>{
  //reseteamos las variables
  position = 0;
  correctAnswers = 0;
  //activamos las pantallas necesarias
  document.getElementById("initial-screen").style.display = "none";
  document.getElementById("screen-game").style.display = "initial";
  loadFlag();
})

//funcion que carga la siguiente bandera y sus opciones
function loadFlag(){
  //controlo sis se acabaron las banderas
  if (countries.length <= position){
    endGame();
  }else{
    document.getElementById("img-flag").src = "img/" + countries[position] + ".jpg";
    optionsCountries.innerHTML = '';
    optionsCountriesNames = [countries[position]];
    while (optionsCountriesNames.length < 3){
      valueRandom = Math.floor(Math.random() * countries.length);
      if (optionsCountriesNames.findIndex((element) => element === countries[valueRandom]) === -1){
        optionsCountriesNames.push(countries[valueRandom]);
      }
    }

    unorderArray(optionsCountriesNames);

    optionsCountries.insertAdjacentHTML("beforeend", `<div class="option cursor-pointer flex relative mb-4 md:w-96" id="op0" onclick="checkAnswer(1)">
              <div class="text-center value font-bold rounded-full h-12 w-12 leading-10 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800" id="l1">A</div>
              <div class="text-center w-80 md:w-96 name rounded-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" id='option1' data-countrie=${optionsCountriesNames[0]}>${optionsCountriesNames[0]}</div>
          </div>`);


    optionsCountries.insertAdjacentHTML("beforeend", `<div class="option cursor-pointer flex relative mb-4 md:w-96" id="op0" onclick="checkAnswer(2)">
              <div class="text-center value font-bold rounded-full h-12 w-12 leading-10 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800" id="l2">B</div>
              <div class="text-center w-80 md:w-96 name rounded-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" id='option2' data-countrie=${optionsCountriesNames[1]}>${optionsCountriesNames[1]}</div>
          </div>`);


    optionsCountries.insertAdjacentHTML("beforeend", `<div class="option cursor-pointer flex relative mb-4 md:w-96" id="op0" onclick="checkAnswer(3)">
              <div class="text-center value font-bold rounded-full h-12 w-12 leading-10 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800" id="l3">C</div>
              <div class="text-center w-80 md:w-96 name rounded-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" id='option3' data-countrie=${optionsCountriesNames[2]}>${optionsCountriesNames[2]}</div>
          </div>`);

  }
}

function checkAnswer(selectedOption){
  if (countries[position] == document.getElementById(`option${selectedOption}`).dataset.countrie){
    correctAnswers++;
    // document.getElementById(`option${selectedOption}`).classList.add("name-correct");
    document.getElementById(`option${selectedOption}`).className += " name-correct";
    document.getElementById(`l${selectedOption}`).className += " correct-answer";
  } else {
    // agramos las clases para colocar en rojo la opcion elegida
    document.getElementById(`option${selectedOption}`).classList.add("name-not-correct");
    document.getElementById(`l${selectedOption}`).className += " value-not-correct";
  }
  position++;
  //Esperamos 1 segundo y pasamos mostrar la siguiente bandera y sus opciones
  setTimeout(loadFlag, 1000);
}

function endGame(){
  //ocultamos las pantallas y mostramos la pantalla final
  document.getElementById("screen-game").style.display = "none";
  document.getElementById("end-screen").style.display = "block";
  //agreamos los resultados
  document.getElementById("correct").innerText = correctAnswers;
  document.getElementById("not-correct").innerText = countries.length - correctAnswers;
}

function backToTop(){
  // volvemos a desordenar los paises
  unorderArray(countries);
  //ocultamos las pantallas y activamos la inicial
  document.getElementById("end-screen").style.display = "none";
  document.getElementById("initial-screen").style.display = "block";
  document.getElementById("screen-game").style.display = "none";
}
