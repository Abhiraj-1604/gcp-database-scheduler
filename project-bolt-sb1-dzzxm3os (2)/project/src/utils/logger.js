export class Logger {
  static info(message, data = {}) {
    console.log(JSON.stringify({
      severity: 'INFO',
      message,
      ...data,
      timestamp: new Date().toISOString()
    }));
  }

  static error(message, error, data = {}) {
    console.error(JSON.stringify({
      severity: 'ERROR',
      message,
      error: error.message,
      stack: error.stack,
      ...data,
      timestamp: new Date().toISOString()
    }));
  }
}