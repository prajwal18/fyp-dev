const express = require('express');
const router = express.Router();

// Importing router for the different entities
const userRouter = require('./user.router');
// Importing router for the different entities


router.all('/', (req, res) => { res.send('Welcome') });

router.use("/user", userRouter);


module.exports = router;