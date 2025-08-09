import { AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight,
  Award,
  Calendar,
  Camera,
  Code,
  Code2,
  Mail,
  Menu,
  Trophy,
  Users,
  X,
} from "lucide-react";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { GlassCard } from "../components/GlassCard";
import logo from "../logo-nobg.png";
import Footer from "../components/Footer";

interface BoxProps {
  direction: "left" | "right";
  x: MotionValue<string>; // Accept the MotionValue for x as a prop
}

const Box = ({ direction, x }: BoxProps) => {
  return (
    <motion.div
      style={{
        x, // Apply the animated x value here
        left: direction === "left" ? "5vw" : "auto",
        right: direction === "right" ? "5vw" : "auto",
      }}
      className="absolute top-[60vh] h-40 w-1/4 bg-gray-500 rounded-lg"
    ></motion.div>
  );
};

export default Box;

export const Home: React.FC = () => {
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(false);
  const location = useLocation();
  const statsRef = React.useRef(null);
  const statsInView = useInView(statsRef, {
    once: true,
    amount: 0.1,
  });
  const featuresRef = React.useRef(null);
  const featuresInView = useInView(featuresRef, {
    once: true,
    amount: 0.1,
  });

  const navItems = [
    { path: "/", label: "Home", icon: Code },
    { path: "/about", label: "About", icon: Users },
    { path: "/events", label: "Events", icon: Calendar },
    { path: "/team", label: "Team", icon: Users },
    { path: "/gallery", label: "Gallery", icon: Camera },
    { path: "/sponsors", label: "Sponsors", icon: Award },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  const stats = [
    { icon: Users, label: "Active Members", value: "500+" },
    { icon: Calendar, label: "Events Organized", value: "50+" },
    { icon: Trophy, label: "Awards Won", value: "25+" },
    { icon: Code2, label: "Projects Completed", value: "100+" },
  ];

  const features = [
    {
      title: "Technical Workshops",
      description:
        "Hands-on workshops on cutting-edge technologies and programming languages.",
      gradient: "from-[#ff6b00] to-[#c2410c]",
    },
    {
      title: "Coding Competitions",
      description:
        "Regular coding contests to sharpen your problem-solving skills.",
      gradient: "from-[#00c9a7] to-[#047857]",
    },
    {
      title: "Industry Connect",
      description:
        "Networking events with industry professionals and tech leaders.",
      gradient: "from-purple-500 to-purple-700",
    },
    {
      title: "Research Projects",
      description:
        "Collaborative research opportunities in emerging tech domains.",
      gradient: "from-pink-500 to-pink-700",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = sectionRef.current;
      if (heroSection) {
        // Calculate when the hero section is no longer in view
        const isPastHero = window.scrollY > heroSection.clientHeight + 2000;
        setIsLogoVisible(isPastHero);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const width = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5],
    ["20%", "30%", "70%"]
  );

  const lineWidth = useTransform(scrollYProgress, [0, 0.4], ["52%", "0%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 1, 0]);
  const opacityButs = useTransform(scrollYProgress, [0, 0.03], [1, 0]);

  // Inside the Home component
  const xLeft = useTransform(scrollYProgress, [0.4, 0.5], ["-100vw", "0vw"]);
  const xRight = useTransform(scrollYProgress, [0.5, 0.6], ["100vw", "0vw"]);

  const y = useTransform(scrollYProgress, [0, 0.4], [0, -396]);
  const x = useTransform(scrollYProgress, [0, 0.4], [0, -578]);
  const imgWidth = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["calc(1/3 * 100%)", "calc(1/32 * 100%)"]
  );
  const imgHeight = useTransform(scrollYProgress, [0, 0.3], ["100%", "100%"]);

  const x1 = useTransform(scrollYProgress, [0.2, 0.4], ["-800vw", "-20vw"]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#020617] backdrop-blur-sm z-[9999]">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`sticky top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
          isLogoVisible
            ? "bg-[#0f0f0f]/80 backdrop-blur-lg border-white/10"
            : "bg-transparent"
        }`}
      >
        {/* ... Your JSX for the navigation bar remains the same ... */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-[9999]">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.img
                src={logo}
                alt="CSI Logo"
                className={`object-contain invert p-0 m-0 logo-w drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] -mb-2 mr-2 z-[999] ${
                  isLogoVisible ? "opacity-100" : "opacity-0"
                }`}
                draggable={false}
              />
              <span className="text-xl font-bold bg-gradient-to-r from-[#1A5AFF] to-[#00FFF0] bg-clip-text text-transparent">
                CSI SFIT
              </span>
            </Link>
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? "text-[#00FFF0]"
                        : "text-gray-300 hover:text-[#00FFF0]"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-[#1A5AFF]/10 border border-[#1A5AFF]/20 rounded-lg"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </Link>
                );
              })}
            </div>
            {/* Mobile Toggle */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0f0f0f]/95 backdrop-blur-lg border-t border-white/10"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-[#1A5AFF]/10 text-[#00FFF0] border border-[#1A5AFF]/20"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="relative min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#020617] backdrop-blur-sm">
        <section
          ref={sectionRef}
          className="sticky top-0 pb-12 z-[100] min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
          <motion.div
            style={{ width: lineWidth }}
            className="absolute left-[-10vw] top-[38.3vh] w-1/2 h-[9px] bg-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
          ></motion.div>
          <motion.div
            style={{ width: lineWidth }}
            className="absolute right-[-10vw] top-[38.3vh] w-1/2 h-[9.3px] bg-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
          ></motion.div>

          {/* <Box direction="left" x={xLeft} />
          <Box direction="right" x={xRight} /> */}
          <motion.img
            src={logo}
            alt="CSI Logo"
            className="object-contain invert p-0 m-0 select-none pointer-events-none drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] mb-[-3.5rem] z-20"
            draggable={false}
            style={{ width: imgWidth, height: imgHeight, y, x }}
          />

          <motion.div
            style={{ opacity: opacityButs }}
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${
              opacityButs === 0 ? "hidden" : ""
            } `}
          >
            <button className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/membership" //Added Page Address Location and changed Color(below)
                className="group relative px-8 py-4 text-white bg-[#1A5AFF]/10 border border-[#1A5AFF]/20 font-semibold rounded-xl shadow-lg hover:shadow-[#ff6b00]/25 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center space-x-2">
                  <span>Join CSI SFIT</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </button>

            <button className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/membership" //Added Page Address Location and changed Color(below)
                className="group relative px-8 py-4 text-white bg-[#1A5AFF]/10 border border-[#1A5AFF]/20 font-semibold rounded-xl shadow-lg hover:shadow-[#ff6b00]/25 transition-all duration-300 transform hover:scale-105"
              >
                <span className="flex items-center space-x-2">
                  <span>View Events</span>
                  <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </span>
              </Link>
            </button>
          </motion.div>

          <motion.div
            style={{ width: lineWidth }}
            className="absolute left-[-10vw] top-[54.3vh] w-1/2 h-[5.5px] bg-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
          ></motion.div>
          <motion.div
            style={{ width: lineWidth }}
            className="absolute right-[-10vw] top-[54.2vh] w-1/2 h-[6px] bg-white drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
          ></motion.div>

          <motion.video
            className="absolute w-screen h-[105vh] object-cover -z-10 grayscale brightness-70"
            // style={{ opacity }}
            autoPlay
            loop
            muted
          >
            <source src="/csi-intro.mp4" type="video/mp4" />
          </motion.video>
        </section>

        <div className="h-[300vh] min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#020617] backdrop-blur-sm" />

        <section className="px-[20rem] py-20 text-center text-white text-2xl font-bold mx-auto relative z-[200] bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#020617] backdrop-blur-sm">
          <div>
            <h1
              // style={{ x: x1, y: "-360px" }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              About Us
            </h1>
            <p className="text-lg font-normal">
              Empowering students with cutting-edge technology, fostering
              innovation, and building the next generation of tech leaders
              through collaborative learning and hands-on experience.
            </p>
          </div>

          {/* Stats and about us */}
          <section className="py-10 relative">
            <div className="max-w-7xl mx-auto">
              <motion.div
                ref={statsRef}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 50 }}
                      animate={statsInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <GlassCard className="p-6 text-center">
                        <Icon className="w-8 h-8 text-[#ff6b00] mx-auto mb-4" />
                        <div className="text-3xl font-bold text-white mb-2">
                          {stat.value}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {stat.label}
                        </div>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </section>

          {/* Features */}
          <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                ref={featuresRef}
                initial={{ opacity: 0, y: 50 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  What We{" "}
                  <span className="bg-[linear-gradient(135deg,#40E0D0_0%,#1A5AFF_50%,#40E0D0_100%)] bg-clip-text text-transparent">
                    Offer
                  </span>
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Discover opportunities to grow, learn, and connect with
                  like-minded tech enthusiasts
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 50 }}
                    animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <GlassCard className="p-6 h-full">
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}
                      >
                        <div className="w-6 h-6 bg-white/20 rounded" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Events Section */}
          <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Upcoming{" "}
                  <span className="bg-gradient-to-r from-[#1A5AFF] to-[#40E0D0] bg-clip-text text-transparent">
                    Events
                  </span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Join us for exciting events and opportunities to grow your
                  skills and network.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Hackathon: CodeStorm",
                    date: "August 15, 2025",
                    description:
                      "A 24-hour coding sprint for innovators and developers to solve real-world challenges.",
                  },
                  {
                    title: "AI & ML Workshop",
                    date: "September 5, 2025",
                    description:
                      "Hands-on sessions covering machine learning fundamentals and deep learning demos.",
                  },
                  {
                    title: "TechTalks with Alumni",
                    date: "October 1, 2025",
                    description:
                      "Interactive panel with SFIT alumni working at top tech companies sharing insights.",
                  },
                ].map((event, index) => (
                  <motion.div
                    key={event.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <GlassCard className="p-6 h-full border border-white/10 bg-white/5 backdrop-blur-lg hover:scale-[1.03] transition-all duration-300 rounded-2xl shadow-lg">
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-[#40E0D0] mb-3">
                        {event.date}
                      </p>
                      <p className="text-gray-300 text-sm">
                        {event.description}
                      </p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Team Section */}
            <section className="py-20 relative">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Meet the{" "}
                    <span className="bg-gradient-to-r from-[#40E0D0] to-[#1A5AFF] bg-clip-text text-transparent">
                      Team
                    </span>
                  </h2>
                  <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    The passionate people behind the success of CSI SFIT.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                    {
                      name: "Arshvir Singh",
                      role: "Chairperson",
                      image: "https://i.pravatar.cc/150?img=32",
                    },
                    {
                      name: "Aarushi Mehta",
                      role: "Vice Chairperson",
                      image: "https://i.pravatar.cc/150?img=47",
                    },
                    {
                      name: "Kunal Deshmukh",
                      role: "Technical Lead",
                      image: "https://i.pravatar.cc/150?img=22",
                    },
                    {
                      name: "Nikita Jain",
                      role: "Event Manager",
                      image: "https://i.pravatar.cc/150?img=65",
                    },
                  ].map((member, index) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <GlassCard className="group p-6 text-center bg-white/5 border border-white/10 backdrop-blur-lg rounded-2xl transition-all duration-300 hover:scale-[1.03]">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-[#40E0D0]/30 shadow-lg group-hover:scale-105 transition"
                        />
                        <h3 className="text-lg font-semibold text-white">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-400">{member.role}</p>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </section>
        </section>
      </div>

      <Footer />
    </div>
  );
};
