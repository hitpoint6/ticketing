import { model, Schema } from "mongoose";
import { ITicket } from "./ticket";
import { OrderStatus } from "@ticketsphere/common";

export interface IOrder {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: ITicket;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: Schema.Types.Date,
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
    },
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

export { OrderStatus };

export const Order = model<IOrder>("Order", orderSchema);
