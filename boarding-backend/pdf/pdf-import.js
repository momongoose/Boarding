const ms = require("../database/databse-communication")
const fs = require("fs")
let mySQl = new ms.MySQLdb

async function getPdfData(app) {

  app.post("/pdf", async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    } else {
        const file = req.files.file;
        uploadPath = __dirname + "//" + "Übergabeprotokoll" + "//" + file.name;
        if(fs.existsSync(uploadPath)){
          uploadPath = uploadPath.replace(".pdf", "") + String(Math.floor(Math.random()*1000000)) + ".pdf"
        }
        // I use the mv() method to place the file on the server
        file.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        } else {
            return res.status(200).send("File uploaded!");
        }
      });
    }
  });
}

async function getPdfInput(app) {
  app.post("/input", async (req, res) => {
    var Data = req.body.data
    for(var d = 0; d < Data.hardwareTyp.length; d++){
      await mySQl.addUebergabeprotokoll(Data.name, Data.date, Data.hardwareTyp[d], Data.hardwareSn[d], Data.hardwareName[d])
    }
    res.status(200).send("Data received!");
  })
}

const data = {
  getPdfData,
  getPdfInput
};

module.exports = data;
