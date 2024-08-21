# ShoeVista

ShoeVista is an eCommerce website designed to offer a seamless shopping experience for shoes across various categories including men, women, and kids. The platform features an intuitive interface for searching, sorting, and filtering products to help users find exactly what they’re looking for.

## Features

- **Homepage**:
  - Carousel showcasing featured products.
  - Horizontal bar displaying bestsellers and most rated items.
- **Product Pages**:
  - Separate pages for Men, Women, and Kids categories.
  - Filter products by brand, category, price, and rating.
  - Sort products based on various criteria.
- **User Interaction**:
  - Add items to Wishlist.
  - Add items to Cart.
- **Responsive Design**: Fully responsive layout for a seamless experience on all devices.

## Tech Stack

- **Frontend**:
  - React (with Vite for fast development)
  - Tailwind CSS for styling
- **Backend**:
  - Node.js with Express.js
  - MongoDB for database management
- **APIs**:
  - RESTful API routes for CRUD operations and data retrieval

## How to Run

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/jaswant04/shoevista.git
   cd shoevista

   ```

2. **Install Dependencies**:

   - **Frontend**:
     ```bash
     cd client
     npm install
     ```
   - **Backend**:
     ```bash
     cd server
     npm install
     ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the `server` directory and add your MongoDB connection string and other environment variables.

4. **Run the Development Server**:

   - **Frontend**:
     ```bash
     cd client
     npm run dev
     ```
   - **Backend**:
     ```bash
     cd server
     npm start
     ```

5. Open your browser and navigate to `http://localhost:5173` to view the website.
