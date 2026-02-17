import React from 'react';
import { exportToCSV, generateFilename } from '../../utils/exportUtils';
import './ExportButton.css';

/**
 * Reusable export button component for CSV downloads
 * @param {Array} data - Data to export
 * @param {Array} columns - Column definitions [{key, header}]
 * @param {string} filename - Optional custom filename
 * @param {string} label - Button label
 * @param {boolean} disabled - Disable button
 */
function ExportButton({
    data,
    columns,
    filename,
    label = 'Export to CSV',
    disabled = false
}) {
    const handleExport = () => {
        if (!data || data.length === 0) {
            alert('No data to export');
            return;
        }

        const exportFilename = filename || generateFilename('attendance_export');
        exportToCSV(data, columns, exportFilename);
    };

    return (
        <button
            className="export-button"
            onClick={handleExport}
            disabled={disabled || !data || data.length === 0}
        >
            <span className="export-icon">📥</span>
            {label}
        </button>
    );
}

export default ExportButton;
