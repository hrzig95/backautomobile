const config = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const { user } = require("../models");
const User = db.user;
const Role = db.role;
const Agence = db.agence;
const Op = db.Op;
const { authJwt } = require("../middlewares");

exports.signup = (req, res) => {
  // Save user to database
  let user={
    email:req.body.email,
    password:bcrypt.hashSync(req.body.password, 8),
    type:req.body.type,
    status:'active',
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
      let type=user.type ? user.type : user.role;    
        res.status(200).send({
          id: user.id,
          email: user.email,
          type:type,
          role:user.role,
          accessToken: token,
          expiresIn:86400
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.allUsers = (req, res) => {
  User.findAll({attributes: {exclude: ['password']}})
    .then(users => {
        res.status(200).send({users});
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getuserDetails = (req, res) => {
  authJwt.getIdByToken(req,res);
  let idUser=req.userId;
  User.findOne({
    where: {
      id: idUser
    },
    attributes: {exclude: ['password']}
  })
    .then(user => {
      res.status(200).send({user});
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateInfo = (req, res) => {
  authJwt.getIdByToken(req,res);
  let idUser=req.userId;
  let user={firstName:req.body.firstName,
    lastName:req.body.lastName,
    companyAddress:req.body.companyAddress,
    companyPhone:req.body.companyPhone
  }
  User.update(user, { where: { id: idUser }})
    .then(user => {
      res.status(200).send({ message: "user was updated successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.updatePassword = (req, res) => {
  authJwt.getIdByToken(req,res);
  let idUser=req.userId;
  User.findOne({
    where: {
      id: idUser
    }
  })
    .then(user => {
      let passwordIsValid = bcrypt.compareSync(
        req.body.oldPassword,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!"
        });
      }else {
        let password=bcrypt.hashSync(req.body.NewPassword, 8);
        let user={password:password}
        console.log(user);
        User.update(user, { where: { id: idUser }})
          .then(newUser => {
            res.status(200).send({ message: "password was updated successfully!" });
          })
          .catch(err => {
            res.status(500).send({ message: err.message });
          });
      }
     
     
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.blockUser = (req, res) => {
  let idUser=req.params.id;
  let user={status:"inactive"}
  User.update(user, { where: { id: idUser }})
    .then(newUser => {
      res.status(200).send({ message: "user was blocked successfully!" });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};