import express from "express";
const app = express();

import user from "./modules/user/user.router.js";
import college from "./modules/college/college.router.js";
import chat from "./modules/companion/companion.router.js";
import scholar from "./modules/scholarship/scholarship.router.js";
import center from "./modules/center/center.router.js";
import { authorization } from "./modules/middleware/auth.service.js";
import { limiter } from "./modules/middleware/limiter.service.js";
import { connect_database, prisma } from "./modules/config/database.config.js";

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
