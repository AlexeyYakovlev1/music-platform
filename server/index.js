require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(fileUpload());
app.use(express.json({ extended: true }));

app.use("/auth", require("./routes/auth.routes"));
app.use("/audio", require("./routes/audio.routes"));
app.use("/filts", require("./routes/filts.routes"));
app.use("/owner", require("./routes/owner.routes"));
app.use("/user", require("./routes/user.routes"));
app.use("/follow", require("./routes/follow.routes"));

const run = () => {
    app.listen(port, () => {
        console.log(`server has been started on port ${port}`);
    });
};

run();