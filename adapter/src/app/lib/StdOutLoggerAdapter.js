class StdOutLoggerAdapter {
    constructor(options) {}
    log(level, message) { log(message) }
}

module.exports = StdOutLoggerAdapter;
