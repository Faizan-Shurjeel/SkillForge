import { type User, type InsertUser, type Course, type InsertCourse, type Service, type InsertService, type Enrollment, type InsertEnrollment, type Inquiry, type InsertInquiry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  getServices(): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  getEnrollments(): Promise<Enrollment[]>;
  
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getInquiries(): Promise<Inquiry[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private courses: Map<string, Course>;
  private services: Map<string, Service>;
  private enrollments: Map<string, Enrollment>;
  private inquiries: Map<string, Inquiry>;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.services = new Map();
    this.enrollments = new Map();
    this.inquiries = new Map();
    
    // Initialize with default courses and services
    this.initializeDefaultData();
  }

  private async initializeDefaultData() {
    // Add default courses
    const defaultCourses: InsertCourse[] = [
      {
        title: "AI/Machine Learning Mastery",
        description: "Master deep learning, neural networks, computer vision, and NLP with hands-on projects.",
        icon: "🧠",
        gradient: "from-blue-500 to-purple-500",
        price_pkr: 15000,
        price_usd: 50,
        duration: "12-16 weeks",
        level: "Intermediate to Advanced",
        topics: ["Deep Learning", "Neural Networks", "Computer Vision", "Natural Language Processing", "Model Deployment"],
        tools: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "OpenCV"],
        outline: "Week 1-2: Python for AI & Math Foundations\nWeek 3-4: Machine Learning Fundamentals\nWeek 5-6: Deep Learning & Neural Networks\nWeek 7-8: Computer Vision Projects\nWeek 9-10: Natural Language Processing\nWeek 11-12: Advanced Topics & Model Deployment\nWeek 13-16: Capstone Project & Portfolio Development",
        certification: "AI/ML Professional Certificate"
      },
      {
        title: "Python Development & Analytics",
        description: "From fundamentals to advanced web frameworks, data analysis, and API development.",
        icon: "🐍",
        gradient: "from-green-500 to-blue-500",
        price_pkr: 12000,
        price_usd: 40,
        duration: "8-12 weeks",
        level: "Beginner to Intermediate",
        topics: ["Python Fundamentals", "Web Development", "Data Analysis", "API Development", "Database Integration"],
        tools: ["Django", "Flask", "FastAPI", "Pandas", "NumPy"],
        outline: "Week 1-2: Python Fundamentals & Programming Concepts\nWeek 3-4: Web Development with Django/Flask\nWeek 5-6: Data Analysis with Pandas & NumPy\nWeek 7-8: API Development & Database Integration\nWeek 9-12: Advanced Projects & Portfolio Development",
        certification: "Python Developer Certificate"
      },
      {
        title: "Data Science & Analytics",
        description: "Statistics, data visualization, and predictive modeling with real-world datasets.",
        icon: "📊",
        gradient: "from-purple-500 to-pink-500",
        price_pkr: 14000,
        price_usd: 47,
        duration: "14-18 weeks",
        level: "Beginner to Advanced",
        topics: ["Statistical Analysis", "Data Visualization", "Predictive Modeling", "Big Data", "Business Intelligence"],
        tools: ["R", "Python", "Tableau", "Power BI", "SQL"],
        outline: "Week 1-3: Statistics & Data Fundamentals\nWeek 4-6: Data Visualization & Exploration\nWeek 7-9: Predictive Modeling & Machine Learning\nWeek 10-12: Big Data Analytics & Tools\nWeek 13-15: Business Intelligence & Reporting\nWeek 16-18: Capstone Project & Real-world Application",
        certification: "Data Science Professional Certificate"
      },
      {
        title: "Full-Stack Web Development",
        description: "Complete web development covering frontend, backend, databases, and deployment.",
        icon: "💻",
        gradient: "from-orange-500 to-red-500",
        price_pkr: 13000,
        price_usd: 43,
        duration: "10-14 weeks",
        level: "Beginner to Intermediate",
        topics: ["Frontend Development", "Backend Development", "Database Design", "API Integration", "Cloud Deployment"],
        tools: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
        outline: "Week 1-2: HTML, CSS & JavaScript Fundamentals\nWeek 3-4: React & Frontend Development\nWeek 5-6: Node.js & Backend Development\nWeek 7-8: Database Design & Integration\nWeek 9-10: Full-Stack Project Development\nWeek 11-14: Deployment, Testing & Portfolio",
        certification: "Full-Stack Developer Certificate"
      },
      {
        title: "Mobile Application Development",
        description: "React Native and Flutter development with native features integration.",
        icon: "📱",
        gradient: "from-indigo-500 to-purple-500",
        price_pkr: 14500,
        price_usd: 48,
        duration: "12-16 weeks",
        level: "Intermediate",
        topics: ["React Native", "Flutter", "Native Features", "App Store Deployment", "Performance Optimization"],
        tools: ["React Native", "Flutter", "Xcode", "Android Studio", "Firebase"],
        outline: "Week 1-2: Mobile Development Fundamentals\nWeek 3-4: React Native Development\nWeek 5-6: Flutter Development\nWeek 7-8: Native Features & Device APIs\nWeek 9-10: Backend Integration & State Management\nWeek 11-12: Testing & Performance Optimization\nWeek 13-16: App Store Deployment & Portfolio",
        certification: "Mobile App Developer Certificate"
      },
      {
        title: "Robotics & Automation",
        description: "Robotics fundamentals, programming, and vision systems with practical projects.",
        icon: "🤖",
        gradient: "from-gray-600 to-gray-800",
        price_pkr: 15000,
        price_usd: 50,
        duration: "18-22 weeks",
        level: "Intermediate to Advanced",
        topics: ["Robotics Fundamentals", "Robot Programming", "Computer Vision", "Automation Systems", "IoT Integration"],
        tools: ["ROS", "Python", "C++", "MATLAB", "CAD Software"],
        outline: "Week 1-3: Robotics Fundamentals & Mathematics\nWeek 4-6: Robot Programming with ROS\nWeek 7-9: Sensors & Actuators\nWeek 10-12: Computer Vision for Robotics\nWeek 13-15: Automation & Control Systems\nWeek 16-18: IoT Integration & Connectivity\nWeek 19-22: Advanced Projects & Industry Applications",
        certification: "Robotics Engineer Certificate"
      },
      {
        title: "Cybersecurity Specialist",
        description: "Ethical hacking, network security, and digital forensics with certification prep.",
        icon: "🛡️",
        gradient: "from-red-600 to-orange-600",
        price_pkr: 11000,
        price_usd: 37,
        duration: "10-12 weeks",
        level: "Intermediate",
        topics: ["Ethical Hacking", "Network Security", "Digital Forensics", "Penetration Testing", "Security Compliance"],
        tools: ["Kali Linux", "Metasploit", "Wireshark", "Nmap", "Burp Suite"],
        outline: "Week 1-2: Cybersecurity Fundamentals & Ethics\nWeek 3-4: Network Security & Protocols\nWeek 5-6: Ethical Hacking & Penetration Testing\nWeek 7-8: Digital Forensics & Incident Response\nWeek 9-10: Security Tools & Compliance\nWeek 11-12: Certification Prep & Career Guidance",
        certification: "Cybersecurity Professional Certificate"
      }
    ];

    const defaultServices: InsertService[] = [
      {
        title: "Bespoke AI Solutions",
        description: "Custom ML models, AI integration, and data pipeline development tailored to your business needs.",
        icon: "🧠",
        gradient: "from-blue-500 to-purple-600",
        image_url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        price_pkr_min: 15000,
        price_pkr_max: null,
        price_usd_min: 50,
        price_usd_max: null,
        services_included: [
          "Custom ML Model Development",
          "AI System Integration",
          "Data Pipeline Architecture",
          "Predictive Analytics Implementation",
          "Computer Vision Solutions",
          "Natural Language Processing",
          "Model Deployment & Monitoring"
        ],
        tools: ["TensorFlow", "PyTorch", "AWS SageMaker", "Docker", "Kubernetes", "MLflow"],
        deliverables: [
          "Trained and optimized ML models",
          "Complete system integration",
          "Documentation and training materials",
          "Deployment and monitoring setup",
          "Performance metrics and reporting"
        ]
      },
      {
        title: "Enterprise Web Solutions",
        description: "Custom web applications, e-commerce solutions, and CMS development with modern technologies.",
        icon: "🌐",
        gradient: "from-green-500 to-blue-600",
        image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        price_pkr_min: 12000,
        price_pkr_max: null,
        price_usd_min: 40,
        price_usd_max: null,
        services_included: [
          "Custom Web Application Development",
          "E-commerce Platform Development",
          "Content Management Systems",
          "Progressive Web Apps (PWA)",
          "API Development & Integration",
          "Database Design & Optimization",
          "Performance Optimization"
        ],
        tools: ["React", "Node.js", "Next.js", "MongoDB", "PostgreSQL", "AWS"],
        deliverables: [
          "Fully functional web application",
          "Responsive design across all devices",
          "Admin dashboard and CMS",
          "API documentation",
          "Deployment and hosting setup"
        ]
      },
      {
        title: "Mobile App Development Services",
        description: "iOS/Android apps, cross-platform development, and comprehensive UI/UX design services.",
        icon: "📱",
        gradient: "from-purple-500 to-pink-600",
        image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        price_pkr_min: 18000,
        price_pkr_max: null,
        price_usd_min: 60,
        price_usd_max: null,
        services_included: [
          "Native iOS/Android Development",
          "Cross-platform App Development",
          "UI/UX Design & Prototyping",
          "Backend API Integration",
          "App Store Optimization",
          "Push Notifications",
          "Analytics Integration"
        ],
        tools: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Figma"],
        deliverables: [
          "Fully functional mobile application",
          "App store ready submission",
          "Complete UI/UX design files",
          "Backend integration",
          "Testing and QA documentation"
        ]
      },
      {
        title: "Robotics & Automation Projects",
        description: "Industrial automation, robot programming, and IoT integration for manufacturing and logistics.",
        icon: "🤖",
        gradient: "from-gray-600 to-blue-600",
        image_url: "https://pixabay.com/get/g0e722535981bcfeeccf06dc8564a6e4828c3feb567df1b217593f49b7ef5305b28d4d9dce866213ec7227c1ccfc1f8d2cafd0af7b3c8c4f02081fd93fd56a6be_1280.jpg",
        price_pkr_min: 25000,
        price_pkr_max: null,
        price_usd_min: 85,
        price_usd_max: null,
        services_included: [
          "Industrial Automation Design",
          "Robot Programming & Configuration",
          "IoT Sensor Integration",
          "Process Optimization",
          "Predictive Maintenance Systems",
          "Quality Control Automation",
          "System Monitoring & Analytics"
        ],
        tools: ["ROS", "PLC Programming", "SCADA", "Industrial IoT", "Computer Vision"],
        deliverables: [
          "Complete automation system",
          "Robot programming and configuration",
          "IoT monitoring dashboard",
          "Process optimization reports",
          "Training and documentation"
        ]
      },
      {
        title: "Network & Cyber Security Solutions",
        description: "Network design, security assessment, firewall setup, and comprehensive security auditing.",
        icon: "🛡️",
        gradient: "from-red-500 to-orange-600",
        image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        price_pkr_min: 500,
        price_pkr_max: 8000,
        price_usd_min: 2,
        price_usd_max: 25,
        services_included: [
          "Network Security Assessment",
          "Firewall Configuration & Management",
          "Penetration Testing",
          "Security Policy Development",
          "Incident Response Planning",
          "Employee Security Training",
          "Compliance Auditing"
        ],
        tools: ["Kali Linux", "Metasploit", "Wireshark", "Nessus", "SIEM Tools"],
        deliverables: [
          "Security assessment report",
          "Configured security systems",
          "Security policies and procedures",
          "Incident response plan",
          "Training materials and documentation"
        ]
      },
      {
        title: "Technology Consulting",
        description: "Strategic technology consulting for digital transformation and technology roadmap planning.",
        icon: "💼",
        gradient: "from-indigo-500 to-purple-600",
        image_url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200",
        price_pkr_min: null,
        price_pkr_max: null,
        price_usd_min: null,
        price_usd_max: null,
        services_included: [
          "Digital Transformation Strategy",
          "Technology Roadmap Planning",
          "System Architecture Design",
          "Technology Stack Selection",
          "Process Optimization",
          "Team Training & Development",
          "Implementation Oversight"
        ],
        tools: ["Enterprise Architecture", "Cloud Platforms", "DevOps Tools", "Project Management"],
        deliverables: [
          "Technology strategy document",
          "Implementation roadmap",
          "Architecture blueprints",
          "Technology recommendations",
          "Training and change management plan"
        ]
      }
    ];

    for (const course of defaultCourses) {
      await this.createCourse(course);
    }

    for (const service of defaultServices) {
      await this.createService(service);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: string): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = randomUUID();
    const course: Course = { 
      ...insertCourse, 
      id, 
      created_at: new Date() 
    };
    this.courses.set(id, course);
    return course;
  }

  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: string): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(insertService: InsertService): Promise<Service> {
    const id = randomUUID();
    const service: Service = { 
      ...insertService, 
      id, 
      created_at: new Date() 
    };
    this.services.set(id, service);
    return service;
  }

  async createEnrollment(insertEnrollment: InsertEnrollment): Promise<Enrollment> {
    const id = randomUUID();
    const enrollment: Enrollment = { 
      ...insertEnrollment, 
      id, 
      created_at: new Date() 
    };
    this.enrollments.set(id, enrollment);
    return enrollment;
  }

  async getEnrollments(): Promise<Enrollment[]> {
    return Array.from(this.enrollments.values());
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id, 
      created_at: new Date() 
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }
}

export const storage = new MemStorage();
