

const mongoose = require("mongoose");
const mogoPaginate = require("mongoose-paginate");

//documento do banco
const Planejamento = new mongoose.Schema({
       
            rotina: {
                type: String,
            },
            atividade:{
                type: String,
            },
            aceitacao:{
                type: String,
            },
            observacao:{
                type: String,
            },
            dataAtividade:{
                type:Date,
            },
            dataPlanejamento:{
                type: Date,
            }
});

Planejamento.plugin(mogoPaginate)



mongoose.model('Planejamento', Planejamento);