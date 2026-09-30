import Film from "../models/Film.js";
import { ResourceNotFoundException, DuplicateResourceException } from "../utils/exceptions.js";

const filmService = {
  listFilms() {
    return Film.find().sort({ anulLansarii: -1 });
  },

  getFilmById(id) {
    return Film.findById(id);
  },

  async createFilm(data) {
    const existing = await Film.findOne({ titlu: data.titlu, anulLansarii: data.anulLansarii });
    if (existing) {
      throw new DuplicateResourceException(`Filmul ${data.titlu} din anul ${data.anulLansarii} exista deja in baza de date`);
    }
    return await Film.create(data);
  },

  async updateFilm(id, data) {
    const film = await Film.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!film) {
      throw new ResourceNotFoundException("Filmul");
    }
    return film;
  },

  deleteFilm(id) {
    return Film.findByIdAndDelete(id);
  },

  cautaDupaGen(gen) {
    return Film.find({ gen });
  },
};

export default filmService;
