<p align="center">
    <img alt="SUP Peer" src="./suppeer/src/Components/suppeer_logo.webp" width="125" />
</p>
<h1 align="center">SUP Peer</h1>

## Motivation
Due to the pandemic in 2020, most of the courses were conducted online. Now courses are also recorded most of the time, while the recording can be convenient for watch and review, the worries about distraction and lack of interaction caused by online learning still exist. 

Focusing on the pain points mentioned above, we came up with a new learning mode in which we called “peer helps peer”. Our aim is to design a website for students to get academic support mutually. On this platform, students can switch their identities between tutors and tutees. Through the implementation of peer-to-peer interactions and educator involvement, our goal is to empower students to take charge of their learning journey, overcome obstacles with the support of their peers, and achieve academic success. 

## Aim
To help students get more personalized academic assistance, we hope to provide a platform for students to communicate and support each other. On this platform, students can be tutors and tutees. If students need academic teaching help, they can post the demand for the corresponding modules on the platform and seek tutors under this post. 

Besides, students can also ask basic or general questions that do not require extra tutoring, like study tips or good study habits. They can see and answer other peers’ questions as well. For professors and teaching staff, they can afford time to give additional explanations when they’re available.

Therefore, our platform aims to provide personalized learning experiences and give academic support beyond traditional classroom settings, enabling students to both share and gain knowledge across a wide range of subjects. 

## Tech Stack
**Frontend:**
- [React JS](https://react.dev/): javascript library
- [Javascript](): programming language
- [JWT Auth](https://jwt.io/): for user authentication

**Database:**
- [MongoDb](https://www.mongodb.com/)

**Backend:**
- [NodeJs](https://nodejs.org/en/)
- [Express](https://expressjs.com/)


## Features
1)	**User registration and identity management system:**
- Implement a robust system allowing students to register and manage their accounts online.
- Enable role-switching functionality where students can toggle between being tutors and tutees.

2)	**Professor and Teaching Assistant Involvement:**
- A dedicated section for academic staff to contribute by answering questions, providing additional explanations, and offering corrective feedback on student postings.
- Facilitate direct interaction between students and educators to enhance learning and provide personalized support. 

3)	**Real-time Interaction and Peer Support:** 
- Create features for real-time interactions such as chat rooms or instant messaging to facilitate direct communication among users.
- Implement a system where students can schedule and conduct peer tutoring sessions, both in real-time and asynchronously.


## Local installation and usage
1) Clone this repository  
```
git clone https://github.com/Lukapeng77/Orbital2024.git
```
2) Install dependencies  
```
cd Orbital2024/mybackend
npm install
cd ../suppeer
npm install
```
3) Create .env in mybackend directory
```
cd ../mybackend
touch .env
```
4) Configure environment variables in your new .env file. To acquire your MONGODB_URI, create a cluster for free over at https://www.mongodb.com/. The TOKEN_KEY is a secret key of your choosing, you can feel free to set up one.
```
MONGODB_URI= <YOUR_MONGODB_URI> 
TOKEN_KEY= <YOUR_TOKEN_KEY>
PORT= 3001 
```
5) Run the server
```
cd Orbital2024/mybackend
npm start
```
6) Start a new terminal and run react's development server
```
cd Orbital2024/suppeer
npm start
```


