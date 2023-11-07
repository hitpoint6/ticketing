import { Publisher, Subjects, TicketUpdatedEvent } from "@ticketsphere/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
