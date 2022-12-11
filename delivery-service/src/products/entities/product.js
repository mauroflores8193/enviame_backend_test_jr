class Product {

  static schema = {
    type: "object",
    properties: {
      name: {type: "string", errorMessage: 'must be of string type'},
      description: {type: "string", errorMessage: 'must be of string type'},
      quantity: {type: "integer", errorMessage: 'must be of integer type'},
      sellerUserId: {type: "integer", errorMessage: 'must be of integer type'},
      categoryId: {type: "integer", errorMessage: 'must be of integer type'},
    },
    required: ["name", "description", "quantity", "sellerUserId", "categoryId"],
    additionalProperties: false,
  }

  constructor(id, name, description, quantity, sellerUserId, categoryId) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.sellerUserId = sellerUserId;
    this.categoryId = categoryId;
    this.status = quantity > 0 ? 'active' : 'inactive';
  }

}

module.exports = Product
