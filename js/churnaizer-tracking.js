/**
 * Track user data with Churnaizer for churn prediction
 * @param {Object} userData - User data with required fields
 */
function trackUserWithChurnaizer(userData) {
  if (!window.Churnaizer) {
    console.error('❌ Churnaizer SDK not loaded');
    return;
  }

  // Validate required fields
  if (!userData.id || !userData.email) {
    console.error('❌ Missing required fields: user_id and email');
    return;
  }

  console.log('[TRACE] Tracking user:', userData.id);

  // Prepare payload with type-safe conversions and real data
  const trackingData = {
    user_id: String(userData.id),
    email: String(userData.email),
    customer_name: String(userData.name || userData.email.split('@')[0]),
    customer_email: String(userData.email),
    days_since_signup: Number(userData.days_since_signup) || 0,
    monthly_revenue: Number(userData.monthly_revenue) || 0,
    subscription_plan: String(userData.subscription_plan || 'Free'),
    number_of_logins_last30days: Number(userData.number_of_logins_last30days) || 1,
    active_features_used: Number(userData.active_features_used) || 1,
    support_tickets_opened: Number(userData.support_tickets_opened) || 0,
    last_payment_status: String(userData.last_payment_status || 'active'),
    email_opens_last30days: Number(userData.email_opens_last30days) || 0,
    last_login_days_ago: Number(userData.last_login_days_ago) || 0,
    billing_issue_count: Number(userData.billing_issue_count) || 0
  };

  window.Churnaizer.track(trackingData, 'cg_261f34e9bdd5de338ee994e8f99d7809', function(result, error) {
    if (error) {
      console.error('❌ Churnaizer tracking failed:', error);
      return;
    }

    console.log('✅ Churn prediction successful:', result);

    // Handle high-risk users with retention logic
    if (result.risk_level === 'high') {
      console.log('⚠️ High churn risk detected:', result.churn_reason);
      showRetentionOffer(result);
    }
  });
}

/**
 * Show retention offer for high-risk users
 * Note: Rate-limited to max 2 emails/second on backend
 */
function showRetentionOffer(churnData) {
  console.log('📧 Retention email triggered (rate-limited):', churnData);
  
  // Show retention modal or notification
  window.Churnaizer.showBadge(
    `We noticed you might need help. Let's connect!`,
    'warning'
  );
  
  // Optional: Custom retention UI
  // showCustomRetentionModal(churnData);
}