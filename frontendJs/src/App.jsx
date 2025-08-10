
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