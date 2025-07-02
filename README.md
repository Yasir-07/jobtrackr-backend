# JobTrackr Backend

Node.js + Express backend for JobTrackr, a resume-job matching and application tracking system. Connects to a Python microservice for intelligent keyword and semantic analysis.

## Features
- Resume upload and parsing
- Integration with semantic matcher microservice
- User authentication
- MongoDB for storage
- RESTful APIs

## Setup

```bash
git clone https://github.com/YOUR_USERNAME/jobtrackr-backend.git
cd jobtrackr-backend
npm install
cp .env.example .env
npm start
