/**
 * Track user engagement events
 * @param {string} eventType - Type of event
 * @param {Object} eventData - Additional event data
 */
function trackUserEvent(eventType, eventData = {}) {
  const currentUser = getCurrentUser();
  
  if (!currentUser || !window.Churnaizer) {
    console.warn('Cannot track event: user not logged in or SDK not loaded');
    return;
  }

  const eventPayload = {
    event: eventType,
    user_id: String(currentUser.id),
    email: String(currentUser.email),
    customer_name: String(currentUser.name || currentUser.email.split('@')[0]),
    monthly_revenue: Number(currentUser.monthly_revenue) || 0,
    ...eventData
  };

  window.Churnaizer.trackEvent(eventPayload, 'cg_261f34e9bdd5de338ee994e8f99d7809', function(result, error) {
    if (error) {
      console.error('Event tracking failed:', error);
      return;
    }
    console.log('✅ Event tracked:', eventType);
  });
}

// Set up automatic event tracking
document.addEventListener('DOMContentLoaded', function() {
  // Track page views
  trackUserEvent('page_view', {
    page: window.location.pathname,
    referrer: document.referrer
  });
  
  // Track feature usage with data attributes
  document.querySelectorAll('[data-track="feature"]').forEach(element => {
    element.addEventListener('click', () => {
      const feature = element.getAttribute('data-feature');
      trackUserEvent('feature_used', { feature: feature });
    });
  });
  
  // Track dashboard interactions
  document.querySelectorAll('[data-track="dashboard"]').forEach(element => {
    element.addEventListener('click', () => {
      trackUserEvent('dashboard_view', {
        section: element.getAttribute('data-section') || 'main'
      });
    });
  });
  
  // Track support interactions
  document.querySelectorAll('[data-track="support"]').forEach(element => {
    element.addEventListener('click', () => {
      trackUserEvent('support_contact', {
        type: element.getAttribute('data-contact-type') || 'general'
      });
    });
  });
});

// Track user recovery events (for recovered users)
function trackRecoveryEvent(recoveryType, details = {}) {
  trackUserEvent('user_recovery', {
    recovery_type: recoveryType,
    recovery_details: details,
    timestamp: new Date().toISOString()
  });
}