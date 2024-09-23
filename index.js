
const functions = require('@google-cloud/functions-framework');
const cors = require('cors');
const corsMiddleware = cors({ origin: true });
const fs = require('fs');
const path = require('path');

const { get_pdf_page } = require("./src/supabase/get_pdf_page");
const { text_to_ia } = require("./src/text_to_ia");
const { update_exames } = require("./src/supabase/update_exames");

functions.http('pdf_page_to_text', async (req, res) => {
    corsMiddleware(req, res, async () => {

        try {

            let pdf_page = await get_pdf_page(req);

            let array = await text_to_ia(pdf_page, req);
            
            //console.log(array)

            await update_exames(array, req);

            res.status(200).send(array);

        } catch (error) {
            console.error('Erro:', error);
            res.status(500).send('Erro',error);
        }

    });
});