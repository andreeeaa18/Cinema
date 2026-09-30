import utilizatorService from "../services/utilizatorService.js";

const utilizatorController = {
  async list(req, res, next) {
    try {
      res.json(await utilizatorService.listUtilizatori());
    } catch (err) {
      next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const user = await utilizatorService.getUtilizatorById(req.params.id);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      res.status(201).json(await utilizatorService.createUtilizator(req.body));
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const user = await utilizatorService.updateUtilizator(
        req.params.id,
        req.body,
      );
      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      await utilizatorService.deleteUtilizator(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};

export default utilizatorController;
