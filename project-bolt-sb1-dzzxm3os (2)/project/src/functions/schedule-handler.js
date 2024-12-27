import { DatabaseService } from '../services/database-service.js';
import { Logger } from '../utils/logger.js';
import { config } from '../config/config.js';

export class ScheduleHandler {
  constructor() {
    this.dbService = new DatabaseService(config);
  }

  async handleSchedule(event) {
    try {
      Logger.info('Processing schedule event', { event });

      const scheduleType = event.data.scheduleType; // 'start' or 'stop'
      
      if (scheduleType === 'start') {
        return await this.dbService.startInstance();
      } else if (scheduleType === 'stop') {
        return await this.dbService.stopInstance();
      } else {
        throw new Error(`Invalid schedule type: ${scheduleType}`);
      }
    } catch (error) {
      Logger.error('Schedule handler failed', error);
      throw error;
    }
  }
}