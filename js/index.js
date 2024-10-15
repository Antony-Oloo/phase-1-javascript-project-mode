// alert("sample")
// index.js

const couponContainer = document.getElementById('coupon-list');

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

// Function to display coupons
const displayCoupons = (coupons) => {
  coupons.forEach(coupon => {
    const couponCard = document.createElement('div');
    couponCard.className = 'col-md-4 mb-4'; // Bootstrap column classes

    couponCard.innerHTML = `
      <div class="card">
        <img src="${coupon.image}" class="card-img-top" alt="${coupon.brand}">
        <div class="card-body">
          <h5 class="card-title">${coupon.brand}</h5>
          <p class="card-text">${coupon.description}</p>
          <p class="card-text"><strong>${coupon.discount}</strong></p>
        </div>
      </div>
    `;

    couponContainer.appendChild(couponCard);
  });
};

// Initialize the app
const init = () => {
  fetchCoupons();
};

document.addEventListener('DOMContentLoaded', init);
