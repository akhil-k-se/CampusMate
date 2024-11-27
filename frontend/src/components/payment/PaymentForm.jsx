import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const PaymentPage = () => {
  
  return (
    <div className='flex h-[100vh] items-center justify-center'>
    <img src="https://imgs.search.brave.com/RuQglsvyf0dJBxSc67QEyb5qDnTXlWsN8ybsWBppvbw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9jYXJ0b29uLXdv/cmttYW4td2l0aC1w/bmV1bWF0aWMtZHJp/bGwtd29ya3MtcHJv/Z3Jlc3MtY29uY2Vw/dF83NjQ2NjQtMjg2/NS5qcGc_c2VtdD1h/aXNfaHlicmlk" alt="Work in Progress" 
    className='h-[100vh] w-[80vw]'
    />
    </div>
  );
};

export default PaymentPage;







// import React, { useState } from 'react';
// import 'tailwindcss/tailwind.css';

// const PaymentPage = () => {
//   const [name, setName] = useState('');
//   const [address, setAddress] = useState('');
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiryDate, setExpiryDate] = useState('');
//   const [cvc, setCvc] = useState('');
//   const [notification, setNotification] = useState('');

//   const handleCardNumberChange = (e) => {
//     const value = e.target.value.replace(/\s+/g, ''); // Remove spaces
//     if (/^\d{0,16}$/.test(value)) {
//       const formattedValue = value
//         .replace(/(\d{4})(?=\d)/g, '$1 ')
//         .trim();
//       setCardNumber(formattedValue);
//     }
//   };

//   const handleCvcChange = (e) => {
//     const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
//     if (value.length <= 3) {
//       setCvc(value);
//     }
//   };

//   const handlePayment = () => {
//     setNotification('Payment Successful!');
//   };

//   const getCurrentDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     return `${year}-${month}`;
//   };

//   return (
//     <div
//       className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
//       style={{ backgroundImage: "url(`frontend/assets/room-3.jpg`)" }} // Replace 'your-image-url.jpg' with your actual image URL
//     >
//       {/* Optional overlay for better contrast */}
//       <div className="absolute inset-0 bg-black opacity-50"></div>
      
//       <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full z-10 transform hover:-translate-y-2 transition-transform">
//         <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Payment Page</h2>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-2">User Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-2">Address</label>
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-2">Credit/Debit Card Number</label>
//           <input
//             type="text"
//             value={cardNumber}
//             onChange={handleCardNumberChange}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-2">Expiry Date</label>
//           <input
//             type="month"
//             value={expiryDate}
//             onChange={(e) => setExpiryDate(e.target.value)}
//             min={getCurrentDate()}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label className="block text-gray-700 font-semibold mb-2">CVC</label>
//           <input
//             type="password"
//             value={cvc}
//             onChange={handleCvcChange}
//             maxLength={3}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>
//         <button
//           className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700 transform hover:-translate-y-1 transition-transform"
//           onClick={handlePayment}
//         >
//           Make Payment
//         </button>
//         {notification && (
//           <div className="mt-6 p-4 bg-green-500 text-white font-semibold rounded-lg shadow-lg">
//             <span>✓ {notification}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;

