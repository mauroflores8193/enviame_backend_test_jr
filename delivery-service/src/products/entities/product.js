class Product {

  static schema = {
    type: "object",
    properties: {
      name: {type: "string", errorMessage: 'must be of string type'},
      description: {type: "string", errorMessage: 'must be of string type'},
      quantity: {type: "integer", errorMessage: 'must be of integer type'},
      seller_user_id: {type: "integer", errorMessage: 'must be of integer type'},
      category_id: {type: "integer", errorMessage: 'must be of integer type'},
    },
    required: ["name", "description", "quantity", "seller_user_id", "category_id"],
    additionalProperties: false,
  }

  constructor(id, name, description, quantity, seller_user_id, category_id) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.quantity = quantity;
    this.status = quantity > 0;
    this.seller_user_id = seller_user_id;
    this.category_id = category_id;
  }

}

module.exports = Product
