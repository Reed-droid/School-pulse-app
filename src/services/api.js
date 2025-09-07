// API service for Expo Go - School Pulse Backend
const LOCAL_IP = '192.168.29.132'; // ← YOUR ACTUAL IP
const BASE_URL = `http://${LOCAL_IP}:8000/api`;

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  try {
    console.log(`📡 Calling: ${BASE_URL}${endpoint}`);
    
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log(`✅ Response from ${endpoint}:`, data);
    return data;
  } catch (error) {
    console.error(`❌ API Error (${endpoint}):`, error.message);
    throw new Error(`Network error: ${error.message}`);
  }
};

// Submit a delay log entry
export const submitDelayLog = async (delayData) => {
  const payload = {
    teacher: delayData.teacherName || 'Unknown Teacher',
    delay_type: delayData.delayType || 'Unknown',
    timestamp: delayData.timestamp || new Date().toISOString().split('T')[0],
  };

  console.log('📝 Submitting delay:', payload);
  return apiCall('/delay-logs', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

// Submit an infraction
export const submitInfraction = async (infractionData) => {
  const payload = {
    student: infractionData.studentName || 'Unknown Student',
    category: infractionData.category || 'General',
    action: infractionData.isPositive ? 'Positive' : 'Negative',
    timestamp: infractionData.timestamp || new Date().toISOString().split('T')[0],
  };

  console.log('📝 Submitting infraction:', payload);
  return apiCall('/infractions', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};

// Get insights and analytics
export const getInsights = async () => {
  console.log('📊 Fetching insights...');
  return apiCall('/insights');
};

// Test API connection
export const testConnection = async () => {
  try {
    console.log('🔗 Testing backend connection...');
    const response = await fetch(`${BASE_URL}/insights`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const isConnected = response.ok;
    console.log('📡 Backend connection:', isConnected ? '✅ Connected' : '❌ Failed');
    return isConnected;
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    return false;
  }
};

// Get connection info for debugging
export const getConnectionInfo = () => {
  return {
    baseUrl: BASE_URL,
    localIp: LOCAL_IP,
    status: 'configured',
    message: 'Make sure backend is running: uvicorn main:app --reload'
  };
};

export default {
  BASE_URL,
  submitDelayLog,
  submitInfraction,
  getInsights,
  testConnection,
  getConnectionInfo,
};