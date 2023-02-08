const bcrypt = require('bcryptjs');

const checkPassword = async (password, hashedPassword) => {
    const passwordMatched = await bcrypt.compare(password, hashedPassword);
    return passwordMatched;
};

const encryptPassword = (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

module.exports = { checkPassword, encryptPassword };