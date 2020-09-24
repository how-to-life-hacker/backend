const { intersect } = require('../data/db-config');
const db = require('../data/db-config')
const HowTos = require('./howtoModel')

describe('how to model', () => {
    beforeEach(async () => {
        // empty table and reset primary key back to 1
        await db("howto").truncate();
    });

    describe('add()', () => {
        it("should add how to", async () => {
            const res = await HowTos.add({
                name: "build a castle",
                user_id: 1
            })

            const howtos = await db("howto")

            expect(res).toBeDefined()
        })
    })
})