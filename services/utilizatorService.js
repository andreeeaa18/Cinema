import Utilizator from "../models/Utilizator.js";
import { ResourceNotFoundException, DuplicateResourceException } from "../utils/exceptions.js";

const utilizatorService = {
  listUtilizatori() {
    return Utilizator.find().select("-parola");
  },

  getUtilizatorById(id) {
    return Utilizator.findById(id).select("-parola");
  },

  findByEmail(email) {
    return Utilizator.findOne({ email });
  },

  async createUtilizator(data) {
    try {
      const existing = await Utilizator.findOne({ email: data.email });
      if (existing) {
        throw new DuplicateResourceException(`Emailul ${data.email} este deja utilizat`);
      }
      return await Utilizator.create(data);
    } catch (err) {
      if (err.code === 11000) {
        throw new DuplicateResourceException(`Emailul ${data.email} este deja utilizat`);
      }
      throw err;
    }
  },

  async updateUtilizator(id, data) {
    const utilizator = await Utilizator.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).select("-parola");
    
    if (!utilizator) {
      throw new ResourceNotFoundException("Utilizatorul");
    }
    return utilizator;
  },

  deleteUtilizator(id) {
    return Utilizator.findByIdAndDelete(id);
  },
};

export default utilizatorService;
