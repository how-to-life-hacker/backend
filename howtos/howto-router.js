const express = require('express');
const HowToRouter = require('./howtoModel')
const router = express.Router();

router.get('/', (req, res) => {
    HowToRouter.get()
    .then(howtos => {
        res.status(200).json(howtos)
    })
    .catch(err => {
        console.log(err).json({message: 'not found'})
    })
})

router.post('/', (req, res) => {
    HowToRouter.add(req.body)
    .then(howto => {
        res.status(201).json(howto)
    })
})

router.get('/:id', (req, res) => {
    HowToRouter.findById(req.params.id)
    .then(howto => {
        res.status(200).json({ data: howto })
    })
    .catch(err => {
        console.log(err).json({message: 'how to not found'})
    })
})

router.put('/:id', (req, res) => {
    HowToRouter.update(req.params.id, req.body)
    .then(howto => {
        res.status(202).json({ message: 'how to updated', data: howto })
    })
    .catch(err => {
        console.log(err)
    })
})

router.delete('/:id', (req, res) => {
    HowToRouter.remove(req.params.id)
    .then(count => {
        if (count) {
            res.status(200).json({message: 'project deleted'})
          } else {
            res.status(404).json({ message: "project not found" });
          }
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router;