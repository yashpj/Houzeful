
import React, { useState, useEffect } from 'react';

/* 
🎯 WELCOME TO REACT! 

React is a library for building user interfaces. Think of it like building with LEGO blocks:
- Each component is a LEGO block
- You combine blocks to build bigger structures
- When data changes, React automatically updates what the user sees

Let's start with the basics!
*/

const BookingApp = () => {
  /* 
  ===============================================
  LESSON 1: STATE - React's Memory System
  ===============================================
  
  State is how React remembers things. When state changes, 
  React automatically updates what you see on screen.
  
  useState is a "hook" - a special function that gives your component superpowers!
  
  Pattern: const [currentValue, functionToChangeValue] = useState(startingValue);
  */
  
  const [message, setMessage] = useState("Welcome to React!"); // A simple text state
  const [count, setCount] = useState(0); // A number state
  const [isVisible, setIsVisible] = useState(true); // A true/false state

  /* 
  ===============================================
  LESSON 2: MORE COMPLEX STATE
  ===============================================
  
  State can hold any type of data: strings, numbers, objects, arrays
  */
  
  const [user, setUser] = useState(null); // Will hold user info when logged in
  const [events, setEvents] = useState([]); // Array of events
  const [currentPage, setCurrentPage] = useState('home'); // Which page to show
  
  // Form data - we use objects to group related data
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  /* 
  ===============================================
  LESSON 3: useEffect - Doing Things at the Right Time
  ===============================================
  
  useEffect runs code at specific moments:
  - When the component first appears (mounting)
  - When certain values change
  - When the component disappears (cleanup)
  */
  
  // This runs once when the component first loads
  useEffect(() => {
    console.log("Component just loaded! This is like componentDidMount in class components");
    
    // Let's simulate checking if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []); // Empty array = run only once when component mounts

  // This runs every time 'count' changes
  useEffect(() => {
    console.log("Count changed to:", count);
    document.title = `Count: ${count}`;
  }, [count]); // Run when 'count' changes

  /* 
  ===============================================
  LESSON 4: EVENT HANDLERS - Responding to User Actions
  ===============================================
  
  These are functions that run when users interact with your app
  */
  
  const handleButtonClick = () => {
    setCount(count + 1);
    setMessage(`Button clicked ${count + 1} times!`);
  };

  const handleLogin = () => {
    // Simulate login process
    if (loginData.email && loginData.password) {
      const newUser = { 
        email: loginData.email, 
        name: loginData.email.split('@')[0] 
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      setCurrentPage('events');
      
      // Clear the form
      setLoginData({ email: '', password: '' });
    } else {
      alert('Please fill in both email and password!');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCurrentPage('home');
  };

  const handleInputChange = (field, value) => {
    // This is how we update object state properly
    setLoginData({
      ...loginData,  // Copy all existing data
      [field]: value // Update just the field that changed
    });
  };

  /* 
  ===============================================
  LESSON 5: CONDITIONAL RENDERING
  ===============================================
  
  Show different things based on conditions:
  - Use && for "show this IF condition is true"
  - Use ? : for "show this IF true, otherwise show that"
  */

  /* 
  ===============================================
  LESSON 6: COMPONENTS - Building Blocks
  ===============================================
  
  Components are reusable pieces of UI. Think of them as custom HTML elements.
  */

  // A simple component for displaying user info
  const UserInfo = () => (
    <div className="bg-green-100 p-4 rounded-lg mb-4">
      <h3 className="font-bold text-green-800">Welcome, {user.name}!</h3>
      <p className="text-green-600">Email: {user.email}</p>
      <button 
        onClick={handleLogout}
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );

  // Login form component
  const LoginForm = () => (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          value={loginData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter your email"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password:
        </label>
        <input
          type="password"
          value={loginData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter your password"
        />
      </div>
      
      <button
        onClick={handleLogin}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Login
      </button>
    </div>
  );

  // Navigation component
  const Navigation = () => (
    <nav className="bg-blue-600 text-white p-4 mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">🏠 Houzeful</h1>
        <div className="space-x-4">
          <button
            onClick={() => setCurrentPage('home')}
            className={`px-4 py-2 rounded ${currentPage === 'home' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
          >
            Home
          </button>
          {user ? (
            <button
              onClick={() => setCurrentPage('events')}
              className={`px-4 py-2 rounded ${currentPage === 'events' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
            >
              Events
            </button>
          ) : (
            <button
              onClick={() => setCurrentPage('login')}
              className={`px-4 py-2 rounded ${currentPage === 'login' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );

  // Home page component
  const HomePage = () => (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6">React Learning Demo</h2>
      
      {/* Conditional rendering example */}
      {user && <UserInfo />}
      
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-bold mb-4">State Demo</h3>
        
        {/* Show/hide toggle */}
        {isVisible && (
          <div className="bg-yellow-100 p-4 rounded mb-4">
            <p className="text-yellow-800">{message}</p>
          </div>
        )}
        
        <div className="space-x-4 mb-4">
          <button
            onClick={handleButtonClick}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Click me! (Count: {count})
          </button>
          
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            {isVisible ? 'Hide' : 'Show'} Message
          </button>
        </div>
      </div>

      {!user && (
        <div className="bg-gray-100 p-6 rounded-lg">
          <p className="text-gray-600 mb-4">
            👆 Try the buttons above to see React state in action!
            <br />
            Then login to see more features.
          </p>
        </div>
      )}
    </div>
  );

  // Simple events page (we'll expand this later)
  const EventsPage = () => (
    <div>
      <h2 className="text-3xl font-bold mb-6">Events</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-gray-600">
          🚧 Events page coming soon! 
          <br />
          This is where we'll connect to your FastAPI backend.
        </p>
        
        <div className="mt-4 p-4 bg-blue-50 rounded">
          <h4 className="font-bold text-blue-800 mb-2">Next Steps:</h4>
          <ul className="text-blue-600 text-sm space-y-1">
            <li>• Add API calls to fetch events</li>
            <li>• Create event booking functionality</li>
            <li>• Add form validation</li>
            <li>• Implement error handling</li>
          </ul>
        </div>
      </div>
    </div>
  );

  /* 
  ===============================================
  LESSON 7: THE MAIN RENDER - Putting It All Together
  ===============================================
  
  This is where we decide what to show based on our current state
  */

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />
      
      <div className="container mx-auto px-4 py-6">
        {/* This is conditional rendering in action! */}
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'login' && !user && <LoginForm />}
        {currentPage === 'events' && user && <EventsPage />}
        
        {/* Redirect logged-in users away from login */}
        {currentPage === 'login' && user && <EventsPage />}
      </div>

      {/* Debug info - remove this in real apps */}
      <div className="fixed bottom-4 right-4 bg-black text-white p-3 rounded text-xs">
        <div>Current Page: {currentPage}</div>
        <div>User: {user ? user.name : 'Not logged in'}</div>
        <div>Count: {count}</div>
      </div>
    </div>
  );
};

export default BookingApp;

// API configuration for Railway
const getApiBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // In production, Railway will inject the backend URL
    return window.RAILWAY_BACKEND_URL || '/api';
  }
  return 'http://localhost:8000';
};

const API_BASE_URL = getApiBaseUrl();

// import React, { useState, useEffect } from 'react';

// /* 
// 🎯 HOUZEFUL - BOOKING APP WITH API INTEGRATION

// Now we're connecting your React frontend to your FastAPI backend!

// Key concepts you'll learn:
// 1. Making HTTP requests (GET, POST) to your API
// 2. Handling authentication with JWT tokens
// 3. Managing loading states and errors
// 4. Form handling for real data
// */

// const BookingApp = () => {
//   // Authentication state
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('token'));
  
//   // App state
//   const [currentPage, setCurrentPage] = useState('home');
//   const [events, setEvents] = useState([]);
//   const [userBookings, setUserBookings] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Form states
//   const [loginData, setLoginData] = useState({ email: '', password: '' });
//   const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });

//   // API BASE URL - this will change based on deployment
//   const API_BASE_URL = process.env.NODE_ENV === 'production' 
//     ? '/api'  // In production, nginx will proxy /api to backend
//     : 'http://localhost:8000';  // In development, direct to backend

//   /*
//   ===============================================
//   API HELPER FUNCTIONS
//   ===============================================
  
//   These functions handle communication with your FastAPI backend.
//   Think of them as translators between your React app and Python API.
//   */

//   // Generic API call function
//   const apiCall = async (endpoint, options = {}) => {
//     try {
//       const url = `${API_BASE_URL}${endpoint}`;
//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           ...(token && { 'Authorization': `Bearer ${token}` })
//         },
//         ...options
//       };

//       console.log(`Making API call to: ${url}`);
//       const response = await fetch(url, config);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       return await response.json();
//     } catch (err) {
//       console.error('API call failed:', err);
//       throw err;
//     }
//   };

//   // Authentication functions
//   const login = async (email, password) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       // Create form data for OAuth2PasswordRequestForm
//       const formData = new FormData();
//       formData.append('username', email);  // FastAPI OAuth2 expects 'username'
//       formData.append('password', password);

//       const response = await fetch(`${API_BASE_URL}/users/login`, {
//         method: 'POST',
//         body: formData  // Send as form data, not JSON
//       });

//       if (!response.ok) {
//         throw new Error('Invalid credentials');
//       }

//       const data = await response.json();
      
//       // Save token and update state
//       setToken(data.access_token);
//       localStorage.setItem('token', data.access_token);
      
//       // Get user info (you might want to add a /users/me endpoint)
//       setUser({ email, name: email.split('@')[0] });
//       setCurrentPage('events');
//       setLoginData({ email: '', password: '' });
      
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const register = async (name, email, password) => {
//     setLoading(true);
//     setError(null);
    
//     try {
//       await apiCall('/users/register', {
//         method: 'POST',
//         body: JSON.stringify({ name, email, password })
//       });
      
//       // After successful registration, log them in
//       await login(email, password);
      
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     setUserBookings([]);
//     localStorage.removeItem('token');
//     setCurrentPage('home');
//   };

//   // Data fetching functions
//   const fetchEvents = async () => {
//     setLoading(true);
//     try {
//       const data = await apiCall('/events');
//       setEvents(data);
//     } catch (err) {
//       setError('Failed to fetch events');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUserBookings = async () => {
//     if (!token) return;
    
//     try {
//       const data = await apiCall('/bookings/my');
//       setUserBookings(data);
//     } catch (err) {
//       setError('Failed to fetch bookings');
//     }
//   };

//   const createBooking = async (eventId, numberOfTickets = 1) => {
//     try {
//       await apiCall('/bookings', {
//         method: 'POST',
//         body: JSON.stringify({
//           event_id: eventId,
//           number_of_tickets: numberOfTickets
//         })
//       });
      
//       // Refresh bookings after creating one
//       await fetchUserBookings();
//       alert('Booking created successfully!');
      
//     } catch (err) {
//       setError('Failed to create booking');
//     }
//   };

//   // Load data when component mounts or user logs in
//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     if (token && user) {
//       fetchUserBookings();
//     }
//   }, [token, user]);

//   /*
//   ===============================================
//   COMPONENTS
//   ===============================================
//   */

//   const Navigation = () => (
//     <nav className="bg-blue-600 text-white p-4 mb-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">🏠 Houzeful</h1>
//         <div className="space-x-4">
//           <button
//             onClick={() => setCurrentPage('home')}
//             className={`px-4 py-2 rounded ${currentPage === 'home' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
//           >
//             Home
//           </button>
//           <button
//             onClick={() => setCurrentPage('events')}
//             className={`px-4 py-2 rounded ${currentPage === 'events' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
//           >
//             Events
//           </button>
//           {user ? (
//             <>
//               <button
//                 onClick={() => setCurrentPage('bookings')}
//                 className={`px-4 py-2 rounded ${currentPage === 'bookings' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
//               >
//                 My Bookings
//               </button>
//               <button
//                 onClick={logout}
//                 className="px-4 py-2 rounded bg-red-500 hover:bg-red-600"
//               >
//                 Logout ({user.name})
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={() => setCurrentPage('login')}
//                 className={`px-4 py-2 rounded ${currentPage === 'login' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => setCurrentPage('register')}
//                 className={`px-4 py-2 rounded ${currentPage === 'register' ? 'bg-blue-800' : 'hover:bg-blue-700'}`}
//               >
//                 Register
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );

//   const LoginForm = () => (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Login</h2>
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
      
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
//         <input
//           type="email"
//           value={loginData.email}
//           onChange={(e) => setLoginData({...loginData, email: e.target.value})}
//           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//           placeholder="Enter your email"
//         />
//       </div>
      
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
//         <input
//           type="password"
//           value={loginData.password}
//           onChange={(e) => setLoginData({...loginData, password: e.target.value})}
//           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//           placeholder="Enter your password"
//         />
//       </div>
      
//       <button
//         onClick={() => login(loginData.email, loginData.password)}
//         disabled={loading}
//         className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
//       >
//         {loading ? 'Logging in...' : 'Login'}
//       </button>
//     </div>
//   );

//   const RegisterForm = () => (
//     <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
      
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
//         <input
//           type="text"
//           value={registerData.name}
//           onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
//           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//           placeholder="Enter your name"
//         />
//       </div>
      
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
//         <input
//           type="email"
//           value={registerData.email}
//           onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
//           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//           placeholder="Enter your email"
//         />
//       </div>
      
//       <div className="mb-4">
//         <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
//         <input
//           type="password"
//           value={registerData.password}
//           onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
//           className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
//           placeholder="Enter your password"
//         />
//       </div>
      
//       <button
//         onClick={() => register(registerData.name, registerData.email, registerData.password)}
//         disabled={loading}
//         className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50"
//       >
//         {loading ? 'Registering...' : 'Register'}
//       </button>
//     </div>
//   );

//   const EventsPage = () => (
//     <div>
//       <h2 className="text-3xl font-bold mb-6">Available Events</h2>
      
//       {loading && <p className="text-center">Loading events...</p>}
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//           {error}
//         </div>
//       )}
      
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {events.map(event => (
//           <div key={event.id} className="bg-white p-6 rounded-lg shadow-lg">
//             <h3 className="text-xl font-bold mb-2">{event.title}</h3>
//             <p className="text-gray-600 mb-2">{event.description}</p>
//             <p className="text-sm text-gray-500 mb-2">📍 {event.location}</p>
//             <p className="text-sm text-gray-500 mb-2">🎭 {event.genre}</p>
//             <p className="text-sm text-gray-500 mb-4">📅 {new Date(event.date).toLocaleDateString()}</p>
            
//             {user ? (
//               <button
//                 onClick={() => createBooking(event.id)}
//                 className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
//               >
//                 Book Event
//               </button>
//             ) : (
//               <button
//                 onClick={() => setCurrentPage('login')}
//                 className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
//               >
//                 Login to Book
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
      
//       {events.length === 0 && !loading && (
//         <div className="text-center text-gray-500">
//           <p>No events available yet.</p>
//           <p className="text-sm mt-2">Try adding some events through your API!</p>
//         </div>
//       )}
//     </div>
//   );

//   const BookingsPage = () => (
//     <div>
//       <h2 className="text-3xl font-bold mb-6">My Bookings</h2>
      
//       <div className="space-y-4">
//         {userBookings.map(booking => {
//           // Find the event details for this booking
//           const event = events.find(e => e.id === booking.event_id);
          
//           return (
//             <div key={booking.id} className="bg-white p-6 rounded-lg shadow-lg">
//               <h3 className="text-xl font-bold mb-2">
//                 {event ? event.title : `Event ID: ${booking.event_id}`}
//               </h3>
//               {event && (
//                 <>
//                   <p className="text-gray-600 mb-2">{event.description}</p>
//                   <p className="text-sm text-gray-500">📍 {event.location}</p>
//                   <p className="text-sm text-gray-500">📅 {new Date(event.date).toLocaleDateString()}</p>
//                 </>
//               )}
//               <p className="text-sm font-semibold mt-2">
//                 🎫 {booking.number_of_tickets} ticket(s)
//               </p>
//             </div>
//           );
//         })}
//       </div>
      
//       {userBookings.length === 0 && (
//         <div className="text-center text-gray-500">
//           <p>You haven't booked any events yet.</p>
//           <button