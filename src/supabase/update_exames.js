const { createClient } = require("@supabase/supabase-js");

const update_exames = async function (array) {

    const supabase = createClient(process.env.URL, process.env.KEY);

    try {

        const results = [];       

        if (array.length > 0) {
            await supabase
            .from('exames')
            .delete()
            .match({ filename: array[0].filename, page: array[0].page })
        }
      
        for (const item of array) {            
          
            const { data, error } = await supabase
                .from('exames')
                .insert(item)   

            if (error) {
                console.error(`Erro ao atualizar exames ${item.filename}:`, error);
                throw new Error(`Falha ao atualizar exames ${item.filename}`);
            } else {
                console.log(`Registro na tabela [exames] atualizado com sucesso.`,`${item.filename} `);
                results.push(data);
            }
        }

        return results;

    } catch (error) {
        console.error('Erro ao processar atualização:', error.message);
        throw error; 
    }
};

module.exports = { update_exames };