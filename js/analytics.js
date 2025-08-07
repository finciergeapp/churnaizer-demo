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
  
  window.Churnaizer.trackEvent({
    event_type: actionType,
    user_id: getCurrentUserId(), // Your function to get user ID 
    event_data: actionData,
    timestamp: new Date().toISOString()
  }, 'cg_261f34e9bdd5de338ee994e8f99d7809');
}

// Dummy function to get current user ID
function getCurrentUserId() {
  const currentUser = getCurrentUser(); // Assuming getCurrentUser is available from auth.js
  return currentUser ? currentUser.id : null;
}

// Examples of analytics events that can be tracked:

/**
 * Common tracking events:
 * - dashboard_view: When user views the dashboard
 * - feature_used: When user uses a specific feature
 * - subscription_change: When user changes subscription plan
 * - support_contact: When user contacts support
 * - login: When user logs in
 * - logout: When user logs out
 * - page_view: When user views a page
 * - button_click: When user clicks a button
 * - form_submit: When user submits a form
 * - error: When an error occurs
 * - search: When user performs a search
 * - purchase: When user makes a purchase
 */

// These examples are now implemented via event listeners in tracking.js