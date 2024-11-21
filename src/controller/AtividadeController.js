
import * as db from '../repository/AtividadeRepository.js'

import { Router } from "express";
const endpoints = Router();

endpoints.get('/atividade', async (req, resp) => {
    try {
        let idLocal = req.params.id;
        let registro = await db.consultarAtividade(idLocal);

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

endpoints.get('/atividade/:id', async (req, resp) => {
    try {

        let id = req.params.id;

        let registro = await db.consultarAtividadePorId(id);

        if (!registro) {
            return resp.status(404).send({ erro: 'Atividade não encontrada' });
        }

        resp.send(registro);
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.post('/atividade', async (req, resp) => {
    try {
        let novaAtividade = req.body;

        if (!novaAtividade.nome || !novaAtividade.descricao) {
            return resp.status(400).send({ erro: 'Campos nome e descricao são obrigatórios' });
        }

       novaAtividade.idlocal = req.params.id;


        let id = await db.inserirAtividade(novaAtividade);
 
        resp.status(201).send({ novoId: id });
    } catch (err) {
        resp.status(500).send({ erro: 'Erro ao inserir atividade: ' + err.message });
    }
});


endpoints.put('/atividade/:id', async (req, resp) => {
    try {
        let id = req.params.id;

        let atividadeAtualizada = req.body;

        let linhasAfetadas = await db.alterarAtividade(id, atividadeAtualizada);

        if (linhasAfetadas >= 1) {
            resp.status(204).send();
        } else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' });
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

endpoints.delete('/atividade/:id', async (req, resp) => {
    try {
        let id = req.params.id;

        let linhasAfetadas = await db.removerAtividades(id);
        if (linhasAfetadas >= 1) {
            resp.status(204).send();
        } else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' });
        }
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        });
    }
});

export default endpoints;





