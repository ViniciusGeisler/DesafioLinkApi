'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const BaseModel = use('MongooseModel')

const mongoose = use('Adonis/Addons/Mongoose')
const { Schema } = mongoose

class Opportunity extends BaseModel {

  static get schema() {
    return {
      orders: { type: Array, required: true },
      wonDate: { type: Date, required: true },
      totalValue: { type: Number, required: true}
    };
  }

}

module.exports = Opportunity.buildModel('Opportunity')
