// console.log('Hello, NodeJS!!!')

const express = require ('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

let filmes = [
    {
        titulo: "Forrest Gump - O Contador de Histórias",
        sinopse:"Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções."
    },
    {
        titulo:"Um Sonho de Liberdade",
        sinopse:"Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela."
    }
]

//URL
//protocolo://servidor: porta/endpoint
//get: http://localhost:3000/hey
//conjunto de parâmetros, seta, ação ()=>{}
app.get('/hey', (req, res) => {
    res.send('hey')
})

//get: http://localhost:3000/filmes
app.get('/filmes', (req, res) => {
    res.json(filmes)
})

//get:obter
//post:criar

app.post("/filmes", (req, res) => {
    //pegar os dados enviados na requisição
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //montar o json do novo filme
    const novo_filme = {titulo: titulo, sinopse: sinopse}
    //adiciona o novo filme à base
    filmes.push(novo_filme)
    //mostrar ao usuário a base atualizada
    res.json(filmes)
} )

app.listen(3000, () => console.log("server up and running"))