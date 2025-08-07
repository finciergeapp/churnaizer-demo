import { useChurnaizer } from './hooks/useChurnaizer';

function App() {
  const user = useCurrentUser(); // Your user state 
  useChurnaizer(user); 
   
  return <div>Your app content</div>;
}

// Placeholder for useCurrentUser - replace with your actual user state management
function useCurrentUser() {
  // This is a mock user for demonstration purposes.
  // In a real application, you would fetch this from your authentication context or API.
  return {
    id: 'user-123',
    daysSinceSignup: 60,
    monthlyRevenue: 50,
    plan: 'Premium',
    loginCount: 25,
    featuresUsed: 5,
    supportTickets: 2,
    paymentStatus: 'Success',
    emailOpens: 10,
    lastLoginDaysAgo: 5,
    billingIssues: 0
  };
}

export default App;