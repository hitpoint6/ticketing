import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import {
  BadRequestError,
  NotAuthorizeError,
  NotFoundError,
  requireAuth,
  validateRequest,
} from "@ticketsphere/common";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publiser";
import { natsWrapper } from "../nats-wrapper";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").trim().notEmpty().withMessage("You must enter a title."),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.orderId) {
      throw new BadRequestError("Can not edit a reserved ticket.");
    }

    const user = req.currentUser;
    if (!user || user.id !== ticket.userId) {
      throw new NotAuthorizeError();
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();

    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
