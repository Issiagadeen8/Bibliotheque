const express = require('express')

require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const routeLivres = require('./routes/routeLivre')

const app = express()
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*', methods : ['GET','POST', 'PUT', 'DELETE'] ,
      allowedHeaders: ['content-type', 'Authorization'] , credentials : true,
      optionsSuccessStatus : 204
}
app.use(cors(corsOptions)) 
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log('MongoDB connecter'))
.catch (err => console.log('erreur de connextion mongodb'))

app.use('/api', routeLivres);
const  PORT = process.env.PORT  ||  5000
app.listen(PORT, () => {
    console.log( `le serveur demarré sur http:localhost:${PORT}`)
})