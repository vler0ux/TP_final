import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { Param } from "@prisma/client/runtime/library";
export const userRouter = Router();
import bcrypt, { hash } from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient()


userRouter.post('/', async (req, res) => {
  const { pseudp, motdpasse } = req.body;
  const UserMail = await prisma.user.findFirst({
    where : {
      pseudo: req.body.pseudo
    }
  })
  if (UserMail) { 
    res.status(400).json("identification impossible")
  }
  else {
    const saltRounds= parseInt(process.env.SALT_ROUNDS!);
    const hashedPassword = await bcrypt.hash(motdpasse,saltRounds)
    
      const newUser = await prisma.user.create({
      data: {
        pseudo: req.body.pseudo,
        motdpasse: hashedPassword,
      },
    })
    res.json({message: "enregisrement OK"});
  }
});



userRouter.post("/local", async (req, res) => {
  const { pseudo, motdpasse } = req.body;
  const UserMail = await prisma.user.findFirst({
    where : {
      pseudo: req.body.pseudo
    }
  })
  if (!UserMail) {
      res.status(400).json("Email or Password is incorrect");
  }
  else {
      const isPasswordCorrect = await bcrypt.compare(motdpasse, UserMail.motdpasse);
      if (isPasswordCorrect) {
          const token = jwt.sign(UserMail, process.env.JWT_SECRET!);
          res.json({
            message: "Connexion réussie",
            token
          });
      }
      else {
          res.status(400).json("Email or Password is incorrect");
      }
  }
})

userRouter.get("/:id", async (req, res) => {
  const myUser = await prisma.user.findUnique({
    where : {
      id: parseInt(req.params.id)
    }
  })
  if (!myUser) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }
  res.json(myUser);
})


userRouter.put("/:id", async (req, res) => {
    await prisma.user.update({ 
      where: {
        id : parseInt(req.params.id)
        },
        data :{
          pseudo: req.body.pseudo,
          motdpasse : req.body.motdpasse
        }
    }) 
    res.json({message: "modification OK"})
  })

userRouter.delete("/:id", async (req, res) => {
    await prisma.user.delete({
    where : {
      id :parseInt( req.params.id)
    },
  })
  res.json({message: "suppression OK"})
})
