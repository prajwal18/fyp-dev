const express = require('express');
const router = express.Router();

// Importing router for the different entities
const assignmentRouter = require('./assignment.router');
const submissionRouter = require('./submission.router');
// Importing router for the different entities


router.all('/', (req, res) => { res.send('Welcome') });

router.use('/assignment', assignmentRouter);
router.use('/submission', submissionRouter);


module.exports = router;