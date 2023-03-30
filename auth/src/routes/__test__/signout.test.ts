import request from "supertest";
import { app } from "../../app";

it("clears the cookie after signout", async function () {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
  const resp = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);
  expect(resp.get("Set-Cookie")[0]).toEqual(
    "session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
  );
});
