import { Shield, GraduationCap, Briefcase, Brain, FileText } from 'lucide-react';

export const DEFAULT_CATEGORIES = [
  { id: 'healthcare', name: 'Healthcare', icon: Shield, docs: '2,400' },
  { id: 'education', name: 'Education', icon: GraduationCap, docs: '1,800' },
  { id: 'environment', name: 'Environment', icon: Briefcase, docs: '3,100' },
  { id: 'finance', name: 'Finance', icon: Brain, docs: '4,200' },
  { id: 'agriculture', name: 'Agriculture', icon: FileText, docs: '892' },
]

export const SAMPLE_QUERIES_PER_CATEGORY = [
  {
    id: "healthcare",
    questions: ["Levels of healthcare in India?", "What is Ayushman Bharat coverage?", "Key challenges in public hospitals?", "Growth of telemedicine post-COVID?", "Role of AYUSH in Indian healthcare?"]
  },
  {
    id: "education",
    questions: ["NEP 2020 key goals?", "School infrastructure improvements?", "Rise of online learning post-COVID?", "Role of AI in education?", "Vocational training under Skill India?"]
  },
  {
    id: "environment",
    questions: ["India’s net-zero target year?", "Renewable energy capacity goals?", "What is NCAP objective?", "Single-use plastic ban 2022?", "Impacts of climate change in India?"]
  },
  {
    id: "finance",
    questions: ["RBI main functions?", "Union Budget 2024 highlights?", "UPI transaction growth 2024?", "MSME contribution to GDP?", "India’s cryptocurrency regulation plans?"]
  },
  {
    id: "agriculture",
    questions: ["Indian agriculture GDP share and workforce?", "PM-KISAN benefits?", "How to reduce food wastage post-harvest?", "AI and drones in farming?", "Climate change effects on Indian agriculture?"]
  }
]

export const SAMPLE_RESPONSE = {
  status: true,
  message: "Response generated successfully.",
  response: "At COP26, India pledged to achieve *net-zero* carbon emissions by 2070.  They also committed to a 45% reduction in carbon intensity by 2030 (from 2005 levels).  These commitments are complemented by  adaptation strategies focusing on agriculture, water, and disaster resilience.  More information can be found at:- [https://unfccc.int/cop26](https://unfccc.int/cop26)",
  metadata: {
    sources: [
      "cop26_commitments.docx",
      "climate_adaptation_strategy.json",
      "climate_finance_overview.csv"
    ],
    data: [
      {
        id: "7ab6e7b1-afc7-4401-b7a4-5dca157ed28a",
        textdata: "At COP26 in Glasgow, India pledged to achieve net-zero carbon emissions by 2070 and committed to reducing the carbon intensity of its economy by 45% from 2005 levels by 2030. (Reference: https://unfccc.int/cop26)",
        source: "cop26_commitments.docx",
        score: 0.629980803
      },
      {
        id: "b119bc50-1a96-4199-b3d7-57b59845969f",
        textdata: "India’s climate adaptation strategy focuses on agriculture, water resources, and disaster resilience. Initiatives include promoting climate-resilient crops, rainwater harvesting, and early warning systems for extreme weather. (Details: https://www.napcc.gov.in/)",
        source: "climate_adaptation_strategy.json",
        score: 0.526087344
      },
      {
        id: "577deb23-b221-4702-8323-2607b8111922",
        textdata: "Climate finance in India is growing, with green bonds and international funding supporting renewable projects, afforestation, and sustainable infrastructure. (Info: https://www.climatefinance.in/)",
        source: "climate_finance_overview.csv",
        score: 0.486945689
      }
    ],
    response_time_seconds: 12.61
  }
};


