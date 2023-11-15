const { createLogger, format, transports } = require('winston');

const {
    combine, timestamp, printf,
  } = format;
  require('winston-daily-rotate-file');

  const logger = (module) =>{
        const path = module ? module.filename.split('/').pop() : null
    
        return createLogger({
            format: combine(
                timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
            printf((info) => `${info.timestamp} [${path || 'LOGGER'}] ${info.level}: ${info.message}`)

            ),
            transports: (process.env.NODE.ENV === 'test') ? [
                new transports.Console(),
                
            ]: [
                new transports.Console(),
                new transports.DailyRotateFile({
                    filename: 'server-%DATE%.log',
                    dirname: `${process.cwd()}/logs/`,
                    dataPattern: 'YYYY-MM-DD',
                    zippedArchive: false, 
                    maxSize: '20mb',
                    maxFiles: '30d',
                    createSymLink: true, 
                    symlinkName: 'server.log'
                })
            ]
        })
  }

  module.exports = logger