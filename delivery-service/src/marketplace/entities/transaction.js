class Transaction {

  static schema = {
    type: "object",
    properties: {
      buyerUserId: {type: "integer", errorMessage: 'must be of integer type'}
    },
    required: ["buyerUserId"]
  }

  constructor(id, buyerUserId, productIds) {
    this.id = id;
    this.buyerUserId = buyerUserId;
  }

}

module.exports = Transaction
