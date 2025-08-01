const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:11434';

app.get('/api/tags', async (req, res) => {
  try {
    const response = await axios.get(`${OLLAMA_BASE_URL}/api/tags`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tags from Ollama' });
  }
});

app.post('/api/generate', async (req, res) => {
  try {
    const response = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, req.body);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate from Ollama', detail: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
