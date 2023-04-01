const express = require('express');
const router = express.Router();

// Importing router for the different entities
const userRouter = require('./user.router');
const assignmentRouter = require('./assignment.router');
const assignmentSubmissionRouter = require('./assignment.submission.router');
const testRouter = require("./test.router");
const testAnswerRouter = require("./test.answer.router");
const statsRouter = require("./stats.router");
// Importing router for the different entities


router.all('/', (req, res) => { res.send('Welcome') });

router.use('/user', userRouter);
router.use('/assignment', assignmentRouter);
router.use('/assignment-submission', assignmentSubmissionRouter);
router.use('/test', testRouter);
router.use('/test-answer', testAnswerRouter);
router.use('/stats', statsRouter);

module.exports = router;