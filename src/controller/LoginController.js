import * as db from '../repository/LoginRepository.js'

import { Router } from "express";
import { gerarToken } from '../utils/jwt.js';
const endpoints = Router();

endpoints.post("/cadastrar", async (req, resp) => {
    try {
        const usuario = req.body;

        const emailExistente = await db.verificarUsuarioPorEmail(usuario.email);

        if (emailExistente) {
            return resp.status(400).send({
                error: "Já existe um usuário com este email."
            })
        }

        const idInserido = await db.inserirUsuario(usuario);

        return resp.status(201).send({
            idInserido
        })
    } catch (error) {
        return resp.status(400).send({
            erro: error.message
        })
    }
})

endpoints.post('/login', async (req, resp) => {
    try {
        const usuarioObj = req.body;

        const usuario = await db.consultarUsuario(usuarioObj);

        if (!usuario) {
            return resp.status(400).send({
                message: "E-mail ou senha incorretos !"
            })
        }

        const token = gerarToken(usuario);
    
        return resp.send({
            token: token
        })
    } catch (err) {
        resp.status(500).send({ erro: 'Erro ao realizar o cadastro: ' + err.message });
    }
});

export default endpoints;