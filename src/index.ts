import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import { SnackData } from "../src/interfaces/SnackData";
import { CustomerData } from "../src/interfaces/CustomerData";
import { PaymentData } from "../src/interfaces/PaymentData";
import CheckoutService from "../src/services/CheckoutService";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) return res.status(404).send({ error: "Message is required" });

  res.send({ message });
});

app.get("/snacks", async (req: Request, res: Response) => {
  const { snack } = req.query;

  if (!snack) return res.status(404).send({ error: "Snack is required" });

  const snacks = await prisma.snack.findMany({
    where: {
      snack: {
        equals: snack as string,
      },
    },
  });
  res.send(snacks);
});

app.get("/orders/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: {
      id: +id,
    },
    include: { customer: true, OrderItems: { include: { snack: true } } },
  });

  if (!order) return res.status(404).send({ error: "Order not found" });

  res.send(order);
});

interface CheckoutReqest extends Request {
  body: {
    cart: SnackData[];
    customer: CustomerData;
    payment: PaymentData;
  };
}
app.post("/checkout", async (req: CheckoutReqest, res: Response) => {
  const { cart, customer, payment } = req.body;

  const checkoutService = new CheckoutService();
  checkoutService.process(cart, customer, payment);

  res.send({ message: "Checkout completed" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
