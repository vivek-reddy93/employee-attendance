const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const auth = require('../middleware/auth');

// Helper function to determine status based on check-in time
const determineStatus = (checkInTime, checkOutTime) => {
    const checkIn = new Date(checkInTime);
    const hours = checkIn.getHours();
    const minutes = checkIn.getMinutes();

    // Late if after 9:30 AM
    const isLate = hours > 9 || (hours === 9 && minutes > 30);

    // Half day if less than 4 hours
    if (checkOutTime) {
        const checkOut = new Date(checkOutTime);
        const hoursWorked = (checkOut - checkIn) / (1000 * 60 * 60);
        if (hoursWorked < 4) {
            return 'half-day';
        }
    }

    return isLate ? 'late' : 'present';
};

// @route   POST /api/attendance/checkin
// @desc    Check in for the day
// @access  Private
router.post('/checkin', auth, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if already checked in today
        const existingAttendance = await Attendance.findOne({
            userId: req.user.id,
            date: today,
        });

        if (existingAttendance) {
            return res.status(400).json({ message: 'Already checked in today' });
        }

        const checkInTime = new Date();
        const status = determineStatus(checkInTime);

        const attendance = new Attendance({
            userId: req.user.id,
            date: today,
            checkInTime,
            status,
        });

        await attendance.save();
        res.json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/attendance/checkout/:id
// @desc    Check out for the day
// @access  Private
router.put('/checkout/:id', auth, async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id);

        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }

        if (attendance.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        if (attendance.checkOutTime) {
            return res.status(400).json({ message: 'Already checked out' });
        }

        const checkOutTime = new Date();
        const totalHours = (checkOutTime - attendance.checkInTime) / (1000 * 60 * 60);
        const status = determineStatus(attendance.checkInTime, checkOutTime);

        attendance.checkOutTime = checkOutTime;
        attendance.totalHours = totalHours;
        attendance.status = status;

        await attendance.save();
        res.json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/attendance/my-history
// @desc    Get my attendance history
// @access  Private
router.get('/my-history', auth, async (req, res) => {
    try {
        const { month, year } = req.query;

        let query = { userId: req.user.id };

        if (month && year) {
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, parseInt(month) + 1, 0);
            query.date = { $gte: startDate, $lte: endDate };
        }

        const attendance = await Attendance.find(query).sort({ date: -1 });
        res.json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/attendance/my-summary
// @desc    Get my monthly summary
// @access  Private
router.get('/my-summary', auth, async (req, res) => {
    try {
        const { month, year } = req.query;
        const currentMonth = month || new Date().getMonth();
        const currentYear = year || new Date().getFullYear();

        const startDate = new Date(currentYear, currentMonth, 1);
        const endDate = new Date(currentYear, parseInt(currentMonth) + 1, 0);

        const attendance = await Attendance.find({
            userId: req.user.id,
            date: { $gte: startDate, $lte: endDate },
        });

        const summary = {
            totalDays: attendance.length,
            presentDays: attendance.filter(a => a.status === 'present').length,
            lateDays: attendance.filter(a => a.status === 'late').length,
            absentDays: 0, // Calculate based on working days
            halfDays: attendance.filter(a => a.status === 'half-day').length,
            totalHours: attendance.reduce((sum, a) => sum + (a.totalHours || 0), 0),
        };

        res.json(summary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/attendance/today
// @desc    Get today's attendance status
// @access  Private
router.get('/today', auth, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOne({
            userId: req.user.id,
            date: today,
        });

        res.json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/attendance/all
// @desc    Get all employees' attendance (Manager only)
// @access  Private
router.get('/all', auth, async (req, res) => {
    try {
        const { date, status } = req.query;

        let query = {};

        if (date) {
            const searchDate = new Date(date);
            searchDate.setHours(0, 0, 0, 0);
            query.date = searchDate;
        }

        if (status) {
            query.status = status;
        }

        const attendance = await Attendance.find(query)
            .populate('userId', 'name email employeeId department')
            .sort({ date: -1 });

        res.json(attendance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
