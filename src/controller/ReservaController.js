import * as db from '../repository/ReservaRepository.js'

import { Router } from "express";
const endpoints = Router();

endpoints.get('/reserva', async (req, resp) => {
    try {
        let id = req.params.id; 
        let reserva = await db.consultarReserva(id); 
        
        if (reserva) {
            resp.send(reserva); 
        } else {
            resp.status(404).send({ erro: 'Reserva não encontrada' });
             
        }
    } catch (err) {
        resp.status(400).send({ erro: err.message }); 
    }
});

endpoints.get('/reserva/:id', async (req, resp) => {
    try {
        let id = req.params.id; 
        let reserva = await db.consultarReservaPorId(id); 
        
        if (reserva) {
            resp.send(reserva); 
        } else {
            resp.status(404).send({ erro: 'Reserva não encontrada' });
             
        }
    } catch (err) {
        resp.status(400).send({ erro: err.message }); 
    }
});

endpoints.post('/reserva', async (req, resp) => {
    try {
        
        let reserva = req.body;
        let id = await db.inserirReserva(reserva);
        resp.send({
            novoId: id
        })
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoints.put('/reserva/:id', async (req, resp) => {
    try {
        let id = req.params.id; 
        let reservaAtualizada = req.body; 

        let linhasAfetadas = await db.alterarReserva(id, reservaAtualizada); 
        
        if (linhasAfetadas >= 1) {
            resp.status(204).send();
        } else {
            resp.status(404).send({ erro: 'Nenhum registro encontrado' });
        }
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.delete('/reserva/:id', async (req, resp) => {
    try {
        let id = req.params.id; 

        let linhasAfetadas = await db.removerReserva(id);
        
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
