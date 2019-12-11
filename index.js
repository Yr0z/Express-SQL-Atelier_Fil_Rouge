const express = require('express');
const connection = require('./conf');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/', (req, res)=>{
    res.status(200).send('Exo SQl - Fil Rouge')
}) 

//Table entière
app.get('/wizard', (req, res) => {

    connection.query('SELECT * from wizard', (err, results) => {
  
      if (err) {
  
        res.status(500).send('Erreur lors de la récupération des sorciers');
      } else {
  
        res.json(results);
      }
    });
  });
  
 //Seulement leurs prénoms et noms
  app.get('/wizard/select', (req, res) => {

    connection.query('SELECT firstname, lastname from wizard', (err, results) => {
  
      if (err) {
  
        res.status(500).send('Erreur lors de la récupération des sorcies');
      } else {
  
        res.json(results);
      }
    });
  });
  
  // Juste les Potter
  app.get('/wizard/light', (req, res) => {

    connection.query('SELECT firstname, lastname FROM wizard WHERE lastname="Potter"', (err, results) => {
  
      if (err) {
  
        res.status(500).send('Erreur lors de la récupération des sorcies');
      } else {
  
        res.json(results);
      }
    });
  });

// Juste les nom commencant par 'cr'
app.get('/wizard/light/cr', (req, res) => {

  connection.query('SELECT lastname FROM wizard WHERE lastname LIKE "Cr%"', (err, results) => {

    if (err) {

      res.status(500).send('Erreur lors de la récupération des sorcies');
    } else {

      res.json(results);
    }
  });
});

// > 1995
app.get('/wizard/light/date', (req, res) => {

  connection.query('SELECT wizard.firstname, wizard.lastname, player.enrollment_date FROM wizard JOIN player ON wizard.id=player.wizard_id WHERE player.enrollment_date > "1995-01-01" ORDER BY player.enrollment_date', (err, results) => {

    if (err) {

      res.status(500).send('Erreur lors de la récupération des sorcies');
    } else {

      res.json(results);
    }
  });
});

//Seulement leurs prénoms, noms,role et team  ASC
app.get('/wizard/select/asc', (req, res) => {

  connection.query('select wizard.firstname, wizard.lastname, player.role, team.name from player left join wizard on wizard.id=player.wizard_id right join team on player.team_id=team.id order by team.name asc;', (err, results) => {

    if (err) {

      res.status(500).send('Erreur lors de la récupération des sorcies');
    } else {

      res.json(results);
    }
  });
});

//Seulement leurs prénoms, noms,role et team  DESC
app.get('/wizard/select/desc', (req, res) => {

  connection.query('select wizard.firstname, wizard.lastname, player.role, team.name from player left join wizard on wizard.id=player.wizard_id right join team on player.team_id=team.id order by team.name desc;', (err, results) => {

    if (err) {

      res.status(500).send('Erreur lors de la récupération des sorcies');
    } else {

      res.json(results);
    }
  });
});

// POST
app.post('/wizard/add/', (req, res) => {

  const formData =req.body

  connection.query('INSERT INTO wizard SET ?',formData,(err, result) =>{
      if (err){
          res.status(500).send('oh .....')
      }
      else {
          console.log('well done')
          res.status(200)
      }
  })
})

//PUT
app.put('/wizard/modi/:id', (req, res) => {

  const idSorc = req.params.id;
  const formData = req.body;

  connection.query('UPDATE wizard SET ? WHERE id = ?', [formData, idSorc], err => {

    if(err) {
      console.log(err);
      res.status(500).send("Erreur lors de la modification d'un sorcier");
    } else {
      res.sendStatus(200);
    }
  });  
});

//PUT BOOLEAN
app.put('/wizard/modi/Wiz/', (req, res) => {
  connection.query('UPDATE wizard SET isMuggle="false" WHERE isMuggle="true"',err =>{
      if (err){
          res.status(500).send('Oh Oh error ')
      }
      else {
          console.log('YEAH')
          res.status(200)
      }
  })
})

//DELETE
app.delete('/wizard/delete/:id', (req, res) => {
  const idWizard = req.params.id
  connection.query('DELETE FROM wizard WHERE id = ?', [idWizard],err =>{
      if (err){
          res.status(500).send("Erreur lors de la suppression d'un sorcier")
      }
      else {
          console.log('deleted')
          res.sendStatus(200)
      }
  })
})

//DELETE booleen false
app.delete('/wizard/deletewizard/', (req, res) => {
  const idWizard = req.params.id
  connection.query('DELETE FROM wizard WHERE isMuggle="false"', [idWizard],err =>{
      if (err){
          res.status(500).send('error')
      }
      else {
          console.log('deleted')
          res.sendStatus(200)
      }
  })
})

app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened...');
  }

  console.log(`Server is listening on ${port}`);
});