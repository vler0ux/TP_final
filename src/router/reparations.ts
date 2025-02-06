import { Router } from "express";
import { PrismaClient } from "@prisma/client";
export const reparationRouter = Router();

const prisma = new PrismaClient()

reparationRouter.post("/", async (req, res) => {
  const newRepa= await prisma.reparation.create({
    data: {
      name: req.body.name,
      prix : req.body.prix
    }
})
res.status(201).json(newRepa);
})

reparationRouter.delete("/:id", async (req, res) => {
  await prisma.reparation.delete({
  where : {
    id: parseInt(req.params.id)}
  })
  res.json({message: "suppression OK"})
})
