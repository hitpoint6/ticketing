import { model, Schema } from "mongoose";

export interface ITicket {
  title: string;
  price: number;
  userId: string;
}

const ticketSchema = new Schema<ITicket>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
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

export const Ticket = model<ITicket>("Ticket", ticketSchema);
