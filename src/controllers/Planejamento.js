const mongoose = require('mongoose');
const User = mongoose.model('User');
const Planejamento = mongoose.model('Planejamento');

module.exports={
    //metodo salvar
    async insert (req, res){
        const planejamento = await Planejamento.create(req.body);
        return res.json(planejamento);
    },
    //metodo listar
    async index(req, res){
        const{page} = req.query;
        const planejamento = await Planejamento.paginate({}, {page, limit: 500});
        return res.json(planejamento);
    },

        //metodo de detalhes
        async index2(req, res){
            const planejamento = await Planejamento.find({usuario: req.params.usuario});
            return res.json(planejamento);
        },

    //metodo de detalhes
    async detalhes(req, res){
        const planejamento = await Planejamento.findById(req.params.id);
        return res.json(planejamento);
    },
    //metodo de Atualizar
    async atualizar(req, res){
        const planejamento = await Planejamento.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(planejamento);
    },
    //metodo atualizar
    async delete(req, res){
        await Planejamento.findByIdAndRemove(req.params.id);
        return res.send();
    },
}