const bcrypt = require("bcryptjs");

async function hash() {

    const password = "Admin@123";

    const hashed = await bcrypt.hash(password,10);

    console.log(hashed);

}

hash();