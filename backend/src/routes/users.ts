import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

router.post("/register",[
  check("firstName", "First name is required").isString(),
  check("lastName", "Last name is required").isString(),
  check("password", "Password should be at least 6 character long").isLength({min: 6}),
  check("email", "Email is required").isEmail()
], async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.status(400).json({message: errors.array()})
    return
  }
  try {
    let user = await User.findOne({
      email: req.body.email,
    });

    console.log(req.body);
    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    
    user = new User(req.body);
    await user.save()
    
    const token:string = jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_SECRET_KEY as string, 
      {
         expiresIn: "1d"
      }
    )

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    }).status(200).json({ message: "User registered OK" });
    return;

  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
    return;
  }
});


export default router