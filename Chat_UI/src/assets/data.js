import { Shield, GraduationCap, Briefcase, Brain, FileText, Upload } from 'lucide-react';

export const domains = [
    { id: 'healthcare', name: 'Healthcare', icon: Shield, docs: '2,400' },
    { id: 'education', name: 'Education', icon: GraduationCap, docs: '1,800' },
    { id: 'legal', name: 'Legal', icon: Briefcase, docs: '3,100' },
    { id: 'research', name: 'Research', icon: Brain, docs: '4,200' },
    { id: 'policies', name: 'Policies', icon: FileText, docs: '892' },
    { id: 'custom', name: 'Custom', icon: Upload, docs: '256' }
];

export const sampleQueries = {
    healthcare: [
        "Tell me about the Ayushman Bharat scheme.",
        "How does public vs private healthcare work in India?",
        "What are the main levels of the Indian healthcare system?",
        "What is the role of telemedicine in Indian healthcare?",
        "Is Ayurveda part of the Indian healthcare system?"
    ],
    education: [
        "What are the main goals of the National Education Policy 2020?",
        "Why is there a high dropout rate in Indian schools?",
        "How is India addressing digital learning in rural areas?",
        "What challenges do children with disabilities face in education?",
        "How does private schooling affect educational inequality in India?"
    ],
    legal: [
        "What are the fundamental rights guaranteed by the Indian Constitution?",
        "What is the difference between civil and criminal law in India",
        "How does legal aid work for poor or marginalized citizens?",
        "Can you explain landmark Supreme Court judgments in India?",
        "What are India's laws related to cybercrime and digital security?"
    ],
    research: [
        "What are some of the major achievements of ISRO?",
        "Who was Vikram Sarabhai and what was his contribution to Indian science?",
        "Tell me about Indian scientists who won the Nobel Prize.",
        "What are the key challenges faced by researchers in India?",
        "How is India using AI in scientific research?"
    ],
    policies: [
        "What is the hiring process at TCS for freshers?",
        "Are internships available for engineering students at TATA?",
        "What kind of job roles are offered at Tata Communications?",
        "What benefits do employees get at TATA companies?",
        "Can I apply for jobs at TATA if I'm not from a campus placement?"
    ],
    custom: [
        "Search custom docs",
        "Query uploads",
        "User-specific reports",
        "Custom data analytics"
    ]
};

