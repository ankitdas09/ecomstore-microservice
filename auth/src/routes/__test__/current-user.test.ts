import request from "supertest";
import { app } from "../../app";

it("responds with details about the current user", async function () {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const resp = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);
});
