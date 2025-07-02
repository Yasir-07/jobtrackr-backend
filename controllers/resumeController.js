const fs = require('fs');
const pdfParser = require('pdf-parse');
const axios = require('axios');

const parseResumeAndMatch = async (req, res) => {
    try{
        const resumePath = req.file.path;
        const { jobDescription } = req.body;

        if(!jobDescription){
            return res.status(400).json({message: "Job description is required."});
        }

        const resumeBuffer = fs.readFileSync(resumePath);
        const resumeData = await pdfParser(resumeBuffer);
        const resumeText = resumeData.text;

        const respone = await axios.post('http://localhost:8000/match',{
            resume: resumeText,
            job_description: jobDescription
        })

        return res.json(respone.data);
    }
    catch (error) {
        console.error("Error parsing the resume and matching.", error.message);
    
        if (error.response && error.response.data) {
            console.error("Python microservice response:", error.response.data);
            return res.status(error.response.status).json({ message: "Matcher failed", detail: error.response.data });
        } else {
            console.error("No response from matcher microservice.");
            return res.status(500).json({ message: "Matcher service crashed or is unreachable." });
        }
    }
    
};

module.exports = parseResumeAndMatch;