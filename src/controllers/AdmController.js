class AdmController{
    async AdmList(req, res){
        const admList = await adms.findAll({raw: true})

        res.status(200).json(admList)
    }
}

module.exports = AdmController