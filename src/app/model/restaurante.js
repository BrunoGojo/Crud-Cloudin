const mongoose = require("mongoose");

const RestauranteSchema = new mongoose.Schema(
    {
        nomeDoPrato:{
            type: String,
            required: true
        },
        tipoCarne: {
            type: String,
            required: true
        },
        acompanhamentos: {
            type: String,
        },
        bebidas: {
            type: String,
        },
        descricaoDoPrato:{
            type: String,
            required: true
        },
        precoPrato: {
            type:Number,
            required: true
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Restaurante", RestauranteSchema)