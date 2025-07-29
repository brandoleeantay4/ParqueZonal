const expressLoader = require('./express');
const { connectDB } = require('./db');

module.exports = async ({ expressApp }) => {
  await connectDB();
  console.log('DB Loaded and connected!');

  expressLoader(expressApp);
  console.log('Express Loaded!');

  // ... more loaders can be added here
};
