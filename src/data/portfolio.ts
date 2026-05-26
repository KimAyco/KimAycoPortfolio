import signSpeakHero from "@/assets/signspeak.png"
import finsnapHero from "@/assets/Finsnap.png"
import autoprintHero from "@/assets/AUTOPRINT.png"
import virtualCameraHero from "@/assets/Virtual_Camera.png"
import certSeminarDay1 from "@/assets/AYCO, KIM JOHN MARELL M (2).png"
import certSeminarDay2 from "@/assets/AYCO, KIM JOHN MARELL M (3).png"

export type ArchiveEntryKind = "project" | "certificate"

export interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  url?: string
  progress: number
  kind?: ArchiveEntryKind
}

export const projects: Project[] = [
  {
    id: 1,
    title: "SignSpeak",
    description:
      "Sign language learning and translation platform — breaking barriers, one sign at a time.",
    image: signSpeakHero,
    tags: ["PHP", "SQL", "Python", "MediaPipe", "Computer Vision", "AI", "Web", "Accessibility"],
    url: "https://signspeak.net",
    progress: 100,
  },
  {
    id: 2,
    title: "FINSNAP",
    description:
      "Fish recognition app with AI and computer vision — identify species and see real-time market prices.",
    image: finsnapHero,
    tags: ["AI", "Computer Vision", "Python", "Android", "Flutter"],
    url: "https://kimayco.github.io/Download-FinSnap-/",
    progress: 100,
  },
  {
    id: 3,
    title: "AUTOPRINT",
    description:
      "Print and design workflow tooling — automate layouts, previews, and production-ready output.",
    image: autoprintHero,
    tags: ["Web", "Automation", "Print", "Design", "UI"],
    progress: 10,
  },
  {
    id: 4,
    title: "VerVin Cam",
    description:
      "Virtual disposable-style Polaroid camera in the browser — shoot, develop, and edit.",
    image: virtualCameraHero,
    tags: ["HTML", "CSS", "JavaScript", "Web", "UI"],
    url: "https://kimayco.github.io/VerVin-Cam/",
    progress: 100,
  },
  {
    id: 5,
    kind: "certificate",
    title: "Advanced Seminar — Day 1",
    description:
      "Certificate of completion for Day 1 of the Advanced Seminar Series (BSIT 4th Year): Journey from Science Practitioner to Information Technology Specialist. Davao del Norte State College · Oct 8, 2025 · Microsoft Teams.",
    image: certSeminarDay1,
    tags: ["Certificate", "Seminar", "DNSC", "BSIT", "IT"],
    progress: 100,
  },
  {
    id: 6,
    kind: "certificate",
    title: "Advanced Seminar — Day 2",
    description:
      "Certificate of completion for Day 2: The Power of Color in Graphic Design — Theory, Psychology, and Practice. Davao del Norte State College · Nov 5, 2025.",
    image: certSeminarDay2,
    tags: ["Certificate", "Seminar", "Design", "DNSC", "Graphic Design"],
    progress: 100,
  },
]

export const features = [
  { title: "Web Development", description: "Responsive, performant web applications" },
  { title: "UI/UX Design", description: "Intuitive interfaces with console-grade polish" },
  { title: "Performance", description: "Speed and efficiency at every layer" },
  { title: "Collaboration", description: "Clear comms with teams and clients" },
  { title: "Computer Vision", description: "AI, MediaPipe, real-time recognition" },
  { title: "Best Practices", description: "Industry standards and clean architecture" },
]

export const stats = [
  { label: "Projects", value: "50+", suffix: "+" },
  { label: "Clients", value: "30+", suffix: "+" },
  { label: "Years", value: "5+", suffix: "+" },
  { label: "Stacks", value: "12", suffix: "+" },
]

export const faqItems = [
  {
    q: "What technologies do you work with?",
    a: "React, TypeScript, Node.js, Python, computer vision, and modern web stacks.",
  },
  {
    q: "How long does a typical project take?",
    a: "Most projects run 2–6 weeks depending on scope and complexity.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes — maintenance packages and ongoing support are available.",
  },
  {
    q: "What is your development process?",
    a: "Agile iterations with regular updates and client feedback loops.",
  },
]
