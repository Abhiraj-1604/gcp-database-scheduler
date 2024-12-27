# gcp-database-scheduler
This is a cost optimization solution that automatically manages Google Cloud SQL instances by starting and stopping them on a schedule
Start database instances before business hours (8 AM)
Stop them after business hours (6 PM)
Keep instances stopped during weekends
Key Components:

Cloud Function (src/index.js)

Main entry point that receives schedule events
Handles incoming requests from Cloud Scheduler
Routes requests to appropriate handlers
Schedule Handler (src/functions/schedule-handler.js)

Processes schedule events
Determines whether to start or stop the database
Coordinates with the database service
Database Service (src/services/database-service.js)

Manages database instance operations
Interfaces with Google Cloud SQL Admin API
Handles starting/stopping instances
Retrieves instance status
Configuration (src/config/config.js)

Centralizes all configuration settings
Manages schedule times
Stores project and instance details
Logger (src/utils/logger.js)

Provides structured logging
Ensures consistent log format
Includes timestamps and metadata
How It Works:

Cloud Scheduler triggers the function based on configured schedules
The function receives the event with a scheduleType ("start" or "stop")
Schedule Handler processes the event and calls appropriate database operations
Database Service executes the requested operation via Cloud SQL Admin API
Results and errors are logged for monitoring
Benefits:

Reduces costs by running instances only when needed
Fully automated scheduling
Structured logging for monitoring
Error handling and retry mechanisms
Easy to configure and maintain
Technologies Used:

Node.js 18+
Google Cloud Functions
Google Cloud Scheduler
Google Cloud SQL Admin API
JSON structured logging
This project follows a clean, modular architecture with clear separation of concerns, making it easy to maintain and extend.
