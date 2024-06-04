const { EntitySchema } = require('typeorm');

const ProductSchema = new EntitySchema({
  name: 'Product',
  tableName: 'products',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    name: {
      type: 'varchar'
    },
    description: {
      type: 'varchar'
    },
    quantity: {
      type: 'int'
    },
    completed: {
      type: 'boolean',
      default: false
    }
  }
});

module.exports = ProductSchema;
