// churnaizer-sdk.js

// Simulate the Churnaizer SDK
window.Churnaizer = {
    /**
     * Simulates tracking an event with Churnaizer.
     * @param {object} data - The payload to send.
     * @param {string} apiKey - The API key for authorization.
     * @param {function} callback - Callback function to handle the API response or error.
     */
    track: function(data, apiKey, callback) {
        const SUPABASE_PROJECT_URL = "https://ntbkydpgjaswmwruegyl.supabase.co";
        const TRACK_ENDPOINT = `${SUPABASE_PROJECT_URL}/functions/v1/track`;

        console.log("Churnaizer SDK: Sending payload:", data);

        fetch(TRACK_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': apiKey
            },
            body: JSON.stringify({ ...data, api_key: apiKey })
        })
        .then(response => {
            if (!response.ok) {
                // If response is not OK (e.g., 400, 500), parse error message
                return response.json().then(err => {
                    throw new Error(err.message || `HTTP error! status: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(result => {
            console.log("Churnaizer SDK: API response:", result);
            if (callback) {
                callback(null, result); // No error, return result
            }
        })
        .catch(error => {
            console.error("Churnaizer SDK: API error:", error);
            if (callback) {
                callback(error, null); // Return error
            }
        });
    }
};