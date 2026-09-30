import proiectieService from "../services/proiectieService.js";

const proiectieController = {
  async list(req, res, next) {
    try {
      const { film, sala } = req.query;
      let result;
      
      if (film) {
        result = await proiectieService.listByFilm(film);
      } else if (sala) {
        result = await proiectieService.listBySala(sala);
      } else {
        result = await proiectieService.listProiectii();
      }
      
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const showtime = await proiectieService.getProiectieById(req.params.id);
      res.json(showtime);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      res.status(201).json(await proiectieService.createProiectie(req.body));
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const showtime = await proiectieService.updateProiectie(
        req.params.id,
        req.body,
      );
      res.json(showtime);
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      await proiectieService.deleteProiectie(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};

export default proiectieController;
