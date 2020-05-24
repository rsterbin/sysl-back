
class ConfigFetcher {

    constructor() {
        this.fetched = false;
        this.vals = {};
    }

    bootstrap() {
        if (this.fetched) {
            return;
        }
        if (typeof(process.env.DATABASE_URL) === 'undefined') {
            console.log('Database specs are missing');
            throw new Error('Cannot proceed; please try again');
        }
        this.vals.database_url = process.env.DATABASE_URL;
        this.fetched = true;
    }

    get(key) {
        if (!this.fetched) {
            this.bootstrap();
        }
        return this.vals[key];
    }
}

module.exports = new ConfigFetcher();
