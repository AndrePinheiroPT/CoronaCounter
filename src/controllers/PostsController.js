const posts = require('../../models/posts')

class PostsController{
    async postList(req, res){
        const postsList = await posts.findAll({ raw: true })

        return res.status(200).json(postsList)
    }

    async postCreate(req, res){
        try{
            const { title, description } = req.body
            const hospitalAuthor = req.user.name

            const errors = {}
            if(errors.length == 0){
                const post = await post.create({ title, description, hospitalAuthor })
                
                return res.status(200).json(post)
            }else{
                return res.status(200).json(erros)
            }
        }catch(err){
            console.log(err)
            return res.status(500).send(err)
        }
    }

    async postRemove(req, res){
        try{
            const { id } = req.params
            const hospitalAuthor = req.user.name

            const post = await posts.findOne({ where: { id: id }, raw: true })

            if (post.author != hospitalAuthor) return res.status(200).send('You are not author of this post')

            const postDeleted = await posts.destroy({ where: { id: id }})
            return res.status(200).json(postDeleted)
            
        }catch(err){
            console.log(err)
            return res.status(200).send(err)
        }
    }
}

module.exports = PostsController