const router = require("express").Router();

const Users = require("./users-model.js");

function restricted(req, res, next){
  if(req.session && req.session.loggedIn){
    next();
  } else {
    res.status(401).json({ you: "Shall not pass!"});
  }
}

router.use(restricted);

router.get("/", (req, res) => {
  Users.find()
  .then(users => res.status(200).json({ data: users}))
  .catch(error => res.status(404).json({ message: error.message}))
});

module.exports = router;