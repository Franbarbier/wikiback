import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

// import { verifyToken } from './auth.js';


import objecionesRoutes from './routes/objeciones.js';
import sugerenciasRoutes from './routes/sugerencias.js';
import respuestasRoutes from './routes/respuestas.js';
import usersRoutes from './routes/users.js';


const app = express()

process.env.TZ = "America/Argentina/Buenos_Aires";

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors({
    origin: '*'
}));

app.use('/sugerencias', sugerenciasRoutes)
app.use('/objeciones', objecionesRoutes)
app.use('/respuestas', respuestasRoutes)
app.use('/users', usersRoutes)

app.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
})


const CONNECTION_URL = 'mongodb+srv://wiki-admin:wikiadmin123@cluster0.83weg.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=>console.log('Server running on port: ' + PORT)))
    .catch((error)=> console.log(error.message)) 

// mongoose.set('useFindAndModify', false)