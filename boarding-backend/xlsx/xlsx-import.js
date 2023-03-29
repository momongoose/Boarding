var XlsxEdit = require("./xlsx-edit")
var name = ""
var mail = ""
var pasGen = require("../authentication/registration");
const { PasswordGen } = require("../authentication/registration");

async function getName(app){
  await app.post("/name", async (req, res) => {
    name = req.body.name;
    return name;
  });
}

async function getMail(app){
  await app.post("/mail", async (req, res) => {
    mail = req.body.mail;
    return mail;
  });
}

async function getXlsxData(app) {
    app.post("/xlsxon", async (req, res) => {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
      } else {
        const file = req.files.file;
        var Filename = file.name
        uploadPath = __dirname + "//" + "Onboarding" + "//" + "onboarding.xlsx";
        //pasGen.PasswordGen()
        // I use the mv() method to place the file on the server
        await file.mv(uploadPath, async function (err) {
          if (err) {
            return res.status(500).send(err);
          } else {
            var ExcelReader = await XlsxEdit.XlsxToJSON(uploadPath, "on", name, Filename, mail);
            if(ExcelReader == false){
              return res.status(200).send({message : "Die Excel Datei hat das falsche Format"});
            }else {
              return res.status(200).send({message: "File uploaded!"});
            }
          }
        });
      }
    });

    app.post("/xlsxoff", async (req, res) => {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
      } else {
        const file = req.files.file;
        var Filename = file.name
        uploadPath = __dirname + "//" + "Offboarding" + "//" + "offboarding.xlsx";
  
        // I use the mv() method to place the file on the server
        await file.mv(uploadPath, async function (err) {
          if (err) {
            return res.status(500).send(err);
          } else {
            var ExcelReader = await XlsxEdit.XlsxToJSON(uploadPath, "off", name, Filename, mail);
            if(ExcelReader == false){
              return res.status(200).send({message : "Die Excel Datei hat das falsche Format"});
            }else {
              return res.status(200).send({message: "File uploaded!"});
            }
          }
        });
      }
    });
  }
  
  const data = {
    getName,
    getXlsxData,
    getMail,
  };
  
  module.exports = data;