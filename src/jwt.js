
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

process.env.SECRET_KEY = 'secret'

module.exports = {
    async login(nome, id, email, nivel) {
        
        if(id != null && email != null){
              const payload = {
                nome: nome,
                userId: id,
                email: email,
                nivel: nivel
              }

              let token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: '2h'
              })
             return token;
            } else {
              // Passwords don't match
              res.json({ error: 'Token invalido' })
            }
        }
    }

    