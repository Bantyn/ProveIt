export const competitions = [
    {
        id: 1,
        // Job + Competition Info
        jobTitle: "Frontend React Developer",
        roleType: "Full-time",
        experience: "0–2 Years",
        category: "Frontend",
        competitionTitle: "Build a React Dashboard",
        problemStatement: "Create a responsive admin dashboard using React with charts, filters, and authentication.",
        difficulty: "Beginner",
        duration: "7 Days",
        deadline: "2024-12-31",
        status: "Live",
        tags: ["React", "Dashboard", "Responsive", "UI/UX"],

        // Company Info
        company: {
            name: "React Masters",
            location: "Remote",
            type: "Startup",
            hiringCount: 3,
            logo: "https://example.com/logo1.png",
            description: "Pioneering React development tools and frameworks",
            isVerified: true
        },

        // Tech & Evaluation
        techStack: ["React", "JavaScript", "CSS", "API"],
        evaluationCriteria: ["UI/UX", "Code Quality", "Performance", "Best Practices"],

        // Participation Data
        totalParticipants: 1200,
        submissions: 850,
        shortlisted: 50,
        selectedForInterview: 10,
        participationRate: 70.8,

        // Rewards & Hiring
        prizePool: "₹10,000",
        directHiring: true,
        interviewType: "Technical + HR",
        stipend: "₹40,000/month",

        // Engagement
        views: 2500,
        likes: 890,
        badges: ["Trending", "Hiring Fast", "Popular"],
        featured: true,

        // Additional
        requiredDocuments: ["Resume", "GitHub Profile"],
        resources: ["Starter Template", "API Docs", "Design System"],
        createdAt: "2024-10-01"
    },

    {
        id: 2,
        jobTitle: "Backend Node.js Developer",
        roleType: "Internship",
        experience: "Fresher",
        category: "Backend",
        competitionTitle: "Design Secure REST API",
        problemStatement: "Build a secure RESTful API using Node.js with JWT authentication and role-based access.",
        difficulty: "Intermediate",
        duration: "5 Days",
        deadline: "2024-11-15",
        status: "Upcoming",
        tags: ["Node.js", "Security", "API", "Authentication"],

        company: {
            name: "Backend Pro",
            location: "Remote",
            type: "Product Company",
            hiringCount: 2,
            logo: "https://example.com/logo2.png",
            description: "Enterprise backend solutions provider"
        },

        techStack: ["Node.js", "Express", "MongoDB", "JWT", "Redis"],
        evaluationCriteria: ["API Design", "Security", "Scalability", "Documentation", "Error Handling"],

        totalParticipants: 800,
        submissions: 0,
        shortlisted: 30,
        selectedForInterview: 6,
        participationRate: 0,

        prizePool: "₹15,000",
        directHiring: true,
        interviewType: "Technical Round",
        stipend: "₹25,000/month",

        views: 1800,
        likes: 560,
        badges: ["New", "High Stipend", "Remote"],
        featured: false,

        requiredDocuments: ["Resume", "Cover Letter"],
        resources: ["API Specification", "Database Schema"],
        createdAt: "2024-10-20"
    },

    {
        id: 3,
        jobTitle: "Database Engineer",
        roleType: "Full-time",
        experience: "1–3 Years",
        category: "Database",
        competitionTitle: "Optimize MongoDB Queries",
        problemStatement: "Improve query performance and schema design for a given MongoDB dataset.",
        difficulty: "Advanced",
        duration: "4 Days",
        deadline: "2024-11-25",
        status: "Live",
        tags: ["Database", "Optimization", "Performance", "MongoDB"],

        company: {
            name: "Data Wizards",
            location: "Hybrid",
            type: "Enterprise",
            hiringCount: 1,
            logo: "https://example.com/logo3.png",
            description: "Data analytics and management solutions",
            isVerified: true
        },

        techStack: ["MongoDB", "Indexes", "Aggregation", "Performance Tuning", "Database Design"],
        evaluationCriteria: ["Query Optimization", "Schema Design", "Efficiency", "Scalability"],

        totalParticipants: 500,
        submissions: 320,
        shortlisted: 25,
        selectedForInterview: 5,
        participationRate: 64.0,

        prizePool: "₹25,000",
        directHiring: true,
        interviewType: "System Design",
        salary: "₹12-15 LPA",

        views: 1200,
        likes: 450,
        badges: ["Expert Level", "High Salary"],
        featured: true,

        requiredDocuments: ["Resume", "Previous Work Samples"],
        resources: ["Dataset", "Performance Metrics"],
        createdAt: "2024-10-15"
    },

    {
        id: 4,
        jobTitle: "Machine Learning Engineer",
        roleType: "Full-time",
        experience: "2–4 Years",
        category: "AI/ML",
        competitionTitle: "Image Classification Challenge",
        problemStatement: "Build an image classification model with 95%+ accuracy on custom dataset.",
        difficulty: "Advanced",
        duration: "10 Days",
        deadline: "2024-12-10",
        status: "Upcoming",
        tags: ["Machine Learning", "Computer Vision", "Deep Learning", "Python"],

        company: {
            name: "AI Innovators",
            location: "Bangalore",
            type: "Research Lab",
            hiringCount: 2,
            logo: "https://example.com/logo4.png",
            description: "Cutting-edge AI research and applications",
            isVerified: true
        },

        techStack: ["Python", "TensorFlow", "PyTorch", "OpenCV", "Scikit-learn"],
        evaluationCriteria: ["Accuracy", "Model Efficiency", "Code Quality", "Innovation"],

        totalParticipants: 950,
        submissions: 0,
        shortlisted: 40,
        selectedForInterview: 8,
        participationRate: 0,

        prizePool: "₹50,000",
        directHiring: true,
        interviewType: "Research + Technical",
        salary: "₹18-22 LPA",

        views: 3200,
        likes: 1200,
        badges: ["Premium", "Research Oriented", "High Reward"],
        featured: true,

        requiredDocuments: ["Resume", "Research Papers", "GitHub"],
        resources: ["Dataset", "Baseline Model", "Research Papers"],
        createdAt: "2024-10-25"
    },

    {
        id: 5,
        jobTitle: "DevOps Engineer",
        roleType: "Contract",
        experience: "3–5 Years",
        category: "DevOps",
        competitionTitle: "CI/CD Pipeline Setup",
        problemStatement: "Create an automated CI/CD pipeline with monitoring and auto-scaling.",
        difficulty: "Intermediate",
        duration: "6 Days",
        deadline: "2024-11-30",
        status: "Live",
        tags: ["DevOps", "CI/CD", "Cloud", "Automation"],

        company: {
            name: "Cloud Systems",
            location: "Remote",
            type: "Consulting",
            hiringCount: 3,
            logo: "https://example.com/logo5.png",
            description: "Cloud infrastructure and DevOps consulting"
        },

        techStack: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
        evaluationCriteria: ["Pipeline Efficiency", "Security", "Cost Optimization", "Monitoring"],

        totalParticipants: 650,
        submissions: 420,
        shortlisted: 35,
        selectedForInterview: 7,
        participationRate: 64.6,

        prizePool: "₹30,000",
        directHiring: false,
        interviewType: "Architecture Review",
        contractValue: "₹8-10 Lakhs",

        views: 1950,
        likes: 670,
        badges: ["Cloud", "Infrastructure", "Contract"],
        featured: false,

        requiredDocuments: ["Resume", "Certifications", "Case Studies"],
        resources: ["Infrastructure Diagram", "Requirements Doc"],
        createdAt: "2024-10-10"
    },

    {
        id: 6,
        jobTitle: "Mobile App Developer",
        roleType: "Freelance",
        experience: "1–3 Years",
        category: "Mobile",
        competitionTitle: "Cross-platform E-commerce App",
        problemStatement: "Build a Flutter e-commerce app with payment integration and cart functionality.",
        difficulty: "Intermediate",
        duration: "8 Days",
        deadline: "2024-11-20",
        status: "Ended",
        tags: ["Flutter", "Mobile", "E-commerce", "Cross-platform"],

        company: {
            name: "ShopEasy",
            location: "Mumbai",
            type: "E-commerce",
            hiringCount: 2,
            logo: "https://example.com/logo6.png",
            description: "Online retail platform expanding to mobile"
        },

        techStack: ["Flutter", "Dart", "Firebase", "Stripe API", "State Management"],
        evaluationCriteria: ["UI/UX", "Performance", "Feature Completeness", "App Store Guidelines"],

        totalParticipants: 1100,
        submissions: 780,
        shortlisted: 45,
        selectedForInterview: 9,
        participationRate: 70.9,

        prizePool: "₹20,000",
        directHiring: true,
        interviewType: "Product + Technical",
        projectFee: "₹3-5 Lakhs",

        views: 2800,
        likes: 950,
        badges: ["Completed", "Popular", "E-commerce"],
        featured: false,

        requiredDocuments: ["Portfolio", "App Store Links"],
        resources: ["Design Mockups", "API Keys"],
        createdAt: "2024-09-15",
        endedAt: "2024-10-23"
    },

    {
        id: 7,
        jobTitle: "Cybersecurity Analyst",
        roleType: "Full-time",
        experience: "2–4 Years",
        category: "Security",
        competitionTitle: "Penetration Testing Challenge",
        problemStatement: "Identify vulnerabilities in a provided web application and propose fixes.",
        difficulty: "Expert",
        duration: "3 Days",
        deadline: "2024-12-05",
        status: "Upcoming",
        tags: ["Security", "Pentesting", "Web Security", "Ethical Hacking"],

        company: {
            name: "SecureNet",
            location: "Delhi",
            type: "Security Firm",
            hiringCount: 1,
            logo: "https://example.com/logo7.png",
            description: "Cybersecurity services and consulting",
            isVerified: true
        },

        techStack: ["Burp Suite", "Nmap", "Metasploit", "OWASP", "Kali Linux"],
        evaluationCriteria: ["Vulnerabilities Found", "Report Quality", "Solution Proposal", "Methodology"],

        totalParticipants: 300,
        submissions: 0,
        shortlisted: 20,
        selectedForInterview: 4,
        participationRate: 0,

        prizePool: "₹40,000",
        directHiring: true,
        interviewType: "Practical Assessment",
        salary: "₹15-18 LPA",

        views: 1450,
        likes: 380,
        badges: ["Specialized", "High Demand", "Expert"],
        featured: true,

        requiredDocuments: ["Resume", "Certifications (CEH, OSCP)", "Previous Reports"],
        resources: ["Target Application", "Testing Guidelines"],
        createdAt: "2024-10-28"
    },

    {
        id: 8,
        jobTitle: "Data Scientist",
        roleType: "Internship",
        experience: "Fresher",
        category: "Data Science",
        competitionTitle: "Predictive Analytics Challenge",
        problemStatement: "Build a predictive model for customer churn using provided datasets.",
        difficulty: "Beginner",
        duration: "7 Days",
        deadline: "2024-11-28",
        status: "Live",
        tags: ["Data Science", "Predictive Modeling", "Analytics", "Python"],

        company: {
            name: "Data Insights Corp",
            location: "Remote",
            type: "Analytics",
            hiringCount: 5,
            logo: "https://example.com/logo8.png",
            description: "Data analytics and business intelligence"
        },

        techStack: ["Python", "Pandas", "Scikit-learn", "Jupyter", "SQL"],
        evaluationCriteria: ["Model Accuracy", "Feature Engineering", "Insights", "Visualization"],

        totalParticipants: 1400,
        submissions: 920,
        shortlisted: 60,
        selectedForInterview: 12,
        participationRate: 65.7,

        prizePool: "₹15,000",
        directHiring: true,
        interviewType: "Case Study + Technical",
        stipend: "₹30,000/month",

        views: 3100,
        likes: 1100,
        badges: ["Hiring Multiple", "Beginner Friendly", "Data"],
        featured: true,

        requiredDocuments: ["Resume", "Academic Projects"],
        resources: ["Dataset", "Notebook Template"],
        createdAt: "2024-10-05"
    },

    {
        id: 9,
        jobTitle: "UI/UX Designer",
        roleType: "Part-time",
        experience: "1–3 Years",
        category: "Design",
        competitionTitle: "Redesign Banking App",
        problemStatement: "Redesign the mobile banking experience focusing on accessibility and usability.",
        difficulty: "Intermediate",
        duration: "5 Days",
        deadline: "2024-12-15",
        status: "Upcoming",
        tags: ["UI/UX", "Design", "Figma", "Banking", "Accessibility"],

        company: {
            name: "FinTech Designs",
            location: "Remote",
            type: "Design Agency",
            hiringCount: 2,
            logo: "https://example.com/logo9.png",
            description: "Financial technology design specialists"
        },

        techStack: ["Figma", "Adobe XD", "Prototyping", "User Research"],
        evaluationCriteria: ["Design Aesthetics", "User Flow", "Accessibility", "Innovation"],

        totalParticipants: 720,
        submissions: 0,
        shortlisted: 25,
        selectedForInterview: 5,
        participationRate: 0,

        prizePool: "₹18,000",
        directHiring: true,
        interviewType: "Portfolio Review",
        salary: "₹8-10 LPA (pro-rated)",

        views: 2100,
        likes: 620,
        badges: ["Design", "Remote", "Part-time"],
        featured: false,

        requiredDocuments: ["Portfolio", "Case Studies", "Resume"],
        resources: ["Current App Design", "User Personas", "Brand Guidelines"],
        createdAt: "2024-10-30"
    },

    {
        id: 10,
        jobTitle: "Blockchain Developer",
        roleType: "Full-time",
        experience: "2–4 Years",
        category: "Blockchain",
        competitionTitle: "Smart Contract Development",
        problemStatement: "Create and audit a DeFi smart contract with specific functionality requirements.",
        difficulty: "Expert",
        duration: "9 Days",
        deadline: "2024-12-20",
        status: "Upcoming",
        tags: ["Blockchain", "Smart Contracts", "DeFi", "Web3", "Solidity"],

        company: {
            name: "Crypto Innovations",
            location: "Remote",
            type: "Crypto Startup",
            hiringCount: 1,
            logo: "https://example.com/logo10.png",
            description: "Decentralized finance platform development"
        },

        techStack: ["Solidity", "Ethereum", "Web3.js", "Hardhat", "Smart Contract Security"],
        evaluationCriteria: ["Security", "Gas Optimization", "Functionality", "Code Quality"],

        totalParticipants: 280,
        submissions: 0,
        shortlisted: 15,
        selectedForInterview: 3,
        participationRate: 0,

        prizePool: "₹75,000",
        directHiring: true,
        interviewType: "Smart Contract Audit",
        salary: "₹20-25 LPA + Tokens",

        views: 1800,
        likes: 420,
        badges: ["Web3", "High Reward", "Expert"],
        featured: true,

        requiredDocuments: ["Resume", "GitHub", "Previous Contracts"],
        resources: ["Specification Document", "Test Network Details"],
        createdAt: "2024-11-01"
    }
];
