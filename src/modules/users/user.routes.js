
import  Router  from 'express';
const router = Router() 
import * as userController from './controller/user.controller.js'

router.post('/signUp',userController.signUp);

router.post('/signIn',userController.signIn)

router.put('/updateUser/:id',userController.updateUser)

router.delete('/deleteUser/:id',userController.deleteUser)

router.get('/getUsers',userController.getUsers)

router.get('/searchUsers',userController.searchUsers)

router.get('/searchUsers_age',userController.searchUsersbyAge)

router.get('/searchUsers_id',userController.searchUsersbyId)

router.get('/getTheoldestUser',userController.getTheoldestUser)


export default router