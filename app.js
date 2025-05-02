// app.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// ✅ Schema for UserProfile
const profileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const UserProfile = mongoose.model('UsersData', profileSchema, 'User Data');

// ✅ Hardcoded MongoDB Atlas URI
const uri = "mongodb+srv://user:user@cluster0.fmruwip.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// ✅ Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ Connection error", err));

// ✅ POST API Route to add a user profile
app.post('/UsersData', async (req, res) => {
  console.log('Received request with body:', req.body);  // Log request body
  try {
    const profile = new UserProfile(req.body);
    await profile.save();
    res.status(201).send({ message: '✅ Profile saved to MongoDB' });
  } catch (error) {
    console.error("❌ Error saving profile:", error);
    res.status(500).send({ error: '❌ Failed to save profile' });
  }
});


app.get ('/UsersData', async (req, res) => {
	const profile = await UserProfile.find();
	res.status(200).send(profile);
}

);

// ✅ Start the server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
