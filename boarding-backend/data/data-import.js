var nodemailer = require("nodemailer");
const json = require("../config/config.json");
const ms = require("../database/databse-communication")
let mySQl = new ms.MySQLdb
var Person = ""
var sender = nodemailer.createTransport({
  host: "smtp.office365.com",
  auth: { user: "mail@mail.com", pass: json.pas },
  secureConnection: false,
});

async function getDataOn(app) {
  app.post("/dataon", async (req, res) => {
    sendMailOn(req.body.data)
    Person = req.body.data
    await mySQl.addPersonOnboarding(Person.firstname, Person.lastname, JSON.stringify(Person.hardware), Person.department, Person.date, Person.mail, Person.organisation, Person.distribution, Person.birthday, Person.name)
    res.status(200).send("OK");
  });
}

async function getDataOff(app) {
  app.post("/dataoff2", async (req, res) => {
    sendMailOff(req.body.data)
    Person = req.body.data
    await mySQl.addPersonOffboarding(Person.firstname, Person.lastname, JSON.stringify(Person.hardware), Person.department, Person.date, Person.mail, Person.organisation, Person.distribution, Person.birthday, Person.name)
    res.status(200).send("OK");
  });
}

async function sendMailOn(Person){
  var mail = {
    from: "mail@mail.com",
    to: "mail@mail.com",
    subject: "Onboarding",
    html: `<html><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style><body><h2>Onboarding</h2><table style="width:100%"><tr><th>Vorname</th><th>Nachname</th><th>E-Mail</th><th>Organisation</th><th>Abteilung</th><th>Verteiler</th><th>Eintrittsdatum</th><th>Geburtsdatum</th><th>Hardware</th></tr>  <tr>    <td>${Person.firstname}</td>    <td>${Person.lastname}</td>  <td>${Person.mail}</td> <td>${Person.organisation}</td> <td>${Person.department}</td> <td>${Person.distribution}</td>  <td>${Person.date}</td> <td>${Person.birthday}</td> <td>${JSON.stringify(Person.hardware)}</td>  </tr>  </table><p>Die Daten wurden von ${Person.name} versendet!</p></body></html>`
  };

  var mail2 = {
    from: "mail@mail.com",
    to: "mail@mail.com",
    subject: "Onboarding Bestätigung",
    text: `Die Abteilung hat die Daten von ${Person.firstname} ${Person.lastname} um ${new Date().getHours() + " Uhr und " + new Date().getMinutes()} Minuten erfolgreich erhalten!\nDie Daten wurden von ${Person.name} versendet!`
  };

  var mail3 = {
    from: "mail@mail.com",
    to: "mail@mail.com",
    subject: "Onboarding",
    html: `<html><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style><body><h2>Onboarding</h2><table style="width:100%"><tr><th>Vorname</th><th>Nachname</th><th>E-Mail</th><th>Organisation</th><th>Abteilung</th><th>Verteiler</th><th>Eintrittsdatum</th><th>Geburtsdatum</th><th>Hardware</th></tr>  <tr>    <td>${Person.firstname}</td>    <td>${Person.lastname}</td>  <td>${Person.mail}</td> <td>${Person.organisation}</td> <td>${Person.department}</td> <td>${Person.distribution}</td>  <td>${Person.date}</td> <td>${Person.birthday}</td> <td>${JSON.stringify(Person.hardware)}</td>  </tr>  </table><p>Die Daten wurden von ${Person.name} versendet!</p></body></html>`
  };
  var mail4 = {
    from: "mail@mail.com",
    to: Person.Email,
    subject: "Onboarding Bestätigung",
    text: `Die Abteilung hat die Daten von ${Person.firstname} ${Person.lastname} um ${new Date().getHours() + " Uhr und " + new Date().getMinutes()} Minuten erfolgreich erhalten!\nDie Daten wurden von ${Person.name} versendet!`
  };
  if(Person.hardware.includes("cloud")){
    var mail5 = {
      from: "mail@mail.com",
      to: "mail@mail.com",
      subject: `Cloud Freigabe für ${Person.firstname} ${Person.lastname}`,
      text: `Bitte die Cloud Berechtigung freigeben für ${Person.mail}`
    };
    sender.sendMail(mail5, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully: " + info.response);
      }
    });
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
}

async function sendMailOff(Person){
  var mail = {
    from: "mail@mail.com",
    to: "mail@mail.com",
    subject: "Offboarding",
    html: `<html><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style><body><h2>Offboarding</h2><table style="width:100%"><tr><th>Vorname</th><th>Nachname</th><th>E-Mail</th><th>Organisation</th><th>Abteilung</th><th>Verteiler</th><th>Austrittsdatum</th><th>Geburtsdatum</th><th>Hardware</th></tr>  <tr>    <td>${Person.firstname}</td>    <td>${Person.lastname}</td>   <td>${Person.mail}</td> <td>${Person.organisation}</td> <td>${Person.department}</td> <td>${Person.distribution}</td>  <td>${Person.date}</td> <td>${Person.birthday}</td> <td>${JSON.stringify(Person.hardware)}</td> </tr>  </table><p>Die Daten wurden von ${Person.name} versendet!</p></body></html>`
  };

  var mail2 = {
    from: "mail@mail.com",
    to: "mail@mail.com",
    subject: "Offboarding Bestätigung",
    text: `Die Abteilung hat die Daten von ${Person.firstname} ${Person.lastname} um ${new Date().getHours() + " Uhr und " + new Date().getMinutes()} Minuten erfolgreich erhalten!\nDie Daten wurden von ${Person.name} versendet!`
  };

  var mail3 = {
    from: "mail@mail.com",
    to: "mail@mail.com",
    subject: "Offboarding",
    html: `<html><style>table {font-family: arial, sans-serif;border-collapse: collapse;width: 100%;}td, th {border: 1px solid #dddddd;text-align: left;padding: 8px;}tr:nth-child(even) {background-color: #dddddd;}</style><body><h2>Offboarding</h2><table style="width:100%"><tr><th>Vorname</th><th>Nachname</th><th>E-Mail</th><th>Organisation</th><th>Abteilung</th><th>Verteiler</th><th>Austrittsdatum</th><th>Geburtsdatum</th><th>Hardware</th></tr>  <tr>    <td>${Person.firstname}</td>    <td>${Person.lastname}</td>   <td>${Person.mail}</td> <td>${Person.organisation}</td> <td>${Person.department}</td> <td>${Person.distribution}</td>  <td>${Person.date}</td> <td>${Person.birthday}</td> <td>${JSON.stringify(Person.hardware)}</td> </tr>  </table><p>Die Daten wurden von ${Person.name} versendet!</p></body></html>`
  };

  var mail4 = {
    from: "mail@mail.com",
    to: Person.Email,
    subject: "Onboarding Bestätigung",
    text: `Die Abteilung hat die Daten von ${Person.firstname} ${Person.lastname} um ${new Date().getHours() + " Uhr und " + new Date().getMinutes()} Minuten erfolgreich erhalten!\nDie Daten wurden von ${Person.name} versendet!`
  };

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
}

async function ReturnDate(app){
  app.post("/input/return", async (req, res) => {
    var PersonDateHardware = req.body.data
    mySQl.addReturnDate(PersonDateHardware.name, PersonDateHardware.hardware, PersonDateHardware.date)
    res.status(200).send("OK");
  })
}

const data = {
    getDataOn,
    getDataOff,
    ReturnDate,
};

module.exports = data;
