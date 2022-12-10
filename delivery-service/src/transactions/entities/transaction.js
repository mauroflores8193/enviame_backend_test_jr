class Transaction {

  static schema = {
    type: "object",
    properties: {
      BuyerUserId: {type: "integer", errorMessage: 'must be of integer type'},
      ProductIds: {type: "array", items: {type: "integer"}, errorMessage: 'must be of integer array type'}
    },
    required: ["BuyerUserId", "ProductIds"],
    additionalProperties: false,
  }

  constructor(id, BuyerUserId, ProductIds) {
    this.id = id;
    this.BuyerUserId = BuyerUserId;
    this.ProductIds = ProductIds;
  }

}

module.exports = Transaction
