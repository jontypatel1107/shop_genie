# 🚀 ShopGenie – No-Code Website Builder for Local Shops

> “Create your shop’s website in minutes — no coding required.”

---

## 🧠 Problem Statement

Small shop owners often struggle to create and manage websites due to:

* Lack of technical knowledge
* High development costs
* Time constraints
* Complex tools like traditional CMS platforms

**ShopGenie solves this by providing a simple, no-code platform to generate websites instantly.**

---

## 💡 Solution

ShopGenie is a **SaaS-based no-code website builder** that allows local shop owners to:

* Create their own website
* Manage products
* Customize layout
* Publish instantly

All without writing a single line of code.

---

## 🏗️ Core Concept

> **Template + Data + Dynamic Routing = Website**

* One system
* Multiple stores
* Dynamically generated websites

---

## ✨ Features

### 🧑‍💼 User Dashboard

* Signup / Login (JWT आधारित authentication)
* Store setup (name, logo, category)

### 🛒 Product Management

* Add / Edit / Delete products
* Upload images
* Categorize items

### 🧩 Website Builder

* Drag-and-drop style editor (UI-based)
* Pre-built templates
* Live preview

### 🌐 Dynamic Website Generation

* Each store gets its own URL:

  ```
  /store/:storeId
  ```
* Data-driven rendering

### 📊 Analytics (Basic)

* Visitors count
* Product views

### ⚙️ Settings

* Store details
* WhatsApp integration
* Domain/subdomain (optional)

---

## 🧪 Tech Stack

### 🎨 Frontend

* React.js
* Tailwind CSS
* React Router

### ⚙️ Backend

* Node.js
* Express.js

### 🗄️ Database

* MongoDB (Mongoose)

### 🔐 Authentication

* JWT (JSON Web Tokens)

### ☁️ Deployment

* Frontend: Vercel / Netlify
* Backend: Render / Railway
* Database: MongoDB Atlas

---

## 🧩 Project Structure

### 📁 Frontend (React)

```
src/
 ├── components/
 ├── pages/
 │    ├── Dashboard.jsx
 │    ├── Products.jsx
 │    ├── Builder.jsx
 │    ├── StoreView.jsx
 ├── services/
 │    └── api.js
 ├── App.jsx
 ├── main.jsx
```

---

### 📁 Backend (Node + Express)

```
server/
 ├── models/
 │    ├── User.js
 │    ├── Store.js
 │    ├── Product.js
 ├── routes/
 ├── controllers/
 ├── middleware/
 ├── server.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/jontypatel1107/shop_genie.git
cd shop_genie
```

---

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## 🌐 Routing System

| Route             | Description     |
| ----------------- | --------------- |
| `/dashboard`      | Admin panel     |
| `/products`       | Manage products |
| `/builder`        | Website editor  |
| `/store/:storeId` | Public website  |

---

## 🔥 Example Flow

1. User signs up
2. Creates a store
3. Adds products
4. Clicks **Publish**
5. Website is live at:

```
/store/123
```

---

## 📸 Future Enhancements

* AI-based website generation 🤖
* Payment integration (Razorpay/Stripe)
* Custom domain support
* Advanced analytics
* Multi-language support

---

## 🎯 Use Case

* Local grocery stores 🛒
* Clothing shops 👕
* Electronics stores 📱
* Small businesses

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Jonty Patel**

* GitHub: https://github.com/jontypatel1107

---

## ⭐ Final Note

ShopGenie is built to empower small shop owners by giving them a **digital identity** without technical barriers.

> “From local shop to online presence — instantly.”
