import { Router } from "express";
import { auth } from "../middleware/auth";
import prisma from "../config/db";
import { AuthRequest } from "../middleware/auth";

const router = Router();

// Get all clients
router.get("/", auth, async (req: AuthRequest, res) => {
  try {
    const clients = await prisma.client.findMany({
      where: { userId: req.user.userId },
    });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create new client
router.post("/", auth, async (req: AuthRequest, res) => {
  try {
    const { name, email, phone, company } = req.body;
    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone,
        company,
        userId: req.user.userId,
      },
    });
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
