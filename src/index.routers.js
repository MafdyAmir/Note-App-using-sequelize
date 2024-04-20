import userRouter from './modules/users/user.routes.js '
import noteRouter from './modules/notes/note.routes.js'
import {connection} from "../DB/connection.js";

export const bootstrap = (app,express) =>{
  app.use(express.json())
  app.use('/user',userRouter) //This is name supRoutes
  app.use('/note',noteRouter)
  app.use('*',(req,res,next)=>{
    res.json({message:`invalid routing!`})
  })
}

connection()  