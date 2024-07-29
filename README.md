# SUP Peer
SUPPeer is a website to provide college students with personalized academic support through peer-to-peer interaction learning mode and educator involvement.

![SUP Peer Logo](<img src="suppeer/src/Components/suppeer_logo.webp" width="300" alt="SUP Peer Logo">
)

## Features
1)	User registration and identity management system: 
●	Implement a robust system allowing students to register and manage their accounts online.
●	Enable role-switching functionality where students can toggle between being tutors and tutees.

2)	Professor and Teaching Assistant Involvement:
●	A dedicated section for academic staff to contribute by answering questions, providing additional explanations, and offering corrective feedback on student postings.
●	Facilitate direct interaction between students and educators to enhance learning and provide personalized support. 

3)	Real-time Interaction and Peer Support: 
●	Create features for real-time interactions such as chat rooms or instant messaging to facilitate direct communication among users.
●	Implement a system where students can schedule and conduct peer tutoring sessions, both in real-time and asynchronously.


## Installation and usage
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
3) Create .env in root directory
```
cd ..
touch .env
```
4) Configure environment variables in your new .env file. To acquire your MONGO_URI, create a cluster for free over at https://www.mongodb.com/. The TOKEN_KEY is a secret key of your choosing, you can feel free to set up one.
```
MONGO_URI= <YOUR_MONGO_URI> 
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
cd Orbital2024
cd suppeer
npm start
```


