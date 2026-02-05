import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";   // ✅ FIXED
import { motion, AnimatePresence } from 'framer-motion';

const AdmirusHomepage = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();   // ✅ FIXED

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
  }, []);

  const Hero = () => {
    return (
      <section style={styles.hero}>
        {/* 3D Flowing Lines Background */}
        <div style={styles.hero3DBackground}>
          <svg style={styles.flowingSVG} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#667eea" />
                <stop offset="50%" stopColor="#764ba2" />
                <stop offset="100%" stopColor="#f093fb" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4facfe" />
                <stop offset="50%" stopColor="#00f2fe" />
                <stop offset="100%" stopColor="#43e97b" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fa709a" />
                <stop offset="50%" stopColor="#fee140" />
                <stop offset="100%" stopColor="#f093fb" />
              </linearGradient>
             
              <filter id="glow">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Flowing Line 1 */}
            <motion.path
              d="M-100,200 Q200,150 400,300 T900,250 1300,400 1700,300 2100,500"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="3"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Flowing Line 2 */}
            <motion.path
              d="M-100,400 Q300,350 500,200 T1000,450 1400,300 1800,550"
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="4"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.9 }}
              transition={{ duration: 2.5, delay: 0.3, ease: "easeInOut" }}
            />

            {/* Flowing Line 3 */}
            <motion.path
              d="M-100,600 Q250,500 600,600 T1100,400 1500,650 1900,500"
              fill="none"
              stroke="url(#gradient3)"
              strokeWidth="3.5"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{ duration: 3, delay: 0.6, ease: "easeInOut" }}
            />

            {/* Flowing Line 4 */}
            <motion.path
              d="M-100,100 Q400,80 700,200 T1200,150 1600,300 2000,200"
              fill="none"
              stroke="url(#gradient4)"
              strokeWidth="2.5"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2.8, delay: 0.9, ease: "easeInOut" }}
            />

            {/* Additional Flowing Lines for more depth */}
            <motion.path
              d="M2100,300 Q1800,400 1500,250 T1000,500 600,350 200,600 -100,450"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="2"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 3.5, delay: 1.2, ease: "easeInOut" }}
            />

            <motion.path
              d="M-100,350 Q350,320 650,450 T1150,300 1550,500 1950,350"
              fill="none"
              stroke="url(#gradient2)"
              strokeWidth="3"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.75 }}
              transition={{ duration: 3.2, delay: 1.5, ease: "easeInOut" }}
            />
          </svg>

          {/* Animated gradient overlay for depth */}
          <div style={styles.gradientOverlay} />
        </div>

        {/* Hero Content */}
        <div style={styles.heroContent}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div style={styles.brandBadge}>
              <span>Premium Digital Experience</span>
            </div>
          </motion.div>

          <motion.h1
            style={styles.heroTitle}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span style={styles.titleGradient}>ADMIRUS</span>
          </motion.h1>

          <motion.h2
            style={styles.heroSubtitle}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Elevating Brands Through
            <br />
            <span style={styles.highlightText}>Immersive Digital Experiences</span>
          </motion.h2>

          <motion.p
            style={styles.heroDescription}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            We craft cutting-edge digital solutions that transform visions into reality.
            <br />
            Where innovation meets excellence.
          </motion.p>

          <motion.div
            style={styles.heroButtons}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.button
              style={styles.primaryButton}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Your Journey</span>
              <span style={styles.buttonIcon}>→</span>
            </motion.button>
            <motion.button
              style={styles.secondaryButton}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
<span 
  
  onClick={() => navigate("/login")}
>
  Login
