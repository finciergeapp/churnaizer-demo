import { useEffect } from 'react';

export function useChurnaizer(user, options = {}) {
  useEffect(() => {
    if (!user || !window.Churnaizer) return;

    window.Churnaizer.track({
      user_id: user.id,
      days_since_signup: user.daysSinceSignup || 30,
      monthly_revenue: user.monthlyRevenue || 0,
      subscription_plan: user.plan || 'Free',
      number_of_logins_last30days: user.loginCount || 1,
      active_features_used: user.featuresUsed || 1,
      support_tickets_opened: user.supportTickets || 0,
      last_payment_status: user.paymentStatus || 'Success',
      email_opens_last30days: user.emailOpens || 0,
      last_login_days_ago: user.lastLoginDaysAgo || 1,
      billing_issue_count: user.billingIssues || 0
    }, 'cg_261f34e9bdd5de338ee994e8f99d7809', (result, error) => {
      if (error) {
        console.error('Churnaizer error:', error);
        return;
      }
       
      if (result.risk_level === 'high') {
        // Handle high-risk users 
        console.log('High churn risk:', result);
      }
    });
  }, [user]);
}