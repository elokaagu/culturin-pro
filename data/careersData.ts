export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  coverLetter: string;
  resumeUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  status:
    | "pending"
    | "reviewing"
    | "interview"
    | "offer"
    | "hired"
    | "rejected";
  appliedAt: string;
  updatedAt: string;
  notes?: string;
  interviewDate?: string;
  salary?: string;
  skills: string[];
  availability: string;
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  level: "entry" | "mid" | "senior" | "lead" | "executive";
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salaryRange: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  applicationCount: number;
}

export interface CareersContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  companyDescription: string;
  benefits: string[];
  workCulture: string;
}

export const careersContent: CareersContent = {
  heroTitle: "Join Our Team",
  heroSubtitle:
    "Help us revolutionize cultural tourism and connect travelers with authentic experiences around the world.",
  heroImage:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop",
  companyDescription:
    "At Culturin, we're passionate about preserving and sharing cultural heritage through authentic travel experiences. Our team is diverse, innovative, and committed to making cultural tourism accessible to everyone.",
  benefits: [
    "Competitive salary and equity",
    "Health, dental, and vision insurance",
    "Flexible work arrangements",
    "Professional development budget",
    "Annual travel stipend",
    "Mental health support",
  ],
  workCulture:
    "We believe in work-life balance, continuous learning, and creating an inclusive environment where everyone can thrive.",
};

export const jobPostings: JobPosting[] = [
  {
    id: "senior-fullstack-dev",
    title: "Senior Full-Stack Developer",
    department: "Engineering",
    location: "Remote",
    type: "full-time",
    level: "senior",
    description:
      "We're looking for a senior full-stack developer to help build and scale our platform that connects travelers with authentic cultural experiences.",
    requirements: [
      "5+ years of experience with React, Node.js, and TypeScript",
      "Experience with cloud platforms (AWS, GCP, or Azure)",
      "Strong understanding of database design and optimization",
      "Experience with API design and microservices architecture",
      "Familiarity with DevOps practices and CI/CD pipelines",
    ],
    responsibilities: [
      "Develop and maintain our web platform and mobile applications",
      "Collaborate with product and design teams to implement new features",
      "Optimize application performance and scalability",
      "Mentor junior developers and contribute to technical decisions",
      "Participate in code reviews and maintain high code quality standards",
    ],
    benefits: [
      "Competitive salary ($120k - $160k)",
      "Equity package",
      "Health insurance",
      "Remote work flexibility",
      "Professional development budget",
    ],
    salaryRange: "$120,000 - $160,000",
    isActive: true,
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
    applicationCount: 15,
  },
  {
    id: "content-marketing",
    title: "Content Marketing Manager",
    department: "Marketing",
    location: "New York, NY",
    type: "full-time",
    level: "mid",
    description:
      "Join our marketing team to create compelling content that showcases the beauty and authenticity of cultural experiences worldwide.",
    requirements: [
      "3+ years of content marketing experience",
      "Excellent writing and storytelling skills",
      "Experience with SEO and content optimization",
      "Familiarity with marketing automation tools",
      "Experience in travel or hospitality industry preferred",
    ],
    responsibilities: [
      "Develop content strategy and editorial calendar",
      "Create blog posts, case studies, and marketing materials",
      "Manage social media content and community engagement",
      "Collaborate with tour operators to gather success stories",
      "Analyze content performance and optimize for engagement",
    ],
    benefits: [
      "Competitive salary ($70k - $90k)",
      "Health and dental insurance",
      "Flexible PTO policy",
      "Annual travel stipend",
      "Professional development opportunities",
    ],
    salaryRange: "$70,000 - $90,000",
    isActive: true,
    createdAt: "2024-01-08T10:00:00Z",
    updatedAt: "2024-01-08T10:00:00Z",
    applicationCount: 23,
  },
  {
    id: "ux-ui-designer",
    title: "UX/UI Designer",
    department: "Design",
    location: "San Francisco, CA",
    type: "full-time",
    level: "mid",
    description:
      "Help us create intuitive and beautiful user experiences that make cultural discovery effortless and engaging.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency in Figma, Sketch, or similar design tools",
      "Strong portfolio showcasing web and mobile design",
      "Experience with user research and usability testing",
      "Understanding of design systems and component libraries",
    ],
    responsibilities: [
      "Design user interfaces for web and mobile applications",
      "Conduct user research and usability testing",
      "Create wireframes, prototypes, and high-fidelity designs",
      "Collaborate with engineering team on implementation",
      "Maintain and evolve our design system",
    ],
    benefits: [
      "Competitive salary ($90k - $120k)",
      "Equity package",
      "Health insurance",
      "Design tool subscriptions",
      "Conference attendance budget",
    ],
    salaryRange: "$90,000 - $120,000",
    isActive: true,
    createdAt: "2024-01-12T10:00:00Z",
    updatedAt: "2024-01-12T10:00:00Z",
    applicationCount: 18,
  },
  {
    id: "customer-success",
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Remote",
    type: "full-time",
    level: "mid",
    description:
      "Build relationships with tour operators and help them succeed on our platform while ensuring exceptional customer experiences.",
    requirements: [
      "2+ years of customer success or account management experience",
      "Excellent communication and relationship-building skills",
      "Experience with CRM tools and customer analytics",
      "Problem-solving mindset and empathy for customers",
      "Experience in SaaS or marketplace platforms preferred",
    ],
    responsibilities: [
      "Onboard new tour operators and guide them to success",
      "Monitor customer health metrics and proactively address issues",
      "Conduct regular check-ins and business reviews",
      "Gather customer feedback and work with product team",
      "Create educational content and best practices guides",
    ],
    benefits: [
      "Competitive salary ($60k - $80k)",
      "Performance bonuses",
      "Health insurance",
      "Remote work setup stipend",
      "Travel opportunities",
    ],
    salaryRange: "$60,000 - $80,000",
    isActive: true,
    createdAt: "2024-01-05T10:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z",
    applicationCount: 12,
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    department: "Engineering",
    location: "Remote",
    type: "full-time",
    level: "senior",
    description:
      "Use data to drive insights and improve our platform's recommendation engine and business intelligence capabilities.",
    requirements: [
      "PhD or Masters in Data Science, Statistics, or related field",
      "5+ years of experience with Python, R, and SQL",
      "Experience with machine learning frameworks (TensorFlow, PyTorch)",
      "Strong statistical analysis and modeling skills",
      "Experience with big data tools and cloud platforms",
    ],
    responsibilities: [
      "Develop and improve recommendation algorithms",
      "Analyze user behavior and business metrics",
      "Build predictive models for demand forecasting",
      "Create data pipelines and analytics infrastructure",
      "Present insights to stakeholders and leadership",
    ],
    benefits: [
      "Competitive salary ($130k - $170k)",
      "Equity package",
      "Health insurance",
      "Conference and training budget",
      "Flexible work arrangements",
    ],
    salaryRange: "$130,000 - $170,000",
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    applicationCount: 8,
  },
];

