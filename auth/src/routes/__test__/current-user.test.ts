import request from "supertest";
import { app } from "../../app";

it("responds with details about the current user", async function () {
  const cookie = await signin();

  const resp = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(resp.body.currentUser.email).toEqual("test@test.com");
});
it("responds with null if not authenticated", async function () {
  const resp = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(resp.body.currentUser).toEqual(null);
});
