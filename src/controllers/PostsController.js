const posts = require('../../models/posts')
const { checkDocs } = require('../helpers/checkers')

class PostsController{
    async postList(req, res){
        const postsList = await posts.findAll({ raw: true })

        return res.status(200).json(postsList)
    }

    async peopleCreate(req, res){
        try{
            const { title, description } = req.body

            if(errors.length == 0){
                
            }else{
                return res.status(200).json(erros)
            }
        }catch(err){
            console.log(err)
            return res.status(500).send(err)
        }
    }
}

module.exports = PostsController