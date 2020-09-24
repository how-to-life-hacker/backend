const server = require('./server')
const request = require('supertest')
const db = require('../data/db-config')

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