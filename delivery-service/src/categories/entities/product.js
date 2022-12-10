class Product {

  static schema = {
    type: "object",
    properties: {
      name: {type: "string", errorMessage: 'must be of string type'},
      description: {type: "string", errorMessage: 'must be of string type'},
      quantity: {type: "integer", errorMessage: 'must be of integer type'},
      status: {type: "boolean", errorMessage: 'must be of boolean type'},
    },
    required: ["name", "description", "quantity", "status"],
    additionalProperties: false,
  }

  constructor(id, name, description, quantity, status) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.status = status;
  }

}

module.exports = Product
