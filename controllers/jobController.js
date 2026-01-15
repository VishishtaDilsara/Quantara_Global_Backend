import Job from "../models/job.js";

export async function createJob(req, res) {
  try {
    const { title, description, company, location, salary } = req.body;

    if (!title || !description || !company || !location || !salary) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newJob = new Job({
      title,
      description,
      company,
      location,
      salary,
    });

    const savedJob = await newJob.save();

    res.status(201).json({
      message: "Job created successfully",
      jobId: savedJob._id,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error creating job",
    });
  }
}

// Get all jobs
export async function getJobs(req, res) {
  try {
    const jobs = await Job.find({ isApproved: true }).sort({ postedDate: -1 });

    res.status(200).json({
      message: "Jobs retrieved successfully",
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error retrieving jobs",
    });
  }
}

// Approve a job (admin only)
export async function approveJob(req, res) {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Job approved successfully",
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error approving job",
    });
  }
}

// Delete a job (admin only)
export async function deleteJob(req, res) {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndDelete(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Error deleting job",
    });
  }
}