export const jobApplications: JobApplication[] = [
  {
    id: "app-001",
    jobId: "senior-fullstack-dev",
    jobTitle: "Senior Full-Stack Developer",
    applicantName: "Sarah Chen",
    email: "sarah.chen@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    experience: "6 years",
    coverLetter:
      "I'm excited to apply for the Senior Full-Stack Developer position at Culturin. With 6 years of experience building scalable web applications using React, Node.js, and TypeScript, I'm passionate about creating technology that connects people with authentic cultural experiences. My recent work at TravelTech Inc involved building a booking platform that handled 100k+ monthly transactions, and I'd love to bring this expertise to help Culturin scale globally.",
    resumeUrl: "https://example.com/resumes/sarah-chen.pdf",
    portfolioUrl: "https://sarahchen.dev",
    linkedinUrl: "https://linkedin.com/in/sarahchen",
    githubUrl: "https://github.com/sarahchen",
    status: "interview",
    appliedAt: "2024-01-18T14:30:00Z",
    updatedAt: "2024-01-20T10:15:00Z",
    notes:
      "Strong technical background, good cultural fit. Scheduled for technical interview.",
    interviewDate: "2024-01-25T15:00:00Z",
    skills: ["React", "Node.js", "TypeScript", "AWS", "PostgreSQL", "GraphQL"],
    availability: "2 weeks notice",
  },
  {
    id: "app-002",
    jobId: "content-marketing",
    jobTitle: "Content Marketing Manager",
    applicantName: "Marcus Rodriguez",
    email: "marcus.rodriguez@email.com",
    phone: "+1 (555) 987-6543",
    location: "Austin, TX",
    experience: "4 years",
    coverLetter:
      "As a content marketer with a passion for travel and cultural storytelling, I'm thrilled to apply for the Content Marketing Manager position. My 4 years at Adventure Media have taught me how to craft compelling narratives that inspire wanderlust while driving business results. I've increased organic traffic by 300% and managed content campaigns that generated $2M in bookings. I'm excited to help Culturin share the stories of authentic cultural experiences worldwide.",
    resumeUrl: "https://example.com/resumes/marcus-rodriguez.pdf",
    portfolioUrl: "https://marcusrodriguez.com",
    linkedinUrl: "https://linkedin.com/in/marcusrodriguez",
    status: "offer",
    appliedAt: "2024-01-16T09:45:00Z",
    updatedAt: "2024-01-22T16:30:00Z",
    notes:
      "Excellent writing samples, strong travel industry experience. Made offer.",
    salary: "$85,000",
    skills: [
      "Content Strategy",
      "SEO",
      "Social Media",
      "Analytics",
      "Travel Industry",
    ],
    availability: "Immediate",
  },
  {
    id: "app-003",
    jobId: "ux-ui-designer",
    jobTitle: "UX/UI Designer",
    applicantName: "Priya Patel",
    email: "priya.patel@email.com",
    phone: "+1 (555) 456-7890",
    location: "Remote",
    experience: "5 years",
    coverLetter:
      "I'm excited to apply for the UX/UI Designer role at Culturin. With 5 years of experience designing user-centered digital experiences, I'm passionate about creating interfaces that make cultural discovery accessible and delightful. My recent work on a travel booking app increased conversion rates by 40% through user research and iterative design. I'd love to help Culturin create experiences that inspire travelers to explore authentic cultural connections.",
    resumeUrl: "https://example.com/resumes/priya-patel.pdf",
    portfolioUrl: "https://priyapatel.design",
    linkedinUrl: "https://linkedin.com/in/priyapatel",
    status: "reviewing",
    appliedAt: "2024-01-19T11:20:00Z",
    updatedAt: "2024-01-21T14:45:00Z",
    notes:
      "Strong portfolio, good understanding of travel UX. Need to review technical skills.",
    skills: [
      "Figma",
      "User Research",
      "Prototyping",
      "Design Systems",
      "Mobile Design",
    ],
    availability: "3 weeks notice",
  },
  {
    id: "app-004",
    jobId: "customer-success",
    jobTitle: "Customer Success Manager",
    applicantName: "James Thompson",
    email: "james.thompson@email.com",
    phone: "+1 (555) 321-0987",
    location: "Denver, CO",
    experience: "3 years",
    coverLetter:
      "I'm passionate about helping businesses succeed and would love to bring my customer success expertise to Culturin. In my 3 years at SaaS Solutions, I maintained a 95% customer retention rate and helped clients achieve an average 40% growth in their key metrics. I'm excited about the opportunity to work with tour operators and help them share their cultural stories with the world while building sustainable businesses.",
    resumeUrl: "https://example.com/resumes/james-thompson.pdf",
    linkedinUrl: "https://linkedin.com/in/jamesthompson",
    status: "pending",
    appliedAt: "2024-01-20T16:15:00Z",
    updatedAt: "2024-01-20T16:15:00Z",
    skills: [
      "Customer Success",
      "SaaS",
      "Account Management",
      "CRM",
      "Data Analysis",
    ],
    availability: "2 weeks notice",
  },
  {
    id: "app-005",
    jobId: "data-scientist",
    jobTitle: "Data Scientist",
    applicantName: "Dr. Aisha Okafor",
    email: "aisha.okafor@email.com",
    phone: "+1 (555) 654-3210",
    location: "Boston, MA",
    experience: "7 years",
    coverLetter:
      "With a PhD in Machine Learning and 7 years of experience building recommendation systems, I'm excited to apply for the Data Scientist position at Culturin. My work at RecSys Labs involved developing algorithms that improved user engagement by 60% for travel platforms. I'm passionate about using data to help people discover meaningful cultural experiences and would love to contribute to Culturin's mission of connecting travelers with authentic local stories.",
    resumeUrl: "https://example.com/resumes/aisha-okafor.pdf",
    portfolioUrl: "https://aishadatascience.com",
    linkedinUrl: "https://linkedin.com/in/aishaokafor",
    githubUrl: "https://github.com/aishaokafor",
    status: "interview",
    appliedAt: "2024-01-17T13:25:00Z",
    updatedAt: "2024-01-21T09:30:00Z",
    notes:
      "Impressive background in ML and recommendations. Scheduled for technical deep-dive.",
    interviewDate: "2024-01-26T14:00:00Z",
    skills: [
      "Python",
      "Machine Learning",
      "TensorFlow",
      "SQL",
      "Statistics",
      "Recommendation Systems",
    ],
    availability: "4 weeks notice",
  },
  {
    id: "app-006",
    jobId: "senior-fullstack-dev",
    jobTitle: "Senior Full-Stack Developer",
    applicantName: "Alex Kim",
    email: "alex.kim@email.com",
    phone: "+1 (555) 789-0123",
    location: "Seattle, WA",
    experience: "8 years",
    coverLetter:
      "I'm excited to apply for the Senior Full-Stack Developer position at Culturin. With 8 years of experience building scalable web applications and a passion for cultural exploration, I believe I'd be a great fit for your team. My recent work involved architecting a microservices platform that handles millions of requests daily, and I'm eager to apply this expertise to help Culturin scale its impact in cultural tourism.",
    resumeUrl: "https://example.com/resumes/alex-kim.pdf",
    githubUrl: "https://github.com/alexkim",
    linkedinUrl: "https://linkedin.com/in/alexkim",
    status: "rejected",
    appliedAt: "2024-01-14T10:30:00Z",
    updatedAt: "2024-01-19T15:20:00Z",
    notes:
      "Strong technical skills but looking for someone with more React experience.",
    skills: ["Java", "Spring Boot", "Angular", "Docker", "Kubernetes", "AWS"],
    availability: "Immediate",
  },
];
