// This file consolidates all tracking related functions and initializations

console.log('Tracking module loaded.');

/**
 * Initialize tracking for the current user session
 * This function checks if a user is logged in and tracks their session
 */
function initializeTracking() {
  console.log('Initializing user tracking...');
  
  // Check if user is logged in
  const currentUser = getCurrentUser();
  
  if (currentUser) {
    console.log('User is logged in, tracking session...');
    trackUserWithChurnaizer({
      id: currentUser.id,
      daysSinceSignup: currentUser.days_since_signup || 30,
      monthlyRevenue: currentUser.monthly_revenue || 0,
      plan: currentUser.subscription_plan || 'Free',
      loginCount: currentUser.login_count || 1,
      featuresUsed: currentUser.active_features_used?.length || 1,
      supportTickets: currentUser.support_tickets_opened || 0,
      paymentStatus: currentUser.last_payment_status || 'Success',
      emailOpens: currentUser.email_opens_last30days || 0,
      lastLoginDaysAgo: currentUser.last_login_days_ago || 1,
      billingIssues: currentUser.billing_issue_count || 0
    });
    
    // Track initial login event
    trackUserAction('login', {
      login_count: currentUser.login_count || 1,
      days_since_last_login: currentUser.last_login_days_ago || 0
    });
  } else {
    console.log('No logged in user detected.');
  }
}

/**
 * Track important user actions and interactions that indicate engagement
 * @param {string} actionType - The type of action being tracked (e.g., 'dashboard_view', 'feature_used')
 * @param {object} actionData - Additional data about the action
 */
function trackUserAction(actionType, actionData = {}) {
  if (!window.Churnaizer) {
    console.error('Churnaizer SDK not loaded, cannot track user action:', actionType);
    return;
  }
  
  console.log(`[TRACE] Tracking user action: ${actionType}`, actionData);
  
  // Add to UI event log if available
  addToEventLog(actionType, actionData);
  
  window.Churnaizer.track({
    event_type: actionType,
    user_id: getCurrentUserId(), // Your function to get user ID 
    event_data: actionData,
    timestamp: new Date().toISOString()
  }, 'cg_261f34e9bdd5de338ee994e8f99d7809');
}

/**
 * Add tracking event to the UI event log
 * @param {string} actionType - The type of action being tracked
 * @param {object} actionData - Additional data about the action
 */
function addToEventLog(actionType, actionData) {
  const eventLog = document.getElementById('event-log');
  if (!eventLog) return;
  
  const now = new Date();
  const timestamp = now.toLocaleTimeString();
  
  const li = document.createElement('li');
  
  const timeSpan = document.createElement('span');
  timeSpan.className = 'timestamp';
  timeSpan.textContent = timestamp;
  
  const eventSpan = document.createElement('span');
  eventSpan.className = 'event-type';
  eventSpan.textContent = actionType;
  
  const dataText = document.createTextNode(': ' + JSON.stringify(actionData));
  
  li.appendChild(timeSpan);
  li.appendChild(eventSpan);
  li.appendChild(dataText);
  
  // Add to the top of the list
  if (eventLog.firstChild) {
    eventLog.insertBefore(li, eventLog.firstChild);
  } else {
    eventLog.appendChild(li);
  }
  
  // Limit the number of items in the log
  while (eventLog.children.length > 20) {
    eventLog.removeChild(eventLog.lastChild);
  }
}

// Dummy function to get current user ID if not already defined
if (typeof getCurrentUserId !== 'function') {
  function getCurrentUserId() {
    const currentUser = getCurrentUser(); // Assuming getCurrentUser is available from auth.js
    return currentUser ? currentUser.id : null;
  }
}

// Examples of tracking key actions:

// Track page views
document.addEventListener('DOMContentLoaded', function() {
  // Track page view on load
  trackUserAction('page_view', { 
    page: window.location.pathname,
    referrer: document.referrer
  });
  
  // Set up event listeners for important UI elements
  setupActionTracking();
});

/**
 * Set up event listeners for tracking important user interactions
 */
function setupActionTracking() {
  // Example: Track dashboard views
  const dashboardLinks = document.querySelectorAll('[data-track="dashboard"]');
  dashboardLinks.forEach(link => {
    link.addEventListener('click', () => {
      trackUserAction('dashboard_view', { page: 'main_dashboard' });
    });
  });
  
  // Example: Track feature usage
  const featureButtons = document.querySelectorAll('[data-track="feature"]');
  featureButtons.forEach(button => {
    button.addEventListener('click', () => {
      const feature = button.getAttribute('data-feature');
      trackUserAction('feature_used', { feature: feature || 'unknown' });
    });
  });
  
  // Example: Track support contact clicks
  const supportLinks = document.querySelectorAll('[data-track="support"]');
  supportLinks.forEach(link => {
    link.addEventListener('click', () => {
      trackUserAction('support_contact', { 
        type: link.getAttribute('data-contact-type') || 'general',
        subject: link.getAttribute('data-subject') || 'general_inquiry'
      });
    });
  });
}

// Initialize tracking when the page loads
document.addEventListener('DOMContentLoaded', initializeTracking);