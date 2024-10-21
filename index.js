
/**.....................................BUSINESS LOGIC...................................*/
 //Handles core operations like fetching data, generating coupon codes, and coupon management.
 

// Fetch coupons from the JSON
const fetchCoupons = async () => {
  try {
    const response = await fetch('https://phase-1-javascript-project-mode-1.onrender.com');
    const data = await response.json();
    displayCoupons(data.coupons); // Pass fetched data to the UI logic for rendering
  } catch (error) {
    console.error("Error fetching coupons:", error);
  }
};

// Function to generate a random coupon code (for redemption)
const generateCouponCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 10; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

// Function to add a new coupon dynamically from form input (creates a coupon and appends it)
const addNewCoupon = (event) => {
  event.preventDefault();
  
  const newCoupon = {
    brand: document.getElementById('brand').value,
    description: document.getElementById('description').value,
    discount: document.getElementById('discount').value,
    image: document.getElementById('image').value
  };

  // Create coupon card
  const couponCard = createCouponCard(newCoupon);
  
  // Append new coupon to the coupon list (at the bottom)
  const couponRow = document.querySelector('#coupon-list .row');
  couponRow.appendChild(couponCard);

  // Clear the form after submission
  couponForm.reset();
};

/**.........................................UI Logic:............................................*/
 //Responsible for updating the DOM and handling user interactions.


// Function to display coupons from JSON
const displayCoupons = (coupons) => {
  const couponRow = document.querySelector('#coupon-list .row'); // Select the row to insert columns

  coupons.forEach(coupon => {
    const couponCard = createCouponCard(coupon);  // Create coupon card using helper function
    couponRow.appendChild(couponCard); // Append each coupon card as a column inside the row
  });
};

// Function to open the QR code popup and generate the QR code
const openQrPopup = (couponBrand, couponCode) => {
  const qrPopup = document.getElementById('qr-popup');
  const qrMessage = document.getElementById('qr-message');
  const qrCodeContainer = document.getElementById('qrcode');

  // Set the custom message in the popup
  qrMessage.textContent = `Congratulations on unlocking the coupon for ${couponBrand}!\nUse this QR code to redeem your coupon at the nearest store.\nCoupon Code: ${couponCode}`;

  // Clear previous QR code (if any)
  qrCodeContainer.innerHTML = '';

  // Generate new QR code
  new QRCode(qrCodeContainer, {
    text: `https://github.com/Antony-Oloo/phase-1-javascript-project-mode/redeem?code=${couponCode}`,
    width: 128,
    height: 128
  });

  // Display the QR code popup
  qrPopup.style.display = 'block';

  // Close button functionality
  const closeButton = document.querySelector('.close');
  closeButton.onclick = () => {
    qrPopup.style.display = 'none';  // Hide popup on close
  };

  // Close popup if user clicks outside of it
  window.onclick = (event) => {
    if (event.target === qrPopup) {
      qrPopup.style.display = 'none';  // Hide popup when clicking outside of it
    }
  };
};

// Create a coupon card dynamically (both for fetched and new coupons)
const createCouponCard = (coupon) => {
  const couponCard = document.createElement('div');
  couponCard.className = 'col-md-4 mb-4'; // This is Bootstrap column classes

  couponCard.innerHTML = `
    <div class="card h-100">
      <img src="${coupon.image}" class="card-img-top" alt="${coupon.brand}">
      <div class="card-body">
        <h5 class="card-title">${coupon.brand}</h5>
        <p class="card-text">${coupon.description}</p>
        <p class="card-text"><strong>${coupon.discount}</strong></p>
        <button class="btn btn-success get-coupon">Get Coupon</button>
        <button class="btn btn-danger delete-coupon">Delete</button>
      </div>
    </div>
  `;

  // Add delete functionality
  const deleteButton = couponCard.querySelector('.delete-coupon');
  deleteButton.addEventListener('click', () => couponCard.remove());

  // Add get coupon functionality to display QR code
  const getCouponButton = couponCard.querySelector('.get-coupon');
  getCouponButton.addEventListener('click', () => {
    const couponCode = generateCouponCode();  // Generate a coupon code
    openQrPopup(coupon.brand, couponCode);    // Display the QR popup with code
  });

  return couponCard;
};

// Event Listeners and Initialization:

// Bind the addNewCoupon function to form submission
const couponForm = document.getElementById('coupon-form');
couponForm.addEventListener('submit', addNewCoupon);

// Initialize the app
const init = () => {
  fetchCoupons(); // Fetch and display existing coupons
};

document.addEventListener('DOMContentLoaded', init);
