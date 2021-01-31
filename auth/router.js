const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model.js");
const { isValid } = require("../users/users-service.js");

router.post("/register", (req, res) =>{
  const credentials = req.body;

  if(isValid(credentials)){
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(credentials.password, rounds);

    credentials.password = hash;

    Users.add(credentials)
    .then(user =>{
      req.session.loggedIn === true;

      res.status(201).json({ data: user });
    })
    .catch(error => res.status(500).json({ message: error.message }));
  } else {
    res.status(400).json({ message: "Please provide username and password. Password should be alphanumeric"})
  }
});

router.post("/login", (req, res) =>{
  const { username, password} = req.body;

  if(isValid(req.body)){
    Users.findBy({ username })
    .then(([user]) => {
      if(user && bcryptjs.compareSync(password, user.password)){
        req.session.loggedIn = true;
        req.session.user = user;
        res.status(200).json({ message: "Welcome to our API"});
      } else {
        res.status(401).json({ message: "Invalid credentials"})
      }
    })
    .catch(error => res.status(500).json({ message: error.message}));
  } else {
    res.status(400).json({ message: "Please provide username and password which should be alphanumeric"})
  }
});

router.get("/logout", (req, res) =>{
  if(req.session){
    req.session.destroy(err => {
      if(err){
        res.status(500).json({ message: "We couldn't log you outm try again later"})
      } else {
        res.status(204).end();
      }
    });
  } else {
    res.status(200).end();
  }
});

module.exports = router;