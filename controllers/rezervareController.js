import rezervareService from "../services/rezervareService.js";

const rezervareController = {
  async list(req, res, next) {
    try {
      const { user, proiectie } = req.query;
      let result;

      if (user) {
        result = await rezervareService.listByUtilizator(user);
      } else if (proiectie) {
        result = await rezervareService.listByProiectie(proiectie);
      } else {
        result = await rezervareService.listRezervari();
      }
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const reservation = await rezervareService.getRezervareById(
        req.params.id,
      );
      res.json(reservation);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      res.status(201).json(await rezervareService.createRezervare(req.body));
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const reservation = await rezervareService.updateRezervare(
        req.params.id,
        req.body,
      );
      res.json(reservation);
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      await rezervareService.deleteRezervare(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};

export default rezervareController;
