import filmService from "../services/filmService.js";

const filmController = {
  async list(req, res, next) {
    try {
      res.json(await filmService.listFilms());
    } catch (err) {
      next(err);
    }
  },

  async getOne(req, res, next) {
    try {
      const film = await filmService.getFilmById(req.params.id);
      res.json(film);
    } catch (err) {
      next(err);
    }
  },

  async create(req, res, next) {
    try {
      res.status(201).json(await filmService.createFilm(req.body));
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const film = await filmService.updateFilm(req.params.id, req.body);
      res.json(film);
    } catch (err) {
      next(err);
    }
  },

  async remove(req, res, next) {
    try {
      await filmService.deleteFilm(req.params.id);
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  },
};

export default filmController;
