const iniciarSesion = document.getElementById("iniciarSesion");

iniciarSesion.addEventListener("submit", (event) => {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let userCompleted = { username: username, password: password };
  let user = JSON.stringify(userCompleted);

  // Mandar la transactionJson al backend
  fetch("http://localhost:3000/login", {
    method: "Post",
    body: user,
  });
});

const registrarUsuario = document.getElementById("registrarUsuario");

registrarUsuario.addEventListener("submit", (event) => {
  event.preventDefault();

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  let userCompleted = { username: username, password: password };
  let user = JSON.stringify(userCompleted);

  // Mandar la transactionJson al backend
  fetch("http://localhost:3000/registrar", {
    method: "Post",
    body: user,
  });
});

const encriptarFrase = document.getElementById("encriptarFrase");

encriptarFrase.addEventListener("submit", (event) => {
  event.preventDefault();
  let frase = document.getElementById("fraseCodificar").value;
  let encriptacion = encriptacionFrase(frase)
  
  let fraseEncriptada = {
    Original: frase,
    Encriptado: encriptacion,
  };
  fraseEncriptada = JSON.stringify(fraseEncriptada);

  fetch("http://localhost:3000/encriptarFrase?frase="+fraseEncriptada, {
    method: "get",
  })
  .then(response => response.json())
  .then(data => {
    if (data === true) {
      // Mandar la transactionJson al backend
      fetch("http://localhost:3000/encriptarFrase", {
        method: "Post",
        body: fraseEncriptada,
      });
    }
    else{
      console.log("La frase ya esta registrada.")
    }
  });


});

const encriptarPalabra = document.getElementById("encriptarPalabra");

encriptarPalabra.addEventListener("submit", (event) => {
  event.preventDefault();
  let frase = document.getElementById("fraseInicial").value;
  let palabra = document.getElementById("palabra").value;

  frase = encriptacionFrase(frase)
  let palabraEncriptada = encriptacionPalabra(frase, palabra);

  palabraEncriptada = {
    Original: palabra,
    Encriptado: palabraEncriptada,
  };
  palabraEncriptada = JSON.stringify(palabraEncriptada);

  // Mandar la transactionJson al backend
  fetch("http://localhost:3000/encriptarPalabra", {
    method: "Post",
    body: palabraEncriptada,
  });
});

//con esta funcion vamos a leer lo que tiene el archivo .txt y mostrarselo al usuario
const leerArchivo = async () => {
  const response = await fetch("http://localhost:3000/registrar", {
    method: "get",
  });
  // console.log(await response.json());
  const textoHtml = await response.json();
  document.getElementById("textoArchivo").innerHTML = textoHtml;
};

leerArchivo();


function encriptacionFrase(palabraInicial){

  let presente = new Boolean(false);
  const fraseEncriptada = [];
  const fraseCodificada = [];

  palabraInicial = palabraInicial.replaceAll(" ","").toUpperCase();

  console.log("Longitud palabra Inicial = " + palabraInicial.lenght)

  for(const element of palabraInicial){
      presente = false;
      for(const caracter of fraseEncriptada)
          if(element == caracter)
              presente = true;
      if(!presente)
          fraseEncriptada.push(element);
  }

  let encadenarFrase = fraseEncriptada.toString().replaceAll(",", "");
  
  fraseCodificada.push(encadenarFrase);

  return fraseCodificada
}

function encriptacionPalabra(fraseEncriptada, palabra){

  let presente = new Boolean(false);
  let contador = 0;
  let palabraCodificada = [];

  fraseEncriptada = fraseEncriptada.toString();
  palabra = palabra.toString();

  palabra = palabra.toUpperCase().replace(" ", "");

  while(contador != palabra.length){
  presente = false;
  console.log("Ingreso al while")
      for(let x = 0; x < fraseEncriptada.length; x ++)
          if(fraseEncriptada[fraseEncriptada.length - 1] == palabra[contador])
              x = fraseEncriptada.lenght;
          else if(fraseEncriptada[x] == palabra[contador]){
              presente = true;
              palabraCodificada.push(fraseEncriptada[x + 1]);
              x = fraseEncriptada.lenght;
          }
      if(!presente)
      palabraCodificada.push(palabra[contador]);
  contador ++;
  }

  console.log("Palabra encriptada = " + palabraCodificada)

  return palabraCodificada;
}
