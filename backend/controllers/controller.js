export const testWithAuth = async (req, res, next) => {
    try {
      console.log('🔑 Authenticated request received');
      console.log('🧩 User details from token:', req.user);
  
      res.json({ message: '🎉 Tested API with authentication' });
    } catch (error) {
      console.error('❌ Error in testWithAuth:', error);
      next(error); // Pass to global error handler
    }
  };
  



// call it in frontend like this
//   const callTestWithAuth = async () => {
//     try {
//       console.log('📤 Sending request to /api/test-with-auth');
  
//       const token = localStorage.getItem('authToken');
  
//       if (!token) {
//         console.error('No token found in localStorage');
//         toast.error('Authentication token not found. Please login again.');
//         return; // ✅ Important: Stop function execution
//       }
  
//       const response = await fetch('http://localhost:5000/api/test-with-auth', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({})
//       });
  
//       const data = await response.json();
  
//       console.log('📥 Response received:', response);
  
//       if (!response.ok) {
//         console.error('Server responded with error:', data.message);
//         toast.error(data.message || 'Server error occurred');
//         return; // ✅ Stop here
//       }
  
//       console.log('✅ Data from backend:', data);
//       toast.success(data.message || 'Request successful!');
  
//     } catch (error) {
//       console.error('❌ Network/Error:', error);
//       toast.error(`Network Error: ${error.message}`);
//     }
//   };