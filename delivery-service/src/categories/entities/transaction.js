class Transaction {

  static schema = {
    type: "object",
    properties: {},
    required: [],
    additionalProperties: false,
  }

  constructor(id) {
    this.id = id;
  }

}

module.exports = Transaction
