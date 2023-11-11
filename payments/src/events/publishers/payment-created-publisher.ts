import { PaymentCreatedEvent, Publisher, Subjects } from "@ticketsphere/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
