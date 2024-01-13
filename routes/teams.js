import express from 'express';

const router = express.Router(); // ini router

//GET alle teams 
router.get('/', async (req,res)=>{
    try {
        const [rows]= await req.mysql.execute('SELECT * FROM teams');
        res.json(rows);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
//POST een team in de db
router.post('/', async(req,res)=>{
    const{teamName, coach , location, wins, loses} = req.body;

    try{
        const [result]= await req.mysql.execute('INSERT INTO `teams`(`teamName`, `coach`, `location`, `wins`, `loses`) VALUES (?,?,?,?,?)',
        [teamName,coach,location,wins,loses]
        );

        //stuurt de opgehaalde gegevens terug als een JSON-respons
        res.json({ id: result.insertId, ...req.body });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');

    }
});


//PUT update een team in de db
router.put('/:id', async (req, res) => {
    const { teamName, coach, location, players, wins, loses } = req.body;

    try {
        await req.mysql.execute(
            'UPDATE teams SET teamName = ?, coach = ?, location = ?, wins = ?, loses = ? WHERE id = ?',
            [teamName, coach, location,wins, loses ,req.params.id]
        );

        res.json({ success: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// DELETE verwijdert een team uit de db
router.delete('/:id', async (req, res) => {
    try {
        await req.mysql.execute('DELETE FROM teams WHERE id = ?', [req.params.id]);
        res.json({ success: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

export default router; // export router