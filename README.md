# Rent-Link, CSE327 project, 2023

## A web service to find rent or tenants. It comprised of an Android App built in Kotlin, a website built in React and a backend with REST Api built in Express JS with Mongodb as database

## Since I worked on the backend and web frontend, the following repo only contains those code. We used bitbucket to collaborate as per the instruction of the course Faculty. Follow this link to see contributions of each collaborators: https://bitbucket.org/cse327-1-nbm/cse327_1_se/

![image3](https://github.com/confusedOrca/Rent-Link/assets/163755962/0d5c63e6-d7e2-4deb-bcec-0f89d8d60bd6)

A minimalistic and responsive UI was designed using Tailwind CSS

https://github.com/confusedOrca/Rent-Link/assets/163755962/dc01c245-4d65-4dc4-a419-016fe2e9e359

All pages except for the home page and search page is protected using JWT based authentication.
Users can login and sign up to their account which takes them to their profile, where they can see posts they have posted and chats they have participated in.

![image2](https://github.com/confusedOrca/Rent-Link/assets/163755962/ac0e8d48-0d2c-4cdf-a88f-2b863c0e953a)
![image4](https://github.com/confusedOrca/Rent-Link/assets/163755962/fb33a4b5-52b2-4f3a-ad9b-a57947fdc90a)
![image1](https://github.com/confusedOrca/Rent-Link/assets/163755962/77ce9d7b-bb7a-489b-aabc-82d66a58ed7e)

The access tokens have 24 hours lifetime. Refresher tokens were used to ensure uninterrupted user experience. We have also implemented session persistance so that user can pickup from where he or she have left.
Below is the demo of session persistance:

https://github.com/confusedOrca/Rent-Link/assets/163755962/4a1c9434-6baa-44cd-9618-af97ba763956

The website has many accessibility features:
1. Voice based search

https://github.com/confusedOrca/Rent-Link/assets/163755962/ad6b2d93-6964-4525-94ac-18b94e1faeaa

2. Voice based posting (both in English and Bangla) where we chained call back functions to fill all text fields in a form by conducting a voice based questionnaire. 

https://github.com/confusedOrca/Rent-Link/assets/163755962/ba31e522-1b1a-418d-8c0a-a6165110effc

https://github.com/confusedOrca/Rent-Link/assets/163755962/56c0d9e9-1e37-457c-94d3-4d4ab4d295f5

3. Users can pick their locations from a Geocoder
https://github.com/confusedOrca/Rent-Link/assets/163755962/812a2c0d-7d69-4cd9-bb16-354e08a39ff5

4. Enquiring about a rental property automatically sends a message of interest to the poster.
![image6](https://github.com/confusedOrca/Rent-Link/assets/163755962/bcfbe0bf-7e06-47b9-8ee8-93eabd470501)

5. Users can also send voice messages. All voice messages contain a transcript button to tell the user what is being said without.

https://github.com/confusedOrca/Rent-Link/assets/163755962/0fd28cf4-76c7-4b8f-8157-2019d08525c4

Uses can upload images, which are stored in the Express server

https://github.com/confusedOrca/Rent-Link/assets/163755962/6d50e667-c3b1-4fe6-973b-a1abb6b6a294

Users are provided with stats of people viewing their post, which includes heatmap using Mapbox, gender distribution, number of views and the average age of viewers
![image5](https://github.com/confusedOrca/Rent-Link/assets/163755962/39b6470d-0a27-4cf9-8f1c-20bacb60277e)








