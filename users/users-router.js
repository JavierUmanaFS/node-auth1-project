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
  
})