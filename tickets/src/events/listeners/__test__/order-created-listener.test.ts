import { OrderCreatedListener } from "../order-created-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from "../../../models/ticket";
import mongoose from "mongoose";
import { OrderCreatedEvent, OrderStatus } from "@ticketsphere/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
  // Create a listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // Create a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "dsfsd",
  });
  await ticket.save();

  // Publish an fake order created event
  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    userId: "dfs",
    expiresAt: "fdsfsd",
    version: 0,
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // Create a fake ack() function
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it("sets the oderId of ticket to the id of the order event", async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("publishes a ticket updated event", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const ticketUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(data.id).toEqual(ticketUpdatedData.orderId);
});
