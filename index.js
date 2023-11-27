const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000; // You can change this port as needed

// Connect to MongoDB
mongoose.connect('mongodb+srv://tanishk:12345678%40@cluster0.rvrvcg4.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a mongoose schema
const TextSchema = new mongoose.Schema({
  text: String,
  context: String, // Add a context field to the schema
});

// Create a mongoose model
const TextModel = mongoose.model('Text', TextSchema);

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// Route to handle POST requests to save text
app.post('/api/saveText', async (req, res) => {
  try {
    const context = req.body.text; // You can customize the context
    const text = JSON.stringify(req.headers);

    const newText = new TextModel({ text, context });

    await newText.save();

    res.status(200).json({ message: 'Request headers saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
