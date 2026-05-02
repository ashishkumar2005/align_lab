import express from "express";
import cors from "cors";

const app = express();

// ✅ FIXED CORS (with OPTIONS support)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 🔥 IMPORTANT: handle preflight requests
app.options("*", cors());

app.use(express.json());

// Test routes
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

// ✅ LOGIN ROUTE
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;

  if (
    (username === "admin" && password === "admin123") ||
    (username === "annotator" && password === "annotator123")
  ) {
    return res.json({
      token: "dummy-token",
      user: { username },
    });
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
