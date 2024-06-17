import prisma from "../DB/DB.config.js";
// get all users 
export const fetchUsers = async (req, res, next) => {
    const users = await prisma.user.findMany({
      select:{
        _count:{
            select:{
                post:true,
                comment:true,
            }
        }
      }

    });
    res.status(200).json({
        status:200,
        message:"users fetched",
        data:users
    })
}
export const createUser = async (req, res, next) =>
    {
        const {name,password,email} = req.body;
        const finduser = await prisma.user.findUnique({
            where:{
                email:email,
            }
        })
        if (!finduser)
            {
                const newuser = await prisma.user.create({
                    data:{
                        name:name,
                        password: password,
                        email:email,
                    }
                })
                res.status(200).json({
                    status:200,
                    message:"user created",
                    data:newuser
                })
            }
        else
        {
            return res.json({status:400,message:"email already taken"})
        }
    }
    // show user 
    export const showUser = async (req, res, next) =>
    {
        const userId = req.params.id;
        const finduser = await prisma.user.findUnique({
            where:{
                id:Number(userId),
            }
        })
        if (finduser)
            {
                return res.json({status:200,message:"user found",data:finduser})
            }
        else
        {
            return res.json({status:400,message:"user not found"})
        }
    }
    // for  update user
    export const updateUser = async (req, res, next) =>
    {
        const userId = req.params.id;
        const {name,password,email} = req.body;
        const finduser = await prisma.user.update({
            where:{
               id :Number(userId),
            },
            data :
            {
                name:name,
                password:password,
                email:email,
            }
        })
        
            return res.json({status:200,message:"email not found"})
        }
    // for delete user
    export const deleteUser = async (req, res, next) =>
        {
            const userId = req.params.id;
            const finduser = await prisma.user.delete({
                where:{
                    id:Number(userId),
                }
            })
            if (finduser)
                {
                    return res.json({status:200,message:"user deleted"})
                }
            else
                {
                    return res.json({status:400,message:"user not found"})
                }
        }
