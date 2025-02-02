import jwt from 'jsonwebtoken'

const key = process.env.token
const token = jwt.sign({ name: "tessar" }, key);

export default token