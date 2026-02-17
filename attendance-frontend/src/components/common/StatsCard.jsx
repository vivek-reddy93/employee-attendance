import React from 'react';
import './StatsCard.css';

/**
 * Reusable stats card component for displaying key metrics
 * @param {string} title - Card title
 * @param {string|number} value - Main value to display
 * @param {string} icon - Icon/emoji to display
 * @param {string} color - Color theme (green, red, blue, orange)
 * @param {string} trend - Optional trend text
 * @param {string} subtitle - Optional subtitle
 */
function StatsCard({ title, value, icon, color = 'blue', trend, subtitle }) {
    return (
        <div className={`stats-card stats-card-${color}`}>
            <div className="stats-card-header">
                <div className="stats-card-icon">{icon}</div>
                <h3 className="stats-card-title">{title}</h3>
            </div>
            <div className="stats-card-body">
                <div className="stats-card-value">{value}</div>
                {subtitle && <div className="stats-card-subtitle">{subtitle}</div>}
                {trend && <div className="stats-card-trend">{trend}</div>}
            </div>
        </div>
    );
}

export default StatsCard;
