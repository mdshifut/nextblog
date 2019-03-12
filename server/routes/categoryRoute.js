const express = require('express');
const router = express.Router();

// const authenticateUser = require('../middlewares/authentication');

const {
  createCategory,
  getAllCategory,
  editCategory,
  deleteCategory
} = require('../controllers/categoryController');

router.post('/newcategory', createCategory);
router.patch('/edit', editCategory);
router.delete('/delete/:replyId', deleteCategory);
router.get('/getallcategory', getAllCategory);

module.exports = router;
