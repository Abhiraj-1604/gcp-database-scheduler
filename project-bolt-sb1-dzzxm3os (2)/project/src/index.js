import { ScheduleHandler } from './functions/schedule-handler.js';
import { Logger } from './utils/logger.js';

/**
 * Cloud Function entry point
 * @param {Object} event - Cloud Scheduler event
 * @param {Object} context - Cloud Function context
 */
export const scheduleDatabaseInstance = async (event, context) => {
  try {
    Logger.info('Received schedule event', { 
      eventId: context.eventId,
      timestamp: context.timestamp 
    });

    const handler = new ScheduleHandler();
    const result = await handler.handleSchedule(event);

    Logger.info('Schedule processed successfully', { result });
    return result;
  } catch (error) {
    Logger.error('Function execution failed', error);
    throw error;
  }
};