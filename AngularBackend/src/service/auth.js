import jsonwebtoken from "jsonwebtoken";

class AuthService {
    constructor() {
        if (AuthService.instance) {
            return AuthService.instance;
        }
        AuthService.instance = this;
        this.JWT_SECRET = process.env.JWT_SECRET || "dev";
    }

    async signToken(payload) {
        return jsonwebtoken.sign(payload, this.JWT_SECRET, { expiresIn: "24h" , algorithm: "HS256"});
    }

    async verify(token) {
        return jsonwebtoken.verify(token, this.JWT_SECRET);
    }
}

export const authService = new AuthService();