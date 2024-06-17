const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 })
        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Workout not found' })
    }
    try {
        const workout = await Workout.findById(id)
        if (workout) {
            res.status(200).json(workout)
        } else {
            res.status(404).json({ error: 'Workout not found' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// create a new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body

    // add 
    try {
        const workout = await Workout.create({
            title,
            reps,
            load
        })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Workout not found' })
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body,
    }, { new: true })

    if (!workout) {
        return res.status(404).json({ error: 'Workout not found' })
    }

    res.status(200).json(workout)
}


// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Workout not found' })
    }
    const workout = await Workout.findOneAndDelete({ _id: id })

    if (workout) {
        res.status(200).json({ message: 'Workout deleted successfully', data: workout })
    } else {
        res.status(404).json({ error: 'Workout not found' })
    }
}


module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    updateWorkout,
    deleteWorkout
}