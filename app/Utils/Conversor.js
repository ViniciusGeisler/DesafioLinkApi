const Parser = use('xml2js');

const Conversor = exports = module.exports = {}

Conversor.ConvertJsonToXml = async ({ opportunity }) => {
  const builder = new Parser.Builder();

    const xmlobj = {
      pedido: {
        cliente: {
          nome: opportunity.person_id.name,
        },
        transporte: {
          volumes: {
            volumes: [
              {
                servico: 'SEDEX - CONTRATO',

              },
              {
                servico: 'PAC - CONTRATO',
              },
            ],
          },
        },
        itens: {
          item: [
            {
              codigo: '001',
              descricao: 'Caneta 001',
              qtde: '10',
              vlr_unit: '1.68',
            },
            {
              codigo: '002',
              descricao: 'Caderno 002',
              qtde: '3',
              vlr_unit: '3.75',
            },
            {
              codigo: '003',
              descricao: 'Teclado 003',
              qtde: '7',
              vlr_unit: '18.65',
            },
          ],
        },
        parcelas: {
          parcela: [
            {
              data: opportunity.won_time,
              vlr: opportunity.value,
              obs: 'Teste obs 1',
            },

          ],
        },
        vlr_frete: '15',
        vlr_desconto: '10',
        obs: 'Testando o campo observações do pedido',
        obs_internas: 'Testando o campo observações internas do pedido',
      },
    };

  return encodeURI(await builder.buildObject(xmlobj));
}
