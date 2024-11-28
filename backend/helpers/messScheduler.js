const cron = require("node-cron");
const Student = require("../models/studentModel");

const updateMessEntries = async () => {
  try {
    const result = await Student.updateMany(
      { messEntry: { $ne: "OUT" } }, 
      { $set: { messEntry: "OUT" } }
    );
    console.log(`${result.modifiedCount} mess entries updated to "OUT"`);
  } catch (error) {
    console.error("Error updating mess entries:", error);
  }
};

const scheduleCronJobs = () => {
  cron.schedule("30 10 * * *", updateMessEntries);
  cron.schedule("30 14 * * *", updateMessEntries);
  cron.schedule("30 22 * * *", updateMessEntries);
};

module.exports = scheduleCronJobs; 
