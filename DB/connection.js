
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    database:'note app',
    username:'root',
    password:'',
    dialect:'mysql',
    host:'localhost'   
})

export const connection = async () =>{
    return await sequelize.sync({alter:false}).then(() =>{
        console.log('DB connection succeeded....')
    })
    .catch(() => {
        console.log('fail to connection!')
    });

}
