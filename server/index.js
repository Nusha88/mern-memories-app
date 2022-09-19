import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from "mongoose";
import postRouts from "./routes/posts.js";
import userRouts from"./routes/user.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: '30mb', extended: true}));

app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

app.use('/posts', postRouts);
app.use('/user', userRouts);

app.get('/', (req, res) => {
  res.send('APP is running');
})

// ... other app.use middleware
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`)));

