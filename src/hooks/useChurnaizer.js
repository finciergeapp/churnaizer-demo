import { useEffect } from 'react'; 
 
 function useChurnaizerTracking(user, options = {}) {
   useEffect(() => {
     if (!user || !window.Churnaizer) return;
 
     window.Churnaizer.track({
       user_id: user.id,
       email: user.email,
       customer_name: user.name || user.full_name,
       customer_email: user.email,
       subscription_plan: user.plan || 'free',
       monthly_revenue: user.monthlyRevenue || 0,
       loginCount: user.loginCount || 1,
       dashboardViews: user.dashboardViews || 0,
       feature_usage: {
         dashboard: user.dashboardViews || 0,
         reports: user.reportsGenerated || 0,
         settings: user.settingsAccessed || 0
       },
       // Optional: Pass custom trace_id for end-to-end debugging
       trace_id: options.traceId // Auto-generated if not provided
     }, 'cg_261f34e9bdd5de338ee994e8f99d7809', (result, error) => {
       if (error) {
         console.error('Churnaizer tracking failed:', error);
         return;
       }
       
       console.log('[TRACE] Client received result:', result);
       
       // Handle churn predictions
       if (result.risk_level === 'high') {
         console.log('High churn risk detected:', result.churn_reason);
         // Trigger retention UI, send to analytics, etc.
       }
     });
   }, [user, options.traceId]);
 }
 
 // Usage Examples:
 // Basic: useChurnaizerTracking(currentUser);
 // With trace ID: useChurnaizerTracking(currentUser, { traceId: sessionId });