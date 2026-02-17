/**
 * Export utility functions for CSV generation and download
 */

/**
 * Convert JSON data to CSV format
 * @param {Array} data - Array of objects to convert
 * @param {Array} columns - Array of column definitions {key, header}
 * @returns {string} CSV string
 */
export const jsonToCSV = (data, columns) => {
    if (!data || data.length === 0) return '';

    // Create header row
    const headers = columns.map(col => col.header || col.key).join(',');

    // Create data rows
    const rows = data.map(row => {
        return columns.map(col => {
            const value = row[col.key];
            // Handle values that contain commas or quotes
            if (value === null || value === undefined) return '';
            const stringValue = String(value);
            if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
                return `"${stringValue.replace(/"/g, '""')}"`;
            }
            return stringValue;
        }).join(',');
    });

    return [headers, ...rows].join('\n');
};

/**
 * Download CSV file
 * @param {string} csvContent - CSV content string
 * @param {string} filename - Name of the file to download
 */
export const downloadCSV = (csvContent, filename = 'export.csv') => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
};

/**
 * Export data to CSV and download
 * @param {Array} data - Array of objects to export
 * @param {Array} columns - Array of column definitions
 * @param {string} filename - Name of the file
 */
export const exportToCSV = (data, columns, filename = 'export.csv') => {
    const csv = jsonToCSV(data, columns);
    downloadCSV(csv, filename);
};

/**
 * Generate filename with timestamp
 * @param {string} prefix - Filename prefix
 * @returns {string} Filename with timestamp
 */
export const generateFilename = (prefix = 'export') => {
    const timestamp = new Date().toISOString().split('T')[0];
    return `${prefix}_${timestamp}.csv`;
};
