const dbConfig = require("../config/db.config");

class MySQLdb {
  
  constructor() {
    this.mysql = require("mysql2");
    this.db = this.mysql.createConnection({
      host: dbConfig.HOST,
      user: dbConfig.USER,
      password: dbConfig.PAS,
      database: dbConfig.DB,
    });
  }
  
  async regiUser(firstname, lastname, mail, password) {
    
    var name = firstname + " " + lastname
    if(mail == "mail@mail.com") {
      var sql  = "INSERT INTO table (name, mail, password, role) VALUES (" + this.mysql.escape(name) + ", " + this.mysql.escape(mail) + ", " + this.mysql.escape(password) + ", " + this.mysql.escape(3) +  ")";
    }else if(mail == "mail@mail.com"){
      var sql  = "INSERT INTO table (name, mail, password, role) VALUES (" + this.mysql.escape(name) + ", " + this.mysql.escape(mail) + ", " + this.mysql.escape(password) + ", " + this.mysql.escape(2) +  ")";
    } else {
      var sql  = "INSERT INTO table (name, mail, password, role) VALUES (" + this.mysql.escape(name) + ", " + this.mysql.escape(mail) + ", " + this.mysql.escape(password) + ", " + this.mysql.escape(1) +  ")";
    }
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(name + " User added in user list")
        }
      });
    }).catch(() => {console.log("there was an error adding User in the user list!")});
    await promisify(this.db.end.bind(this.db))();
  }

  async getUser(mail){
    var sql = "SELECT name, mail, password, role FROM table WHERE mail = " + this.mysql.escape(mail);
    let table = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get the specific User! ")});
    return await table;
  }

  async getAll(){
    var sql = "SELECT firstname, lastname, date, who FROM table";
    var sql2 = "SELECT firstname, lastname, date, who FROM table";
    let off = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get table! ")});
    let on = await new Promise((resolve, reject) => {
      this.db.query(sql2, function (err, result) {
        if (err) {
          reject(err)
        };
        if(result){
          resolve(result)
        }
      });
    }).catch(() => {console.log("could not get table! ")});
    let all = [await on, await off]
    return all;
  }

  async checkDuplicateOn(mail){
    var sql = "SELECT * FROM table WHERE mail = " + this.mysql.escape(mail);
    let exists = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        }
        if(result.length > 0){
          resolve(true)
        } else {
          resolve(false)
        }
      });
    }).catch(() => {console.log("could not get the specific User :) ")});
    return exists
  }

  async checkDuplicateOff(mail){
    var sql = "SELECT * FROM table WHERE mail = " + this.mysql.escape(mail);
    let exists = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        }
        if(result.length > 0){
          resolve(true)
        } else {
          resolve(false)
        }
      });
    }).catch(() => {console.log("could not get the specific User :) ")});
    return exists
  }

  async checkIfUserExists(mail) {
    var sql = "SELECT * FROM table WHERE mail = " + this.mysql.escape(mail);
    let exists = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        }
        if(result.length > 0){
          resolve(true)
        } else {
          resolve(false)
        }
      });
    }).catch(() => {console.log("could not get the specific User :) ")});
    return exists
  }

  async addPersontable(firstname, lastname, hardware, department, date, mail, organisation, distribution, birthday, name) {
    var sql  = "INSERT INTO table (firstname, lastname, hardware, department, date, mail, organisation, distribution, birthday, who) VALUES (" + this.mysql.escape(firstname) + ", " + this.mysql.escape(lastname) + ", " + this.mysql.escape(hardware) + ", " + this.mysql.escape(department) + ", " + this.mysql.escape(date) + ", " + this.mysql.escape(mail) + ", " + this.mysql.escape(organisation) + ", " + this.mysql.escape(distribution) + ", " + this.mysql.escape(birthday) + ", " + this.mysql.escape(name) +  ")";
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(firstname + " " + lastname + " User added in table list")
        }
      });
    }).catch(() => {console.log("there was an error adding User in the table list!")});
  }

  async addPersontable(firstname, lastname, hardware, department, date, mail, organisation, distribution, birthday, name) {
    var sql  = "INSERT INTO table (firstname, lastname, hardware, department, date, mail, organisation, distribution, birthday, who) VALUES (" + this.mysql.escape(firstname) + ", " + this.mysql.escape(lastname) + ", " + this.mysql.escape(hardware) + ", " + this.mysql.escape(department) + ", " + this.mysql.escape(date) + ", " + this.mysql.escape(mail) + ", " + this.mysql.escape(organisation) + ", " + this.mysql.escape(distribution) + ", " + this.mysql.escape(birthday) + ", " + this.mysql.escape(name) +  ")";
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(firstname + " " + lastname + " User added in table list")
        }
      });
    }).catch(() => {console.log("there was an error adding User in the table list!")});
  }

  async addtable(name, date, hardwareTyp, hardwareSn, hardwareName) {
    var sql  = "INSERT INTO table (name, received, hardwareTyp, hardwareSn, hardwareName) VALUES (" + this.mysql.escape(name) + ", " + this.mysql.escape(date) + ", " + this.mysql.escape(hardwareTyp) + ", " + this.mysql.escape(hardwareSn) + ", " + this.mysql.escape(hardwareName) +  ")";
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        } else if (result) {
          resolve("table added in table list")
        }
      });
    }).catch(() => {console.log("there was an error adding table in the table list!")});
  }

  async getNameHardware(){
    var sql = "SELECT name, hardwareName, received, return_date FROM table";
    let table = await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err)
        };
        resolve(result)
      });
    }).catch(() => {console.log("could not get the name/hardware list! ")});
    return table;
  }

  async addReturnDate(name, hardware, date){
    var sql  = "UPDATE table SET return_date = " + this.mysql.escape(date) + " WHERE name = " + this.mysql.escape(name) + " AND hardwareName = " + this.mysql.escape(hardware);
    await new Promise((resolve, reject) => {
      this.db.query(sql, function (err, result) {
        if (err) {
          reject(err);
        } else if (result) {
          resolve("Return Date added in table list")
        }
      });
    }).catch(() => {console.log("there was an error adding Return Date in the table list!")});
  }

}

module.exports.MySQLdb = MySQLdb;