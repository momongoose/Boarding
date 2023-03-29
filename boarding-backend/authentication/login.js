const bcrypt = require("bcrypt");
const ms = require("../database/databse-communication");
let mySQl = new ms.MySQLdb();
const tlasCount = 14;

async function getLogiData(app) {
  app.post("/logi", async (req, res) => {
    var user = req.body.user;
    var mail = user.mail;
    var password = user.password;
    var User = await mySQl.getUser(mail);
    if (User[0] !== undefined) {
      var hash = await User[0].password;

      bcrypt.compare(password, hash, (err, result) => {
        if (result) {
          mySQl.db.end();
          res.status(200).send({
            User: User[0],
          });
        }
        else {
          mySQl.db.end();
          return res.status(401).send({
            message: "Email oder Passwort ist nicht OK!",
          });
        }
      });
    } else {
      mySQl.db.end();
        return res.status(200).send({
            User: "Email oder Passwort ist nicht OK!",
          });
    }
  });
}


const data = {
  getLogiData,
};

module.exports = data;
