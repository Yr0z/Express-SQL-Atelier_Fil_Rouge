const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost', // adresse du serveur
user :  'root', // le nom d'utilisateur
password :  'Zylopito913!', // le mot de passe
database :  'wild_db_quest', // le nom de la base de données
});
module.exports = connection;
