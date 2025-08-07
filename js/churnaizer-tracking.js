/**
 * Tracks user data with Churnaizer SDK to predict churn risk
 * @param {Object} userData - User data object containing all required fields
 */
function trackUserWithChurnaizer(userData) {
  if (!window.Churnaizer) {
    console.error('❌ Churnaizer SDK not loaded');
    return;
  }

  console.log("📦 Sending data to Churnaizer:", userData);

  window.Churnaizer.track({
    user_id: userData.id,
    days_since_signup: userData.daysSinceSignup || 30,
    monthly_revenue: userData.monthlyRevenue || 0,
    subscription_plan: userData.plan || 'Free',
    number_of_logins_last30days: userData.loginCount || 1,
    active_features_used: userData.featuresUsed || 1,
    support_tickets_opened: userData.supportTickets || 0,
    last_payment_status: userData.paymentStatus || 'Success',
    email_opens_last30days: userData.emailOpens || 0,
    last_login_days_ago: userData.lastLoginDaysAgo || 1,
    billing_issue_count: userData.billingIssues || 0
  }, 'cg_4a7ae37e08f0ac064f93b244487e19b8', function(result, error) {
    if (error) {
      console.error('❌ Churnaizer tracking failed:', error);
    } else {
      console.log('✅ Churn prediction result:', result);
    }

    // Optional: Retention logic
    if (result?.risk_level === 'high') {
      showRetentionOffer(result);
    }
  });
}

/**
 * Shows a retention offer to high-risk users based on churn prediction data
 * @param {Object} churnData - The churn prediction data from Churnaizer API
 * @param {string} churnData.risk_level - The risk level (high, medium, low)
 * @param {string} churnData.churn_reason - The reason for potential churn
 * @param {number} churnData.churn_probability - The probability of churn (0-1)
 * @param {Object} churnData.retention_suggestions - Suggested retention strategies
 */
function showRetentionOffer(churnData) {
  console.log('Showing retention offer for:', churnData);
  
  // Get the result element or create one if it doesn't exist
  let resultElement = document.getElementById('result');
  if (!resultElement) {
    resultElement = document.createElement('div');
    resultElement.id = 'result';
    document.body.appendChild(resultElement);
  }
  
  // Format the churn probability as a percentage if available
  const churnProbability = churnData.churn_probability 
    ? `${Math.round(churnData.churn_probability * 100)}%` 
    : 'Unknown';
    
  // Get retention suggestions if available
  const suggestions = churnData.retention_suggestions 
    ? churnData.retention_suggestions 
    : { discount: '20%', message: 'We value your business!' };
  
  // Add a retention offer message to the result element
  const currentContent = resultElement.innerHTML;
  resultElement.innerHTML = `${currentContent}
    <div style="margin-top: 15px; padding: 15px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <h3 style="margin-top: 0; color: #856404;">⚠️ Churn Risk Detected</h3>
      <p>Our system has identified this user as at risk of churning.</p>
      <div style="display: flex; margin: 15px 0;">
        <div style="flex: 1; padding-right: 15px;">
          <p><strong>Reason:</strong> ${churnData.churn_reason || 'Unknown'}</p>
          <p><strong>Risk Level:</strong> ${churnData.risk_level || 'High'}</p>
          <p><strong>Probability:</strong> ${churnProbability}</p>
        </div>
        <div style="flex: 1; border-left: 1px solid #ddd; padding-left: 15px;">
          <p><strong>Recommended Action:</strong></p>
          <p>${suggestions.message || 'Offer a special discount to retain this customer.'}</p>
          <button onclick="alert('Discount applied!')" style="background: #28a745; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; margin-top: 10px;">
            Apply ${suggestions.discount || '20%'} Discount
          </button>
        </div>
      </div>
    </div>
  `;
}