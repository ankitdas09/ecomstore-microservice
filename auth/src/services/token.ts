import jwt from "jsonwebtoken";
export class Token {
  static signJWT(userId: string, userEmail: string): string {
    const signed = jwt.sign(
      { id: userId, email: userEmail },
      process.env.JWT_KEY!
    );
    return signed;
  }

  static verifyJWT(token: string): string | object {
    const verify = jwt.verify(token, process.env.JWT_KEY!);
    return verify;
  }
}
