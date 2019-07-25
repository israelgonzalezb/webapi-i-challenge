// implement your API here
const express = require("express");

const server = express();

const Users = require("./data/db.js");

server.use(express.json());

server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  //console.log("Request body", req.body);
  Users.insert(userInfo)
    .then(user => {
      userInfo.name && userInfo.bio
        ? res.status(201).json(user)
        : res.status(400).json({
            errorMessage: "Please provide name and bio for the user."
          });
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

server.get("/api/users", (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: "The users information could not be retrieved."
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(user => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(user => {
      user
        ? res.status(204).end()
        : res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
    })
    .catch(err => {
      res.status(500).json({ error: "The user could not be removed" });
    });
});

server.listen(4000, () => console.log("API running on port 4000"));
