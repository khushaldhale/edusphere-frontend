import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./Card";
import { Button } from "./Button";
import { Badge } from "./Badge";
import {
  Star,
  Users,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  TrendingUp,
  Heart,
  ChevronRight,
  Play,
  CheckCircle,
  Sparkles,
  Zap,
  Target,
  Rocket,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Mock data - replace with your actual data
const coursesData = [
  {
    id: 1,
    title: "Full Stack Web Development",
    description: "Master MERN stack development with hands-on",
    duration: "6 months",
    students: 2500,
    rating: 4.9,
    price: "₹49,999",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
  },
  {
    id: 2,
    title: "Data Science & AI",
    description: "Learn Python, ML, and AI with real-world applications",
    duration: "8 months",
    students: 1800,
    rating: 4.8,
    price: "₹59,999",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400",
  },
  {
    id: 3,
    title: "Digital Marketing",
    description: "Complete digital marketing with SEO, SEM",
    duration: "4 months",
    students: 3200,
    rating: 4.7,
    price: "₹29,999",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
  },
];

const placementsData = [
  {
    name: "Priya Sharma",
    company: "Google",
    position: "Software Engineer",
    package: "₹28 LPA",
    course: "Full Stack Development",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  },
  {
    name: "Rahul Kumar",
    company: "Microsoft",
    position: "Data Scientist",
    package: "₹32 LPA",
    course: "Data Science & AI",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  },
  {
    name: "Anita Singh",
    company: "Amazon",
    position: "Marketing Manager",
    package: "₹18 LPA",
    course: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
  },
];

const feedbacksData = [
  {
    name: "Vikash Patel",
    rating: 5,
    comment:
      "Amazing course structure and incredible support from instructors. Got placed in my dream company!",
    course: "Full Stack Development",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
  },
  {
    name: "Sneha Reddy",
    rating: 5,
    comment:
      "The practical approach and real-world projects helped me land a great job. Highly recommended!",
    course: "Data Science",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
  },
  {
    name: "Arjun Gupta",
    rating: 4,
    comment:
      "Excellent mentoring and career guidance. The placement support is outstanding!",
    course: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
  },
];

const trainersData = [
  {
    name: "Dr. Rajesh Kumar",
    expertise: "Full Stack Development",
    experience: "12+ years",
    company: "Ex-Google, Microsoft",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  },
  {
    name: "Dr. Priya Mehta",
    expertise: "Data Science & AI",
    experience: "10+ years",
    company: "Ex-Amazon, Facebook",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  },
  {
    name: "Amit Sharma",
    expertise: "Digital Marketing",
    experience: "8+ years",
    company: "Ex-Flipkart, Paytm",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const fadeInUp = {
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.8, 0.25, 1],
      },
    },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.17,
      },
    },
  };

  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 8,
    duration: Math.random() * 3 + 5,
  }));

  const floatingIcons = [
    { Icon: Sparkles, delay: 0 },
    { Icon: Zap, delay: 1 },
    { Icon: Target, delay: 2 },
    { Icon: Rocket, delay: 3 },
    { Icon: BookOpen, delay: 4 },
    { Icon: GraduationCap, delay: 5 },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="gradient-primary p-2 text-white hover:opacity-90 rounded-md">
            Edusphere
          </div>
          <div className="hidden md:flex space-x-8">
            {["Courses", "Placements", "About", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.05 }}
                className="text-foreground hover:text-primary transition-colors"
              >
                {item}
              </motion.a>
            ))}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to={"/login"}
                className="text-foreground hover:text-primary transition-colors"
              >
                Login
              </Link>
            </motion.div>
          </div>
          <div
            onClick={() => {
              navigate("/dashboard/enquiries/add  ");
            }}
          >
            <Button className="gradient-primary text-white hover:opacity-90">
              Join Now
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="pt-24 pb-20 gradient-hero relative overflow-hidden min-h-screen flex items-center"
      >
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white/20"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{
                y: [0, -100],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-white/30"
            style={{
              left: `${10 + index * 15}%`,
              top: `${20 + (index % 2) * 40}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut",
            }}
          >
            <item.Icon size={40} />
          </motion.div>
        ))}

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Rocket className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          <motion.h1
            {...fadeInUp}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Transform Your
            <span className="block text-accent animate-pulse">
              {" "}
              Career Today
            </span>
          </motion.h1>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Join thousands of successful students who landed their dream jobs
            with our industry-leading courses
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-elegant px-8 py-6 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Start Learning
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0, 172, 240, 0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white  hover:text-primary px-8 py-6 text-lg"
              >
                Book Counseling
                <Target className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
          >
            {[
              { number: "10K+", label: "Students Trained", icon: Users },
              { number: "95%", label: "Placement Rate", icon: TrendingUp },
              { number: "500+", label: "Companies Hiring", icon: Award },
              { number: "₹25L", label: "Avg Package", icon: Star },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <stat.icon className="h-8 w-8 text-white mx-auto mb-3" />
                <div className="text-3xl font-bold text-white">
                  {stat.number}
                </div>
                <div className="text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Courses Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="courses"
        className="py-20 bg-muted/30"
      >
        <div className="container mx-auto md:px-3">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Popular Courses
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry-designed curriculum with hands-on projects and guaranteed
              placements
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ amount: 0.3 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {coursesData.map((course) => (
              <motion.div
                key={course.id}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 30px rgba(0, 172, 240, 0.2)",
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                className="w-[400px]" // Fixed width card
              >
                <Card className="overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300 group text-sm">
                  <div className="relative">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 right-3 bg-primary text-white text-xs">
                      {course.duration}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold mb-2">
                      {course.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {course.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 text-xs">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-semibold">{course.rating}</span>
                        <span className="text-muted-foreground">
                          ({course.students})
                        </span>
                      </div>
                      <div className="text-xl font-bold text-primary">
                        {course.price}
                      </div>
                    </div>
                    <Button className="w-full gradient-primary text-white text-sm hover:opacity-90">
                      Enroll Now
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Placements Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="placements"
        className="py-20 bg-muted/30"
      >
        <div className="container mx-auto md:px-3">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-black">
              Recent Placements
            </h2>
            <p className="text-lg md:text-xl text-black/70 max-w-2xl mx-auto">
              Our students are getting placed in top companies with amazing
              packages
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ amount: 0.3 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {placementsData.map((placement, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 30px rgba(0, 112, 244, 0.25)", // subtle blue shadow
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                className="w-[400px]"
              >
                <Card className="relative overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300 group text-sm border border-black bg-white">
                  {/* Company name top-right label */}
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md select-none z-10">
                    {placement.company}
                  </div>
                  <CardContent className="pt-10 px-6 pb-8 flex flex-col items-center text-center">
                    <img
                      src={placement.image}
                      alt={placement.name}
                      className="w-20 h-20 rounded-full mb-4 object-cover shadow-sm border border-black"
                    />
                    <h3 className="font-semibold text-lg text-black mb-1">
                      {placement.name}
                    </h3>
                    <p className="text-black/70 text-sm mb-4 italic max-w-[320px]">
                      {/* Using description-like placeholder for feedback */}"
                      {placement.feedback ||
                        "This course helped me achieve my dream job with excellent placement support!"}
                      "
                    </p>
                    <p className="text-black/60 text-xs mb-6">
                      {placement.course}
                    </p>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="w-full max-w-[320px]"
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-black  border-2 border-gray-900 hover:border-blue-600 hover:text-blue-600 w-full font-semibold"
                      >
                        <Calendar className="mr-2 h-5 w-5" />
                        {placement.package}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Feedback Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="container mx-auto md:px-3">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Student Feedback
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear what our successful students have to say about their journey
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ amount: 0.3 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {feedbacksData.map((feedback, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 30px rgba(0, 172, 240, 0.2)",
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                className="w-[400px]"
              >
                <Card className="shadow-elegant hover:shadow-glow transition-all duration-300 group text-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={feedback.image}
                        alt={feedback.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                      <div>
                        <h4 className="font-bold">{feedback.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {feedback.course}
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(feedback.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-accent text-accent"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic text-sm">
                      "{feedback.comment}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Trainers Section  */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="placements"
        className="py-20 bg-muted/30"
      >
        <div className="container mx-auto md:px-3">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-black">
              Our Trainers
            </h2>
            <p className="text-lg md:text-xl text-black/70 max-w-2xl mx-auto">
              We do have top trainers with industry exeperince
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ amount: 0.3 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {trainersData.map((trainer, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 30px rgba(0, 112, 244, 0.25)", // subtle blue shadow
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                className="w-[400px]"
              >
                <Card className="relative overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-300 group text-sm border border-black bg-white">
                  {/* Company name top-right label */}
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md select-none z-10">
                    {trainer.expertise}
                  </div>
                  <CardContent className="pt-10 px-6 pb-8 flex flex-col items-center text-center">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-20 h-20 rounded-full mb-4 object-cover shadow-sm border border-black"
                    />
                    <h3 className="font-semibold text-lg text-black mb-1">
                      {trainer.name}
                    </h3>
                    <p className="text-black/70 text-sm mb-4 italic max-w-[320px]">
                      {/* Using description-like placeholder for feedback */}"
                      {trainer.desc ||
                        "This course helped me achieve my dream job with excellent placement support!"}
                      "
                    </p>
                    <p className="text-black/60 text-xs mb-6">
                      {trainer.company}
                    </p>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="w-full max-w-[320px]"
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-black  border-2 border-gray-900 hover:border-blue-600 hover:text-blue-600 w-full font-semibold"
                      >
                        <Calendar className="mr-2 h-5 w-5" />
                        {trainer.experience}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 gradient-hero relative overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            {...fadeInUp}
            className="text-3xl md:text-4xl font-semibold text-white mb-6"
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Join thousands of successful students and transform your career
            today
          </motion.p>
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Enroll Now Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button
                size="lg"
                className="bg-white text-primary shadow-elegant"
              >
                <GraduationCap className="mr-2 h-5 w-5" />
                Enroll Now
              </Button>
            </motion.div>

            {/* Book Free Demo Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:text-primary"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="contact"
        className="py-20 bg-muted/30"
      >
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We're here to help you choose the right path
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ amount: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Phone,
                title: "Call Us",
                info: "+91 9876543210",
                action: "Call Now",
              },
              {
                icon: Mail,
                title: "Email Us",
                info: "info@edutechpro.com",
                action: "Send Email",
              },
              {
                icon: MapPin,
                title: "Visit Us",
                info: "Bangalore, Karnataka",
                action: "Get Directions",
              },
              {
                icon: Calendar,
                title: "Counseling",
                info: "Book Free Session",
                action: "Schedule Now",
              },
            ].map((contact, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center shadow-elegant hover:shadow-glow transition-all duration-300 group">
                  <CardContent className="pt-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-full flex items-center justify-center"
                    >
                      <contact.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-lg mb-2">{contact.title}</h3>
                    <p className="text-muted-foreground mb-4">{contact.info}</p>
                    <Button
                      variant="outline"
                      className="group-hover:bg-primary transition-colors"
                    >
                      {contact.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 bg-foreground text-background"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div variants={fadeInUp}>
              <div className="gradient-primary p-2 text-white text-center hover:opacity-90 rounded-md">
                Edusphere
              </div>
              <p className="text-background/80 mb-4">
                Transforming careers through quality education and
                industry-relevant training.
              </p>
              <div className="flex space-x-4">
                {/* Social media icons */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-8 h-8 bg-primary rounded-full"
                />
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-8 h-8 bg-primary rounded-full"
                />
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-8 h-8 bg-primary rounded-full"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["About Us", "Courses", "Placements", "Contact"].map(
                  (link) => (
                    <li key={link}>
                      <motion.a
                        whileHover={{ x: 5 }}
                        href="#"
                        className="text-background/80 hover:text-primary transition-colors"
                      >
                        {link}
                      </motion.a>
                    </li>
                  )
                )}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h4 className="font-bold mb-4">Courses</h4>
              <ul className="space-y-2">
                {[
                  "Web Development",
                  "Data Science",
                  "Digital Marketing",
                  "UI/UX Design",
                ].map((course) => (
                  <li key={course}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className="text-background/80 hover:text-primary transition-colors"
                    >
                      {course}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <div className="space-y-2 text-background/80">
                <p>📞 +91 9876543210</p>
                <p>✉️ info@edutechpro.com</p>
                <p>📍 Bangalore, Karnataka</p>
              </div>
            </motion.div>
          </div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.5 }}
            className="border-t border-background/20 mt-8 pt-8 text-center"
          >
            <p className="text-background/60">
              © 2024 EduTech Pro. All rights reserved. Made with ❤️ for
              students.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
