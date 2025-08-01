const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:11434';

if (!OLLAMA_BASE_URL) {
  console.error("❌ VITE_API_BASE_URL is not set!");
  process.exit(1);
}

console.log(" Using Ollama base URL:", OLLAMA_BASE_URL);

app.get('/api/tags', async (req, res) => {
  try {
    const response = await axios.get(`${OLLAMA_BASE_URL}/api/tags`, {
      headers: {
        'User-Agent': 'curl', 
      },
    });
    res.json(response.data);
  } catch (err) {
    console.error("❌ Error fetching tags from Ollama:", err.response?.status, err.response?.data || err.message);
    res.status(500).json({
      error: 'Failed to fetch tags from Ollama',
      detail: err.response?.data || err.message,
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(` Proxy server running on port ${PORT}`);
});
