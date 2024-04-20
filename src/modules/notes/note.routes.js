import Router from "express";

const router = Router();
import * as noteController from './controller/note.controller.js'

router.post('/addNote',noteController.addNote)
router.put('/updateNote/:id',noteController.updateNote)
router.delete('/deleteNote/:id',noteController.deleteNote)
router.get('/getNotes',noteController.getNotes)
router.get('/getNotes_info',noteController.getNoteswith_Userinfo)

export default router;