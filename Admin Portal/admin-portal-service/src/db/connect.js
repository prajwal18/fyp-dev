const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function mongooseConnect(url) {
    return mongoose
        .connect(url , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
}

module.exports = { mongooseConnect };
