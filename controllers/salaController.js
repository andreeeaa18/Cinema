import salaService from "../services/salaService.js";

const salaController = {
  async list(req, res, next) {
    try {
      res.json(await salaService.listSali());
    } catch (err) {
      next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const hall = await salaService.getSalaById(req.params.id);
      res.json(hall);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      res.status(201).json(await salaService.createSala(req.body));
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const hall = await salaService.updateSala(req.params.id, req.body);
      res.json(hall);
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      await salaService.deleteSala(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};

export default salaController;
