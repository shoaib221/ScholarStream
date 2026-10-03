

import express from "express";
import { authRouter } from "./auth/controller.js";
import { paymentRouter } from "./stripe/controller.js";
import { scholarshipRouter } from "./scholar/controller.js";
import { testRouter } from "./test/controller.js";
export const mainRouter = express.Router();




mainRouter.use("/auth", authRouter);
mainRouter.use("/payment", paymentRouter);
mainRouter.use("/scholarship", scholarshipRouter); // scholarstream
mainRouter.use("/test", testRouter);

mainRouter.use( (req, res) => {
    res.status(404).json({ message: "Welcome to ScholarStream Backend API" });
})



// mainRouter.use( "/chat", chatRouter );




