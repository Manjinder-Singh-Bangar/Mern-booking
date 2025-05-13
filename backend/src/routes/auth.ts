import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import express, {Request, Response} from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";

const router = express.Router();

router.post(
    "/login", 
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password is required").isString()
    ],
    async (req: Request, res: Response) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(400).json({message: errors.array()});
            return;
        }

        const {email, password} = req.body;

        try {
            const user = await User.findOne({email: email})

            if(!user){
                res.status(403).json({message: "Invalid credentials"});
                return;
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                res.status(403).json({message: "Invalid credentials"});
                return;
            }

            const token = jwt.sign(
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
            }).status(200).json({message: "User has Logged In", userId: user._id})
            return;
        } catch (error) {
            console.log(error)
            res.status(500).json({message: error});
            return;
        }
    }
)

export default router;