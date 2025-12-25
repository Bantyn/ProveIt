import React, { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Code2, Target, Users, Trophy, Rocket, ChevronDown,
  Briefcase, Award, Globe, Shield, TrendingUp,
  CheckCircle, Star, GitBranch, Cpu, Sparkles, Heart, Clock,
  Check, X, Zap, Crown, Package
} from 'lucide-react';

const AboutUs = () => {
  const containerRef = useRef(null);

  // Memoized data to prevent recreating on every render
  const valuePropositions = useMemo(() => [
    {
      icon: <Target className="w-10 h-10 text-purple-400" />,
      title: "Real-World Challenges",
      desc: "Companies post actual projects. You solve real problems, not just answer questions.",
      features: ["Project-based evaluation", "Industry-relevant tasks", "Practical skill assessment"]
    },
    {
      icon: <Shield className="w-10 h-10 text-blue-400" />,
      title: "Bias-Free Selection",
      desc: "Anonymous submissions ensure selection based purely on skill, not background.",
      features: ["Blind evaluation", "Merit-only ranking", "Diverse talent pool"]
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-pink-400" />,
      title: "Career Acceleration",
      desc: "Top performers get direct access to hiring managers and exclusive opportunities.",
      features: ["Direct job offers", "Priority interviews", "Competition rewards"]
    }
  ], []);

  const journeySteps = useMemo(() => [
    {
      step: "01",
      title: "Discover Challenges",
      desc: "Browse competitions by tech stack, difficulty, or company",
      icon: <Globe className="w-8 h-8" />
    },
    {
      step: "02",
      title: "Build & Submit",
      desc: "Develop solutions using your preferred tools and frameworks",
      icon: <Code2 className="w-8 h-8" />
    },
    {
      step: "03",
      title: "Get Evaluated",
      desc: "AI + expert review with detailed feedback on your solution",
      icon: <Award className="w-8 h-8" />
    },
    {
      step: "04",
      title: "Land Opportunities",
      desc: "Top performers receive interview invites and job offers",
      icon: <Briefcase className="w-8 h-8" />
    }
  ], []);

  const features = useMemo(() => [
    "Automatic code quality scoring",
    "Real-time leaderboards",
    "Detailed performance analytics",
    "Portfolio generation from submissions",
    "Direct company connections"
  ], []);

  const featureCards = useMemo(() => [
    { icon: <GitBranch />, label: "Code Collaboration", color: "text-blue-400" },
    { icon: <Cpu />, label: "AI Evaluation", color: "text-purple-400" },
    { icon: <Clock />, label: "Time Tracking", color: "text-green-400" },
    { icon: <Users />, label: "Community", color: "text-pink-400" }
  ], []);

  const statistics = useMemo(() => [
    { value: "250+", label: "Active Competitions", icon: <Trophy /> },
    { value: "50K+", label: "Developers", icon: <Users /> },
    { value: "2.4K", label: "Successfully Hired", icon: <Award /> },
    { value: "95%", label: "Satisfaction Rate", icon: <Heart /> }
  ], []);

  const pricingPlans = useMemo(() => [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for getting started",
      icon: <Package className="w-8 h-8" />,
      features: [
        { text: "Access to 5 competitions/month", included: true },
        { text: "Basic code evaluation", included: true },
        { text: "Community support", included: true },
        { text: "Public leaderboard", included: true },
        { text: "Priority evaluation", included: false },
        { text: "Direct company messages", included: false },
        { text: "Advanced analytics", included: false },
        { text: "Portfolio builder", included: false }
      ],
      popular: false,
      gradient: "from-gray-600 to-gray-800"
    },
    {
      name: "Pro",
      price: "₹3,000",
      period: "per month",
      description: "For serious developers",
      icon: <Zap className="w-8 h-8" />,
      features: [
        { text: "Unlimited competitions", included: true },
        { text: "Priority code evaluation", included: true },
        { text: "Priority support 24/7", included: true },
        { text: "Featured profile", included: true },
        { text: "Direct company messages", included: true },
        { text: "Advanced analytics dashboard", included: true },
        { text: "Professional portfolio builder", included: true },
        { text: "Interview preparation resources", included: true }
      ],
      popular: true,
      gradient: "from-purple-600 to-blue-600"
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For companies hiring talent",
      icon: <Crown className="w-8 h-8" />,
      features: [
        { text: "Post unlimited challenges", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "Custom evaluation criteria", included: true },
        { text: "Direct talent pipeline", included: true },
        { text: "API access", included: true },
        { text: "White-label options", included: true },
        { text: "Advanced hiring analytics", included: true },
        { text: "Priority candidate screening", included: true }
      ],
      popular: false,
      gradient: "from-pink-600 to-orange-600"
    }
  ], []);

  const testimonials = useMemo(() => [
    {
      name: "Alex Chen",
      role: "Frontend Developer @ TechCorp",
      quote: "Provelt helped me land my dream job by showcasing my React skills in a real-world challenge."
    },
    {
      name: "Sarah Johnson",
      role: "Backend Engineer @ StartupXYZ",
      quote: "The competition format pushed me to build better solutions than I ever had before."
    },
    {
      name: "Marcus Rivera",
      role: "Full Stack Developer",
      quote: "No resume needed. My code spoke for itself and got me multiple offers."
    }
  ], []);

  // Initialize AOS-like animations using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || '0';
          setTimeout(() => {
            entry.target.classList.add('aos-animate');
          }, parseInt(delay));
        }
      });
    }, observerOptions);

    const elements = containerRef.current?.querySelectorAll('[data-aos]');
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden text-white selection:bg-purple-500 selection:text-white">

      {/* Fixed Stable Glowing Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen animate-blob" />
        <div className="absolute top-[40%] right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-[20%] w-[400px] h-[400px] bg-pink-600/20 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-6xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium tracking-wide text-gray-300">
                The Future of Skill-Based Hiring
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8 leading-tight">
              Where Skills
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
                Meet Opportunity
              </span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Provelt.io bridges the gap between exceptional talent and forward-thinking companies through
              <span className="text-white font-semibold"> real-world competitions</span>. Prove your skills,
              not just your resume.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-16">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-lg font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.5)] active:scale-95">
                <span className="relative z-10 flex items-center gap-2">
                  <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Start Competing
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="group px-8 py-4 border-2 border-white/20 text-white text-lg font-bold rounded-full hover:bg-white/10 transition-all hover:scale-105 hover:border-white/40 active:scale-95">
                <span className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Hire Talent
                </span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 animate-bounce cursor-pointer hover:scale-110 transition-transform"
          >
            <ChevronDown className="w-8 h-8 text-white/50 hover:text-white/80 transition-colors" />
          </motion.div>
        </section>

        {/* VALUE PROPOSITION CARDS */}
        <section className="mb-28 md:mb-40">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Why Provelt Works Better
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Traditional hiring vs. Our skill-first approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {valuePropositions.map((card, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-delay={idx * 100}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] cursor-pointer"
              >
                <div className="mb-6 p-4 bg-white/5 rounded-xl w-fit group-hover:bg-white/10 group-hover:scale-110 transition-all duration-300">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-300 transition-colors">{card.title}</h3>
                <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">{card.desc}</p>
                <ul className="space-y-3">
                  {card.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300 group-hover:text-white transition-colors">
                      <CheckCircle className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS - Removed the line */}
        <section className="mb-28 md:mb-40">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              The Provelt Journey
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From competition to career in four simple steps
            </p>
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-4 gap-8">
              {journeySteps.map((step, idx) => (
                <div
                  key={idx}
                  data-aos="zoom-in"
                  data-delay={idx * 100}
                  className="relative"
                >
                  <div className="relative group p-8 rounded-3xl bg-gradient-to-b from-white/10 to-transparent border border-white/5 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(139,92,246,0.3)] cursor-pointer">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center font-bold text-white text-lg group-hover:scale-125 transition-transform duration-300 shadow-lg">
                      <div className="group-hover:rotate-12 transition-transform duration-300">
                        {step.icon}
                      </div>
                    </div>
                    <div className="mt-8 text-center">
                      <div className="inline-block px-4 py-1 rounded-full bg-white/5 text-sm font-medium mb-4 group-hover:bg-white/10 transition-colors">
                        Step {step.step}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-purple-300 transition-colors">{step.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section className="mb-28 md:mb-40">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Choose Your Plan
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Start free or unlock premium features to accelerate your career
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-delay={idx * 100}
                className={`relative group rounded-3xl bg-gradient-to-b from-white/10 to-transparent border-2 transition-all duration-500 hover:scale-105 cursor-pointer ${plan.popular
                    ? 'border-purple-500/50 hover:border-purple-400 shadow-[0_0_50px_rgba(139,92,246,0.3)] hover:shadow-[0_0_70px_rgba(139,92,246,0.5)]'
                    : 'border-white/10 hover:border-white/30 hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500 hover:scale-105'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-sm font-bold shadow-lg">
                    MOST POPULAR
                  </div>
                )}

                <div className="p-8">
                  <div className={`mb-6 p-4 bg-gradient-to-br ${plan.gradient} rounded-xl w-fit group-hover:scale-110 transition-transform duration-300`}>
                    {plan.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-300 transition-colors">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <div className="text-5xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                      {plan.price}
                    </div>
                    <div className="text-gray-400 text-sm">{plan.period}</div>
                  </div>

                  <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 mb-8 ${plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] active:scale-95'
                      : 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 active:scale-95'
                    }`}>
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </button>

                  <div className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 transition-all duration-300 ${feature.included
                            ? 'text-gray-300 hover:text-white'
                            : 'text-gray-600 hover:text-gray-500'
                          }`}
                      >
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        ) : (
                          <X className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        )}
                        <span className="text-sm">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES SHOWCASE */}
        <section className="mb-28 md:mb-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Built for
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Developers & Companies
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Provelt creates a win-win ecosystem where talented developers showcase their skills
                and companies discover verified talent through practical assessments.
              </p>

              <div className="space-y-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                    <div className="p-2 rounded-lg bg-white/5 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-300">
                      <Star className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div data-aos="fade-left" className="grid grid-cols-2 gap-4">
              {featureCards.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] cursor-pointer group"
                >
                  <div className={`${item.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-lg group-hover:text-purple-300 transition-colors">{item.label}</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATISTICS */}
        <section className="mb-28 md:mb-40">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {statistics.map((stat, idx) => (
              <div
                key={idx}
                data-aos="flip-up"
                data-delay={idx * 100}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 text-center hover:border-purple-500/30 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] cursor-pointer group"
              >
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 mb-3 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-gray-400 mb-4 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <p className="text-gray-300 font-medium group-hover:text-white transition-colors">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mb-28 md:mb-40">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Success Stories
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Hear from developers who transformed their careers through Provelt
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-delay={idx * 100}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.2)] cursor-pointer group"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current group-hover:scale-110 transition-transform" style={{ transitionDelay: `${i * 50}ms` }} />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic group-hover:text-white transition-colors">"{testimonial.quote}"</p>
                <div>
                  <h4 className="font-bold text-lg group-hover:text-purple-300 transition-colors">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section data-aos="zoom-in">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30 border border-white/10 hover:border-purple-500/30 transition-all duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent" />
            <div className="relative p-12 md:p-16 lg:p-20 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 group-hover:scale-105 transition-transform duration-300">
                Ready to Prove Your Skills?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Join thousands of developers who've turned their passion into profession through real-world competitions.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <button className="group/btn relative px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xl font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(139,92,246,0.5)] active:scale-95">
                  <span className="relative z-10 flex items-center gap-3">
                    <Rocket className="w-6 h-6 group-hover/btn:rotate-12 transition-transform" />
                    Join Free Competitions
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button className="group/btn px-10 py-5 border-2 border-white/30 text-white text-xl font-bold rounded-full hover:bg-white/10 transition-all hover:scale-105 hover:border-white/50 active:scale-95">
                  <span className="flex items-center gap-3">
                    <Briefcase className="w-6 h-6 group-hover/btn:scale-110 transition-transform" />
                    Post a Challenge
                  </span>
                </button>
              </div>

              <p className="mt-8 text-gray-400">
                No subscription fees • Cancel anytime • Portfolio-ready projects
              </p>
            </div>
          </div>
        </section>



      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 15s infinite ease-in-out;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        [data-aos] {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        [data-aos].aos-animate {
          opacity: 1;
          transform: translateY(0);
        }

        [data-aos="fade-up"].aos-animate {
          transform: translateY(0);
        }

        [data-aos="fade-right"] {
          transform: translateX(-30px);
        }

        [data-aos="fade-right"].aos-animate {
          transform: translateX(0);
        }

        [data-aos="fade-left"] {
          transform: translateX(30px);
        }

        [data-aos="fade-left"].aos-animate {
          transform: translateX(0);
        }

        [data-aos="zoom-in"] {
          transform: scale(0.9);
        }

        [data-aos="zoom-in"].aos-animate {
          transform: scale(1);
        }

        [data-aos="flip-up"] {
          transform: perspective(1000px) rotateX(30deg);
        }

        [data-aos="flip-up"].aos-animate {
          transform: perspective(1000px) rotateX(0);
        }
      `}</style>
    </div>
  );
};

export default AboutUs;