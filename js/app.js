// Example: After successful login
function onUserLogin(user) {
  // Your existing login logic...
  
  // Track with Churnaizer
  trackUserWithChurnaizer({
    id: user.id,
    email: user.email,
    name: user.full_name || user.name,
    daysSinceSignup: user.days_since_signup || 30,
    monthlyRevenue: user.monthly_revenue || 0,
    plan: user.subscription_plan || 'Free',
    loginCount: user.login_count || 1,
    featuresUsed: user.active_features_used?.length || 1,
    supportTickets: user.support_tickets_opened || 0,
    paymentStatus: user.last_payment_status || 'Success',
    emailOpens: user.email_opens_last30days || 0,
    lastLoginDaysAgo: user.last_login_days_ago || 1,
    billingIssues: user.billing_issue_count || 0,
    dashboardViews: user.dashboard_views || 0
  });
}

// Example: Track on page load for logged-in users
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  const currentUser = getCurrentUser(); // Your function to get current user
  
  if (currentUser) {
    trackUserWithChurnaizer({
      id: currentUser.id,
      email: currentUser.email,
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
  }
});