import { model, Schema, Document } from "mongoose";
import { Order, OrderStatus } from "./order";

export interface ITicket extends Document {
  title: string;
  price: number;
  userId: string;
  isReserved(): Promise<boolean>;
}

const ticketSchema = new Schema<ITicket>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.methods.isReserved = async function () {
  // Make sure the ticket is not already being reserved.
  // Cancleed order is OK.
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return Boolean(existingOrder);
};

export const Ticket = model<ITicket>("Ticket", ticketSchema);
