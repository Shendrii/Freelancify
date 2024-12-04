import { Router } from "express";
import { auth } from "../middleware/auth";
import prisma from "../config/db";
import { AuthRequest } from "../middleware/auth";

const router = Router();

// Get all projects for logged-in user
router.get("/", auth, async (req: AuthRequest, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user.userId },
      include: { client: true },
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create new project
router.post("/", auth, async (req: AuthRequest, res) => {
  try {
    const { title, description, clientId, budget, endDate } = req.body;
    const project = await prisma.project.create({
      data: {
        title,
        description,
        budget: budget ? parseFloat(budget) : null,
        endDate: endDate ? new Date(endDate) : null,
        userId: req.user.userId,
        clientId,
      },
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
