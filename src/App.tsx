"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValueEvent, useScroll, type Variants } from "framer-motion"
import {
  Award,
  ChevronDown,
  Code,
  ExternalLink,
  Globe,
  Mail,
  MapPin,
  Menu,
  Palette,
  Phone,
  Rss,
  Send,
  Star,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import profilePhoto from "@/assets/kimprofile.jpg"
import signSpeakHero from "@/assets/signspeak.png"
import finsnapHero from "@/assets/Finsnap.png"
import autoprintHero from "@/assets/AUTOPRINT.png"
import virtualCameraHero from "@/assets/Virtual_Camera.png"

interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  url?: string
  /** Completion 0–100 */
  progress: number
}

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemFadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const { scrollY: scrollYMotion } = useScroll()
  useMotionValueEvent(scrollYMotion, "change", (latest) => {
    setScrollY(latest)
  })

  const projects: Project[] = [
    {
      id: 1,
      title: "SignSpeak",
      description:
        "Sign language learning and translation platform — breaking barriers, one sign at a time.",
      image: signSpeakHero,
      tags: [
        "PHP",
        "SQL",
        "Python",
        "MediaPipe",
        "Computer Vision",
        "AI",
        "Real-time",
        "Web",
        "Educational",
        "Sign Language",
        "Accessibility",
        "Learning",
      ],
      url: "https://signspeak.net",
      progress: 100,
    },
    {
      id: 2,
      title: "FINSNAP",
      description:
        "Fish recognition app with AI and computer vision — identify species and see real-time market prices.",
      image: finsnapHero,
      tags: [
        "AI",
        "Computer Vision",
        "Python",
        "Android",
        "Web",
        "Flutter",
      ],
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
        "Virtual disposable-style Polaroid camera in the browser — shoot, develop, and edit with HTML, CSS, and JavaScript.",
      image: virtualCameraHero,
      tags: ["HTML", "CSS", "JavaScript", "Web", "UI"],
      url: "https://kimayco.github.io/VerVin-Cam/",
      progress: 100,
    },
  ]

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO",
      company: "TechStart Inc",
      content:
        "Outstanding work! The project was delivered on time and exceeded all expectations. Highly professional and skilled developer.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateLabs",
      content:
        "Exceptional attention to detail and great communication throughout the project. Would definitely work together again!",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "CTO",
      company: "Digital Solutions",
      content:
        "Brilliant developer with excellent problem-solving skills. Delivered a robust and scalable solution for our needs.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ]

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveTestimonial((current) => (current + 1) % testimonials.length)
    }, 6000)
    return () => window.clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="flex min-h-screen flex-col bg-background overflow-x-hidden">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
          scrollY > 50 ? "shadow-md" : ""
        }`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary"
            >
              <Code className="h-5 w-5 text-primary-foreground" />
            </motion.div>
            <span className="text-xl font-bold">Portfolio</span>
          </div>
          <nav className="hidden gap-6 md:flex">
            <a href="#hero" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </a>
            <a
              href="#features"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Features
            </a>
            <a
              href="#projects"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Projects
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm">Hire Me</Button>
          </div>
          <button className="flex md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.header>

      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 bg-background md:hidden"
        >
          <nav className="container grid gap-4 py-8">
            {["Home", "Features", "Projects", "Testimonials", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-lg font-medium hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <Button variant="outline">Sign In</Button>
              <Button>Hire Me</Button>
            </div>
          </nav>
        </motion.div>
      )}

      <main className="flex-1">
        <section id="hero" className="w-full">
          <BackgroundPaths
            title="Kim Portfolio"
            subtitle="Crafting exceptional digital experiences with modern technologies and creative solutions."
            profileImageSrc={profilePhoto}
            profileImageAlt="Profile photo"
          >
            <div className="flex flex-col items-center gap-4 md:items-start">
              <Badge variant="secondary" className="border border-white/10 bg-white/5 text-foreground">
                Available for Freelance
              </Badge>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  Get in Touch
                </Button>
                <Button variant="outline" className="bg-transparent">
                  View Projects
                </Button>
              </div>

              <div className="mt-2 flex items-center gap-4 text-muted-foreground">
                <a href="#" className="hover:text-foreground" aria-label="Website">
                  <Globe className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-foreground" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-foreground" aria-label="Feed">
                  <Rss className="h-5 w-5" />
                </a>
              </div>
            </div>
          </BackgroundPaths>
        </section>

        <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <Badge>Portfolio</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Projects
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                A showcase of my recent work and achievements
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-6xl gap-6 py-12 md:grid-cols-2"
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemFadeIn}
                  whileHover={{ y: -10 }}
                  className="h-full"
                >
                  <Card className="flex h-full flex-col overflow-hidden">
                    <div className="relative h-48 shrink-0 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <CardHeader className="shrink-0">
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col">
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-auto flex w-full flex-col gap-3 border-t border-border/60 pt-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>Completion</span>
                            <span className="font-medium tabular-nums text-foreground">
                              {project.progress}%
                            </span>
                          </div>
                          <Progress value={project.progress} />
                        </div>
                        <div className="flex justify-end">
                          {project.url ? (
                            <Button variant="ghost" size="sm" asChild>
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Project
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </a>
                            </Button>
                          ) : (
                            <Button variant="ghost" size="sm">
                              View Project
                              <ExternalLink className="ml-2 h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section
          id="features"
          className="w-full bg-muted/30 py-12 md:py-24 lg:py-32"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <Badge>What I Do</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                My Expertise
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Specialized in creating modern, scalable applications with cutting-edge technologies
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
            >
              {[
                {
                  icon: <Code className="h-10 w-10 text-primary" />,
                  title: "Web Development",
                  description: "Building responsive and performant web applications",
                },
                {
                  icon: <Palette className="h-10 w-10 text-primary" />,
                  title: "UI/UX Design",
                  description: "Creating intuitive and beautiful user interfaces",
                },
                {
                  icon: <Zap className="h-10 w-10 text-primary" />,
                  title: "Performance",
                  description: "Optimizing applications for speed and efficiency",
                },
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: "Collaboration",
                  description: "Working effectively with teams and clients",
                },
                {
                  icon: <TrendingUp className="h-10 w-10 text-primary" />,
                  title: "SEO & Analytics",
                  description: "Improving visibility and tracking metrics",
                },
                {
                  icon: <Award className="h-10 w-10 text-primary" />,
                  title: "Best Practices",
                  description: "Following industry standards and patterns",
                },
              ].map((feature, index) => (
                <motion.div key={index} variants={itemFadeIn} whileHover={{ y: -10 }}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="mb-4">{feature.icon}</div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section className="w-full bg-muted/30 py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="grid gap-6 md:grid-cols-4">
              {[
                { label: "Projects Completed", value: "50+" },
                { label: "Happy Clients", value: "30+" },
                { label: "Years Experience", value: "5+" },
                { label: "Awards Won", value: "12" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeIn}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center justify-center rounded-lg border bg-background p-6"
                >
                  <div className="mb-2 text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <Badge className="w-fit">Testimonials</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  What Clients Say
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Don&apos;t just take my word for it - hear from some of my satisfied clients
                </p>
                <div className="flex items-center gap-3 pt-4">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        activeTestimonial === index
                          ? "w-10 bg-primary"
                          : "w-2.5 bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="relative min-h-[400px]">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{
                      opacity: activeTestimonial === index ? 1 : 0,
                      x: activeTestimonial === index ? 0 : 100,
                      scale: activeTestimonial === index ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.5 }}
                    style={{ zIndex: activeTestimonial === index ? 10 : 0 }}
                  >
                    <Card className="h-full">
                      <CardHeader>
                        <div className="mb-4 flex gap-2">
                          {Array(testimonial.rating)
                            .fill(0)
                            .map((_, i) => (
                              <Star
                                key={i}
                                className="h-5 w-5 fill-yellow-500 text-yellow-500"
                              />
                            ))}
                        </div>
                        <CardDescription className="text-lg">
                          &quot;{testimonial.content}&quot;
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Separator className="my-4" />
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={testimonial.avatar} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{testimonial.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {testimonial.role}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="pricing" className="w-full bg-muted/30 py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <Badge>Pricing</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Choose the package that fits your needs
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3"
            >
              {[
                {
                  name: "Basic",
                  price: "$500",
                  features: ["Single Page", "Responsive Design", "Basic SEO", "1 Revision"],
                },
                {
                  name: "Pro",
                  price: "$1500",
                  features: [
                    "Multi Page",
                    "Advanced Design",
                    "SEO Optimized",
                    "3 Revisions",
                    "CMS Integration",
                  ],
                  popular: true,
                },
                {
                  name: "Enterprise",
                  price: "$3000+",
                  features: [
                    "Custom Solution",
                    "Premium Design",
                    "Full SEO",
                    "Unlimited Revisions",
                    "Ongoing Support",
                  ],
                },
              ].map((plan, index) => (
                <motion.div key={index} variants={itemFadeIn} whileHover={{ y: -10 }}>
                  <Card className={`h-full ${plan.popular ? "border-primary" : ""}`}>
                    <CardHeader>
                      {plan.popular && <Badge className="mb-2 w-fit">Most Popular</Badge>}
                      <CardTitle>{plan.name}</CardTitle>
                      <div className="text-3xl font-bold">{plan.price}</div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/20">
                              <div className="h-2 w-2 rounded-full bg-primary"></div>
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="mt-6 w-full" variant={plan.popular ? "default" : "outline"}>
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="flex flex-col items-center space-y-4 text-center">
              <Badge>FAQ</Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently Asked Questions
              </h2>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mx-auto max-w-3xl space-y-4 py-12"
            >
              {[
                {
                  q: "What technologies do you work with?",
                  a: "I specialize in React, Next.js, TypeScript, Node.js, and modern web technologies.",
                },
                {
                  q: "How long does a typical project take?",
                  a: "Project timelines vary, but most websites take 2-6 weeks depending on complexity.",
                },
                {
                  q: "Do you offer ongoing support?",
                  a: "Yes, I offer maintenance packages and ongoing support for all projects.",
                },
                {
                  q: "What is your development process?",
                  a: "I follow an agile approach with regular updates and client feedback throughout development.",
                },
              ].map((faq, index) => (
                <motion.div key={index} variants={itemFadeIn}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-lg">
                        {faq.q}
                        <ChevronDown className="h-5 w-5" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        <section id="contact" className="w-full bg-muted/30 py-12 md:py-24 lg:py-32">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="container px-4 md:px-6"
          >
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <Badge>Contact</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Let&apos;s Work Together
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Have a project in mind? Get in touch and let&apos;s create something amazing.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="text-sm text-muted-foreground">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>Fill out the form and I&apos;ll get back to you soon</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">First Name</label>
                        <Input placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Last Name</label>
                        <Input placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message</label>
                      <Textarea
                        placeholder="Tell me about your project..."
                        className="min-h-[120px]"
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="w-full border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} John Doe. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Globe className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Rss className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
