const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());
// User data
let users = [];
// User Registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const newUser = {
    id: Date.now(),
    username,
    password
  };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully.' });
});
// User Login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.status(200).json({ message: 'Login successful.' });
  } else {
    res.status(401).json({ message: 'Invalid credentials.' });
  }
});
// Profile Management (View)
app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === Number(id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found.' });
  }
});
// Profile Management (Edit)
app.patch('/profile/:id', (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  let user = users.find(u => u.id === Number(id));
  if (user) {
    user.username = username || user.username;
    user.password = password || user.password;
    res.status(200).json({ message: 'Profile updated successfully.' });
  } else {
    res.status(404).json({ message: 'User not found.' });
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});