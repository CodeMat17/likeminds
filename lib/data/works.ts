export type WorkCategory =
  | "infrastructure"
  | "education"
  | "health"
  | "empowerment"
  | "welfare"
  | "peace";

export interface Work {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  content: string;
  date: string;
  year: number;
  category: WorkCategory;
  images: string[];
  impact: string;
  beneficiaries: string;
  cost?: string;
  location: string;
  featured: boolean;
  tags: string[];
}

export const categoryConfig: Record<
  WorkCategory,
  { label: string; color: string; icon: string }
> = {
  infrastructure: { label: "Infrastructure", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300", icon: "🏗️" },
  education: { label: "Education", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300", icon: "🎓" },
  health: { label: "Health", color: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300", icon: "🏥" },
  empowerment: { label: "Empowerment", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300", icon: "💪" },
  welfare: { label: "Welfare", color: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300", icon: "🤝" },
  peace: { label: "Peace & Unity", color: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300", icon: "🕊️" },
};

export const works: Work[] = [
  {
    id: "1",
    slug: "nomeh-youth-empowerment-summit-2024",
    title: "Nomeh Youth Empowerment Summit 2024",
    shortDescription:
      "A landmark 3-day summit transforming the futures of over 200 youth through skills training, mentorship, and business development.",
    content: `
      <p>In March 2024, LikeMinds 1980–1986 Association organised the Nomeh Youth Empowerment Summit — a landmark 3-day event that brought together over 200 young people from Nomeh and neighboring communities. This was our most ambitious youth programme to date, addressing unemployment, skill gaps, and entrepreneurial potential among the youth of our community.</p>

      <h3>Programme Highlights</h3>
      <p>The summit featured carefully curated workshops covering digital entrepreneurship, tailoring and fashion design, agricultural business management, and financial literacy. Industry leaders, successful entrepreneurs from the Nomeh diaspora, and government officials served as facilitators and mentors throughout the event.</p>

      <h3>Mentorship Network</h3>
      <p>A key innovation of the 2024 summit was the launch of a structured mentorship programme pairing 50 promising youth with successful LikeMinds members. This ongoing relationship extends beyond the event, providing sustained guidance, business advice, and networking opportunities.</p>

      <h3>Startup Grants</h3>
      <p>LikeMinds awarded startup grants totalling ₦3,000,000 to 10 outstanding participants whose business plans demonstrated the greatest potential for community impact. These grants were disbursed at the closing ceremony, with grant recipients committing to employment creation in Nomeh.</p>

      <h3>Impact & Legacy</h3>
      <p>By the close of the summit, over 200 participants had completed formal training, 50 had been matched with mentors, and 10 had received startup capital. The summit has since established itself as an annual event and has inspired similar programmes in neighbouring communities.</p>
    `,
    date: "March 15–17, 2024",
    year: 2024,
    category: "empowerment",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80",
    ],
    impact: "200+ youth trained and mentored; 10 startups funded",
    beneficiaries: "200+ youth (ages 18–35)",
    cost: "₦8,500,000",
    location: "Nomeh Community Town Hall, Enugu",
    featured: true,
    tags: ["youth", "entrepreneurship", "skills", "mentorship", "grants"],
  },
  {
    id: "2",
    slug: "community-borehole-water-project",
    title: "Community Borehole & Clean Water Project",
    shortDescription:
      "Solar-powered borehole installations bringing clean, potable water to three Nomeh communities, benefiting over 5,000 residents.",
    content: `
      <p>Access to clean water has long been a challenge in parts of Nomeh. In November 2023, LikeMinds took decisive action by funding the installation of three modern, solar-powered borehole systems — one in each of three underserved communities within Nomeh.</p>

      <h3>Project Scope</h3>
      <p>Each borehole system includes a deep well (reaching clean aquifer levels), a submersible solar pump, elevated storage tank (10,000-litre capacity), and distribution points with multiple taps for community access. The solar-powered system ensures year-round operation without electricity costs.</p>

      <h3>Technical Specifications</h3>
      <p>The boreholes were drilled to a depth of 80–120 metres to access clean underground water sources, tested by a certified laboratory for safety before commission. The solar array for each system provides 2.5kW of power, sufficient for round-the-clock pumping during daylight and stored energy reserves.</p>

      <h3>Community Management</h3>
      <p>LikeMinds trained five community water management committees — one per borehole — equipping them with basic maintenance skills and establishing a user-fee structure to fund ongoing maintenance and repairs. This ensures long-term sustainability beyond our initial investment.</p>

      <h3>Health Impact</h3>
      <p>Within six months of commissioning, health records from the local primary healthcare centre reported a 43% reduction in water-borne disease cases — a direct testament to the project's transformative impact on community health.</p>
    `,
    date: "November 20, 2023",
    year: 2023,
    category: "infrastructure",
    images: [
      "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=800&q=80",
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
    ],
    impact: "43% reduction in waterborne diseases; clean water daily access",
    beneficiaries: "5,000+ residents across 3 communities",
    cost: "₦12,800,000",
    location: "Three Nomeh Communities, Enugu",
    featured: true,
    tags: ["water", "infrastructure", "health", "solar", "WASH"],
  },
  {
    id: "3",
    slug: "scholarship-programme-2023",
    title: "Annual Scholarship Programme for Indigent Students",
    shortDescription:
      "15 full scholarships awarded to academically brilliant but financially disadvantaged students from Nomeh community.",
    content: `
      <p>Education is the most enduring gift LikeMinds can give to the next generation. In September 2023, the association awarded 15 full scholarships to outstanding students from Nomeh who demonstrated academic excellence but lacked the financial resources to pursue higher education.</p>

      <h3>Selection Process</h3>
      <p>Applications were open to all secondary school graduates from Nomeh who had obtained excellent WAEC/NECO results but could not afford university fees. A selection committee comprising LikeMinds members, community elders, and academic representatives evaluated applications based on academic merit, financial need, and personal character.</p>

      <h3>Scholarship Coverage</h3>
      <p>Each scholarship covers tuition fees, accommodation, textbooks, and a monthly stipend for the full duration of the awardee's undergraduate programme. The total scholarship commitment for 2023 is ₦18,000,000, ensuring none of the scholars faces financial disruption to their studies.</p>

      <h3>Fields of Study</h3>
      <p>The 2023 cohort includes students studying Medicine, Engineering, Law, Computer Science, Agriculture, and Education — fields selected for their potential to directly serve the Nomeh community after graduation.</p>

      <h3>Mentorship & Return Programme</h3>
      <p>Scholarship recipients are enrolled in the LikeMinds Mentorship Network and are encouraged — through a structured Return Programme — to contribute at least two years of service to Nomeh after completing their education.</p>
    `,
    date: "September 5, 2023",
    year: 2023,
    category: "education",
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80",
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",
    ],
    impact: "15 scholars fully funded through university; pipeline of community professionals",
    beneficiaries: "15 students and their families",
    cost: "₦18,000,000",
    location: "Nomeh, Enugu",
    featured: true,
    tags: ["education", "scholarship", "youth", "university", "future"],
  },
  {
    id: "4",
    slug: "annual-health-screening-outreach-2023",
    title: "Annual Free Health Screening & Medical Outreach",
    shortDescription:
      "Comprehensive free medical services — screening, consultation, and medications — provided to over 800 community members.",
    content: `
      <p>In June 2023, LikeMinds organised its annual Free Medical Outreach in partnership with the Enugu State Ministry of Health and several volunteer medical professionals. The three-day outreach brought primary healthcare services directly to Nomeh residents, many of whom have limited access to formal medical care.</p>

      <h3>Services Provided</h3>
      <p>The outreach offered blood pressure measurement, blood glucose testing for diabetes, malaria rapid tests, HIV/AIDS counselling and testing, eye examinations and free glasses, dental check-ups, and general physician consultations. Over 900 patients were seen across the three days.</p>

      <h3>Medical Team</h3>
      <p>The outreach was staffed by 25 volunteer healthcare professionals including doctors, nurses, pharmacists, and lab scientists — many of whom are LikeMinds members or connections of the association from across Nigeria.</p>

      <h3>Medication Distribution</h3>
      <p>Over ₦2,000,000 worth of medications were distributed free of charge to patients, including anti-malarials, antihypertensives, vitamins, and over-the-counter essentials. Patients requiring specialist care were referred to partner hospitals with LikeMinds' support for transport and initial consultation costs.</p>
    `,
    date: "June 10–12, 2023",
    year: 2023,
    category: "health",
    images: [
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    ],
    impact: "900+ patients treated; ₦2M+ in free medications",
    beneficiaries: "900+ community members",
    cost: "₦5,200,000",
    location: "Nomeh Primary School Grounds, Enugu",
    featured: false,
    tags: ["health", "medical", "outreach", "free", "screening"],
  },
  {
    id: "5",
    slug: "widow-welfare-package-distribution-2023",
    title: "Christmas Widow Welfare Package Distribution",
    shortDescription:
      "50 widows and vulnerable families received Christmas welfare packages — food, clothing, and cash gifts — in a moving end-of-year ceremony.",
    content: `
      <p>The Christmas season of 2023 brought joy to 50 widows and vulnerable households in Nomeh, as LikeMinds distributed comprehensive welfare packages in a deeply moving ceremony on December 22nd. This annual tradition reflects the association's commitment to ensuring that no member of the Nomeh community is left behind during the festive season.</p>

      <h3>Package Contents</h3>
      <p>Each welfare package included a 25kg bag of rice, 5kg bag of garri, 5 litres of palm oil, assorted spices and condiments, a complete set of clothing (including children's wear for those with children), and a cash gift of ₦10,000 per household.</p>

      <h3>Selection Process</h3>
      <p>Beneficiaries were identified through a community assessment conducted by the LikeMinds Welfare Committee in collaboration with community leaders. Priority was given to widows, elderly residents without family support, and households with disabled members.</p>

      <h3>Emotional Impact</h3>
      <p>The ceremony was characterised by tears of joy, prayers of gratitude, and heartfelt testimonials from beneficiaries. Several widows shared how the packages represented not just material relief, but a powerful reminder that the community cares for them.</p>
    `,
    date: "December 22, 2023",
    year: 2023,
    category: "welfare",
    images: [
      "https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?w=800&q=80",
      "https://images.unsplash.com/photo-1609825346050-b7a4fe8eb49a?w=800&q=80",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=80",
    ],
    impact: "50 families supported through Christmas; lives of widows and vulnerable lifted",
    beneficiaries: "50 widows and vulnerable families",
    cost: "₦3,200,000",
    location: "Nomeh Community Hall, Enugu",
    featured: false,
    tags: ["welfare", "widows", "Christmas", "food", "charity"],
  },
  {
    id: "6",
    slug: "community-hall-renovation-2023",
    title: "Nomeh Community Hall Complete Renovation",
    shortDescription:
      "The iconic Nomeh Unateze community hall was fully renovated and modernised — restoring pride and functionality to the community's most important gathering space.",
    content: `
      <p>The Nomeh Unateze Community Hall had fallen into significant disrepair over the decades. In April 2023, LikeMinds took on the ambitious project of completely renovating and modernising this vital community space, transforming it into a state-of-the-art venue worthy of the Nomeh people's heritage and aspirations.</p>

      <h3>Renovation Scope</h3>
      <p>The renovation covered structural repairs and reinforcement, complete replastering and painting, new roofing with modern, durable sheets, installation of modern sanitary facilities, new electrical wiring and LED lighting, installation of ceiling fans and air conditioning, new ceramic floor tiles, a sound system, and 200 new stackable chairs with 20 tables.</p>

      <h3>Architectural Vision</h3>
      <p>The renovation was designed by LikeMinds member and Architect Chidi Onwudiwe, who incorporated elements of traditional Igbo architectural aesthetics with modern amenities. The result is a hall that celebrates cultural identity while meeting contemporary standards.</p>

      <h3>Dedication Ceremony</h3>
      <p>The hall was dedicated at a grand ceremony attended by community leaders, traditional rulers, government officials, and hundreds of Nomeh indigenes from across Nigeria. The Governor of Enugu State personally commended LikeMinds for the "exemplary commitment to community development."</p>

      <h3>Community Use</h3>
      <p>Since its renovation, the hall has hosted over 30 community events, including town hall meetings, weddings, naming ceremonies, academic convocations, and public health sessions — serving as the heartbeat of Nomeh community life.</p>
    `,
    date: "April 30, 2023",
    year: 2023,
    category: "infrastructure",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    ],
    impact: "30+ events hosted; community pride restored",
    beneficiaries: "Entire Nomeh community (10,000+ residents)",
    cost: "₦22,000,000",
    location: "Nomeh Unateze, Enugu",
    featured: true,
    tags: ["infrastructure", "renovation", "community hall", "heritage"],
  },
  {
    id: "7",
    slug: "skills-acquisition-training-2023",
    title: "Vocational Skills Acquisition & Entrepreneurship Training",
    shortDescription:
      "100 unemployed youth and adults gained marketable vocational skills — from tailoring to ICT — with 30 businesses launched within months.",
    content: `
      <p>In August 2023, LikeMinds partnered with the Enugu State Technical Education Department to organise a 6-week intensive vocational training programme for 100 unemployed youth and underemployed adults from Nomeh and surrounding areas.</p>

      <h3>Trades Offered</h3>
      <p>Participants were enrolled in one of six trades: Professional Tailoring & Fashion Design, Catering & Confectionery, ICT & Mobile Device Repair, Automobile Mechanics, Plumbing & Tiling, and Hairdressing & Cosmetology.</p>

      <h3>Master Trainers</h3>
      <p>Each trade stream was taught by a certified master trainer with at least 10 years of professional experience. Practical sessions accounted for 70% of training time, with participants working on real projects for community clients.</p>

      <h3>Starter Packs</h3>
      <p>Upon completing training, each graduate received a starter pack — tools, equipment, or raw materials relevant to their trade — with an estimated value of ₦50,000 per person. This immediate resource eliminated the typical post-training gap where graduates lack tools to begin working.</p>

      <h3>Business Impact</h3>
      <p>A follow-up assessment conducted three months after the training found that 30 out of 100 graduates had successfully established their own businesses, collectively employing an additional 45 apprentices and assistants from the community.</p>
    `,
    date: "August 1–September 15, 2023",
    year: 2023,
    category: "empowerment",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
      "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    ],
    impact: "100 trained; 30 businesses launched; 45 jobs created",
    beneficiaries: "100 youth and adults (18–45 years)",
    cost: "₦7,500,000",
    location: "Nomeh Technical Institute, Enugu",
    featured: false,
    tags: ["skills", "vocational", "entrepreneurship", "employment", "training"],
  },
  {
    id: "8",
    slug: "peace-unity-summit-2024",
    title: "Nomeh Peace, Unity & Development Summit",
    shortDescription:
      "An extraordinary community dialogue brought together all strata of Nomeh society to resolve conflicts, forge unity, and chart a shared development roadmap.",
    content: `
      <p>January 2024 marked a defining moment for Nomeh as LikeMinds convened the inaugural Peace, Unity & Development Summit — a two-day dialogue bringing together youth, women, elders, traditional rulers, religious leaders, and the Nomeh diaspora to address longstanding tensions and collectively chart a path forward.</p>

      <h3>Why the Summit Was Needed</h3>
      <p>Nomeh, like many communities, has experienced occasional land disputes, generational disconnects, and political divisions that threatened the social fabric. LikeMinds recognised that sustainable development is only possible on a foundation of peace and unity — making this summit not just timely but urgent.</p>

      <h3>Summit Outcomes</h3>
      <p>The summit resulted in a landmark Peace Declaration signed by all stakeholder groups, the establishment of a Community Conflict Resolution Committee with representation from all factions, a 5-year Nomeh Development Roadmap identifying priority projects, and the launch of a Nomeh Diaspora Investment Fund co-chaired by LikeMinds.</p>

      <h3>National Recognition</h3>
      <p>The summit was covered by major national media outlets and was cited by the Enugu State Commissioner for Chieftaincy Affairs as "a model of grassroots peacebuilding" that other communities should emulate.</p>
    `,
    date: "January 15–16, 2024",
    year: 2024,
    category: "peace",
    images: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
    ],
    impact: "Peace Declaration signed; Conflict Resolution Committee established; 5-year development roadmap launched",
    beneficiaries: "Entire Nomeh community and diaspora",
    cost: "₦4,800,000",
    location: "Nomeh Community Hall, Enugu",
    featured: false,
    tags: ["peace", "unity", "dialogue", "community", "development"],
  },
];

export const featuredWorks = works.filter((w) => w.featured);
export const getWorkBySlug = (slug: string) => works.find((w) => w.slug === slug);
