import { OrderCreatedEvent, Publisher, Subjects } from "@ticketsphere/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
