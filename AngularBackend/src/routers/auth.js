import { StatusCodes } from 'http-status-codes';
import { loginDto, signupDto, validator } from "../dto/index.js";
import { authService } from "../service/index.js";
import bcrypt from 'bcryptjs';
import { UserModel } from '../model/index.js';
import { Router } from 'express';
const router = Router();

router.post("/signup", validator(signupDto), async (req, res) => {
    const { username, email, password } = req.bodyhow
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, username, password: hashedPassword });
    res.status(StatusCodes.OK).json({ message: "User created successfully", "token": await authService.signToken({ user_id: user._id, username, email }) });
});

router.post("/login", validator(loginDto), async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || !bcrypt.compare(password, user.password)) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Invalid credentials" });
    }
    res.json({ message: "User logged in successfully", "token": await authService.signToken({ user_id: user._id, username: user.username, email }) });
});

export { router as authRouter };