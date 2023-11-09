import { Ticket } from "../ticket";

it("implements optimistic concurrrency control", async () => {
  const ticket = new Ticket({
    title: "concert",
    price: 5,
    userId: "123",
  });

  await ticket.save();

  const first = await Ticket.findById(ticket.id);
  const second = await Ticket.findById(ticket.id);

  first!.set({ price: 20 });
  await first!.save();

  second!.set({ price: 30 });
  try {
    await second!.save();
  } catch (err) {
    return;
  }

  throw new Error("Should not reach this point.");
});

it("increases version number on multiple saves", async () => {
  const ticket = new Ticket({
    title: "concert",
    price: 5,
    userId: "123",
  });

  await ticket.save();

  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});
