import prisma from "../DB/DB.config.js";
// get all Posts 
export const fetchPosts = async (req, res, next) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    if (page <= 0) {
      page = 1;
    }
    if (limit <= 0 || limit > 100) {
      limit = 10;
    }
    const skip = (page - 1) * limit;
    const posts = await prisma.post.findMany({
        skip:skip,
        take:limit,
        include:
        {
            comment:{
                include:{
                    user:{
                        select:{
                            name:true,
                            email:true,
                        }
                    }
                }
            }
        },orderBy:{
            id:"desc",
            
        },
        where:
        {
            comment_count:{
                gt:1,
            }
        }
        
    });
    //   * to get the total posts count
  const totalPosts = await prisma.post.count();
  const totalPages = Math.ceil(totalPosts / limit);
  return res.json({
    status: 200,
    data: posts,
    meta: {
      totalPages,
      currentPage: page,
      limit: limit,
    },
  });

    
}
  

export const createPost = async (req, res, next) =>
    {
        const {user_id,title,description} = req.body;
       
       
                const newpost = await prisma.post.create({
                    data:{
                       user_id :Number(user_id),
                       title,
                       description,
                    }
                })
                res.status(200).json({
                    status:200,
                    message:"user created",
                    data:newpost
                })
            }
       
    
    // show user 
    export const showPost = async (req, res, next) =>
    {
        const postId = req.params.id;
        const findpost = await prisma.post.findUnique({
            where:{
                postId:Number(postId),
            }
        })
        if (findpost)
            {
                return res.json({status:200,message:"user found",data:findpost})
            }
        else
        {
            return res.json({status:400,message:"user not found"})
        }
    }
    // for  update user
    export const updatePost = async (req, res, next) =>
    {
        const postId = req.params.id;
        const {user_id,title,description} = req.body;
        const findpost = await prisma.post.update({
            where:{
               postId :Number(postId),
            },
            data :
            {
                user_id: Number(user_id),
               title,
               description,
            }
        })
        
            return res.json({status:200,message:"update not done"})
        }
    // for delete user
    export const deletePost = async (req, res, next) =>
        {
            const postId = req.params.id;
            const findpost = await prisma.post.delete({
                where:{
                    id:Number(postId),
                }
            })
            if (findpost)
                {
                    return res.json({status:200,message:"user deleted"})
                }
            else
                {
                    return res.json({status:400,message:"user not found"})
                }
        }
// * To Seach the post
export const searchPost = async (req, res) => {
    const query = req.query.q;
    const posts = await prisma.post.findMany({
      where: {
        description: {
          search: query,
        },
      },
    });
  
    return res.json({ status: 200, data: posts });
  };