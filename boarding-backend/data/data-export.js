const ms = require("../database/databse-communication")
let mySQl = new ms.MySQLdb

async function getNameHardware(app){
    app.get("/getdata", async (req, res) => {
        var users = await mySQl.getNameHardware() 
        await res.status(200).send(users);
    })
}

async function getAll(app){
    app.get("/all", async (req, res) => {
        var all = await mySQl.getAll() 
        await res.status(200).send(all);
    })
}

const data = {
    getNameHardware,
    getAll,
};

module.exports = data;