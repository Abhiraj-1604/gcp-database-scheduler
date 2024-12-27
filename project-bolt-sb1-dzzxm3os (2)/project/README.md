# Database Instance Scheduler

A Google Cloud Function that automatically starts and stops Cloud SQL instances on a schedule to optimize costs.

## Architecture

```
┌─────────────────┐     ┌───────────────┐     ┌────────────────┐
│  Cloud Schedule │ ──► │ Cloud Function │ ──► │ Cloud SQL Admin│
└─────────────────┘     └───────────────┘     └────────────────┘
```

## Prerequisites

- Google Cloud Project with billing enabled
- Cloud Functions API enabled
- Cloud Scheduler API enabled
- Cloud SQL Admin API enabled
- Required IAM permissions:
  - `cloudfunctions.functions.create`
  - `cloudsql.instances.update`

## Implementation Steps

1. **Set up Environment Variables**
   ```bash
   export PROJECT_ID="your-project-id"
   export INSTANCE_ID="your-sql-instance"
   export REGION="your-region"
   ```

2. **Project Structure**
   ```
   .
   ├── src/
   │   ├── config/
   │   │   └── config.js         # Configuration settings
   │   ├── functions/
   │   │   └── schedule-handler.js # Main schedule handler
   │   ├── services/
   │   │   └── database-service.js # Database operations
   │   ├── utils/
   │   │   └── logger.js         # Logging utility
   │   └── index.js              # Function entry point
   ├── package.json
   └── README.md
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Configure Schedule Settings**
   - Edit `src/config/config.js` to modify schedule times
   - Default schedule:
     - Start: Monday-Friday at 8 AM UTC
     - Stop: Monday-Friday at 6 PM UTC

5. **Deploy to Cloud Functions**
   ```bash
   gcloud functions deploy scheduleDatabaseInstance \
     --runtime nodejs18 \
     --trigger-topic database-schedule \
     --entry-point scheduleDatabaseInstance \
     --env-vars-file .env.yaml
   ```

6. **Create Cloud Scheduler Jobs**
   ```bash
   # Start job
   gcloud scheduler jobs create pubsub database-start \
     --schedule "0 8 * * 1-5" \
     --topic database-schedule \
     --message-body '{"scheduleType":"start"}'

   # Stop job
   gcloud scheduler jobs create pubsub database-stop \
     --schedule "0 18 * * 1-5" \
     --topic database-schedule \
     --message-body '{"scheduleType":"stop"}'
   ```

## Testing

Run the test suite:
```bash
npm test
```

## Logging

The function uses structured logging:
- INFO level for normal operations
- ERROR level for failures
- All logs include timestamps and relevant metadata

## Error Handling

The application implements comprehensive error handling:
- Service-level errors in database operations
- Configuration validation
- Schedule event validation
- All errors are logged with stack traces

## Security

- Uses Cloud Function's built-in authentication
- Requires appropriate IAM roles
- Environment variables for sensitive configuration

## Monitoring

Monitor the function using Cloud Monitoring:
- Function execution count
- Error rate
- Execution latency
- Database instance status

## Best Practices

1. **Code Organization**
   - Modular architecture with clear separation of concerns
   - Configuration isolated in config files
   - Utility functions in separate modules

2. **Error Handling**
   - Comprehensive error catching and logging
   - Structured error responses
   - Detailed error messages for debugging

3. **Logging**
   - Structured JSON logging
   - Consistent log levels
   - Relevant context in log entries

4. **Testing**
   - Unit tests for core functionality
   - Mocked external services
   - Error case coverage

## Maintenance

- Regularly update dependencies
- Monitor function execution logs
- Review and adjust schedules as needed
- Check for Cloud SQL Admin API updates

## Troubleshooting

Common issues and solutions:
1. Function not executing
   - Check Cloud Scheduler job status
   - Verify IAM permissions
   - Review function logs

2. Database operations failing
   - Verify instance exists
   - Check network connectivity
   - Confirm IAM roles

3. Schedule issues
   - Verify cron expressions
   - Check timezone settings
   - Review Cloud Scheduler logs