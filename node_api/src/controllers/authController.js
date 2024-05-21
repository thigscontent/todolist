const userSchema = require('../models/User.js')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken');
require ('dotenv').config()

const SECRET = process.env.SECRET;

exports.login = async function(req, res) {
    try {
        const user = await userSchema.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({
                statusCode: 401,
                message: "Usuário não encontrado!",
                data: {
                    email: req.body.email
                }
            });
        }

        const validacaoPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!validacaoPassword) {
            return res.status(401).json({
                statusCode: 401,
                message: "Não autorizado!",
            });
        }

        const token = jwt.sign({ name: user.name }, SECRET, {
            expiresIn: 2 * 60 
        });

        res.status(200).json({
            statusCode: 200,
            message: "Login realizado com sucesso!",
            data: {
                token
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: error.message
        });
    }
}

exports.verificarToken = async function(req, res, next) {

    const tokenHeader = req.headers["authorization"];
    const [bearer, token] = tokenHeader && tokenHeader.split(" ");
    console.log(bearer);
    console.log(token);

    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: "Não autorizado!",
        })
    }

    try {

        jwt.verify(token, SECRET);
        next();
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            statusCode: 500,
            message: "Token não valido."
        })
    }

}