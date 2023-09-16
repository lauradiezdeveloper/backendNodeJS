import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    products: {
        type: [
            {
                id_product : {
                    type: Schema.Type.ObjetcId,
                    ref: 'products',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                }
            }
        ],
        default: function() {
            return []
        },
        required: true,
    },
})

cartSchema.pre('findOne', function () {
    this.populate('products.id_prod')
})

export const cartModel = model('carts', cartSchema);