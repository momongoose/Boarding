const edit = require("./csv-edit");
var files;
var fileName;
var name = "";

async function getCsvDataOn(app) {
  await app.post("/name", async (req, res) => {
    name = req.body.name;
    return name;
  });
  app.post("/csvon", async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    } else {
      const file = req.files.file;
      files = file;
      fileName = file.name;
      file.name = "csvon.csv";
      uploadPath = __dirname + "//" + "Onboarding" + "//" + file.name;
      // I use the mv() method to place the file on the server
      await file.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        } else {
          edit.getDataOn(file, app, fileName, name);
          return res.status(200).send("File uploaded!");
        }
      });
    }
  });
}

async function getCsvDataOff(app) {
  await app.post("/name", async (req, res) => {
    name = req.body.name;
    return name;
  });
  app.post("/csvoff", async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    } else {
      const file = req.files.file;
      files = file;
      fileName = file.name;
      file.name = "csvoff.csv";
      uploadPath = __dirname + "//" + "Offboarding" + "//" + file.name;
      // I use the mv() method to place the file on the server
      file.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        } else {
          edit.getDataOff(file, app, fileName, name);
          return res.status(200).send("File uploaded!");
        }
      });
    }
  });
}

const data = {
  getCsvDataOn,
  getCsvDataOff,
  name
};

module.exports = data;
