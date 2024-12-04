import { Router } from "express";
import { auth } from "../middleware/auth";
import prisma from "../config/db";
import { AuthRequest } from "../middleware/auth";

const router = Router();

router.get("/profile", auth, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
