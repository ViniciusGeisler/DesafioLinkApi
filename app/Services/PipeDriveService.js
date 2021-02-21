'use strict'

const axios = use('axios');
const Env = use('Env');
const baseUrl = Env.get('PIPEDRIVE_BASE_URL');
const pipeDriveKey = Env.get('PIPEDRIVE_KEY')

const PipeDriveService = exports = module.exports = {}

PipeDriveService.getOpportunities = async () => {
    const opportunity = await axios.get(`${baseUrl}/deals?status=won&start=0&api_token=${pipeDriveKey}`)

    return opportunity.data
  }
