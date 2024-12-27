export const config = {
  projectId: process.env.PROJECT_ID,
  instanceId: process.env.INSTANCE_ID,
  region: process.env.REGION,
  timezone: 'UTC',
  schedules: {
    start: '0 8 * * 1-5', // Monday-Friday at 8 AM
    stop: '0 18 * * 1-5'  // Monday-Friday at 6 PM
  }
};