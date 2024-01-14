import express from 'express';
import { body, validationResult } from 'express-validator';
const router = express.Router(); // ini router

//GET alle teams 
router.get('/', async (req, res) => {
    try {
        const [rows] = await req.mysql.execute('SELECT * FROM teams ');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//GET alle teams met limit en offset
router.get('/limit/:limit/offset/:offset', async (req, res) => {
    const limit = parseInt(req.params.limit);
    const offset = parseInt(req.params.offset);
    try {
        const [rows] = await req.mysql.execute('SELECT * FROM teams LIMIT ? OFFSET ?', [limit, offset]);
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//POST een team in de db
router.post('/',
    // Validatie regels
    [
        body('teamName').notEmpty().withMessage('Team name is required'),
        body('coach').notEmpty().withMessage('Coach is required'),
        body('location').notEmpty().withMessage('Location is required'),
        body('wins').isNumeric().withMessage('Wins must be a number')
            .custom((value) => {
                if (value < 0) {
                    throw new Error('Wins kan niet onder 0 zijn');
                }
                return true;
            }),
        body('loses').isNumeric().withMessage('Loses must be a number')
            .custom((value) => {
                if (value < 0) {
                    throw new Error('Loses cannot be less than 0');
                }
                return true;
            }),
    ],
    async (req, res) => {
        //checkt of er errors zijn
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { teamName, coach, location, wins, loses } = req.body;

        try {
            const [result] = await req.mysql.execute('INSERT INTO `teams`(`teamName`, `coach`, `location`, `wins`, `loses`) VALUES (?,?,?,?,?)',
                [teamName, coach, location, wins, loses]
            );

            //stuurt de opgehaalde gegevens terug als een JSON-respons
            res.json({ id: result.insertId, ...req.body });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

//PUT update een team in de db
router.put('/:id',
    // Validatie regels
    [
        body('teamName').notEmpty().withMessage('Team name is required'),
        body('coach').notEmpty().withMessage('Coach is required'),
        body('location').notEmpty().withMessage('Location is required'),
        body('wins').isNumeric().withMessage('Wins must be a number'),
        body('loses').isNumeric().withMessage('Loses must be a number'),
    ],
    async (req, res) => {
        //checkt of er errors zijn
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { teamName, coach, location, wins, loses } = req.body;

        try {
            await req.mysql.execute(
                'UPDATE teams SET teamName = ?, coach = ?, location = ?, wins = ?, loses = ? WHERE id = ?',
                [teamName, coach, location, wins, loses, req.params.id]
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