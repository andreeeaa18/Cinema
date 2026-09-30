import Proiectie from "../models/Proiectie.js";
import { ResourceNotFoundException, DuplicateResourceException } from "../utils/exceptions.js";

const proiectieService = {
  listProiectii() {
    return Proiectie.find().populate("film sala");
  },

  getProiectieById(id) {
    return Proiectie.findById(id).populate("film sala");
  },

  listByFilm(movieId) {
    return Proiectie.find({ film: movieId }).populate("film sala");
  },

  listBySala(salaId) {
    return Proiectie.find({ sala: salaId }).populate("film sala");
  },

  async createProiectie(data) {
    const { film, sala, ora } = data;

    const hallConflict = await Proiectie.findOne({ sala, ora });
    if (hallConflict) {
      throw new DuplicateResourceException(`Sala selectata are deja o proiectie la ora ${ora}`);
    }

    const filmConflict = await Proiectie.findOne({ film, ora });
    if (filmConflict) {
      throw new DuplicateResourceException(`Filmul selectat este deja programat in alta sala la ora ${ora}`);
    }

    return await Proiectie.create(data);
  },

  async updateProiectie(id, data) {
    const proiectie = await Proiectie.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("film sala");
    
    if (!proiectie) {
      throw new ResourceNotFoundException("Proiectia");
    }
    return proiectie;
  },

  deleteProiectie(id) {
    return Proiectie.findByIdAndDelete(id);
  },
};

export default proiectieService;
