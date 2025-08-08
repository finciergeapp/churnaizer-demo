/**
 * Production-ready integration validation
 */
function validateChurnaizerIntegration() {
  console.log('🔍 Validating Churnaizer integration...');
  
  // Check SDK availability
  if (typeof window.Churnaizer === 'undefined') {
    console.error('❌ Churnaizer SDK not found. Check script inclusion.');
    return false;
  }
  
  console.log('✅ SDK loaded, version:', window.Churnaizer.version);
  
  // Check API key configuration
  const apiKey = 'cg_261f34e9bdd5de338ee994e8f99d7809';
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    console.error('❌ API key not configured properly');
    return false;
  }
  
  console.log('✅ API key configured');
  
  // Test with current user if available
  const currentUser = getCurrentUser();
  if (!currentUser) {
    console.warn('⚠️ No user logged in for testing');
    return true;
  }
  
  // Validate required user fields
  const requiredFields = ['id', 'email'];
  const missing = requiredFields.filter(field => !currentUser[field]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required user fields:', missing);
    return false;
  }
  
  console.log('✅ User data validation passed');
  
  // Test actual tracking (only in development/staging)
  if (window.location.hostname === 'localhost' || 
      window.location.hostname.includes('staging')) {
    testUserTracking(currentUser);
  }
  
  return true;
}

/**
 * Test user tracking with production data structure
 */
function testUserTracking(user) {
  console.log('🧪 Testing user tracking...');
  
  trackUserWithChurnaizer({
    id: user.id,
    email: user.email,
    name: user.name || 'Test User',
    days_since_signup: calculateDaysSinceSignup(user.created_at) || 30,
    monthly_revenue: parseFloat(user.current_plan_amount) || 0,
    subscription_plan: user.subscription_plan || 'Free',
    number_of_logins_last30days: user.login_count_30days || 1,
    active_features_used: user.features_used?.length || 1,
    support_tickets_opened: user.support_tickets || 0,
    last_payment_status: user.payment_status || 'active',
    email_opens_last30days: user.email_engagement || 0,
    last_login_days_ago: calculateDaysSinceLastLogin(user.last_login) || 0,
    billing_issue_count: user.billing_issues || 0
  });
}

// Error handling for AI prediction fallbacks
window.addEventListener('error', function(e) {
  if (e.message.includes('Churnaizer')) {
    console.warn('⚠️ Churnaizer fallback logic active:', e.message);
    // Fallback logic is handled automatically by the backend
    // when AI prediction fails (sets risk_level to 'medium')
  }
});

// Run validation on page load
document.addEventListener('DOMContentLoaded', validateChurnaizerIntegration);