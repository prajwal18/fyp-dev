const express = require('express');
const router = express.Router();

// Importing router for the different entities
const userRouter = require('./user.router');
const adminRouter = require('./admin.router');
const courseRouter = require('./course.router');
const facultyRouter = require('./faculty.router');
// Importing router for the different entities


router.all('/', (req, res) => { res.send('Welcome') });

router.use("/user", userRouter);
router.use("/admin", adminRouter);
router.use("/course", courseRouter);
router.use("/faculty", facultyRouter);


module.exports = router;