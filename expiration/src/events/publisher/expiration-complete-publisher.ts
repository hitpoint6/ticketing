import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from "@ticketsphere/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
