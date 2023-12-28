const express = require("express")
const mongoose = require("mongoose")
const requireDir = require("require-dir")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
require('dotenv').config()
const app = express() //gerenciador de rotas
app.use(express.json()) //gerenciando rotas em formato Json
app.use(bodyParser.urlencoded({ extended: true })) //configurado para analisar dados no formato json da url
app.use(bodyParser.json()) //configurado para analisar dados no formato json
app.use(cors())

app.use("/src/uploads", express.static(path.join(__dirname, "src/uploads")))
app.use("/assets", express.static(path.join(__dirname, "src/assets")))

try {
  let url = ""

  switch(process.env.ENVIROMENT){
    case 'production':
        url = process.env.PROD_DB_URL
        break
    default:
        url = process.env.LOCAL_DB_URL
        break    
  }

  console.log("ENVIROMENT  "+process.env.ENVIROMENT)
  console.log("URL", url);

  mongoose.connect(
    url,  {
        useNewUrlParser: true
      })
    console.log('CONECTADO: ')
} catch (e) {
  console.log("ERRO:  ", e)
}

//centraliza os models nessa pasta
requireDir("./src/models")

//rotas
app.use("/sistema", require("./src/routes/routes"))

//porta
const PORT = process.env.PORT || 8088
app.listen(PORT, () => {
  console.log(`Server initialized com porta ${PORT}`)
})
