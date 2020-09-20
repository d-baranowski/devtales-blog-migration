
class Logger {
    private static instance: Logger;
    private level = process.env.logLevel;
    private static hierarchy = {
        "DEBUG": 5,
        "INFO": 3,
        "ERROR": 0
    };

    private constructor() {
    }

    log(level, code, message): void {
        const activeLevel = Logger.hierarchy[this.level.toUpperCase()];
        const logLevel = Logger.hierarchy[level.toUpperCase()];

        if (logLevel > activeLevel) {
            return;
        }

        const fmt = {
            level: level.toUpperCase(),
            code: code,
            message
        };

        console.log(JSON.stringify(fmt))
    }

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }

        return Logger.instance;
    }
}

export default Logger
