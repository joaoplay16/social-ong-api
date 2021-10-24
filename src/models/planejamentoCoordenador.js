

const mongoose = require("mongoose");
const mongoPaginate = require("mongoose-paginate");

//documento do banco
const PlanejamentoCoordenador = new mongoose.Schema({
       
            usuario: {
                type: String,
           },
            miniProjeto: {
                type: String,
            },
            objetivoGeral:{
                type: String,
            },
            objetivoEspecifico:{
                type: String,
            },
            metodologia:{
                type: String,
            },
            observacao:{
                type: String,
            },
            dataObjetivoGeral:{
                type:Date,
            },
            dataPlanejamento:{
                type: Date,
            }
});

PlanejamentoCoordenador.plugin(mongoPaginate)



mongoose.model('PlanejamentoCoordenador', PlanejamentoCoordenador);