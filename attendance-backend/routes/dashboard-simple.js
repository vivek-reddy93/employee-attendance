const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const getDb = () => global.db;

// Employee dashboard
router.get('/employee', auth, (req, res) => {
    try {
        const db = getDb();
        const attendance = db.get('attendance')
            .filter({ userId: req.user.id })
            .sortBy('date')
            .reverse()
            .value();

        const recentAttendance = attendance.slice(0, 7);

        const stats = {
            presentDays: attendance.filter(a => a.status === 'present').length,
            absentDays: 0,
            lateDays: attendance.filter(a => a.status === 'late').length,
            totalHours: attendance.reduce((sum, a) => sum + (a.totalHours || 0), 0),
            attendancePercentage: attendance.length > 0
                ? ((attendance.filter(a => a.status !== 'absent').length / attendance.length) * 100).toFixed(1)
                : 0,
        };

        const weeklyTrend = recentAttendance.map(a => ({
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

// Manager dashboard
router.get('/manager', auth, (req, res) => {
    try {
        const db = getDb();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayAttendance = db.get('attendance')
            .filter({ date: today.toISOString() })
            .value();

        const stats = {
            totalEmployees: todayAttendance.length,
            present: todayAttendance.filter(a => a.status === 'present').length,
            late: todayAttendance.filter(a => a.status === 'late').length,
            absent: 0,
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
