const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const { user } = require("../models");
const User = db.user;
const Role = db.role;
const Agence = db.agence;
const Op = db.Op;

exports.signup = (req, res) => {
  // Save user to database
  let user={
    email:req.body.email,
    password:bcrypt.hashSync(req.body.password, 8),
    type:req.body.type,
    role:"user"
  };
  if(req.body.type==='part')
  {
    user.username=req.body.username;
  }
  if(req.body.type==='pro'){
    user.companyName=req.body.companyName;
    user.companyCategory=req.body.companyCategory;
    user.companyAddress=req.body.companyAddress;
    user.companyZipCode=req.body.companyZipCode;
    user.companyPhone=req.body.companyPhone;
    user.gender=req.body.gender;
    user.firstName=req.body.firstName;
    user.lastName=req.body.lastName;
  }
  User.create(user)
    .then(user => {
    
          res.send({ message: "User was registered successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!"
        });
      }
      let token = jwt.sign({ id: user.id }, config.auth.secret, {
        expiresIn: 86400 // 24 hours
      });      
        res.status(200).send({
          id: user.id,
          email: user.email,
          type:user.type,
          accessToken: token
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
