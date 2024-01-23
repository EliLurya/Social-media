import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../../../models/userSchema";
const bcrypt = require("bcrypt");
const admin = require("firebase-admin");
const router: Router = express.Router();


router.get("/refresh-firebase-token", async (req: Request, res: Response) => {
  const jwtToken = req.cookies.token; // Retrieve the JWT token from the cookie

  if (!jwtToken) {
    return res
      .status(401)
      .json({ success: false, message: "JWT Token is missing" });
  }

  try {
     jwt.verify(jwtToken, process.env.YOUR_SECRET_KEY, async (err: any, decodedToken: { userId: any; }) => {
    if (err) {
      // Handle the error if the token is invalid or expired
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }

    // Check if the user from the token exists in the database
    const user = await UserModel.findById(decodedToken.userId);
    if (!user) {
      // User does not exist or might have been deleted
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const firebaseToken = await admin
      .auth()
      .createCustomToken(user._id.toString());
    return res.json({ success: true, firebaseToken });
  })}
  catch (error) {
    console.error("Error refreshing Firebase token:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
