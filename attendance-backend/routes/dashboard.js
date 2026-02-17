const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const auth = require('../middleware/auth');

// @route   GET /api/dashboard/employee
// @desc    Get employee dashboard data
// @access  Private
router.get('/employee', auth, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const monthStart = new Date(currentYear, currentMonth, 1);
        const monthEnd = new Date(currentYear, currentMonth + 1, 0);

        // Get monthly attendance
        const monthlyAttendance = await Attendance.find({
            userId: req.user.id,
            date: { $gte: monthStart, $lte: monthEnd },
        });

        // Get recent attendance (last 7 days)
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentAttendance = await Attendance.find({
            userId: req.user.id,
            date: { $gte: sevenDaysAgo },
        }).sort({ date: -1 }).limit(7);

        // Calculate stats
        const stats = {
            presentDays: monthlyAttendance.filter(a => a.status === 'present').length,
            absentDays: 0,
            lateDays: monthlyAttendance.filter(a => a.status === 'late').length,
            totalHours: monthlyAttendance.reduce((sum, a) => sum + (a.totalHours || 0), 0),
            attendancePercentage: monthlyAttendance.length > 0
                ? ((monthlyAttendance.filter(a => a.status !== 'absent').length / monthlyAttendance.length) * 100).toFixed(1)
                : 0,
        };

        // Get weekly trend (last 7 days)
        const weeklyTrend = recentAttendance.reverse().map(a => ({
            date: a.date,
            hours: a.totalHours || 0,
            status: a.status,
        }));

        res.json({
            stats,
            recentAttendance,
            weeklyTrend,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/dashboard/manager
// @desc    Get manager dashboard data
// @access  Private
router.get('/manager', auth, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get today's attendance for all employees
        const todayAttendance = await Attendance.find({ date: today })
            .populate('userId', 'name employeeId department');

        const stats = {
            totalEmployees: todayAttendance.length,
            present: todayAttendance.filter(a => a.status === 'present').length,
            late: todayAttendance.filter(a => a.status === 'late').length,
            absent: 0, // Calculate based on total employees
        };

        res.json({
            stats,
            todayAttendance,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
