const express = require('express');
const User = require('../Model/Book');
const router = express.Router();

//POST or CREATE method
router.post('/book', async (req, res) => {
  const { id, title, author, ISBN, quantity } = req.body;

  const data = {
    id: id,
    title: title,
    author: author,
    ISBN: ISBN,
    quantity: quantity,
  };

  try {
    const check = await User.findOne({ $or: [{ id: id }, { title: title }] });
    if (check) {
      if (existingBook.id === id) {
        res.status(400).json({ message: 'ID already exists' });
      } else if (existingBook.title === title) {
        res.status(400).json({ message: 'Title already exists' });
      }
    } else {
      await User.insertMany([data]);
      res.status(200).json({ message: 'Successfully saved data' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to save data', error: error.message });
  }
});

//GET all books
router.get('/books', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Cannot get the users', error: error.message });
  }
});

//GET method by id
router.get('/book/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ id: id });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(500).json({ message: 'User not found', error: error.message });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error while fetching the data', error: error.message });
  }
});

//PUT or Update method by id
router.put('/book/update/:id', async (req, res) => {
  const id = req.params.id;
  const { title, author, ISBN, quantity } = req.body;

  const newData = {
    id: id,
    title: title,
    author: author,
    ISBN: ISBN,
    quantity: quantity,
  };
  try {
    const user = await User.findOneAndUpdate({ id: id }, { $set: newData });
    if (user) {
      res.status(200).json({ message: 'User modified successfully' });
    } else {
      res.status(500).json({ message: 'User not found', error: error.message });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error while fetching the data', error: error.message });
  }
});

// DELETE by ID

router.delete('/book/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await User.findOneAndDelete({ id: id });
    res.status(200).json({ message: 'Successfully deleted the data' });
  } catch (error) {
    res.status(500).json({ message: 'User not found', error: error.message });
  }
});

// DELETE all data

router.delete('/book/delete/', async (req, res) => {
  try {
    await User.deleteMany();
    res.status(200).json({ message: 'Successfully all the data' });
  } catch (error) {
    res.status(500).json({ message: 'User not found', error: error.message });
  }
});

module.exports = router;
