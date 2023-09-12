import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    products: [
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
    ]
})

export const cartModel = model('carts', cartSchema);