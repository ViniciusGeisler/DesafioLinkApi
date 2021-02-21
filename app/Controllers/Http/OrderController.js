'use strict'

const Opportunity = use('App/Models/Opportunity')
const PipeDriveService = use('App/Services/PipeDriveService')
const BlingService = use('App/Services/BlingService')
const Conversor = use('App/Utils/Conversor')
const X2JS = use('x2js')
const moment = use('moment')

class OrderController {

  async save({ request, response }) {
    const x2js = new X2JS();
    const opportunities = await PipeDriveService.getOpportunities()

    if (!opportunities.data) {
      return response.status(400).send({ message: 'Nenhuma oportunidade encontrada!' })
    }

    let errors = []
    let orders = []
    let totalValue = 0
    for (const opportunity of opportunities.data) {
      let order = await BlingService.save(await Conversor.ConvertJsonToXml({ opportunity }))
      order = x2js.xml2js(order)

      if (order.retorno.erros) {
        errors.push(order.retorno.erros.erro.msg)
      } else {
        orders.push(order.retorno.pedidos.pedido)
        totalValue += opportunity.value
      }

    }
    const currentOpportunities = await Opportunity.findOne({ wonDate: moment().format('YYYY-MM-DD') })

    if (!currentOpportunities) {
      const opportunity = new Opportunity();
      opportunity.wonDate = moment().format('YYYY-MM-DD')

      opportunity.totalValue = totalValue

      opportunity.orders = orders
      await opportunity.save();

    } else {
      currentOpportunities.orders = currentOpportunities.orders.concat(orders)
      currentOpportunities.totalValue += totalValue
      await currentOpportunities.save();
    }


    return response.status(200).send({ errors, orders })
  }

  async index({ request, response }) {

    const orders = await Opportunity.find({})

    if (!orders) {
      return response.status(400).send({ message: 'Nenhum pedido encontrado!' })
    }

    return response.status(200).send(orders)

  }

}

module.exports = OrderController
