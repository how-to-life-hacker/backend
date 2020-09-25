const server = require('./server')
const request = require('supertest')
const db = require('../data/db-config')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6Im5ld1VzZXIyNCIsImlhdCI6MTYwMTAwMjIyMCwiZXhwIjoxNjAxMTc1MDIwfQ.mQF2eGZjD_BubwGchUyGo8_5ZPskv5dqXFWnEdSYUDY'

describe('post /api/auth/register', () => {
    beforeEach(async () => {
        // empty table and reset primary key back to 1
        await db("users").truncate();
    });
    it('should register a user', async () => {
        const res = await request(server).post('/api/auth/register')
        .send({
            username: "newerUser23",
            password: "newPassword",
            role: 2
        })
        expect(res).toBeDefined()


    })
    it('should return a status code of 201', async () => {
        const res = await request(server).post('/api/auth/register')
        .send({
            username: "newUser24",
            password: "Trythis",
            role: 1
        })
        expect(res.status).toBe(200)
    })
})

describe('Get /api/howtos', () => {
    it('authentication middleware should prevent you from seeing protected route', async () => {
        const res = await request(server).get('/api/howto')
        expect(res.status).toBe(401)
    })
    it('should show howtos with the correct token in the header', async () => {
        const res = await request(server).post('/api/auth/login')
        .send({
            username: "newUser24",
            password: "Trythis"
        })
        const token = res.body.token
        console.log(token)
        const howtos = await request(server).get('/api/howto')
        .set('authorization', token)
        expect(howtos.status).toBe(200)
    })
})

describe('Post /api/howtos', () => {

    it('should post a how to', async () => {        
        const howtos = await db('howto')
        console.log('length of how toIYCDGVF8STDV', howtos.length) 

        const newHowTo = await request(server).post('/api/howto').send({
            name: 'headstand',
            user_id: 3
        }).set('authorization', token) 
        
        const howtos3 = await db('howto')
        console.log('length of how toIYCDGVF8STDV', howtos3.length) 
        
    })
})

describe('Get /api/steps', () => {
    // beforeEach(async () => {
    //     // empty table and reset primary key back to 1
    //     await db("steps").truncate();
    // });
    it('should show a list of steps when making a get req with appropriate header', async () => {
        const steps = await request(server).get('/api/steps')
        .set('authorization', token)
        expect(steps.status).toBe(200)
        
       

    })
    it('should post a step', async () => {
        beforeEach(async () => {
            // empty table and reset primary key back to 1
            await db("steps").truncate();
        });


        await request(server).post('/api/steps').send({
            name: 'steady breathing',
            howto_id: 3
        }).set('authorization', token)
        

        const amountOfSteps = await db('steps')
        expect(amountOfSteps).toHaveLength(1);
    })
})