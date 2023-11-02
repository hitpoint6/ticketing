import request from "supertest";
import { app } from "../../app";

const createticket = async () => {
  const cookie = await global.signin();

  await request(app).post("/api/tickets").set("Cookie", cookie).send({
    title: "ticket1",
    price: 20,
  });
};

it("returns a list of tickets", async () => {
  await createticket();
  await createticket();
  await createticket();

  const response = await request(app).get("/api/tickets/").send().expect(200);

  expect(response.body.length).toEqual(3);
});
