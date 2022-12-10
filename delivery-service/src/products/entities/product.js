class Product {

  static schema = {
    type: "object",
    properties: {
      name: {type: "string", errorMessage: 'must be of string type'},
      description: {type: "string", errorMessage: 'must be of string type'},
      quantity: {type: "integer", errorMessage: 'must be of integer type'},
      SellerUserId: {type: "integer", errorMessage: 'must be of integer type'},
      CategoryId: {type: "integer", errorMessage: 'must be of integer type'},
    },
    required: ["name", "description", "quantity", "SellerUserId", "CategoryId"],
    additionalProperties: false,
  }

  constructor(id, name, description, quantity, SellerUserId, CategoryId) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.SellerUserId = SellerUserId;
    this.CategoryId = CategoryId;
    this.status = quantity > 0 ? 'active' : 'inactive';
  }

}

module.exports = Product
