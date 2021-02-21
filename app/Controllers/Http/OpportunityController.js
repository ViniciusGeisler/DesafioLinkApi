'use strict'

const PipeDriveService = use("App/Services/PipeDriveService")

class OpportunityController {

  async get({ response }) {
    const opportunity = await PipeDriveService.getOpportunities()

    if (!opportunity) {
      return response.status(400).send({ message: 'Nenhuma oportunidade criada!' })
    }

    return response.status(200).send(opportunity)

  }
}

module.exports = OpportunityController
