const csv = require("csvtojson");
const csvPath1 = "./csv/Onboarding/csvon.csv";
const csvPath2 = "./csv/Offboarding/csvoff.csv";
var nodemailer = require("nodemailer");
const json = require("../config/config.json");
const ms = require("../database/databse-communication");
let mySQl = new ms.MySQLdb();
var now = new Date();
var name = "";
var fileName = "";
var sender = nodemailer.createTransport({
  host: "smtp.office365.com",
  auth: { user: "mail@mail.com", pass: json.pas },
  secureConnection: false,
});

async function getDataOn(file, app, fileName, name2) {
  name = name2;
  fileName = await fileName;
  htmlString =
    "<html><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style><body><h2>Onboarding</h2><table style='width:100%'><tr><th>Vorname</th><th>Nachname</th><th>E-Mail</th><th>Organisation</th><th>Abteilung</th><th>Verteiler</th><th>Eintrittsdatum</th></tr>";
  var jsonArray = await csv({ delimiter: "," }).fromFile(csvPath1);
  for (var i = 0; i < jsonArray.length; i++) {
    htmlString +=
      `<tr><td>${jsonArray[i].Vorname}</td>` +
      `<td>${jsonArray[i].Nachname}</td>` +
      `<td>${jsonArray[i].Email}</td>` +
      `<td>${jsonArray[i].Organisation}</td>` +
      `<td>${jsonArray[i].Abteilung}</td>` +
      `<td>${jsonArray[i].Verteiler}</td>` +
      `<td>${jsonArray[i].Eintrittsdatum}</td></tr>`;
    await mySQl.addPersonOnboarding(
      jsonArray[i].Vorname,
      jsonArray[i].Nachname,
      "no",
      jsonArray[i].Abteilung,
      jsonArray[i].Eintrittsdatum,
      jsonArray[i].Email,
      jsonArray[i].Organisation,
      jsonArray[i].Verteiler,
      name
      //Geburtsdatum
    );
  }
  htmlString += "</table><p></p></body></html>";
  sendDataOn(fileName);
}

async function getDataOff(file, app, fileName, name2) {
  name = name2;
  fileName = await fileName;
  htmlString =
    "<html><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style><body><h2>Offboarding</h2><table style='width:100%'><tr><th>Vorname</th><th>Nachname</th><th>E-Mail</th><th>Organisation</th><th>Abteilung</th><th>Verteiler</th><th>Austrittsdatum</th></tr>";
  var jsonArray = await csv({ delimiter: "," }).fromFile(csvPath2);
  for (var i = 0; i < jsonArray.length; i++) {
    htmlString +=
      `<tr><td>${jsonArray[i].Vorname}</td>` +
      `<td>${jsonArray[i].Nachname}</td>` +
      `<td>${jsonArray[i].Email}</td>` +
      `<td>${jsonArray[i].Organisation}</td>` +
      `<td>${jsonArray[i].Abteilung}</td>` +
      `<td>${jsonArray[i].Verteiler}</td>` +
      `<td>${jsonArray[i].Austrittsdatum}</td></tr>`;
    await mySQl.addPersonOffboarding(
      jsonArray[i].Vorname,
      jsonArray[i].Nachname,
      "no",
      jsonArray[i].Abteilung,
      jsonArray[i].Austrittsdatum,
      jsonArray[i].Email,
      jsonArray[i].Organisation,
      jsonArray[i].Verteiler,
      name
      //Geburtsdatum
    );
  }
  htmlString += `</table><p></p></body></br><p>Die CSV Datei wurde von ${name} versendet!</p></html>`;
  sendDataOff(fileName);
}

async function sendDataOn(fileName) {
  now = new Date();
  var mail = {
    from: "mail@mail.com",
    to: "mail@mail.com",
    subject: "Onboarding",
    html: htmlString,
  };

  var mail2 = {
    from: "mail@mail.com",
    to: "mail@mail.com",
    subject: "Onboarding Bestätigung",
    text: `Die Abteilung hat die CSV Datei mit dem Namen "${fileName}", um ${
      now.getHours() + " Uhr und " + now.getMinutes()
    } Minuten erfolgreich erhalten!\nDie CSV Datei wurde von ${name} versendet!`,
  };

  var mail3 = {
    from: "mail@mail.com",
    to: "mail@mail.com",
    subject: "Onboarding Bestätigung",
    html: htmlString,
  };

  sender.sendMail(mail, function (error) {
    if (error) {
      console.log(error);
    } else {
      sender.sendMail(mail2, function (error) {
        if (error) {
          console.log(error);
        }
      });
      sender.sendMail(mail3, function (error) {
        if (error) {
          console.log(error);
        }
      });
    }
  });
}

async function sendDataOff(fileName) {
  now = new Date();
  var fileName = fileName;
  var mail = {
    from: "mail@mail.com",
    to: "mail@mail.com",
    subject: "Offboarding",
    html: htmlString,
  };

  var mail2 = {
    from: "mail@mail.com",
    to: "mail@mail.com",
    subject: "Offboarding Bestätigung",
    text: `Die Abteilung hat die CSV Datei mit dem Namen "${fileName}", um ${
      now.getHours() + " Uhr und " + now.getMinutes()
    } Minuten erfolgreich erhalten!\nDie CSV Datei wurde von ${name} versendet!`,
  };

  var mail3 = {
    from: "mail@mail.com",
    to: "mail@mail.com",
    subject: "Offboarding",
    html: htmlString,
  };

  sender.sendMail(mail, function (error) {
    if (error) {
      console.log(error);
    } else {
      sender.sendMail(mail2, function (error) {
        if (error) {
          console.log(error);
        }
      });
      sender.sendMail(mail3, function (error) {
        if (error) {
          console.log(error);
        }
      });
    }
  });
}

const data = {
  getDataOn,
  getDataOff,
};

module.exports = data;
