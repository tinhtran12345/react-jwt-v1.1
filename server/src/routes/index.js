// root routes

const authRouter = require("./authRoute");
const userRouter = require("./userRoute");
const initRoute = (app) => {
    app.use("/v1/auth", authRouter);
    app.use("/v1/user", userRouter);

    return app.use("/", (req, res) => {
        console.log("Server on ...");
    });
};

module.exports = initRoute;
