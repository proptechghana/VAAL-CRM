import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.get("/api/leads", async (req, res) => {
    try {
      const fetchRes = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnTSF9hA58hN-n4py6-1d5NoNAsTmBbtKqf3NnyH9Rv0rf5f338i99Kj1vSjzFELjcUJP0hEg5228mf-Yxl-iAHq3_Ul0_alTuvJb4EzQENAxenGjYSJyqGu4gSmJ_AybjLzAr1KTYpI31eLrpZAj5cq4bKD2Fx6YSkooYTWD9AROOx_WA1SaQKoWjL4nvZmFeRfzV24D5D5dTYEeJFwg_vIno4hjFSvaRF-Zah3KNGuwthMrih-gjo2IPYrx4bsr9JvZExXVY5Hzeswr2_VOEzfs_Vn7Q&lib=M_f8uKnVMGWa9e8wad5DzK-jFj4EQ-TUW");
      const data = await fetchRes.json();
      res.json(data);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
