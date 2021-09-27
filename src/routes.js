const express = require("express");
const app = express();
app.use(express.json());
const port = 3000;

const init = async () => {
  const { Enemy, db } = require("./db");

  await db();

  app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}`);
  });
  app.get("/enemies", async (req, res) => {
    const enemy = await Enemy.find({});
    res.status(200).json(enemy);
  });

  app.get("/enemy", async (req, res) => {
    res.status(200).json(await Enemy.findOne({ name: req.body.name }));
  });

  app.post("/enemy", async (req, res) => {
    try {
      if (await Enemy.findOne({ name: req.body.name })) {
        throw new Error(`"name": "${req.body.name}" enemy already exists.`);
      }
      await Enemy(req.body).save();
      res.status(200).send(`Sucessfully saved ${req.body.name}`);
    } catch (err) {
      console.error(err);
    }
  });
  app.delete("/enemy", async (req, res) => {
    try {
      await Enemy.findOneAndDelete({ name: req.body.name });
      res.send(`Sucessfully deleted ${req.body.name}.`);
    } catch (err) {
      console.log(err);
    }
  });
};

init();
