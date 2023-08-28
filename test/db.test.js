import assert from 'assert'
import Greetings from '../Greetings_factory_function.js';
import pgPromise from 'pg-promise';

const pgp = pgPromise()
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://thegreetingtable_user:UM0BU5h6AUxD7d7Y1X7aoI3PfyMgLcm5@dpg-cjd021fdb61s73ahmqdg-a.oregon-postgres.render.com/thegreetingtable?ssl=true'
const config = {
    connectionString: DATABASE_URL
}
const db = pgp(config);

//test cases
describe('Greetings Module', function () {
    this.timeout(20000);
    let greetings = Greetings(db);
    // Before running tests, initialize the test database and create the "greetedNames" table
    beforeEach(async function () {
        try {
            // clean the tables before each test run
            await db.none("TRUNCATE TABLE namesGreeted RESTART IDENTITY CASCADE;");
        } catch (err) {
            console.log(err);
            throw err;
        }
    });

    it('should increment the count for an existing name', async function () {
        await greetings.setGreeting('Jane');
        await greetings.setGreeting('Jane');
        const count = await greetings.getGreetCount('Jane');
        assert.equal(2, count);

    });

    it('should retrieve greeted names', async function () {
        await greetings.setGreeting('Alice');
        await greetings.setGreeting('Bob');
        await greetings.setGreeting('John');
        const greetedNames = await greetings.greetedNames();
        assert.deepEqual(['Alice', 'Bob', 'John'], greetedNames);

    });

    it('should clear the greeted names', async function () {
        await greetings.setGreeting('Charlie');
        await greetings.clearButton();
        const count = await greetings.counter();
        assert.equal(0, count);

    });

    after(function () {
        db.$pool.end
    })
});
