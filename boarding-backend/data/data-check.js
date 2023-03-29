const ms = require("../database/databse-communication")
let mySQl = new ms.MySQLdb

async function checkDuplicate(app) {
    app.post("/duplicate", async (req, res) => {
      Person = req.body.data
      Type = req.body.boarding
      if(Type == "on"){
        var a = await mySQl.checkDuplicateOn(Person)
        if (a){
            res.status(200).send({value : "exists"});
        } else {
            res.status(200).send({value : "OK"});
        }
      }else if(Type == "off"){
        var a = await mySQl.checkDuplicateOff(Person)
        if (a){
            res.status(200).send({value : "exists"});
        } else {
            res.status(200).send({value : "OK"});
        }
        res.status(200).send("not OK");
      }
    });
  }

module.exports = checkDuplicate;