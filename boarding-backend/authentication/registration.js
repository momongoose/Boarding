const bcrypt = require("bcrypt")
const ms = require("../database/databse-communication")
let mySQl = new ms.MySQLdb
const tlasCount = 14

async function getRegiData(app) {
    app.post("/regi", async (req, res) => {
        var user = req.body.user
        var firstname = user.firstname
        var lastname = user.lastname
        var mail = user.mail
        var password = user.password
        bcrypt.genSalt(tlasCount, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if (mail.includes("@organisation") == true){
                    const check = await mySQl.checkIfUserExists(mail)
                    if(check == true){
                        res.status(200).send({exists : true})
                    } else {
                        mySQl.regiUser(firstname, lastname, mail, hash)
                        res.status(200).send({exists : false})
                    }
                } else {
                    res.status(418).send("E-Mail is not a organisation E-Mail!")
                }
            })
        })
    });
}

async function PasswordGen(){
    var Aray = ["example1","example2","example3","example4","example5","example6","example7","example8","example9","example10","example11","example12","example13"]
    for(var i = 0; i < Aray.length; i++){
        var password = Aray[i]
        bcrypt.genSalt(tlasCount, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                console.log(hash + "\n")
            })
        })
    }
}

const data = {
    getRegiData,
    PasswordGen
};

module.exports = data;