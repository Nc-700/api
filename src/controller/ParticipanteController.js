import * as db from '../repository/ParticipanteRepository.js'

import { Router } from "express";
const endpoints = Router();

endpoints.get('/participante', async (req, resp) => {
    try {
        let id = req.params.id;
        let participante = await db.consultarParticipante(id);

        if (participante) {
            resp.send(participante);
        } else {
            resp.status(404).send({ erro: 'Participante não encontrado' });
        }
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.get('/participante/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let participante = await db.consultarParticipantePorId(id);

        if (participante) {
            resp.send(participante);
        } else {
            resp.status(404).send({ erro: 'Participante não encontrado' });
        }
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.post('/participante', async (req, resp) => {
    try {
        let novoParticipante = req.body;

        if (!novoParticipante.nome || !novoParticipante.email) {
            return resp.status(400).send({ erro: 'Campos nome e email são obrigatórios' });
        }

        let id = await db.inserirParcipante(novoParticipante);
        resp.status(201).send({ novoId: id });
    } catch (err) {
        resp.status(400).send({ erro: 'Erro ao inserir participante: ' + err.message });
    }
});

endpoints.put('/participante/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let participanteAtualizado = req.body;

        let linhasAfetadas = await db.alterarParticipante(id, participanteAtualizado);

        if (linhasAfetadas >= 1) {
            resp.status(204).send();
        } else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' });
        }
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.delete('/participante/:id', async (req, resp) => {
    try {
        let id = req.params.id;

        let linhasAfetadas = await db.removerParticipante(id);

        if (linhasAfetadas >= 1) {
            resp.status(204).send();
        } else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' });
        }
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});


export default endpoints;