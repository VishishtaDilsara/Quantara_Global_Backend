import express from "express";
import {
  createQsJob,
  deleteQsJob,
  getAllQsJobs,
  getQsJobById,
  updateQsJobStatus,
} from "../controllers/qsJobController.js";

const QsJobRouter = express.Router();

QsJobRouter.post("/", createQsJob);
QsJobRouter.get("/", getAllQsJobs);
QsJobRouter.get("/:id", getQsJobById);
QsJobRouter.put("/:id", updateQsJobStatus);
QsJobRouter.delete("/:id", deleteQsJob);

export default QsJobRouter;
