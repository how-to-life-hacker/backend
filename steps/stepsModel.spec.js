const { intersect } = require('../data/db-config');
const db = require('../data/db-config')
const Steps = require('./stepsModel')

describe('steps model', () => {
    

    describe('insert()', () => {
        beforeEach(async () => {
            // empty table and reset primary key back to 1
            await db("steps").truncate();
        });
        it("should add a step to a given how to", async () => {
            const res = await Steps.insert({
                name: "deeper breathes",
                howto_id: 3
            })
            expect(res).toBeDefined()
            console.log(res)
            expect(res.id).toBe(1)
       
        
        })
    })
    describe('remove', () => {
        it('should remove selected step', async () => {
            const count = await Steps.remove(1)
            console.log(count)
            expect(count).toBe(1)
        })
    })
})