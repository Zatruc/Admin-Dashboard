require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/', (req, res) => res.send('API working'));
app.post('/login', (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on http://loc alhost:${PORT}`);
});
