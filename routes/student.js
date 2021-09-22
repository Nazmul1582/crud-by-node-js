const express = require('express');
const router = express.Router();
const {getAll, 
    getById,
    register,
    login,
    update,
    temporeryDelete,
    restore,
    deleteStudent,
    updatePassword,
    filterByClass,
    filterByAge
} = require('../controller/student');
const isAuth = require('../middleware')

router.get('/student/:id([0-9]{4})', getById);
router.get('/all-student', isAuth, getAll);
router.post("/student/register", register);
router.post("/student/login", login);
router.put("/student/update/:id", update);
router.put("/student/temp-delete/:id", temporeryDelete);
router.put("/student/restore/:id", restore);
router.delete("/student/delete/:id", deleteStudent);
router.put("/student/update-password/:id", updatePassword);
router.get("/student/filter-by-class", filterByClass)
router.get("/student/filter-by-age", filterByAge)

module.exports = router;

