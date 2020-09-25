const express = require('express');
const StepsDb = require('./stepsModel')
const router = express.Router();

router.get('/', (req, res) => {
    StepsDb.get()
    .then(steps => {
        res.status(200).json(steps)
    })
    .catch(err => {
        console.log(err).json({message: 'not found'})
    })
})

router.post('/', (req, res) => {
    StepsDb.insert(req.body)
    .then(step => {
        res.status(201).json(step)
    })
})

router.get('/:id', (req, res) => {
    StepsDb.get(req.params.id)
    .then(step => {
        res.status(200).json(step)
    })
    .catch(err => {
        console.log(err)
    })
})

router.put('/:id', (req, res) => {
    StepsDb.update(req.params.id, req.body)
    .then(step => {
        res.status(202).json({message: 'step updated', data: step})
    })
    .catch(err => {
        console.log(err)
    })
})

router.delete('/:id', (req, res) => {
    StepsDb.remove(req.params.id)
    .then(count => {
        if (count) {
            res.status(204).json({message: 'step deleted'})
          } else {
            res.status(404).json({ message: "step not found" });
          }
    })
    .catch(err => {
        console.log(err)
    })
})

 




module.exports = router;
