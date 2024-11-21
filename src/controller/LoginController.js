import * as db from '../repository/LoginRepository.js'

import { Router } from "express";
const endpoints = Router();

endpoints.post('/login', async (req, resp) => {
    try {
        let { email, senha } = req.body; 

       
        if (!email || !senha) {
            return resp.status(400).send({ erro: 'Campos email e senha são obrigatórios' });
        }

    
        let usuario = await db.consultarUsuarioPorEmail(email);

        if (usuario && usuario.senha === senha) {
            let token = jwt.sign({ id: usuario.id }, secret, { expiresIn: '1h' });
            resp.send({ token }); 
        } else {
            resp.status(401).send({ erro: 'Credenciais inválidas' }); 
        }
    } catch (err) {
        resp.status(500).send({ erro: 'Erro ao realizar login: ' + err.message }); 
    }
});





export default endpoints;