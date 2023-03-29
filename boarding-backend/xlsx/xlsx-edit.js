var xlsx = require("node-xlsx");
const json = require("../config/config.json");
const ms = require("../database/databse-communication");
var nodemailer = require("nodemailer");
let mySQl = new ms.MySQLdb();
var sender = nodemailer.createTransport({
  host: "smtp.office365.com",
  auth: { user: "mail@mail.com", pass: json.pas },
  secureConnection: false,
});

async function XlsxToJSON(path, boarding, name, filename, Email) {
  const xlsxPath = path;
  var name2 = name;
  var obj = xlsx.parse(xlsxPath, { cellDates: true }); // parses a file
  var rows = [];
  var JsonArray = [];

  //looping through all sheets
  for (var i = 0; i < obj.length; i++) {
    var sheet = obj[i];
    //loop through all rows in the sheet
    for (var j = 0; j < sheet["data"].length; j++) {
      //add the row to the rows array
      rows.push(sheet["data"][j]);
    }
  }
  if(sheet["data"][0][0] !== "#" || sheet["data"][0][1] !== "Vorname" || sheet["data"][0][2] !== "Nachname" || sheet["data"][0][3] !== "E-Mail Adresse" || sheet["data"][0][4] !== "Geburtsdatum" || sheet["data"][0][5] !== "Tätigkeitsbeschreibung"){
    return false
  }
  for (var i = 1; i < sheet.data.length; i++) {
    birthday = String(sheet.data[i][4]).substring(4, 15);
    date = String(sheet.data[i][7]).substring(4, 15);
    JsonArray.push({
      Nummer: sheet.data[i][0],
      Vorname: sheet.data[i][1],
      Nachname: sheet.data[i][2],
      Email: sheet.data[i][3],
      Geburtsdatum: birthday,
      Abteilung: sheet.data[i][5],
      Datum: date,
      Organisation: sheet.data[i][8],
      Verteiler: "",
    });
    if (sheet.data[i].length > 9) {
      JsonArray[0].Verteiler = sheet.data[i][9];
    }
  }
  if (boarding == "off") {
    var htmlString =
      "<html><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style><body><h2>Onboarding</h2><table style='width:100%'><tr><th>Vorname</th><th>Nachname</th><th>E-Mail</th><th>Organisation</th><th>Abteilung</th><th>Geburtsdatum</th><th>Verteiler</th><th>Austrittsdatum</th></tr>";
    for (var g = 0; g < JsonArray.length; g++) {
      htmlString +=
        `<tr><td>${JsonArray[g].Vorname}</td>` +
        `<td>${JsonArray[g].Nachname}</td>` +
        `<td>${JsonArray[g].Email}</td>` +
        `<td>${JsonArray[g].Organisation}</td>` +
        `<td>${JsonArray[g].Abteilung}</td>` +
        `<td>${JsonArray[g].Geburtsdatum}</td>` +
        `<td>${JsonArray[g].Verteiler}</td>` +
        `<td>${JsonArray[g].Datum}</td></tr>`;
      mySQl.addPersonOffboarding(
        JsonArray[g].Vorname,
        JsonArray[g].Nachname,
        "keine",
        JsonArray[g].Abteilung,
        JsonArray[g].Datum,
        JsonArray[g].Email,
        JsonArray[g].Organisation,
        JsonArray[g].Verteiler,
        JsonArray[g].Geburtsdatum,
        name2
      );
    }
    htmlString += `</table><p></p></body></br><p>Die Excel Datei wurde von ${name2} versendet!</p></html>`;

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
      text: `Die Abteilung hat die Excel Datei mit dem Namen: ${filename} 
      um ${
        new Date().getHours() + " Uhr und " + new Date().getMinutes()
      } Minuten erfolgreich erhalten!\nDie Daten wurden von ${
        name2
      } versendet!`,
    };

    var mail3 = {
      from: "mail@mail.com",
      to: "mail@mail.com",
      subject: "Offboarding",
      html: htmlString,
    };

    var mail4 = {
      from: "mail@mail.com",
      to: Email,
      subject: "Offboarding Bestätigung",
      text: `Die Abteilung hat die Excel Datei mit dem Namen: ${filename} 
      um ${
        new Date().getHours() + " Uhr und " + new Date().getMinutes()
      } Minuten erfolgreich erhalten!\nDie Daten wurden von ${
        name2
      } versendet!`,
    };
  } else if (boarding == "on") {
    var htmlString =
      "<html><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style><body><h2>Onboarding</h2><table style='width:100%'><tr><th>Vorname</th><th>Nachname</th><th>E-Mail</th><th>Organisation</th><th>Abteilung</th><th>Geburtsdatum</th><th>Verteiler</th><th>Eintrittsdatum</th></tr>";
    for (var g = 0; g < JsonArray.length; g++) {
      htmlString +=
        `<tr><td>${JsonArray[g].Vorname}</td>` +
        `<td>${JsonArray[g].Nachname}</td>` +
        `<td>${JsonArray[g].Email}</td>` +
        `<td>${JsonArray[g].Organisation}</td>` +
        `<td>${JsonArray[g].Abteilung}</td>` +
        `<td>${JsonArray[g].Geburtsdatum}</td>` +
        `<td>${JsonArray[g].Verteiler}</td>` +
        `<td>${JsonArray[g].Datum}</td></tr>`;
      mySQl.addPersonOnboarding(
        JsonArray[g].Vorname,
        JsonArray[g].Nachname,
        "keine",
        JsonArray[g].Abteilung,
        JsonArray[g].Datum,
        JsonArray[g].Email,
        JsonArray[g].Organisation,
        JsonArray[g].Verteiler,
        JsonArray[g].Geburtsdatum,
        name2
      );
    }
    htmlString += `</table><p></p></body></br><p>Die Excel Datei wurde von ${name2} versendet!</p></html>`;

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
      text: `Die Abteilung hat die Excel Date mit dem Namen: ${filename} 
      um ${
        new Date().getHours() + " Uhr und " + new Date().getMinutes()
      } Minuten erfolgreich erhalten!\nDie Daten wurden von ${
        name2
      } versendet!`,
    };

    var mail3 = {
      from: "mail@mail.com",
      to: "mail@mail.com",
      subject: "Onboarding",
      html: htmlString,
    };
    
    var mail4 = {
      from: "mail@mail.com",
      to: Email,
      subject: "Onboarding Bestätigung",
      text: `Die Abteilung hat die Excel Daten mit dem Namen: ${filename} 
      um ${
        new Date().getHours() + " Uhr und " + new Date().getMinutes()
      } Minuten erfolgreich erhalten!`,
    };
  } else {
    console.log("Error at Adding Person from Excel!");
    return;
  }

  sender.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      sender.sendMail(mail2, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent successfully: " + info.response);
        }
      });
      sender.sendMail(mail3, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent successfully: " + info.response);
        }
      });
      sender.sendMail(mail4, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent successfully: " + info.response);
        }
      });
    }
  });
  return true
}

const data = {
  XlsxToJSON,
};

module.exports = data;
