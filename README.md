🍳 RecipeHub — MERN Stack Recipe Website

RecipeHub is a full-stack recipe website built using the MERN Stack — MongoDB, Express.js, React.js, and Node.js.

The platform allows users to discover recipes, view detailed ingredients and cooking instructions, and manage recipes through a modern and responsive interface.

🚀 Features

🔐 User Authentication & Authorization

🍲 Browse and explore recipes

🔍 Search recipes

📝 View detailed recipe information

➕ Add new recipes

✏️ Edit recipes

🗑️ Delete recipes

❤️ Save/Favorite recipes

📱 Fully responsive design

⚡ REST API integration

🗄️ MongoDB database

🔒 Protected API routes

🛠️ Tech Stack
Frontend

React.js

React Router

Axios

CSS / Tailwind CSS

Backend

Node.js

Express.js

REST API

JWT Authentication

bcrypt.js

Database

MongoDB

Mongoose


⚙️ Installation & Setup
1. Clone the Repository
git clone https://github.com/your-username/recipehub.git
cd recipehub

2. Install Frontend Dependencies
cd client
npm install

3. Install Backend Dependencies
cd ../server
npm install

4. Configure Environment Variables

Create a .env file inside the server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

5. Start the Backend
cd server
npm run dev

6. Start the Frontend

Open another terminal:

cd client
npm run dev


The application will be available at:

http://localhost:5173

🔑 API Features

The backend provides RESTful APIs for:

User registration

User login

Recipe creation

Recipe retrieval

Recipe updating

Recipe deletion

Recipe search

Favorite recipes

Example API endpoints:

POST   /api/auth/register
POST   /api/auth/login

GET    /api/recipes
GET    /api/recipes/:id
POST   /api/recipes
PUT    /api/recipes/:id
DELETE /api/recipes/:id

🔐 Authentication

Authentication is implemented using JWT (JSON Web Tokens).

Passwords are securely hashed using bcrypt.js, and protected routes require a valid authentication token.


🌱 Future Improvements


🧑‍🍳 User profile pages

📸 Image upload using multer

🏷️ Recipe categories and filters

❤️ Personalized recommendations



Built with ❤️ using the MERN Stack.
