import { Router } from "express";
import { PrismaClient } from "@prisma/client";
export const instrumentRouter = Router();

const prisma = new PrismaClient()

instrumentRouter.post("/", async (req, res) => {
  const newInstru= await prisma.instrument.create({
    data: {
      name: req.body.name,
      poids : req.body.poids,
      prix :  req.body.prix,
      couleur : req.body.couleur
    }
})
res.status(201).json(newInstru);
})


instrumentRouter.get("/:id", async (req, res) => {
  const LaClasse = await prisma.instrument.findUnique({
    where : {
      id: parseInt(req.params.id)
    }
  })
  if (!LaClasse) {
    return res.status(404).json({ error: "instrument non trouvé" });
  }
  res.json(LaClasse);
})

instrumentRouter.put("/:id", async (req, res) => {
    await prisma.instrument.update({
      where : {
        id: parseInt(req.params.id)
      },
      data : {
        name: req.body.name,
        poids : req.body.poids,
        prix :  req.body.prix,
        couleur : req.body.couleur
      }
    }) 
    res.json({message: "modification OK"})
  })

instrumentRouter.delete("/:id", async (req, res) => {
  await prisma.instrument.delete({
  where : {
    id: parseInt(req.params.id)}
  })
  res.json({message: "suppression OK"})
})
