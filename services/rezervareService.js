import Rezervare from "../models/Rezervare.js";
import Proiectie from "../models/Proiectie.js";
import Utilizator from "../models/Utilizator.js";
import {
  ResourceNotFoundException,
  DuplicateResourceException,
  InvalidDataException,
} from "../utils/exceptions.js";

const rezervareService = {
  async listRezervari() {
    return await Rezervare.find().populate("proiectie utilizator");
  },

  async getRezervareById(id) {
    const reservation = await Rezervare.findById(id).populate(
      "proiectie utilizator",
    );
    if (!reservation) {
      throw new ResourceNotFoundException("Rezervarea");
    }
    return reservation;
  },

  async listByUtilizator(userId) {
    return await Rezervare.find({ utilizator: userId }).populate(
      "proiectie utilizator",
    );
  },

  async listByProiectie(proiectieId) {
    return await Rezervare.find({ proiectie: proiectieId }).populate(
      "proiectie utilizator",
    );
  },

  async createRezervare(data) {
    if (
      !data.locuri ||
      !Array.isArray(data.locuri) ||
      data.locuri.length === 0
    ) {
      throw new InvalidDataException("Trebuie specificat cel putin un loc");
    }

    // check locuri limits
    const proiectie = await Proiectie.findById(data.proiectie).populate("sala");
    if (!proiectie) {
      throw new ResourceNotFoundException("Proiectia");
    }

    const utilizator = await Utilizator.findById(data.utilizator);
    if (!utilizator) {
      throw new ResourceNotFoundException("Utilizatorul");
    }

    const sala = proiectie.sala;
    const maxRanduri = sala.randuri;
    const maxLocuriPeRand = sala.locuriPeRand;

    // validate each seat
    for (const seat of data.locuri) {
      // check format (e.g. "1-5")
      if (!/^\d+-\d+$/.test(seat)) {
        throw new InvalidDataException(
          `Formatul locului ${seat} este invalid. Folositi formatul 'rand-loc'`,
        );
      }

      const [rand, loc] = seat.split("-").map(Number);

      if (rand < 1 || rand > maxRanduri || loc < 1 || loc > maxLocuriPeRand) {
        throw new InvalidDataException(
          `Locul ${seat} este in afara limitei salei (Max: ${maxRanduri} randuri, ${maxLocuriPeRand} locuri/rand)`,
        );
      }
    }

    // check for duplicates in the request itself
    const uniqueSeats = new Set(data.locuri);
    if (uniqueSeats.size !== data.locuri.length) {
      throw new InvalidDataException(
        "Ati introdus aceleasi locuri de mai multe ori in cerere",
      );
    }

    // check if seats are already taken by other reservations
    const otherReservations = await Rezervare.find({
      proiectie: data.proiectie,
    });
    const allTakenSeats = [];
    for (const res of otherReservations) {
      allTakenSeats.push(...res.locuri);
    }

    for (const seat of data.locuri) {
      if (allTakenSeats.includes(seat)) {
        throw new DuplicateResourceException(
          `Locul ${seat} este deja rezervat`,
        );
      }
    }

    try {
      return await Rezervare.create(data);
    } catch (err) {
      if (err.code === 11000) {
        throw new DuplicateResourceException(
          "Unul sau mai multe locuri tocmai au fost rezervate",
        );
      }
      throw err;
    }
  },

  async updateRezervare(id, data) {
    const existing = await Rezervare.findById(id);
    if (!existing) {
      throw new ResourceNotFoundException("Rezervarea");
    }

    // Determine what projection and seats to validate
    const proiectieId = data.proiectie || existing.proiectie;
    const locuri = data.locuri || existing.locuri;

    // check if seats are provided
    if (!locuri || !Array.isArray(locuri) || locuri.length === 0) {
      throw new InvalidDataException("Trebuie specificat cel putin un loc");
    }

    // get the projection and the sala
    const proiectie = await Proiectie.findById(proiectieId).populate("sala");
    if (!proiectie) {
      throw new ResourceNotFoundException("Proiectia");
    }

    // validate that the user exists (if user is being changed)
    if (data.utilizator) {
      const utilizator = await Utilizator.findById(data.utilizator);
      if (!utilizator) {
        throw new ResourceNotFoundException("Utilizatorul");
      }
    }

    const sala = proiectie.sala;

    // validare locuri
    for (const seat of locuri) {
      if (!/^\d+-\d+$/.test(seat)) {
        throw new InvalidDataException(`Formatul locului ${seat} este invalid`);
      }
      const [rand, loc] = seat.split("-").map(Number);
      if (
        rand < 1 ||
        rand > sala.randuri ||
        loc < 1 ||
        loc > sala.locuriPeRand
      ) {
        throw new InvalidDataException(
          `Locul ${seat} este invalid pentru aceasta sala`,
        );
      }
    }

    // check for duplicates in the request
    const uniqueSeats = new Set(locuri);
    if (uniqueSeats.size !== locuri.length) {
      throw new InvalidDataException("Ati introdus locuri duplicate");
    }

    // check if seats are taken by other reservations except mine
    const otherReservations = await Rezervare.find({
      proiectie: proiectieId,
      _id: { $ne: id },
    });
    const allTakenSeats = [];
    for (const res of otherReservations) {
      allTakenSeats.push(...res.locuri);
    }

    for (const seat of locuri) {
      if (allTakenSeats.includes(seat)) {
        throw new DuplicateResourceException(
          `Locul ${seat} este deja rezervat de altcineva`,
        );
      }
    }

    return await Rezervare.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("proiectie utilizator");
  },

  async deleteRezervare(id) {
    const reservation = await Rezervare.findByIdAndDelete(id);
    if (!reservation) {
      throw new ResourceNotFoundException("Rezervarea");
    }
    return reservation;
  },
};

export default rezervareService;
