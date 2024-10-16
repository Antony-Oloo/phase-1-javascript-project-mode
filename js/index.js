// Fetch coupons from the JSON file
const fetchCoupons = async () => {
  try {
    const response = await fetch('coupons.json'); // Adjust path if necessary
    const data = await response.json();
    displayCoupons(data.coupons);
  } catch (error) {
    console.error("Error fetching coupons:", error);
  }
};

// Function to display coupons from JSON
const displayCoupons = (coupons) => {
  const couponRow = document.querySelector('#coupon-list .row'); // Select the row to insert columns

  coupons.forEach(coupon => {
    const couponCard = createCouponCard(coupon);  // Create coupon card using helper function
    couponRow.appendChild(couponCard); // Append each coupon card as a column inside the row
  });
};

// Create a coupon card dynamically (both for fetched and new coupons)
const createCouponCard = (coupon) => {
  const couponCard = document.createElement('div');
  couponCard.className = 'col-md-4 mb-4'; // Bootstrap column classes

  couponCard.innerHTML = `
    <div class="card h-100">
      <img src="${coupon.image}" class="card-img-top" alt="${coupon.brand}">
      <div class="card-body">
        <h5 class="card-title">${coupon.brand}</h5>
        <p class="card-text">${coupon.description}</p>
        <p class="card-text"><strong>${coupon.discount}</strong></p>
        <button class="btn btn-danger delete-coupon">Delete</button>
      </div>
    </div>
  `;

  // Add delete functionality
  const deleteButton = couponCard.querySelector('.delete-coupon');
  deleteButton.addEventListener('click', () => couponCard.remove());

  return couponCard;
};

// Function to add a new coupon dynamically from form input
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

// Bind the addNewCoupon function to form submission
const couponForm = document.getElementById('coupon-form');
couponForm.addEventListener('submit', addNewCoupon);

// Initialize the app
const init = () => {
  fetchCoupons(); // Fetch and display existing coupons
};

document.addEventListener('DOMContentLoaded', init);

