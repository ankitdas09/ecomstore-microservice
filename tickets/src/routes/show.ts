import { requireAuth, validateRequest } from "@ankitdcr/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket.model";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    return res.sendStatus(404);
  }
  return res.send(ticket);
});

export { router as showTicketRouter };
