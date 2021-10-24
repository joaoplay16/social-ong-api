const mongoose = require('mongoose');
const User = mongoose.model('User');
const PlanejamentoCoordenador = mongoose.model('PlanejamentoCoordenador');

module.exports={
    //metodo salvar
    async insert (req, res){
        const planejamento = await PlanejamentoCoordenador.create(req.body);
        return res.json(planejamento);
    },
    //metodo listar
    async index(req, res){
        const{page} = req.query;
        const planejamento = await PlanejamentoCoordenador.paginate({}, {page, limit: 500});
        return res.json(planejamento);
    },

    //metodo de detalhes
    async index2(req, res){
        const planejamento = await PlanejamentoCoordenador.find({usuario: req.params.usuario});
        return res.json(planejamento);
    },

    //metodo de detalhes
    async detalhes(req, res){
        const planejamento = await PlanejamentoCoordenador.findById(req.params.id);
        return res.json(planejamento);
    },
    //metodo de Atualizar
    async atualizar(req, res){
        const planejamento = await PlanejamentoCoordenador.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(planejamento);
    },
    //metodo atualizar
    async delete(req, res){
        await PlanejamentoCoordenador.findByIdAndRemove(req.params.id);
        return res.send();
    },
}