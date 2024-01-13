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

    console.log('POST ROUTE REACHED');

    res.send('POST ROUTE REACHED');
   /*  const{ voornaam, achternaam,geboortedatum, ppg, apg, rpg, minpg } = req.body;
    try{
        const [result]= await req.mysql.execute('INSERT INTO `players`(`voornaam`, `achternaam`, `geboortedatum`, `ppg`, `apg`, `rpg`, `minpg`) VALUES (?,?,?,?,?,?,?)',
        [voornaam, achternaam,geboortedatum, ppg, apg, rpg, minpg]
        );

        //stuurt de opgehaalde gegevens terug als een JSON-respons
        res.json({ id: result.insertId, ...req.body });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');

    } */
})


export default router; // export router
