const mongoose = require('mongoose');
const Frequencia = mongoose.model('Frequencia');

module.exports = {
  //metodo salvar
  async insert (req, res) {
    let result = req.body.filter( async (f) => {
      //verificar se a frequencia com data, aluno e turma passados existe
      let r = await Frequencia.findOne(
        {
          data: f.data,
          turma: f.turma,
          aluno: f.aluno
        })
        //se não existir cria uma nova
        if (r === null) {
          await Frequencia.create(f);
          return true
        }
        return r !== null
      })
      
      console.log(result);
      
      return res.sendStatus(200)
    },
    //metodo listar nome da turma e data
    async index (req, res) {
      const { page } = req.query
      const frequencia = await Frequencia.aggregate([
        {
          $group: {
            _id: "$turma",
            data: {"$first": "$data"},
          },
          
        },
        
        {
          $lookup: {
            from: "turmas",
            localField: "_id",
            foreignField: "_id",
            as: "turma"
          }
      },
        {$unwind: "$turma"},
        
      ])
      
      console.log(frequencia);
      
      return res.json(frequencia);
    },
    //metodo de detalhes
    async detalhes (req, res) {
      console.log("PARAMS", req.params.data.replace(/[-]+/g,"/"))
      const frequencia = await Frequencia.paginate(
        {
          data: req.params.data.replace(/[-]+/g,"/"),
          turma: req.params.turma
        }, {
          populate: [
            {path: 'aluno', select: '_id nome'},
            {path: 'turma', select: '_id nome'}
          ]
        })
        
        return res.json(frequencia);
      },
      //metodo de Atualizar
      async atualizar (req, res) {
        var frequencia = req.body.filter(async (f) => {
          let obj = await Frequencia.findByIdAndUpdate(f._id, f);
          return obj != null
        })
        console.log(frequencia);
        return res.json(frequencia);
      },
      //metodo atualizar
      async delete (req, res) {
        await Frequencia.findByIdAndRemove(req.params.id);
        return res.send();
      },
      
      async find (req, res) {
        await Frequencia.findOne({ data: req.params })
      }
    }