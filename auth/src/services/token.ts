import jwt from "jsonwebtoken";
export class Token {
  static signJWT(data: any) {
    const signed = jwt.sign(data, process.env.JWT_SECRET!);
    return signed;
  }

  static verifyJWT(token: string) {
    return false;
  }
}
