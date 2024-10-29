// console.log('Hello, NodeJS!!!')
//mongodb+srv://mongo123:mongodb@cluster0.c3va7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const express = require ('express')
const cors = require('cors')
const mongoose = require ('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const app = express()
app.use(express.json())
app.use(cors())

const Filme = mongoose.model ("Filme", mongoose.Schema ({
    titulo: {type: String},
    sinopse: {type: String}
}))

const usuuarioSchema = mongoose.Schema ({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
usuuarioSchema.plugin (uniqueValidator)
const Usuario = mongoose.model("Usuario", usuuarioSchema)

async function conectarAoMongoDB () {
    await 
    mongoose.connect (`mongodb+srv://mongo123:mongodb@cluster0.c3va7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
}

// let filmes = [
//     {
//         titulo: "Forrest Gump - O Contador de Histórias",
//         sinopse:"Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções."
//     },
//     {
//         titulo:"Um Sonho de Liberdade",
//         sinopse:"Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela."
//     }
// ]

//URL
//protocolo://servidor: porta/endpoint
//get: http://localhost:3000/hey
//conjunto de parâmetros, seta, ação ()=>{}
app.get('/hey', (req, res) => {
    res.send('hey')
})

//get: http://localhost:3000/filmes
app.get('/filmes', async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

//get:obter
//post:criar

app.post("/filmes", async (req, res) => {
    //pegar os dados enviados na requisição
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    //instanciar um objeto de acordo com o modelo criado
    const filme = new Filme ({titulo: titulo, sinopse: sinopse})
    await filme.save()
    const filmes = await Filme.find()
    // //montar o json do novo filme
    // const novo_filme = {titulo: titulo, sinopse: sinopse}
    // //adiciona o novo filme à base
    // filmes.push(novo_filme)
    // //mostrar ao usuário a base atualizada
    res.json(filmes)
} )

app.post('/signup', async (req, res) => {
    const login = req.body.login
    const password = req.body.password
    const usuario = new Usuario ({
        login: login,
        password: password
    })
    const respMongo = await usuario.save()
    console.log(respMongo)
    res.end()
})

app.listen(3000, () => {
    try{
        conectarAoMongoDB()
        console.log("server up and running")
    }
    catch (e) {
        console.log('Erros', e)
    }
})