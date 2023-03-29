/*
var PdfReader = require("pdfreader").PdfReader;
const ms = require("../database/databse-communication")
let mySQl = new ms.MySQLdb

async function ReadPdf(file){
    var string
    var text = await new Promise(async (resolve, reject) => {
        new PdfReader().parseFileItems("./pdf/Übergabeprotokoll/pdf.pdf", function(err, item){
            if (item && item.text)
            if(item.text !== undefined){
                string += String(item.text)
            }
            if (err) {
                reject(err)
            } else if (String(string).includes("2022")) {
                resolve(string);
            }
        });
    }).catch(()=>{console.log(err)})
    var Nstart = text.indexOf("Labor”") + 6
    var Nend = text.indexOf("•ist")
    var name = text.substring(Nstart, Nend)
    var Dend = text.indexOf("2022") + 4
    var Dstart = Dend - 10
    var date = text.substring(Dstart, Dend)
    var Hstart = text.indexOf("Rückgabe:Unterschrift") + 21
    var Hend = Dstart
    var hardware = text.substring(Hstart, Hend)
    await mySQl.addUebergabeprotokoll(name, date, hardware)
}


const data = {
    ReadPdf,
  };
  
  module.exports = data;
  */