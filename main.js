// main.js - Main application initialization and event handlers

// Example testUser object with all required fields for Churnaizer tracking
const testUser = {
    id: "user_12345",
    email: "churnaizer@gmail.com",
    name: "Test Customer",
    full_name: "Test Customer", // Added for customer_name fallback
    plan: "premium",
    monthlyRevenue: 99.99,
    loginCount: 15,
    dashboardViews: 50,
    reportsGenerated: 10, // Example for feature_usage.reports
    settingsAccessed: 5,
    days_since_signup: 300,
    number_of_logins_last30days: 15,
    active_features_used: ['featureA', 'featureB'],
    support_tickets_opened: 2,
    last_payment_status: 'paid',
    email_opens_last30days: 10,
    last_login_days_ago: 5,
    billing_issue_count: 0
};

/**
 * Function to trigger tracking of the test user.
 * This function is called when the "Track User" button is clicked.
 */
function trackTestUser() {
    console.log("Attempting to track test user...");
    trackUserWithChurnaizer(testUser);
}

/**
 * Function to simulate viewing a dashboard
 */
function viewDashboard() {
    console.log("User viewed dashboard");
    // This will be tracked via the data-track attribute
    
    // Update the API response area with a simulated dashboard view
    const apiResponse = document.getElementById('apiResponse');
    if (apiResponse) {
        apiResponse.textContent = "Dashboard loaded successfully!";
    }
}

/**
 * Function to simulate generating a report
 */
function generateReport() {
    console.log("User generated a report");
    // This will be tracked via the data-track attribute
    
    // Update the API response area with a simulated report generation
    const apiResponse = document.getElementById('apiResponse');
    if (apiResponse) {
        apiResponse.textContent = "Report generated successfully!\nDownload will start automatically.";
    }
}

/**
 * Function to simulate contacting support
 */
function contactSupport() {
    console.log("User contacted support");
    // This will be tracked via the data-track attribute
    
    // Update the API response area with a simulated support contact
    const apiResponse = document.getElementById('apiResponse');
    if (apiResponse) {
        apiResponse.textContent = "Support ticket created!\nA representative will contact you shortly.";
    }
}

// Attach event listeners to all buttons
document.addEventListener('DOMContentLoaded', () => {
    // Track User button
    const trackButton = document.getElementById('trackUserButton');
    if (trackButton) {
        trackButton.addEventListener('click', trackTestUser);
    }
    
    // Dashboard button
    const dashboardButton = document.getElementById('dashboardButton');
    if (dashboardButton) {
        dashboardButton.addEventListener('click', viewDashboard);
    }
    
    // Report button
    const reportButton = document.getElementById('reportButton');
    if (reportButton) {
        reportButton.addEventListener('click', generateReport);
    }
    
    // Support button
    const supportButton = document.getElementById('supportButton');
    if (supportButton) {
        supportButton.addEventListener('click', contactSupport);
    }
    
    // Log initial page load
    console.log("Application initialized and ready");
});