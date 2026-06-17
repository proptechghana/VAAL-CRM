import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.get("/api/leads", async (req, res) => {
    try {
      const fetchRes = await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=AUkAhnT4yxiAJSNALWCSrobRnVunP2XNcAnEzLRbwfU3r3gX_ZiGLoR2RfptVDLtWtSx9QWLwy8gwpdy8PS_eOksfk7AT4znqj8FklOIG8Dn0BJ2kgbTXw6cngUJrUNf-Szl4K_bKbuwsoSW1n_EEiMcq5hMu1NIvhxcFKv5dHq1gzCX3F6Xk0YVLr8qwLiRxVTbF2gg0YUYSBn5_HV6CqGnieRvl5VloeofikhICgFT2l1z_1saiCQGDV_0i8hRIVucQtcKqfrwcRDUiy5x5KljxkhA82cVfA&lib=MoWq_hOq9sHK5EytQwLFlVmZXvhknfx_y");
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
