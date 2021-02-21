'use strict'

const axios = use('axios');
const Env = use('Env');
const baseUrl = Env.get('BLING_URL');
const blingKey = Env.get('BLING_KEY')

const BlingService = exports = module.exports = {}

BlingService.save = async (data) => {

    const opportunity = await axios.post(`${baseUrl}/pedido?apikey=${blingKey}&xml=${data}` )

    return opportunity.data
  }
