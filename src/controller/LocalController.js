import * as db from '../repository/LocalRepository.js'

import { Router } from "express";
const endpoints = Router();

endpoints.get('/local', async (req, resp) => {
    try {
        let id = req.params.id;
        let local = await db.consultarLocal(id);
        
        if (local) {
            resp.send(local); 
        } else {
            resp.status(404).send({ erro: 'Local não encontrado' });
        }
    } catch (err) {
        resp.status(400).send({ erro: err.message }); 
    }
});


endpoints.get('/local/:id?', async (req, resp) => {
    try {
        let id = req.params.id;
        let local = await db.consultarLocalPorId(id);
        
        if (local) {
            resp.send(local); 
        } else {
            resp.status(404).send({ erro: 'Local não encontrado' });
        }
    } catch (err) {
        resp.status(400).send({ erro: err.message }); 
    }
});



endpoints.post('/local/', async (req, resp) => {
    try {
        
        let local = req.body;
        let id = await db.inserirLocal(local);
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



endpoints.put('/local/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let local = req.body
        let linhasAfetadas = await db.alterarLocal(id, local);
        if (linhasAfetadas >= 1) {
            resp.send();
        }
        else {
            resp.status(404).send({ erro: 'Nenhum registro encrontrado' })
        }
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }

}
)


endpoints.delete('/local/:id', async (req, resp) => {
    try {
        let id = req.params.id; 

        let linhasAfetadas = await db.removerLocal(id); 
        
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