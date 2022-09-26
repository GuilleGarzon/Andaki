import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    orderItems: [
      {
        name: { 
          type: String, 
          required: true 
        },
        quantity: { 
          type: Number, 
          required: true 
        },
        image: { 
          type: String, 
          required: true 
        },
        price: { 
          type: Number, 
          required: true 
        },
      },
    ],
    paymentMethod: { 
      type: String, 
      required: true 
    },
    paymentResult: {
      id: String,
      status: String, 
      email_address: String
    },
    itemsPrice: { 
      type: Number, 
      required: true 
    },    
    totalPrice: { 
      type: Number, 
      required: true 
    },
    isPaid: { 
      type: Boolean, 
      required: true, 
      default: false 
    },
    isDelivered: { 
      type: Boolean, 
      required: true,
      default: false 
    },
    paidAt: { 
      type: Date 
    },
    deliveredAt: { 
      type: Date 
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export default Order;