const cron = require("node-cron");
const Student = require("../models/studentModel");

const updateMessEntries = async () => {
  try {
    const result = await Student.updateMany(
      { messEntry: { $ne: "OUT" } }, // Only update if the current entry isn't already "OUT"
      { $set: { messEntry: "OUT" } }
    );
    console.log(`${result.nModified} mess entries updated to "OUT"`);
  } catch (error) {
    console.error("Error updating mess entries:", error);
  }
};

const scheduleCronJobs = () => {
  cron.schedule("30 10 * * *", updateMessEntries); // 10:30 AM every day
  cron.schedule("30 14 * * *", updateMessEntries); // 2:30 PM every day
  cron.schedule("30 22 * * *", updateMessEntries); // 10:30 PM every day
};

module.exports = scheduleCronJobs; 
