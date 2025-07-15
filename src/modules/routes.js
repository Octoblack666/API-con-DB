const express = require('express');
const response = require('../network/response');

function createRouter(controller) {
    const router = express.Router();

    router.get('/', async (req, res) => {
        try {
            const data = await controller.getAll();
            response.success(req, res, data, 200);
        } catch (err) {
            response.error(req, res, err, 500);
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const data = await controller.getById(req.params.id);
            response.success(req, res, data, 200);
        } catch (err) {
            response.error(req, res, err, 500);
        }
    });

    router.post('/', async (req, res) => {
        try {
            const result = await controller.create(req.body);
            response.success(req, res, 'Elemento creado correctamente', 201);
        } catch (err) {
            response.error(req, res, err, 500);
        }
    });

    router.put('/:id', async (req, res) => {
        try {
            const result = await controller.updateById(req.params.id, req.body);
            response.success(req, res, 'Elemento actualizado correctamente', 200);
        } catch (err) {
            response.error(req, res, err, 500);
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
            await controller.removeById(req.params.id);
            response.success(req, res, 'Elemento eliminado correctamente', 200);
        } catch (err) {
            response.error(req, res, err, 500);
        }
    });

    return router;
}

module.exports = createRouter;
