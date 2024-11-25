import { format, transports, createLogger } from "winston"

let dateAndTime: string | undefined
let levelType: string | undefined

// Format the log message to include the timestamp, log level, and message
const logFormat = format.printf(({ level, message, timestamp, stack }) => {
  dateAndTime = timestamp
  return `${timestamp} ${level}: ${stack || message}`
})

// Create a logger instance with the specified log level and format
const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: format.combine(
    format.timestamp({ format: "MM/DD/YY - HH:mma" }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "user-service" },
  transports: [
    new transports.File({
      level: "error",
      filename: levelType === "ERROR" ? `logs/errors.log` : `logs/info.log`,
    }),
  ],
})

// Add a console transport for logging in development mode
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    })
  )
}

export const Logger = logger
