import express from "express";
import path from "path";
import fs from "fs";

const rootPath = process.cwd();
const staticPath = path.join(rootPath, "../public");

const router = express.Router();

router.use(express.static(staticPath));

const indexFile = path.join(staticPath, "index.html");

router.get("*", (req, res) => {
  const filePath = path.join(staticPath, req.url);

  if (fs.existsSync(filePath)) {
    return res.sendFile(filePath);
  }

  const ext = path.extname(filePath);

  if (ext) {
    return res.status(404).end();
  }

  res.sendFile(indexFile);
});

export default router;
