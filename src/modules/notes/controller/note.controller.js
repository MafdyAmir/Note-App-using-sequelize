import { json } from "sequelize";
import noteSchema from "../../../../DB/models/notes.model.js";
import userSchema from "../../../../DB/models/users.model.js";
import Op from "sequelize";
//******* addNote *******
export const addNote = async (req, res, next) => {
  const { title, content, userId } = req.body;
  const user = await userSchema.findByPk(userId);
  if (!user) return res.json({ message: "invalid user id!" });
  const notes = await noteSchema.create(req.body);
  return res.json({ message: "Added Done...", notes });
};
//****** updateNote ******
export const updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { userId, title, content } = req.body;
  const note = await noteSchema.update(
    { title, content },
    { where: { id, userId } }
  );
  if (note[0]) return res.json({ message: "Done", note });
  return res.json({ message: "invalid note or user id!" });
};
//****** deleteNote ********
export const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;
  const note = await noteSchema.destroy({ where: { id, userId } });
  if (note) return res.json({ message: "Done", note });
  return res.json({ message: "invalid id!" });
};
//******** get all Note ********
export const getNotes = async (req, res, next) => {
  const notes = await noteSchema.findAll();
  res.json({ message: "Done", notes });
};
//********* get all notes with their owners informaion **********
export const getNoteswith_Userinfo = async (req, res, next) => {
  const notes = await noteSchema.findAll({
    include: {
      model: userSchema,
      attributes: ["name", "email"],
    },
  });
  res.json({ message: "Done", notes });
};
