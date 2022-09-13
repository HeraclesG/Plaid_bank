const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const payMethodSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    paymethodId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
payMethodSchema.plugin(toJSON);
payMethodSchema.plugin(paginate);

const PayMethod = mongoose.model('PayMethod', payMethodSchema);

module.exports = PayMethod;
