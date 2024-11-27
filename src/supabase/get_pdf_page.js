const { createClient } = require("@supabase/supabase-js");

const get_pdf_page = async function (req) {

    const supabase = createClient(process.env.URL, process.env.KEY);

    try {

        let json = req.body.data;  

        let param = {
            data: {
                pdf_page: json.pdf_page,
                filename: json.filename,
                prontuarios: json.prontuarios,
                session: json.session
            }
        };
    
        let { data, error } = await supabase.rpc('get_pdf_page', param);

        return data[0].pdf;

    } catch (error) {

        console.error('Erro na consulta de exames', error.message);
        throw error;

    }

};

module.exports = { get_pdf_page };