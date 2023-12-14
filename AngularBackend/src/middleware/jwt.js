import jwt from "jsonwebtoken";

export const validateJwtToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ error: "Access denied, token missing!" });
    } else {
        jwt.verify(refreshToken, 'your-secret-key', (err, value) => {
            if (err) {
                return res.status(500).json({ error: "Invalid token" });
            }
            req.user = value.data;
            next();
        });
    }
};
