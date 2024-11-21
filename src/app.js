import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import AdiconarRotas from './rotas.js';
const servidor = express();

servidor.use(express.json());
servidor.use(cors());
AdiconarRotas(servidor);

servidor.listen(process.env.PORTA,() => console.log (`--> API subiu na porta ${process.env.PORTA}!!!`))

