const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const friendModel = require("./models/friends");
require("dotenv").config();
// database connection
mongoose.connect(
  //     "mongodb://localhost:27017/",
  //     {
  //       dbName: "tutorialmern",
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     },
  //     (err) =>
  //       err ? console.log(err) : console.log(
  //         "Connected to database")
  //   );
  "mongodb://localhost:27017/tutorialmern?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { useNewUrlParser: true }
);

const app = express();
app.use(express.json());
app.use(cors());
app.post("/add", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const description = req.body.description;
  const friend = new friendModel({
    name: name,
    age: age,
    description: description,
  });
  await friend.save();
  res.send("insert data");
});

app.get("/read", async (req, res) => {
  friendModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
app.put("/update", async (req, res) => {
  const newAge = req.body.newAge;
  const id = req.body.id;
  try {
    friendModel.findById(id, (error, friendToUpdate) => {
      friendToUpdate.age = newAge;
      friendToUpdate.save();
    });
  } catch (err) {
    console.log(err);
  }
  res.send("updated")
});
app.delete("/delete/:id",async(req,res)=>{
const id=req.params.id;
friendModel.findByIdAndRemove(id).exec();
res.send("item deleted");
})
app.listen(process.env.PORT || 8000, () => {
  console.log("server started port no 8000");
});
