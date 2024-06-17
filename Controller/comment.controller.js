import prisma from "../DB/DB.config.js";
// get all Posts 
export const fetchComments = async (req, res, next) => {
    const comments = await prisma.comment.findMany({
        include: {
            user: true,
            
           post:
            {
                include:{
                    user:true
                }
            }
        },
    });
    res.status(200).json({
        status:200,
        message:"users fetched",
        data:comments
    })
}
export const createComment = async (req, res, next) =>
    {
        const {user_id,post_id,comment} = req.body;
       
        // Increment Comment Counter 
await prisma.post.update({

    where: {
        id:Number(post_id),
    },
    data :
    {
        comment_count: {
            increment: 1,
        }
    }
})
       
                const newcomment = await prisma.comment.create({
                    data:{
                        user_id: Number(user_id),
                post_id: Number(post_id),
               comment,
                    }
                })
                res.status(200).json({
                    status:200,
                    message:"user created",
                    data: newcomment
                })
            }
       
    
    // show user 
    export const showComment = async (req, res, next) =>
    {
        const commentId = req.params.id;
        const findcomment = await prisma.comment.findUnique({
            where:{
                commentId:Number(commentId),
            }
        })
        if (findcomment)
            {
                return res.json({status:200,message:"user found",data:findcomment})
            }
        else
        {
            return res.json({status:400,message:"user not found"})
        }
    }
    // for  update user
    export const updateComment = async (req, res, next) =>
    {
        const commentId = req.params.id;
        const {user_id,post_id,comment} = req.body;
        const findcomment = await prisma.comment.update({
            where:{
               commentId :Number(commentId),
            },
            data :
            {
                user_id: Number(user_id),
                post_id: Number(post_id),
               comment,
            }
        })
        
            return res.json({status:200,message:"update not done",data:findcomment})
        }
    // for delete user
    export const deleteComment = async (req, res, next) =>
        {
            // Increment Comment Counter 
await prisma.post.update({

    where: {
        id:Number(post_id),
    },
    data :
    {
        comment_count: {
            decrement: 1,
        }
    }
})
            const commentId = req.params.id;
            const findcomment = await prisma.comment.delete({
                where:{
                    id:Number(commentId),
                },
            })
            if (findcomment)
                {
                    return res.json({status:200,message:"user deleted"})
                }
            else
                {
                    return res.json({status:400,message:"user not found"})
                }
        }
