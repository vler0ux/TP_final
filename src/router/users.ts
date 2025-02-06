import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { Param } from "@prisma/client/runtime/library";
export const userRouter = Router();

const prisma = new PrismaClient()

userRouter.post('/', async (req, res) => {
  const MyUser = await prisma.user.create({
    data: {
    loginMail: req.body.loginMail,
    passeword : req.body.passeword
    }
  })
  res.status(201).json(MyUser);
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
          loginMail: req.body.loginMail,
          passeword : req.body.passeword
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
