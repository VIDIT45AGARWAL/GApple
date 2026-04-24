# GApple 🍏
Welcome to **GApple**, your ultimate destination to **order the most delicious food** right from your browser. From spicy starters to mouth-watering desserts, we bring the best restaurant experience to your doorstep.

---

## 🚀 How to Setup

### 1) Install Node.js

Make sure you have Node.js installed on your system. [Download Node.js here](https://nodejs.org/)

---

### 2) Run the Frontend

```bash
cd food-app
npm install
npm run dev
```

The frontend should now open at http://localhost:5173
Create a .env file in the same food-app directory and paste the following inside:
```
VITE_API_BASE_URL=http://localhost:8000/api/
```

### 3) Run the Backend

```bash
cd food-app
cd backend
pip install -r requirements.txt
python3 manage.py runserver
```

Your backend API should be running at http://localhost:8000

### 4) Run the Admin Panel

```bash
cd adminPanel
cd food-app-admin-panel
npm install
npm run dev
```

The admin panel should now open at http://localhost:5174
Create a .env file in the same food-app directory and paste the following inside:
```
VITE_API_BASE_URL=http://localhost:8000/api/
```

## 🎬 Demo Video
[Demo Video](https://drive.google.com/file/d/1mSxXxW8Vrv2qjAw-7RjovLzQf0KR0dt8/view?usp=sharing)
