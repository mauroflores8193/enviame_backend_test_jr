class Transaction {

  static schema = {
    type: "object",
    properties: {
      buyerUserId: {type: "integer", errorMessage: 'must be of integer type'},
      productIds: {type: "array", items: {type: "integer"}, errorMessage: 'must be of integer array type'}
    },
    required: ["buyerUserId"],
    additionalProperties: false,
  }

  constructor(id, buyerUserId, productIds) {
    this.id = id;
    this.buyerUserId = buyerUserId;
    this.productIds = productIds;
  }

}

module.exports = Transaction
