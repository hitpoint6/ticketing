import { Publisher, Subjects, TicketCreatedEvent } from "@ticketsphere/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
