import Sala from "../models/Sala.js";
import { ResourceNotFoundException, DuplicateResourceException } from "../utils/exceptions.js";

const salaService = {
  listSali() {
    return Sala.find();
  },

  getSalaById(id) {
    return Sala.findById(id);
  },

  async createSala(data) {
    const existing = await Sala.findOne({ nume: data.nume });
    if (existing) {
      throw new DuplicateResourceException(`Sala ${data.nume} exista deja`);
    }
    return await Sala.create(data);
  },

  async updateSala(id, data) {
    const sala = await Sala.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!sala) {
      throw new ResourceNotFoundException("Sala");
    }
    return sala;
  },

  deleteSala(id) {
    return Sala.findByIdAndDelete(id);
  },
};

export default salaService;
