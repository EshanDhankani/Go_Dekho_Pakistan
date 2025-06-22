import React, { useState, useEffect, useRef } from "react";
import PortfolioTile from "./PortfolioTile";

const Portfolio = () => {
  const sectionRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [visibleItems, setVisibleItems] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with React and Node.js",
      image: `${process.env.PUBLIC_URL}/assets/images/portfolio/project1.jpg`,
      videoUrl: `${process.env.PUBLIC_URL}/videos/project1-demo.mp4`,
      category: "web",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example/project1",
      primaryColor: "#FFD700",
      secondaryColor: "#B8860B",
      type: "video",
      features: [
        "Responsive design across all devices",
        "Modern user interface with smooth animations",
        "Optimized performance and SEO",
        "Cross-browser compatibility",
        "Scalable architecture",
      ],
    },
    {
      id: 2,
      title: "Mobile Banking App",
      description: "Secure mobile banking application with advanced features",
      image: `${process.env.PUBLIC_URL}/assets/images/portfolio/project2.jpg`,
      videoUrl: `${process.env.PUBLIC_URL}/videos/project2-demo.mp4`,

      category: "mobile",
      technologies: ["React Native", "Firebase", "Biometric Auth"],
      liveUrl: "https://example.com/banking",
      githubUrl: "https://github.com/example/banking-app",
      primaryColor: "#FFD700",
      secondaryColor: "#B8860B",
      type: "3d",
      features: [
        "Biometric authentication",
        "Real-time transaction monitoring",
        "Secure payment processing",
        "Multi-language support",
        "Offline capability",
      ],
    },
    {
      id: 3,
      title: "Brand Identity Design",
      description:
        "Complete brand identity and visual system for modern businesses",
      image: `${process.env.PUBLIC_URL}/assets/images/portfolio/project3.jpg`,
      videoUrl: `${process.env.PUBLIC_URL}/videos/project1-demo.mp4`,

      category: "design",
      technologies: ["Figma", "Illustrator", "Photoshop", "After Effects"],
      liveUrl: "https://example.com/brand",
      githubUrl: "https://github.com/example/brand-identity",
      primaryColor: "#FFD700",
      secondaryColor: "#B8860B",
      type: "video",
      features: [
        "Logo design and brand guidelines",
        "Color palette and typography",
        "Marketing material design",
        "Digital asset creation",
        "Brand strategy consultation",
      ],
    },
    {
      id: 4,
      title: "SaaS Dashboard",
      description: "Analytics dashboard for SaaS platform with real-time data",
      image: `${process.env.PUBLIC_URL}/assets/images/portfolio/project4.jpg`,
      videoUrl: `${process.env.PUBLIC_URL}/videos/project2-demo.mp4`,

      category: "web",
      technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
      liveUrl: "https://example.com/dashboard",
      githubUrl: "https://github.com/example/saas-dashboard",
      primaryColor: "#FFD700",
      secondaryColor: "#B8860B",
      type: "3d",
      features: [
        "Real-time data visualization",
        "Custom reporting tools",
        "User role management",
        "API integration",
        "Export functionality",
      ],
    },
    {
      id: 5,
      title: "Food Delivery App",
      description: "On-demand food delivery mobile app with GPS tracking",
      image: `${process.env.PUBLIC_URL}/assets/images/portfolio/project5.jpg`,
      videoUrl: `${process.env.PUBLIC_URL}/videos/project1-demo.mp4`,

      category: "mobile",
      technologies: ["Flutter", "Firebase", "Maps API", "Payment Gateway"],
      liveUrl: "https://example.com/food-delivery",
      githubUrl: "https://github.com/example/food-delivery",
      primaryColor: "#FFD700",
      secondaryColor: "#B8860B",
      type: "video",
      features: [
        "Real-time order tracking",
        "Multiple payment options",
        "Restaurant management",
        "Push notifications",
        "Rating and review system",
      ],
    },
    {
      id: 6,
      title: "Corporate Website",
      description: "Professional corporate website with CMS integration",
      image: `${process.env.PUBLIC_URL}/assets/images/portfolio/project6.jpg`,
      videoUrl: `${process.env.PUBLIC_URL}/videos/project2-demo.mp4`,

      category: "web",
      technologies: ["Next.js", "Strapi", "PostgreSQL", "AWS"],
      liveUrl: "https://example.com/corporate",
      githubUrl: "https://github.com/example/corporate-site",
      primaryColor: "#FFD700",
      secondaryColor: "#B8860B",
      type: "3d",
      features: [
        "Content management system",
        "SEO optimization",
        "Multi-language support",
        "Contact form integration",
        "Analytics dashboard",
      ],
    },
  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "mobile", label: "Mobile Apps" },
    { id: "design", label: "UI/UX Design" },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? projects
      : projects.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const itemId = parseInt(entry.target.dataset.itemId);
            setVisibleItems((prev) => [...new Set([...prev, itemId])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = sectionRef.current?.querySelectorAll(".portfolio-item");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [filteredItems]);

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div
          className="bg-gradient-to-br from-[#1C1C1C] to-[#121212] border border-[#FFD700]/30 
          rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="p-6 border-b border-[#FFD700]/20">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-3xl font-bold text-[#FFD700] mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300">{project.description}</p>
              </div>
              <button
                onClick={onClose}
                className="text-[#FFD700] hover:text-[#F5DEB3] text-2xl font-bold
                  w-10 h-10 flex items-center justify-center rounded-full
                  hover:bg-[#FFD700]/10 transition-all duration-300"
              >
                ×
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Preview */}
              <div className="space-y-4">
                <div
                  className="aspect-video bg-[#1C1C1C] rounded-lg border border-[#FFD700]/20 
                  flex items-center justify-center"
                >
                  <span className="text-[#FFD700]">Project Preview</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-video bg-[#1C1C1C] rounded border border-[#FFD700]/20"
                    />
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-[#FFD700] mb-3">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-[#FFD700]/20 text-[#FFD700] px-3 py-1 
                        rounded-full text-sm border border-[#FFD700]/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-[#FFD700] mb-3">
                    Project Features
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    {project.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-[#FFD700] to-[#B8860B] 
                      text-black font-semibold py-3 px-6 rounded-lg hover:from-[#F5DEB3] 
                      hover:to-[#FFD700] transition-all duration-300 transform hover:scale-105
                      text-center"
                  >
                    View Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-[#FFD700] text-[#FFD700] 
                      font-semibold py-3 px-6 rounded-lg hover:bg-[#FFD700] hover:text-black 
                      transition-all duration-300 text-center"
                  >
                    View Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="min-h-screen bg-black py-20 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-[#FFD700] mb-6">
            Our Portfolio
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#FFD700] to-[#B8860B] mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our latest projects showcasing innovative solutions and
            cutting-edge design
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105
                ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black"
                    : "border border-[#FFD700]/30 text-[#FFD700] hover:bg-[#FFD700]/10"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((project, index) => (
            <div
              key={project.id}
              data-item-id={project.id}
              className="portfolio-item"
              onClick={() => setSelectedProject(project)}
            >
              <PortfolioTile
                project={project}
                index={index}
                isVisible={visibleItems.includes(project.id)}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div
            className="inline-block bg-gradient-to-r from-[#FFD700]/10 to-[#B8860B]/10 
            border border-[#FFD700]/30 rounded-2xl p-8 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-[#FFD700] mb-4">
              Like What You See?
            </h3>
            <p className="text-gray-300 mb-6">
              Let's create something amazing together
            </p>
            <button
              className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black 
              font-bold py-4 px-8 rounded-lg hover:from-[#F5DEB3] hover:to-[#FFD700] 
              transition-all duration-300 transform hover:scale-105"
            >
              Start Your Project
            </button>
          </div>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Portfolio;
