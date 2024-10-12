const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

const app = express();


const db = mongoose.connect(process.env.MONGO_URI);

const ProfileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  about: { type: String, required: true },
  skills: { type: [String], required: true },
  welcome_msg: { type: String, required: true },
  experiences: { type: [String], required: true },
});

const ProfileModel = mongoose.model("Profile", ProfileSchema);

app.use(express.json());

app.post("/profiles", async (req, res) => {
  try {
    const result = await ProfileModel.create(req.body);
    return res.status(200).json({ message: "profile created", result });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json(err);
    }
    return res.status(500).json(err);
  }
});

app.get("/profiles/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const profile = await ProfileModel.findOne({ username });
    if (!profile) {
      return res.status(404).json({ message: "profile not found" });
    }
    return res.status(200).json({ message: "profile found", profile });
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

app.listen(3000, async () => {
  await db;
  console.log("server started listening on port 3000");
});