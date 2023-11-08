import { OrderCancelledEvent, Publisher, Subjects } from "@ticketsphere/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
