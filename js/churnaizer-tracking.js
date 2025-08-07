/**
 * Tracks user data with Churnaizer SDK to predict churn risk
 * @param {Object} userData - User data object containing all required fields
 */
function trackUserWithChurnaizer(userData) {
  if (!window.Churnaizer) {
    console.error('Churnaizer SDK not loaded');
    const resultElement = document.getElementById('result');
    if (resultElement) {
      resultElement.innerHTML = `<p style="color: red;">❌ Error: Churnaizer SDK not loaded. Please check your script inclusion.</p>`;
    }
    return;
  }

  console.log('[TRACE] Sending user data to Churnaizer:', userData);

  // Prepare payload with all required fields and safe defaults
  // Following the guidelines from the Churnaizer documentation
  window.Churnaizer.track({
    // Required user identification fields
    user_id: userData.id || 'unknown',
    email: userData.email || 'unknown',
    customer_name: userData.name || 'unknown',
    customer_email: userData.email || 'unknown',
    
    // Subscription and revenue information
    subscription_plan: userData.plan || 'free',
    monthly_revenue: userData.monthlyRevenue || 0,
    
    // Usage metrics
    loginCount: userData.loginCount || 0,
    dashboardViews: userData.dashboardViews || 0,
    
    // Feature usage breakdown
    feature_usage: {
      dashboard: userData.dashboardViews || 0,
      reports: userData.reportsGenerated || 0,
      settings: userData.settingsAccessed || 0
    },
    
    // Additional required fields with defaults
    days_since_signup: userData.days_since_signup || 0,
    number_of_logins_last30days: userData.number_of_logins_last30days || 0,
    active_features_used: userData.active_features_used || [],
    support_tickets_opened: userData.support_tickets_opened || 0,
    last_payment_status: userData.last_payment_status || 'unknown',
    email_opens_last30days: userData.email_opens_last30days || 0,
    last_login_days_ago: userData.last_login_days_ago || 0,
    billing_issue_count: userData.billing_issue_count || 0
  }, 'cg_261f34e9bdd5de338ee994e8f99d7809', function(result, error) {
    // Update result display if available
    const resultElement = document.getElementById('result');
    
    if (error && error.message) {
      console.error('Churnaizer tracking failed:', error);
      if (resultElement) {
        resultElement.innerHTML = `<p style="color: red;">❌ Error: ${error.message || 'Unknown error'}</p>`;
      }
      return;
    }
    
    // Result is the first parameter in the new API format
    console.log('[TRACE] Client received result:', result);
    
    // Display the API response in the test page if result element exists
    if (resultElement) {
      resultElement.innerHTML = `
        <p style="color: green;">✅ Tracking successful!</p>
        <pre style="background: #f5f5f5; padding: 10px; border-radius: 5px; overflow: auto;">${JSON.stringify(result, null, 2)}</pre>
      `;
    }
    
    // Handle high-risk users 
    if (result && result.risk_level === 'high') {
      console.log('⚠️ High churn risk detected:', result.churn_reason);
      // You can trigger custom retention actions here 
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