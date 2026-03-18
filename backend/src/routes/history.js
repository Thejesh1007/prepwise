const express = require("express");
const prisma = require("../lib/prisma");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// GET /api/history — fetch all history for logged in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const contents = await prisma.generatedContent.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        mode: true,
        topic: true,
        subject: true,
        options: true,
        createdAt: true,
      },
    });

    return res.status(200).json({ history: contents });
  } catch (err) {
    console.error("History fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch history" });
  }
});

// GET /api/history/:id — fetch single content item with full output
router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const content = await prisma.generatedContent.findUnique({
      where: { id },
    });

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    if (content.userId !== req.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    return res.status(200).json({ content });
  } catch (err) {
    console.error("History single fetch error:", err);
    return res.status(500).json({ error: "Failed to fetch content" });
  }
});

// DELETE /api/history/:id — delete a single content item
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const content = await prisma.generatedContent.findUnique({
      where: { id },
    });

    if (!content) {
      return res.status(404).json({ error: "Content not found" });
    }

    if (content.userId !== req.userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    await prisma.generatedContent.delete({ where: { id } });

    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("History delete error:", err);
    return res.status(500).json({ error: "Failed to delete content" });
  }
});

// DELETE /api/history — delete all history for logged in user
router.delete("/", authMiddleware, async (req, res) => {
  try {
    await prisma.generatedContent.deleteMany({
      where: { userId: req.userId },
    });

    return res.status(200).json({ message: "All history cleared" });
  } catch (err) {
    console.error("History clear error:", err);
    return res.status(500).json({ error: "Failed to clear history" });
  }
});

module.exports = router;