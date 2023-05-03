// root routes

const userRouter = require("./userRoute");

const initRoute = (app) => {
    app.use("/v1/auth", userRouter);

    return app.use("/", (req, res) => {
        console.log("Server on ...");
    });
};

module.exports = initRoute;
