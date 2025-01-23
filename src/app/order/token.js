import jwt from "jsonwebtoken";

const key = `${process.env.token}`;
// const key = '317d33e8e25e92a1f7765cc53e5d8eb2835a0d105af2c958eed0140b9eadd74a2b94516d720a07689f4a4cd4b31ff39987f0b0b4aaf388d6c37892237c9411d7'

const token = jwt.sign({ name: "tessar" }, key);

export default token;