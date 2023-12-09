const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://anonymous:anonymous00@cluster0.owtrw52.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connection a MongoDB");
  })
  .catch((error) => {
    console.log("Erreur de connexion a MongoDB", error);
  });

app.listen(port, () => {
  console.log("Server en cours sur le port 8000");
});

const Employe = require("./models/employe");
const Presence = require("./models/presence");

// register  employe
app.post("/addEmploye", async (req, res) => {
  try {
    const {
      employeName,
      employeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmploye,
      salary,
      address,
    } = req.body;

    //create a new Employee
    const newEmploye = new Employe({
      employeName,
      employeId,
      designation,
      phoneNumber,
      dateOfBirth,
      joiningDate,
      activeEmploye,
      salary,
      address,
    });

    await newEmploye.save();

    res.status(201).json({
      message: "Employe enregistre avec succes",
      employe: newEmploye,
    });
  } catch (error) {
    console.log("Erreur lors de la creation d'un employe", error);
    res.status(500).json({ message: "Echec de l'ajout d'un employe" });
  }
});

//les employees
app.get("/employes", async (req, res) => {
  try {
    const employes = await Employe.find();
    res.status(200).json(employes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Echec lors e la recuperation des employes" });
  }
});

app.post("/presences", async (req, res) => {
  try {
    const { employeId, employeName, date, status } = req.body;

    const existingPresence = await Presence.findOne({ employeId, date });

    if (existingPresence) {
      existingPresence.status = status;
      await existingPresence.save();
      res.status(200).json(existingPresence);
    } else {
      const newPresence = new Presence({
        employeId,
        employeName,
        date,
        status,
      });
      await newPresence.save();
      res.status(200).json(newPresence);
    }
  } catch (error) {
    res.status(500).json({ message: "Erreur d'envoi des présences" });
  }
});

app.get("/presences", async (req, res) => {
  try {
    const { date } = req.query;

    // Recherche de fiches de présence pour la date spécifiée
    const presenceData = await Presence.find({ date: date });

    res.status(200).json(presenceData);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la recuperation des donnees de presence",
    });
  }
});

// rapport de présence - tous les employés
app.get("/rapport-presence-employes", async (req, res) => {
  try {
    const { month, year } = req.query;

    console.log("Paramètres de requête:", month, year);
    // Calculer les dates de début et de fin du mois et de l'année sélectionnés
    const startDate = moment(`${year}-${month}-01`, "DD-YYYY-MM")
      .startOf("month")
      .toDate();
    const endDate = moment(startDate).endOf("month").toDate();

    // Données de présence agrégées pour tous les employés et la plage de dates
    const rapport = await Presence.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  { $month: { $dateFromString: { dateString: "$date" } } },
                  parseInt(req.query.month),
                ],
              },
              {
                $eq: [
                  { $year: { $dateFromString: { dateString: "$date" } } },
                  parseInt(req.query.year),
                ],
              },
            ],
          },
        },
      },

      {
        $group: {
          _id: "$employeId",
          present: {
            $sum: {
              $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
            },
          },
          absent: {
            $sum: {
              $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
            },
          },
          halfday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 },
            },
          },
          holiday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 },
            },
          },
        },
      },
      {
        $lookup: {
          from: "employes", // Nom de la collection d'employés
          localField: "_id",
          foreignField: "employeId",
          as: "employeDetails",
        },
      },
      {
        $unwind: "$employeDetails", // Dérouler le tableau employeDetails
      },
      {
        $project: {
          _id: 1,
          present: 1,
          absent: 1,
          halfday: 1,
          name: "$employeDetails.employeName",
          designation: "$employeDetails.designation",
          salary: "$employeDetails.salary",
          employeId: "$employeDetails.employeId",
        },
      },
    ]);

    res.status(200).json({ rapport });
  } catch (error) {
    console.error("Erreur dans la génération du rapport de présence:", error);
    res.status(500).json({ message: "Erreur génération du rapport" });
  }
});
