import express from 'express';

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
//POST EEN PLAYER IN DE DB 
router.post('/', async(req,res)=>{
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
router.put('/:id', async(req,res)=>{
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


export default router; // export router
