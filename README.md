# GApple 🍏

Welcome to **GApple**, your ultimate destination to **order the most delicious food** right from your browser. From spicy starters to mouth-watering desserts, we bring the best restaurant experience to your doorstep.



## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Context API
- **Backend:** Django REST Framework, Python
- **Database:** SQLite (Development)
- **Authentication:** Custom PyOTP (Time-based Email OTP)
- **Payments:** Stripe Integration

---

## 📸 Complete Application Guide

### 1. User Registration
The journey begins with a seamless user registration process. The user fills in their basic details—such as name, email, and password—and clicks on sign up to create a new account. The application uses a clean React form with real-time validation to ensure all fields are correctly formatted before submission to the Django backend.

<img src="gifs/signup.gif" width="100%" alt="User Registration" />
<br>

### 2. Two-Step Email Authentication (OTP)
Security is a top priority. As soon as a user signs up, the system requires 2-step email verification to prevent spam accounts. A unique, time-based OTP (One-Time Password) is generated on the backend and sent to their registered email address. The user opens their inbox, retrieves the OTP, and enters it on the verification screen. Once validated, their account is successfully activated and ready to use.

<img src="gifs/EmailAuthenticationOTP.gif" width="100%" alt="OTP Verification" />
<br>

### 3. Interactive Menu & Cart Management
The core of GApple is its dynamic, interactive menu. Users can effortlessly browse through various food categories (like salads, desserts, etc.) and seamlessly add items to their cart. By clicking the plus and minus icons, they can adjust quantities on the fly with sub-second latency. Clicking the cart button reveals a complete, categorized list of selected items along with the calculated total order amount, powered by the React Context API for global state management.

<img src="gifs/AddItemsToCart.gif" width="100%" alt="Adding items to cart" />
<br>

### 4. Delivery Information
Once the user is satisfied with their cart, they proceed to provide their delivery information. The intuitive form captures essential details like the recipient's name, pincode, full delivery address, and mobile number. This ensures accurate order fulfillment and provides the restaurant with all necessary logistics data.

<img src="gifs/DeliveryInformation.gif" width="100%" alt="Delivery Information" />
<br>

### 5. Stripe Payment Gateway Checkout
Checkout is robust and secure. As soon as the user clicks on "Proceed to Checkout", the secure Stripe payment gateway integration is triggered. The user inputs their card details (using standard Stripe dummy credentials for testing) and completes the payment. Upon success, the order is finalized and placed into the central database.

<img src="gifs/stripePaymentCheckout.gif" width="100%" alt="Stripe Checkout" />
<br>

### 6. Admin Dashboard & Order Tracking
The application features a completely separate, dedicated administrative React portal. The admin logs in using their secure superuser credentials and is immediately greeted by the order list dashboard. This provides a bird's-eye view of all incoming orders, allowing the restaurant staff to track, prepare, and manage deliveries efficiently.

<img src="gifs/AdminDashboardLoginAndOrderList.gif" width="100%" alt="Admin Dashboard" />
<br>

### 7. Adding New Menu Items (Admin)
The admin has full control over the restaurant's offerings through an intuitive CMS interface. Here, the admin demonstrates adding a new "Tiramisu" dessert to the catalog. They fill out the product details, select a category, and upload an image. The frontend handles the image upload via `multipart/form-data`, passing it securely to the Django REST Framework backend to update the database instantly.

<img src="gifs/AddingNewItemFromAdminDashboard.gif" width="100%" alt="Add New Item" />
<br>

### 8. Real-time Catalog Updates
Menu management works both ways, and updates are instantaneous. In this final step, the admin removes the newly created "Tiramisu" from the catalog. Switching back to the user portal and refreshing the page proves that the Tiramisu has instantly disappeared from the public menu, ensuring customers never order out-of-stock items.

<img src="gifs/RemovingItemFromAdminDashboard.gif" width="100%" alt="Remove Item" />
<br>

---

## 💻 Local Setup Instructions

### 1) Prerequisites
Make sure you have Node.js and Python installed on your system. [Download Node.js here](https://nodejs.org/)

### 2) Run the Frontend
```bash
cd food-app
npm install
npm run dev
```
The frontend should now open at `http://localhost:5173`. 
Create a `.env` file in the `food-app` directory and add:
```env
VITE_API_BASE_URL=http://localhost:8000/api/
```

### 3) Run the Backend
```bash
cd food-app/backend
pip install -r requirements.txt
python manage.py runserver
```
Your backend API should be running at `http://localhost:8000`.

### 4) Run the Admin Panel
```bash
cd adminPanel/food-app-admin-panel
npm install
npm run dev
```
The admin panel should now open at `http://localhost:5174`.
Create a `.env` file in the `adminPanel/food-app-admin-panel` directory and add:
```env
VITE_API_BASE_URL=http://localhost:8000/api/
```

---

## 🎬 Full Demo Video
[Watch the complete demo video here](https://drive.google.com/file/d/1Kr5FmL9IeUP-_HypgNcWbT_U43HzmxDN/view?usp=sharing)