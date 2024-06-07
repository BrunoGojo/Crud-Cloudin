const Restaurante = require('../model/restaurante')

class RestauranteController {
    async post(req, res){
        try{
            const data = await Restaurante.create(req.body);
            return res.json(data);
        } catch (error) {
            return res.status(404).send({ error: 'Falha ao cadastrar o prato'})
        }
    }

    async getAll(req, res){
        try {
            const data = await Restaurante.find();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error: 'Falha ao carregar os pratos'});
        }
    }

    async getId(req, res){
        try {
            const {id} = req.params;
            const data = await Restaurante.findById(id);

            if (!data) {
                return res.status(404).json({ message: 'Prato não encontrado' });
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(404).json({ error: 'Prato não encontrado'})
        }

    }

    async patch(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const options = { new: true, runValidators: true };

            const updatedData = await Restaurante.findByIdAndUpdate(id, updates, options);

            if (!updatedData) {
                return res.status(404).json({ "message": "Prato não encontrado" });
            }

            return res.status(200).json(updatedData);
        } catch (error) {
            return res.status(500).json({ "error": "Falha ao atualizar o prato" });
        }
    }

    async put(req,res){
        try {
            const {id} = req.params;
            const newData = req.body; 

            let document = await Restaurante.findById(id);

            if (!document) {
                return res.status(404).json({ message: 'Prato não encontrado' });
            }

            document.set(newData);

            await document.save();

            return res.status(200).json(document);
        } catch (error) {
            return res.status(404).json({ error: 'Falha ao encontrar o prato' });
        }
    }

    async deleteID(req, res) {
        try {
            const {id} = req.params;  

            const deletedData = await Restaurante.findByIdAndDelete(id);

            if (!deletedData) {

                return res.status(404).json({ error: 'Falha ao deletar o prato' });
            }

            return res.status(200).json({ message: 'Prato excluído com sucesso' });
        } catch (error) {
            return res.status(404).json({ error: 'Falha ao deletar o prato' });
        }
    }

}

module.exports = new RestauranteController();