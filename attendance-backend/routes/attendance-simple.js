const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');

const getDb = () => global.db;

// Helper function
const determineStatus = (checkInTime, checkOutTime) => {
    const checkIn = new Date(checkInTime);
    const hours = checkIn.getHours();
    const minutes = checkIn.getMinutes();
    const isLate = hours > 9 || (hours === 9 && minutes > 30);

    if (checkOutTime) {
        const checkOut = new Date(checkOutTime);
        const hoursWorked = (checkOut - checkIn) / (1000 * 60 * 60);
        if (hoursWorked < 4) return 'half-day';
    }

    return isLate ? 'late' : 'present';
};

// Check in
router.post('/checkin', auth, (req, res) => {
    try {
        const db = getDb();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existing = db.get('attendance')
            .find({ userId: req.user.id, date: today.toISOString() })
            .value();

        if (existing) {
            return res.status(400).json({ message: 'Already checked in today' });
        }

        const checkInTime = new Date();
        const attendance = {
            _id: uuidv4(),
            userId: req.user.id,
            date: today.toISOString(),
            checkInTime: checkInTime.toISOString(),
            checkOutTime: null,
            totalHours: 0,
            status: determineStatus(checkInTime),
        };

        db.get('attendance').push(attendance).write();
        res.json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Check out
router.put('/checkout/:id', auth, (req, res) => {
    try {
        const db = getDb();
        const attendance = db.get('attendance').find({ _id: req.params.id }).value();

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance not found' });
        }

        if (attendance.userId !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        if (attendance.checkOutTime) {
            return res.status(400).json({ message: 'Already checked out' });
        }

        const checkOutTime = new Date();
        const totalHours = (checkOutTime - new Date(attendance.checkInTime)) / (1000 * 60 * 60);
        const status = determineStatus(attendance.checkInTime, checkOutTime);

        db.get('attendance')
            .find({ _id: req.params.id })
            .assign({
                checkOutTime: checkOutTime.toISOString(),
                totalHours,
                status,
            })
            .write();

        const updated = db.get('attendance').find({ _id: req.params.id }).value();
        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get my history
router.get('/my-history', auth, (req, res) => {
    try {
        const db = getDb();
        const attendance = db.get('attendance')
            .filter({ userId: req.user.id })
            .sortBy('date')
            .reverse()
            .value();

        res.json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get my summary
router.get('/my-summary', auth, (req, res) => {
    try {
        const db = getDb();
        const attendance = db.get('attendance')
            .filter({ userId: req.user.id })
            .value();

        const summary = {
            totalDays: attendance.length,
            presentDays: attendance.filter(a => a.status === 'present').length,
            lateDays: attendance.filter(a => a.status === 'late').length,
            halfDays: attendance.filter(a => a.status === 'half-day').length,
            totalHours: attendance.reduce((sum, a) => sum + (a.totalHours || 0), 0),
        };

        res.json(summary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get today's status
router.get('/today', auth, (req, res) => {
    try {
        const db = getDb();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attendance = db.get('attendance')
            .find({ userId: req.user.id, date: today.toISOString() })
            .value();

        res.json(attendance || null);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all attendance (Manager)
router.get('/all', auth, (req, res) => {
    try {
        const db = getDb();
        const attendance = db.get('attendance')
            .sortBy('date')
            .reverse()
            .value();

        res.json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
