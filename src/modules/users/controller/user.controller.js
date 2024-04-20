import { where } from "sequelize";
import userSchema from "../../../../DB/models/users.model.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//******* singUP *******
export const signUp = async (req, res, next) => {
  const { name, email, password, age } = req.body;
  const user = await userSchema.findOne({ where: { email } });
  if (user) {
    return res.json({ message: "invalid email or password!" });
  }
  const saltRoundes = 8;
  const hashPassword = bcrypt.hashSync(password, saltRoundes);
  const newUser = await userSchema.create({
    name,
    email,
    password: hashPassword,
    age,
  });
  return res.json({ message: "Done", newUser });
};
//****** signIn ********
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email using Sequelize model
    const user = await userSchema.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);

    // Compare hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate token
    const secretKey = "testToken";
    const userToken = jwt.sign({ id: user.id, email: user.email }, secretKey);

    // Assuming you want to update user data 
    await userSchema.update(
      { isOnline: true },
      { where: { email } }
    );

    return res
      .status(200)
      .json({ message: "Logged in successfully", token: userToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//********** updateUser **********
export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password, age } = req.body;
  const user = await userSchema.update(
    { name, email, password, age },
    { where: { id } }
  );
  if (user[0]) return res.json({ message: "Done", user });
  return res.json({ message: "invalid id!" });
};
//*********** deleteUser ***********
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await userSchema.destroy({ where: { id } });
  if (user) return res.json({ message: "Done", user });
  return res.json({ message: "invalid id!" });
};
// ******** search for user by his name and age ********
export const searchUsers = async (req, res, next) => {
  const { letter, age } = req.query;
  const users = await userSchema.findAll({
    where: { name: { [Op.like]: `${letter}%` }, age: { [Op.lt]: `${age}` } },
  });
  res.json({ message: "Done", users });
};
//****** search for users by range of ages *******
export const searchUsersbyAge = async (req, res, next) => {
  const { age1, age2 } = req.query;
  const users = await userSchema.findAll({
    where: { age: { [Op.between]: [age1, age2] } },
  });
  res.json({ message: "Done", users });
};
//******** search for users by list of ids **********
export const searchUsersbyId = async (req, res, next) => {
  const { id } = req.query;
  const users = await userSchema.findAll({ where: { id: { [Op.in]: id } } });
  res.json({ message: "Done", users });
};
//*********** get the oldests users ********
export const getTheoldestUser = async (req, res, next) => {
  const users = await userSchema.findAll({
    order: [["age", "DESC"]],
    limit: 3,
  });
  res.json({ message: "Done", users });
};
//********* get all users *********
export const getUsers = async (req, res, next) => {
  const users = await userSchema.findAll();
  res.json({ message: "Done", users });
};
