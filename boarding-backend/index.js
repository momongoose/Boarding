const express = require("express")
const cors = require("cors")
const helmet = require("helmet");
const compressor = require("compression");
const fileUpload = require("express-fileupload");
const csv = require("./csv/csv-import")
const pdf = require("./pdf/pdf-import")
const xlsx = require("./xlsx/xlsx-import")
const data = require("./data/data-import");
const check = require("./data/data-check")
const ex = require("./data/data-export")
const regi = require("./authentication/registration")
const logi = require("./authentication/login")
const app = express()
const port =  process.env.PORT || 8080;

var corsOptions = {
    origin: "http://localhost:8081", 
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compressor());
app.use(fileUpload());
app.listen(port, () => {
    console.log(`App listening on Port ${port}`)
})

function main(){
    initial();
}

function initial() {
    console.log("initializing")
    xlsx.getName(app)
    xlsx.getMail(app)
    csv.getCsvDataOn(app)
    csv.getCsvDataOff(app)
    xlsx.getXlsxData(app)
    pdf.getPdfData(app)
    pdf.getPdfInput(app)
    data.getDataOn(app)
    data.getDataOff(app)
    data.ReturnDate(app)
    ex.getAll(app)
    ex.getNameHardware(app)
    regi.getRegiData(app)
    logi.getLogiData(app)
    check(app)
}

main();
