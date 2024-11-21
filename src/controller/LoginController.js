import * as db from '../repository/LoginRepository.js'

import { Router } from "express";
const endpoints = Router();

// endpoints.post('/login', async (req, resp) => {
//     try {
//         let { email, senha } = req.body; 
// console.log(req.body);

       
//         if (!email || !senha) {
//             return resp.status(400).send({ erro: 'Campos email e senha são obrigatórios' });
//         }

    
//         let usuario = await db.inserirUsuario(email);

//         if (usuario && usuario.senha === senha) {
//             let token = jwt.sign({ id: usuario.id }, secret, { expiresIn: '1h' });
//             resp.send({ token }); 
//         } else {
//             resp.status(401).send({ erro: 'Credenciais inválidas' }); 
//         }
//     } catch (err) {
//         resp.status(500).send({ erro: 'Erro ao realizar login: ' + err.message }); 
//     }
// });

endpoints.post('/login', async (req, resp) => {
    try {
        let { email, senha } = req.body; 
        console.log(req.body);

        // Verificar se nome, email e senha foram enviados
        if ( !email || !senha) {
            return resp.status(400).send({ erro: 'Campos nome, email e senha são obrigatórios' });
        }

        // Verificar se o email já existe no banco de dados
        let usuarioExistente = await db.consultarUsuario(email);

        if (usuarioExistente) {
            return resp.status(400).send({ erro: 'Email já cadastrado' });
        }

        // Inserir o novo usuário no banco de dados
        let usuarioInserido = await db.inserirUsuario( email, senha);

        // Gerar o token JWT após a inserção
        let token = jwt.sign({ id: usuarioInserido.id }, secret, { expiresIn: '1h' });

        resp.send({ token });  // Enviar o token JWT para o usuário

    } catch (err) {
        resp.status(500).send({ erro: 'Erro ao realizar o cadastro: ' + err.message });
    }
});


endpoints.get('/login', async (req, resp) => {
    try {
        let idLocal = req.params.id;
        let registro = await db.consultarUsuario(idLocal);

        if (!registro) {

            return resp.status(404).send({ erro: "Atividade não encontrada" });
        }

        resp.send(registro);

    } catch (err) {
        resp.status(400).send({
            erro: err.message

        });
    }
});



export default endpoints;