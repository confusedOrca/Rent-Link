### Rent-Link - CSE327 Project (2023)

**Rent-Link** is a comprehensive platform designed to connect tenants and landlords, providing a seamless experience for renting and tenant-finding needs. It includes a feature-rich **Android App** built with **Kotlin**, a responsive **website** built with **React**, and a robust **backend** developed using **Express.js** with a **MongoDB** database.

This repository contains the backend and web frontend code, as those were my primary areas of contribution. Collaboration for the project was managed on **Bitbucket**, as per course guidelines.  
See the contributions of collaborators here: [Bitbucket Repository](https://bitbucket.org/cse327-1-nbm/cse327_1_se/).

---

### Project Highlights

#### 1. **Frontend Development**
- Built with **React.js** and styled using **Tailwind CSS**.
- Minimalistic and responsive UI design.  
  ![UI Demo](https://github.com/confusedOrca/Rent-Link/assets/163755962/0d5c63e6-d7e2-4deb-bcec-0f89d8d60bd6)

#### 2. **Backend Development**
- Developed a **REST API** using **Express.js**.
- **MongoDB** was used as the database to manage user data, posts, and chats.
- JWT-based authentication ensures secure access to all protected resources.

---

### Features

#### Authentication & Session Management
- **JWT Authentication**: Access tokens have a 24-hour lifetime. Refresh tokens ensure uninterrupted user experience.
- **Session Persistence**: Users can resume activities seamlessly from their last state. 
  [Demo: Session Persistence](https://github.com/confusedOrca/Rent-Link/assets/163755962/4a1c9434-6baa-44cd-9618-af97ba763956) <!-- this is a video -->

#### Profile and Protected Routes
- All pages except the home and search pages are protected.
- Users can:
  - Log in or sign up.
  - Access their profile to view posted ads and chat history.  
  ![Profile and Chat](https://github.com/confusedOrca/Rent-Link/assets/163755962/ac0e8d48-0d2c-4cdf-a88f-2b863c0e953a)

---

### Accessibility Features

1. **Voice-Based Interaction**
   - **Voice Search**: Users can search listings through voice commands.  
     [Demo: Voice Search](https://github.com/confusedOrca/Rent-Link/assets/163755962/ad6b2d93-6964-4525-94ac-18b94e1faeaa) <!-- this is a video -->
   - **Voice Posting**: A dynamic voice questionnaire fills out forms in both English and Bangla.  
     [Demo: Voice Posting (English)](https://github.com/confusedOrca/Rent-Link/assets/163755962/ba31e522-1b1a-418d-8c0a-a6165110effc)  <!-- this is a video -->
     [Demo: Voice Posting (Bangla)](https://github.com/confusedOrca/Rent-Link/assets/163755962/56c0d9e9-1e37-457c-94d3-4d4ab4d295f5) <!-- this is a video -->

2. **Geocoder Integration**  
   - Users can select their locations via an interactive map.  
     [Demo: Geocoder](https://github.com/confusedOrca/Rent-Link/assets/163755962/812a2c0d-7d69-4cd9-bb16-354e08a39ff5) <!-- this is a video -->

3. **Voice Messages**  
   - Users can send voice messages with automatic transcription for easy communication.  
     [Demo: Voice Messaging](https://github.com/confusedOrca/Rent-Link/assets/163755962/0fd28cf4-76c7-4b8f-8157-2019d08525c4) <!-- this is a video -->

---

### Additional Functionalities

#### Interactive Listings
- Enquiries about rental properties automatically notify the poster.
  ![Enquiry Notification](https://github.com/confusedOrca/Rent-Link/assets/163755962/bcfbe0bf-7e06-47b9-8ee8-93eabd470501)

#### File Uploads
- Users can upload images, which are stored securely on the Express server.  
  [Demo: File Upload](https://github.com/confusedOrca/Rent-Link/assets/163755962/6d50e667-c3b1-4fe6-973b-a1abb6b6a294) <!-- this is a video -->

#### Analytics Dashboard
- Users can view insights about their posts, including:
  - Heatmap (via Mapbox).
  - Viewer gender distribution.
  - Number of views.
  - Average viewer age.  
  ![Analytics Dashboard](https://github.com/confusedOrca/Rent-Link/assets/163755962/39b6470d-0a27-4cf9-8f1c-20bacb60277e)
