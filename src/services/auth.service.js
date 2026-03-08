import pool from "../db/db.js";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/errors.js";
import jwt from "jsonwebtoken";

export const signupService = async (userData) => {
  const { first_name, last_name, email, password, username, phone_no } =
    userData;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (result.rows.length > 0) {
      throw new AppError("Email already exists", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      `INSERT INTO users(first_name, last_name, email, password, username, phone_no) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, first_name, last_name, email, phone_no, username, created_at`,
      [first_name, last_name, email, hashedPassword, username, phone_no],
    );
    return newUser.rows[0];
  } catch (error) {
    throw error;
  }
};

export const loginService = async (loginData) => {
  const { email, password: userPassword } = loginData;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [
      email,
    ]);
    if (result.rows.length === 0) {
      throw new AppError("Email does not exist", 401);
    }
    const isMatch = await bcrypt.compare(userPassword, result.rows[0].password);
    if (!isMatch) {
      throw new AppError("Invalid email or password", 401);
    }
    const token = jwt.sign(
      { id: result.rows[0].id, email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }, 
    );
    const { password, otp, otp_expires_at, ...userWithoutPassword } = result.rows[0];
    return { ...userWithoutPassword, token };
  } catch (error) {
    throw error;
  }
};
