import QsJob from "../models/qsJob.js";

export async function createQsJob(req, res) {
  try {
    const { name, email, whatsappNumber, jobCategory, message } = req.body;

    const newQsJob = new QsJob({
      name,
      email,
      whatsappNumber,
      jobCategory,
      message,
    });

    const savedJob = await newQsJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ error: "Failed to create QS job." });
  }
}

export async function getAllQsJobs(req, res) {
  try {
    const qsJobs = await QsJob.find();
    res.status(200).json(qsJobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve QS jobs." });
  }
}

export async function getQsJobById(req, res) {
  try {
    const { id } = req.params;
    const qsJob = await QsJob.findById(id);
    if (!qsJob) {
      return res.status(404).json({ error: "QS job not found." });
    }
    res.status(200).json(qsJob);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve QS job." });
  }
}

export async function updateQsJobStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedQsJob = await QsJob.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedQsJob) {
      return res.status(404).json({ error: "QS job not found." });
    }

    res.status(200).json(updatedQsJob);
  } catch (error) {
    res.status(500).json({ error: "Failed to update QS job status." });
  }
}

export async function deleteQsJob(req, res) {
  try {
    const { id } = req.params;

    const deletedQsJob = await QsJob.findByIdAndDelete(id);

    if (!deletedQsJob) {
      return res.status(404).json({ error: "QS job not found." });
    }

    res.status(200).json({ message: "QS job deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete QS job." });
  }
}
