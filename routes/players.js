import express from 'express';

const router = express.Router(); // ini router

//alle routes hier starten met /players
router.get('/',(req,res)=>{
    res.send('hello');
})


export default router; // export router
