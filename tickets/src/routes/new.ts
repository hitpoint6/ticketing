import express, { Request, Response } from "express";
import { requireAuth } from "@ticketsphere/common";
import { body } from "express-validator";
import { validateRequest } from "@ticketsphere/common";
import { Ticket } from "../models/ticket";
import { TicketCreatedPublisher } from "../events/publisers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").trim().notEmpty().withMessage("You must enter a title."),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = new Ticket({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save();

    console.log(natsWrapper);
    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    });

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