</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={styles.scrollIndicator}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div style={styles.scrollWheel} />
          <span style={styles.scrollText}>Scroll to explore</span>
        </motion.div>
      </section>
    );
  };

  const Services = () => {
    const services = [
      {
        title: 'Brand Design',
        description: 'Crafting unique identities that resonate and inspire',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      {
        title: 'Web Development',
        description: 'Building responsive, performant digital experiences',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      },
      {
        title: 'Mobile Apps',
        description: 'Native and cross-platform solutions that scale',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
      {
        title: '3D & Animation',
        description: 'Immersive visual experiences that captivate',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      },
      {
        title: 'Digital Strategy',
        description: 'Data-driven approaches for maximum impact',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      },
      {
        title: 'Marketing',
        description: 'Campaigns that convert and engage audiences',
        gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      },
    ];

    return (
      <section style={styles.servicesSection}>
        <div style={styles.container}>
          <motion.div
            style={styles.sectionHeader}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span style={styles.sectionLabel}>What We Do</span>
            <h2 style={styles.sectionTitle}>
              Our <span style={styles.gradientText}>Expertise</span>
            </h2>
            <p style={styles.sectionSubtitle}>
              Comprehensive solutions for your digital transformation
            </p>
          </motion.div>

          <div style={styles.servicesGrid}>
            {services.map((service, index) => (
              <motion.div
                key={index}
                style={styles.serviceCard3D}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                <div style={{
                  ...styles.cardGlow,
                  background: service.gradient
                }} />
                
                <h3 style={styles.serviceTitle3D}>{service.title}</h3>
                <p style={styles.serviceDesc3D}>{service.description}</p>
                
                <div style={styles.serviceArrow}>→</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const Portfolio = () => {
    const projects = [
      {
        title: 'TechVision AI',
        category: 'Brand Identity',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      {
        title: 'NeoCommerce',
        category: 'E-Commerce Platform',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      },
      {
        title: 'HealthHub Pro',
        category: 'Mobile Application',
        gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
      {
        title: 'MetaSpace',
        category: '3D Experience',
        gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      },
    ];

    return (
      <section style={styles.portfolioSection}>
        <div style={styles.container}>
          <motion.div
            style={styles.sectionHeader}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span style={styles.sectionLabel}>Our Work</span>
            <h2 style={styles.sectionTitle}>
              Featured <span style={styles.gradientText}>Projects</span>
            </h2>
            <p style={styles.sectionSubtitle}>
              Discover how we've helped brands achieve excellence
            </p>
          </motion.div>

          <div style={styles.portfolioGrid}>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                style={styles.portfolioCard}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -15, scale: 1.03 }}
              >
                <div style={{
                  ...styles.portfolioImage,
                  background: project.gradient
                }} />
                <div style={styles.portfolioContent}>
                  <span style={styles.portfolioCategory}>{project.category}</span>
                  <h3 style={styles.portfolioTitle}>{project.title}</h3>
                  <motion.button
                    style={styles.portfolioButton}
                    whileHover={{ x: 5 }}
                  >
                    View Project →
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const Stats = () => {
    const stats = [
      { number: '500+', label: 'Projects Delivered' },
      { number: '150+', label: 'Happy Clients' },
      { number: '50+', label: 'Team Members' },
      { number: '15+', label: 'Years Experience' },
    ];

    return (
      <section style={styles.statsSection}>
        <div style={styles.container}>
          <div style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                style={styles.statCard3D}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div style={styles.statNumber3D}>{stat.number}</div>
                <div style={styles.statLabel3D}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const Contact = () => {
    return (
      <section style={styles.contactSection}>
        <div style={styles.container}>
          <motion.div
            style={styles.contactCard}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div style={styles.contactContent}>
              <h2 style={styles.contactTitle}>
                Ready to Create
                <br />
                <span style={styles.gradientText}>Something Amazing?</span>
              </h2>
              <p style={styles.contactText}>
                Let's collaborate to bring your vision to life with cutting-edge digital solutions.
              </p>
              <motion.button
                style={styles.contactButton}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Get in Touch</span>
                <span style={styles.buttonIcon}>→</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  const Footer = () => {
    return (
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerContent}>
            <div style={styles.footerBrand}>
              <h3 style={styles.footerLogo}>ADMIRUS</h3>
              <p style={styles.footerTagline}>
                Crafting premium digital experiences
                <br />
                that inspire and innovate.
              </p>
            </div>
            
            <div style={styles.footerLinks}>
              <div>
                <h4 style={styles.footerHeading}>Services</h4>
                <a href="#" style={styles.footerLink}>Brand Design</a>
                <a href="#" style={styles.footerLink}>Web Development</a>
                <a href="#" style={styles.footerLink}>Mobile Apps</a>
                <a href="#" style={styles.footerLink}>3D & Animation</a>
              </div>
              <div>
                <h4 style={styles.footerHeading}>Company</h4>
                <a href="#" style={styles.footerLink}>About Us</a>
                <a href="#" style={styles.footerLink}>Portfolio</a>
                <a href="#" style={styles.footerLink}>Careers</a>
                <a href="#" style={styles.footerLink}>Contact</a>
              </div>
              <div>
                <h4 style={styles.footerHeading}>Connect</h4>
                <a href="#" style={styles.footerLink}>LinkedIn</a>
                <a href="#" style={styles.footerLink}>Instagram</a>
                <a href="#" style={styles.footerLink}>Behance</a>
                <a href="#" style={styles.footerLink}>Dribbble</a>
              </div>
            </div>
          </div>
          
          <div style={styles.footerBottom}>
            <p>© 2026 Admirus. All rights reserved.</p>
            <p>Designed with care for innovation</p>
          </div>
        </div>
      </footer>
    );
  };

  return (
    <div style={styles.app}>
      <Hero />
      <Services />
      <Portfolio />
      <Stats />
      <Contact />
      <Footer />
    </div>
  );
};

const styles = {
  app: {
    width: '100%',
    minHeight: '100vh',
    background: '#0a0a0f',
    position: 'relative',
    overflow: 'hidden',
  },

  // Hero Section
  hero: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    background: '#000000',
  },

  hero3DBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 1,
  },

  flowingSVG: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },

  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: `
      radial-gradient(ellipse at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
  },

  heroContent: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    padding: '0 20px',
    maxWidth: '1200px',
  },

  brandBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'rgba(99, 102, 241, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '50px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '40px',
  },

  heroTitle: {
    fontSize: '140px',
    fontWeight: '900',
    lineHeight: '1',
    marginBottom: '30px',
    fontFamily: '"Space Grotesk", "Helvetica", sans-serif',
    letterSpacing: '-0.02em',
  },

  titleGradient: {
    background: 'linear-gradient(135deg, #ffffff 0%, #6366f1 50%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.8))',
  },

  heroSubtitle: {
    fontSize: '36px',
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '20px',
    lineHeight: '1.4',
  },

  highlightText: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  heroDescription: {
    fontSize: '20px',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '50px',
    lineHeight: '1.8',
  },

  heroButtons: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  primaryButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '20px 40px',
    fontSize: '18px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 10px 40px rgba(99, 102, 241, 0.5)',
    transition: 'all 0.3s ease',
  },

  secondaryButton: {
    padding: '20px 40px',
    fontSize: '18px',
    fontWeight: '700',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  buttonIcon: {
    fontSize: '20px',
    transition: 'transform 0.3s ease',
  },

  scrollIndicator: {
    position: 'absolute',
    bottom: '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    zIndex: 2,
  },

  scrollWheel: {
    width: '30px',
    height: '50px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '20px',
    position: 'relative',
  },

  scrollText: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.6)',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: '600',
  },

  // Services Section
  servicesSection: {
    padding: '120px 20px',
    background: '#0a0a0f',
    position: 'relative',
  },

  container: {
    maxWidth: '1400px',
    margin: '0 auto',
  },

  sectionHeader: {
    textAlign: 'center',
    marginBottom: '80px',
  },

  sectionLabel: {
    display: 'inline-block',
    padding: '10px 24px',
    background: 'rgba(99, 102, 241, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '50px',
    color: '#6366f1',
    fontSize: '14px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginBottom: '24px',
  },

  sectionTitle: {
    fontSize: '72px',
    fontWeight: '900',
    color: '#fff',
    marginBottom: '24px',
    fontFamily: '"Space Grotesk", sans-serif',
  },

  gradientText: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  sectionSubtitle: {
    fontSize: '20px',
    color: 'rgba(255, 255, 255, 0.6)',
    maxWidth: '600px',
    margin: '0 auto',
  },

  servicesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
    gap: '30px',
  },

  serviceCard3D: {
    padding: '50px 40px',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '32px',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
  },

  cardGlow: {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    opacity: 0,
    filter: 'blur(80px)',
    transition: 'opacity 0.4s ease',
    pointerEvents: 'none',
  },

  serviceTitle3D: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#fff',
    marginBottom: '16px',
  },

  serviceDesc3D: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: '1.8',
    marginBottom: '20px',
  },

  serviceArrow: {
    fontSize: '24px',
    color: '#6366f1',
    transition: 'transform 0.3s ease',
  },

  // Portfolio Section
  portfolioSection: {
    padding: '120px 20px',
    background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 100%)',
  },

  portfolioGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: '40px',
  },

  portfolioCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '32px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
  },

  portfolioImage: {
    width: '100%',
    height: '350px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  portfolioContent: {
    padding: '40px',
  },

  portfolioCategory: {
    display: 'inline-block',
    padding: '8px 16px',
    background: 'rgba(99, 102, 241, 0.1)',
    color: '#6366f1',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '16px',
  },

  portfolioTitle: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#fff',
    marginBottom: '20px',
  },

  portfolioButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '0',
    background: 'none',
    border: 'none',
    color: '#6366f1',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  // Stats Section
  statsSection: {
    padding: '120px 20px',
    background: '#0a0a0f',
  },

  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  },

  statCard3D: {
    padding: '60px 40px',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '32px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
  },

  statNumber3D: {
    fontSize: '64px',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '16px',
  },

  statLabel3D: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },

  // Contact Section
  contactSection: {
    padding: '120px 20px',
    background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0f 100%)',
  },

  contactCard: {
    padding: '100px 60px',
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '48px',
    textAlign: 'center',
  },

  contactContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },

  contactTitle: {
    fontSize: '72px',
    fontWeight: '900',
    color: '#fff',
    marginBottom: '30px',
    lineHeight: '1.2',
  },

  contactText: {
    fontSize: '20px',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '50px',
    lineHeight: '1.8',
  },

  contactButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    padding: '24px 48px',
    fontSize: '20px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 10px 40px rgba(99, 102, 241, 0.5)',
    transition: 'all 0.3s ease',
  },

  // Footer
  footer: {
    padding: '80px 20px 40px',
    background: '#0a0a0f',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },

  footerContent: {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    gap: '80px',
    marginBottom: '60px',
  },

  footerBrand: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },

  footerLogo: {
    fontSize: '36px',
    fontWeight: '900',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },

  footerTagline: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: '1.8',
    maxWidth: '350px',
  },

  footerLinks: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '40px',
  },

  footerHeading: {
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '24px',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },

  footerLink: {
    display: 'block',
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
    textDecoration: 'none',
    marginBottom: '16px',
    transition: 'color 0.3s ease',
  },

  footerBottom: {
    paddingTop: '40px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: '14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

// Add keyframes and styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #0a0a0f;
    color: #fff;
  }

  @keyframes flowAnimation {
    0% {
      stroke-dashoffset: 1000;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  @media (max-width: 768px) {
    h1 { font-size: 56px !important; }
    h2 { font-size: 36px !important; }
  }
`;
document.head.appendChild(styleSheet);

export default AdmirusHomepage;