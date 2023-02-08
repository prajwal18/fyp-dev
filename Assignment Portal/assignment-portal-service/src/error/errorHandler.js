const response = require("../utils/response.util");

const errorHandler = (err, req, res, next) => {
    return response.error(res, null, err.message);
}

module.exports = errorHandler;