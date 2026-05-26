import express from "express";
const app = express();

import user from "./routers/userRoute.js";
import college from "./routers/collegeRouter.js";
import chat from "./routers/chatRouter.js";
import scholar from "./routers/scholarRouter.js";
import center from "./routers/reviewCenterRouter.js";
import { authorization } from "./middleware/auth.js";
import { limiter } from "./middleware/limiter.js";
import { connect_database, prisma } from "./config/database_config.js";

connect_database();

app.use(express.json());
app.use(limiter);
app.set("trust proxy", 1);
app.use("/auth/college", authorization, college);
app.use("/auth/scholarship", authorization, scholar);
app.use("/auth/review-hub", authorization, center);
app.use("/auth/chat", authorization, chat);
app.use("/user", user);

export default app;
