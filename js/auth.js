// Dummy function to simulate getting the current user
function getCurrentUser() {
  // In a real application, this would fetch user data from session, local storage, or an API
  // For demonstration purposes, return a dummy user if logged in, or null if not.
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  if (isLoggedIn === 'true') {
    return {
      id: "user_12345",
      email: "churnaizer@gmail.com",
      name: "Test Customer",
      full_name: "Test Customer",
      subscription_plan: "premium",
      monthly_revenue: 99.99,
      login_count: 15,
      dashboard_views: 50,
      days_since_signup: 300,
      number_of_logins_last30days: 15,
      active_features_used: ['featureA', 'featureB'],
      support_tickets_opened: 2,
      last_payment_status: 'paid',
      email_opens_last30days: 10,
      last_login_days_ago: 5,
      billing_issue_count: 0
    };
  }
  return null;
}

// Dummy function to simulate user login
function loginUser() {
  localStorage.setItem('isLoggedIn', 'true');
  console.log('User logged in.');
  // Simulate a successful login and call the tracking function
  const user = getCurrentUser();
  if (user) {
    onUserLogin(user);
  }
}

// Dummy function to simulate user logout
function logoutUser() {
  localStorage.removeItem('isLoggedIn');
  console.log('User logged out.');
}

/**
 * Track user after successful login
 * @param {Object} user - Authenticated user object
 */
function onUserLogin(user) {
  console.log('🔐 User logged in:', user.id);
  
  // Track with Churnaizer using real user data
  trackUserWithChurnaizer({
    id: user.id,
    email: user.email,
    name: user.name || user.full_name,
    days_since_signup: calculateDaysSinceSignup(user.created_at),
    monthly_revenue: parseFloat(user.current_plan_amount) || 0,
    subscription_plan: user.subscription_plan || 'Free',
    number_of_logins_last30days: user.login_count_30days || 1,
    active_features_used: user.features_used?.length || 1,
    support_tickets_opened: user.support_tickets || 0,
    last_payment_status: user.payment_status || 'active',
    email_opens_last30days: user.email_engagement || 0,
    last_login_days_ago: calculateDaysSinceLastLogin(user.last_login),
    billing_issue_count: user.billing_issues || 0
  });
}

/**
 * Calculate days since user signup
 */
function calculateDaysSinceSignup(signupDate) {
  if (!signupDate) return 0;
  const signup = new Date(signupDate);
  const now = new Date();
  return Math.floor((now - signup) / (1000 * 60 * 60 * 24));
}

/**
 * Calculate days since last login
 */
function calculateDaysSinceLastLogin(lastLogin) {
  if (!lastLogin) return 0;
  const login = new Date(lastLogin);
  const now = new Date();
  return Math.floor((now - login) / (1000 * 60 * 60 * 24));
}

// Auto-track on page load for existing sessions
document.addEventListener('DOMContentLoaded', function() {
  const currentUser = getCurrentUser(); // Your function to get current user
  
  if (currentUser) {
    onUserLogin(currentUser);
  }
});