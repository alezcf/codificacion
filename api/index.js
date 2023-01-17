const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const fs = require("fs");
const os = require("os");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  express.json({
    type: "*/*",
  })
);

app.use(cors());

app.post("/login", (req, res) => {
    data = req.body

    data = JSON.stringify(data)

    data = data.split(":")

    for(const test in data){
        console.log(test) 
    }

    // for(let x = 0; x < data.length; x ++){
    //     if(data[x] == )
    // }
    // res.send(data);
});

// Cuando hagan un get, ejecuta lo que esta aca
// en este get leemos lo que tiene el txt pero no es la vista
// le mostramos al usuario
app.get("/registrar", (req, res) => {
  fs.readFile("./usuariosRegistrados.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);
    data = JSON.stringify(data);
    res.send(data);
  });
});

// Cuando hagan un post, ejecutan lo que esta aca ` ` ` `
app.post("/registrar", (req, res) => {
  let usuario = req.body;
  fs.appendFileSync(
    "usuariosRegistrados.txt",
    JSON.stringify(usuario) + os.EOL
  );
  console.log(usuario);
});

app.get("/encriptarFrase", (req, res) => {
  let fraseOriginal = req.body;
  console.log("req = " + fraseOriginal.toString())
  const data = fs.readFileSync('palabrasEncriptadas.txt', 'utf8');
  let separacionFrases = data.split("\n");
  console.log("entro al encriptar")
  console.log(separacionFrases)
  for(const element of separacionFrases)
    if(element.substring(0, element.length - 1) == fraseOriginal.toString())
        return true;
  return false;
});


app.post("/encriptarFrase", (req, res) => {
  let encriptado = req.body;

  fs.appendFileSync("frasesEncriptadas.txt", JSON.stringify(encriptado) + os.EOL);
});

app.post("/encriptarPalabra", (req, res) => {
  let encriptado = req.body;
  fs.appendFileSync("palabrasEncriptadas.txt", JSON.stringify(encriptado) + os.EOL);
});


app.listen(port, () => {
  console.log(`Estoy ejecutandome en http://localhost:${port}`);
});

// GET -> micomputadora/transaction, {}
// POST -> micomputadora/transaction, {transaction}

