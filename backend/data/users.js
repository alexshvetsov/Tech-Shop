import bcrypt from 'bcryptjs'

const users=[
    {
        name:'Admin User',
        email:'admin@gmail.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Johonie doe',
        email:'jon@gmail.com',
        password:bcrypt.hashSync('123456',10),
    },
    {
        name:'joanna hiatoma',
        email:'himatoma@gmail.com',
        password:bcrypt.hashSync('123456',10),
    },


]

export default users