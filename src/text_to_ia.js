const fs = require('fs');
const { get_prompt } = require("./supabase/get_prompt");

const text_to_ia = async function (text, req) {

    const prompt = await get_prompt();

    let success = false;

    let array = [];

    while (!success) {
        try {
            const response = await fetch('https://open-pumped-lacewing.ngrok-free.app/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "llama3.1",
                    prompt: `${prompt} : ${text}`,
                    stream: false,
                    temperature: 0.3
                })
            });                           

            r = await response;

            if(r.status == 200){

                const IAServerResponse = await r.json();
                array = JSON.parse(IAServerResponse.response);
              
                const chavesParaVerificar = ['conclusao', 'label'];

                if (!Array.isArray(array)) {
                    throw new Error('A resposta não é um array como esperado.');
                }

                for (const obj of array) {

                    for (const chave of chavesParaVerificar) {
                        if (!obj.hasOwnProperty(chave)) {
                            throw new Error(`A chave '${chave}' é obrigatória, mas não foi encontrada em um dos objetos do array.`);
                        }
                    }

                    obj.pdf_page = req.body.data.pdf_page;
                    obj.prontuarios = req.body.data.prontuarios;
                    obj.pdf = text;
                    obj.filename = req.body.data.filename;;

                }

                console.log("IA JSON no formato correto, objetos verificados: ", array.length);

            } else {
                console.error('Ngrok Offline');
            }                   

            success = true;

        } catch (error) {
            
            console.error("IA não conseguiu gerar JSON corretamente: ", error.message);
            console.error(error.message)

        }
    }   

    return array;
};

module.exports = { text_to_ia };
