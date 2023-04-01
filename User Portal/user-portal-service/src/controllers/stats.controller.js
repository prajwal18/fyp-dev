const asyncWrapper = require("../error/wrapper");
const statsService = require("../services/stats.service");

// Get Head Info
const getHeadInfo = asyncWrapper(async (req, res, next) => {
    const { id, role } = res.locals;
    if (id && role) {
        const { success, data, message } = await statsService.getHeadInfo(id, role);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error('Cannot find the User. Sorry!');
    }

})
// Get Head Info

// Get course stat
const getCourseStat = asyncWrapper(async (req, res, next) => {
    const { id, role } = res.locals;
    if (id && role) {
        const { success, data, message } = await statsService.getCourseStat(id);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error('Cannot find the User. Sorry!');
    }

});
// Get course stat

// Get course stat
const getAssignmentStat = asyncWrapper(async (req, res, next) => {
    const { id, role } = res.locals;
    const { courseIds } = req.query;
    const courses = courseIds.split(',');

    if (id && role && courses.length) {
        const { success, data, message } = await statsService.getAssignmentStat(courses, id, role);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error('Cannot find the User. Sorry!');
    }

});
// Get course stat

// Get course stat
const getTestStat = asyncWrapper(async (req, res, next) => {
    const { id, role } = res.locals;
    const { courseIds } = req.query;
    const courses = courseIds.split(',');

    if (id && role && courses.length) {
        const { success, data, message } = await statsService.getTestStat(courses, id, role);
        if (success) {
            res.json({ success, data, message });
        } else {
            throw new Error(message);
        }
    } else {
        throw new Error('Cannot find the User. Sorry!');
    }

});
// Get course stat


// Get Test Progress Results
const getTestProgress = asyncWrapper(async (req, res, next) => {
    const { courseIds, studentIds, take } = req.query;

    if (courseIds, studentIds) {
        const courses = courseIds.split(',');
        const students = studentIds.split(',');

        if (courses.length && students.length) {
            const { success, data, message, hits } = await statsService.getTestProgress(courses, students, take);
            if (success) {
                res.json({ success, data, message, hits });
            } else {
                throw new Error(message);
            }
        } else {
            throw new Error("Please specify the course and the student.");
        }

    }
    else {
        throw new Error("Please specify the course and the student.");
    }
});
// Get Test Progress Results


// Get Test Progress Results
const getAssignmentProgress = asyncWrapper(async (req, res, next) => {
    const { courseIds, studentIds, take } = req.query;

    if (courseIds, studentIds) {
        const courses = courseIds.split(',');
        const students = studentIds.split(',');

        if (courses.length && students.length) {
            const { success, data, message, hits } = await statsService.getAssignmentProgress(courses, students, take);
            if (success) {
                res.json({ success, data, message, hits });
            } else {
                throw new Error(message);
            }
        } else {
            throw new Error("Please specify the course and the student.");
        }

    }
    else {
        throw new Error("Please specify the course and the student.");
    }
});
// Get Test Progress Results

module.exports = {
    getHeadInfo, getCourseStat, getAssignmentStat,
    getTestStat, getTestProgress, getAssignmentProgress
}