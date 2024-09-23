const { createClient } = require("@supabase/supabase-js");

const get_pdf_page = async function (req) {

    const supabase = createClient(process.env.URL, process.env.KEY);

    try {

        let json = req.body.data;

        let { data, error } = await supabase
        .from('exames')
        .select('pdf')
        .match({ 
            pdf_page: json.pdf_page,
            filename: json.filename
         })    

        

        return data[0].pdf;

    } catch (error) {

        console.error('Erro na consulta de exames', error.message);
        throw error;

    }

};

module.exports = { get_pdf_page };