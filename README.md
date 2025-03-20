# **Branch & Employee Management API**

## **Project Overview**
This API allows users to manage **branches and employees** efficiently. It provides:
- **Branch Management** – Create, update, delete, and retrieve branch records.
- **Employee Management** – Add, modify, remove, and get employee details.
- **REST API Design** – Easy to connect with web and mobile applications.
- **Security Features** – Uses authentication, CORS, and environment variables.
- **Live API Documentation** – View all API endpoints using Swagger.

### **Public API Documentation**
- **API Documentation:** [View API Documentation](https://jasleenkalsi.github.io/api-docs/)
- **GitHub Repository:** [GitHub Link](https://github.com/jasleenkalsi/BackEnd_Assignment-2.git)

---

## **Installation Instructions**

### **Step 1: Clone the Repository**

git clone https://github.com/YOUR_USERNAME/api-docs.git
cd api-docs


### **Step 2: Install Dependencies**

npm install


### **Step 3: Set Up Environment Variables**
Create a `.env` file in the project folder and add:

PORT=3003
FIREBASE_CONFIG= back-end-project-3d9fe-firebase-adminsdk-fbsvc-35334a5138
FIREBASE_API_KEY=AIzaSyD8rdmpZ1RqXimrt7f6Tv4QNvZq17MKqik
FIREBASE_AUTH_DOMAIN=back-end-project-3d9fe.firebaseapp.com
FIREBASE_PROJECT_ID=back-end-project-3d9fe
FIREBASE_STORAGE_BUCKET=back-end-project-3d9fe.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=249720171786
FIREBASE_APP_ID=1:249720171786:web:709d155e5441f457615ef3

**Do not share your `.env` file or commit it to GitHub.**

### **Step 4: Start the API**
npm run start
The API will be available at:  
**http://localhost:3003**

---

## **API Requests Examples (TypeScript)**

### **Get All Branches**
```ts
import axios from "axios";

const API_URL = "http://localhost:3003/api/v1/branches";

async function fetchBranches() {
  try {
    const response = await axios.get(API_URL);
    console.log("Branches:", response.data);
  } catch (error) {
    console.error("Error fetching branches:", error);
  }
}

fetchBranches();
```

### **Add a New Branch**
```ts
async function addBranch() {
  try {
    const response = await axios.post(API_URL, {
      name: "New Branch",
      address: "123 Main St",
      phone: "123-456-7890",
    });
    console.log("Branch created:", response.data);
  } catch (error) {
    console.error("Error creating branch:", error);
  }
}

addBranch();
```

### **Update a Branch**
```ts
async function updateBranch(branchId: string) {
  try {
    const response = await axios.put(`${API_URL}/${branchId}`, {
      name: "Updated Branch Name",
      address: "456 New St",
      phone: "987-654-3210",
    });
    console.log("Branch updated:", response.data);
  } catch (error) {
    console.error("Error updating branch:", error);
  }
}

updateBranch("branch123");


## **Security and Best Practices**

### **1. Secure API Keys**
- Store API keys in the `.env` file.
- Do not share API keys in public repositories.

### **2. Use HTTPS in Production**
- Use HTTPS to keep data safe.

### **3. Restrict API Access**
Update the **CORS settings** in `server.ts`:

app.use(cors({
  origin: ["https://your-frontend.com"], // Allow only trusted domains
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


## **Contributing**
If you want to improve this project, follow these steps:

1. **Fork the repository.**
2. **Create a new branch:**
   
   git checkout -b api-docs-security
   
3. **Make changes and commit them:**
   
   git commit -m "Added a new feature"
   
4. **Push the branch to GitHub:**

   git push origin feature-new

5. **Open a pull request.**


## **Credits**
This API was created by **Jasleen Kalsi** in 2025.



## **Final Steps**
1. Save this file as `README.md`.
2. Run these commands to save your changes:
   
   git add README.md
   git commit -m "Added detailed README file"
   git push origin main
   
3. Go to your GitHub repository and check if the README appears correctly.


## **API Documentation is Ready**
- The project is easy to set up.
- It has working examples for TypeScript.
- The public API documentation link is included.
- Security guidelines are explained.

