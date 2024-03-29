import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router(); // ini router

//alle routes hier starten met /players
//GET ALLE PLAYERS
router.get('/', async (req, res) => {
    try {
      const [rows] = await req.mysql.execute('SELECT * FROM players');
      res.json(rows);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  //GET player door naam - returning values 
  router.get('/search/:voornaam', async (req, res) => {
    const voornaam = req.params.voornaam;
    try {
        const [rows] = await req.mysql.execute('SELECT * FROM players WHERE voornaam = ?', [voornaam]);
        res.json(rows);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//POST EEN PLAYER IN DE DB 
router.post('/', 
   // Validatie regels 
   [
    body('voornaam').notEmpty().withMessage('First name is required'),
    body('achternaam').notEmpty().withMessage('Last name is required'),
    body('Team').notEmpty().withMessage('Team is required'),
    body('geboortedatum').notEmpty().withMessage('Birthdate is required')
                .isDate().withMessage('Birthdate must be a date'),
    body('ppg').isNumeric().withMessage('PPG must be a number')
        .custom((value) => {
          if (value < 0) {
            throw new Error('PPG cannot be less than 0');
          }
          return true;
          }),
    body('apg').isNumeric().withMessage('APG must be a number')
        .custom((value) => {
          if (value < 0) {
            throw new Error('APG cannot be less than 0');
          }
          return true;
          }),
    body('rpg').isNumeric().withMessage('RPG must be a number')
          .custom((value) => {
          if (value < 0) {
            throw new Error('RPG cannot be less than 0');
          }
          return true;
          }),
    body('minpg').isNumeric().withMessage('MINPG must be a number'),
  ],
    async(req,res)=>{
         // Check voor validatie errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
        voornaam = null, 
        achternaam = null, 
        Team = null, 
        geboortedatum = null, 
        ppg = null, 
        apg = null, 
        rpg = null, 
        minpg = null 
      } = req.body;

      console.log(req.body); // log the entire body
      console.log(voornaam, achternaam, Team, geboortedatum, ppg, apg, rpg, minpg); // log the destructured variables
    try{
        const [result]= await req.mysql.execute('INSERT INTO `players`(`voornaam`, `achternaam`,`Team`, `geboortedatum`, `ppg`, `apg`, `rpg`, `minpg`) VALUES (?,?,?,?,?,?,?,?)',
        [voornaam, achternaam,Team,geboortedatum, ppg, apg, rpg, minpg]
        );

        //stuurt de opgehaalde gegevens terug als een JSON-respons
        res.json({ id: result.insertId, ...req.body });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');

    }
})

// PUT UPDATE EEN PLAYER IN DE DB
router.put('/:id', 
  // Validatie regels
  [
    body('voornaam').notEmpty().withMessage('First name is required'),
    body('achternaam').notEmpty().withMessage('Last name is required'),
    body('geboortedatum').notEmpty().withMessage('Birthdate is required'),
    body('ppg').isNumeric().withMessage('PPG must be a number'),
    body('apg').isNumeric().withMessage('APG must be a number'),
    body('rpg').isNumeric().withMessage('RPG must be a number'),
    body('minpg').isNumeric().withMessage('MINPG must be a number'),
  ],
  async(req,res)=>{
    // Check voor validatie errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { voornaam, achternaam, geboortedatum, ppg, apg, rpg, minpg } = req.body;
    try{
        await req.mysql.execute('UPDATE `players` SET `voornaam`=?, `achternaam`=?, `geboortedatum`=?, `ppg`=?, `apg`=?, `rpg`=?, `minpg`=? WHERE `id`=?',
        [voornaam, achternaam, geboortedatum, ppg, apg, rpg, minpg, req.params.id]
        );

        res.json({ success: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
})

// DELETE EEN PLAYER UIT DE DB
router.delete('/:id', async(req,res)=>{
    try{
        await req.mysql.execute('DELETE FROM `players` WHERE `id`=?',
        [req.params.id]
        );

        res.json({ success: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
})
//GET spelers obv teamnaam 
router.get('/search/team/:team', async (req,res)=>{
  const teamName = req.params.team;
  try{
    const [rows] = await req.mysql.execute(`
    SELECT players.*
    FROM players
    INNER JOIN teams ON players.Team = teams.teamName
    WHERE teams.teamName = ?
    `,[teamName]);
    res.json(rows);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router; // export router
