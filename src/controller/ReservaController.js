import { Router } from "express";
const endpoints = Router();

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

endpoints.post('/reserva/', async (req, resp) => {
    try {
        let novaReserva = req.body; 

        if (!novaReserva.participanteId || !novaReserva.localId || !novaReserva.data) {
            return resp.status(400).send({ erro: 'Campos participanteId, localId e data são obrigatórios' });
        }

        let id = await db.inserirReserva(novaReserva); 
        resp.status(201).send({ novoId: id });
    } catch (err) {
        resp.status(400).send({ erro: 'Erro ao inserir reserva: ' + err.message }); 
    }
});

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
