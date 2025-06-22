// import React, { useState, useEffect, useRef } from 'react';

// const Services = () => {
//   const sectionRef = useRef(null);
//   const [visibleCards, setVisibleCards] = useState([]);

//   // Lottie Animation Component (Custom implementation since we can't import actual Lottie)
//   const LottieIcon = ({ type, isHovered }) => {
//     const getIconAnimation = () => {
//       switch (type) {
//         case 'web':
//           return (
//             <svg 
//               width="80" 
//               height="80" 
//               viewBox="0 0 100 100" 
//               className={`transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
//             >
//               <circle 
//                 cx="50" 
//                 cy="50" 
//                 r="45" 
//                 fill="none" 
//                 stroke="#FFD700" 
//                 strokeWidth="2"
//                 className={`${isHovered ? 'animate-spin' : ''}`}
//                 style={{ 
//                   transformOrigin: '50px 50px',
//                   animation: isHovered ? 'spin 2s linear infinite' : 'none'
//                 }}
//               />
//               <path 
//                 d="M20 30 L80 30 M20 50 L80 50 M20 70 L80 70" 
//                 stroke="#FFD700" 
//                 strokeWidth="2"
//                 className={`transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}
//               />
//               <rect 
//                 x="25" 
//                 y="25" 
//                 width="50" 
//                 height="50" 
//                 fill="none" 
//                 stroke="#B8860B" 
//                 strokeWidth="2"
//                 className={`transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : 'scale-100'}`}
//                 style={{ transformOrigin: '50px 50px' }}
//               />
//             </svg>
//           );
//         case 'mobile':
//           return (
//             <svg 
//               width="80" 
//               height="80" 
//               viewBox="0 0 100 100" 
//               className={`transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
//             >
//               <rect 
//                 x="30" 
//                 y="10" 
//                 width="40" 
//                 height="80" 
//                 rx="8" 
//                 fill="none" 
//                 stroke="#FFD700" 
//                 strokeWidth="3"
//                 className={`transition-all duration-300 ${isHovered ? 'stroke-[#F5DEB3]' : ''}`}
//               />
//               <rect 
//                 x="35" 
//                 y="20" 
//                 width="30" 
//                 height="50" 
//                 fill="#FFD700" 
//                 opacity={isHovered ? "0.8" : "0.5"}
//                 className="transition-all duration-300"
//               />
//               <circle 
//                 cx="50" 
//                 cy="80" 
//                 r="3" 
//                 fill="#FFD700"
//                 className={`transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`}
//               />
//               <line 
//                 x1="40" 
//                 y1="25" 
//                 x2="60" 
//                 y2="25" 
//                 stroke="#000" 
//                 strokeWidth="2"
//                 className={`transition-all duration-500 ${isHovered ? 'animate-bounce' : ''}`}
//               />
//             </svg>
//           );
//         case 'design':
//           return (
//             <svg 
//               width="80" 
//               height="80" 
//               viewBox="0 0 100 100" 
//               className={`transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
//             >
//               <path 
//                 d="M20 80 Q50 20 80 80" 
//                 fill="none" 
//                 stroke="#FFD700" 
//                 strokeWidth="3"
//                 className={`transition-all duration-300 ${isHovered ? 'stroke-[#F5DEB3]' : ''}`}
//               />
//               <circle 
//                 cx="30" 
//                 cy="70" 
//                 r="8" 
//                 fill="#B8860B"
//                 className={`transition-all duration-500 ${isHovered ? 'animate-pulse scale-125' : ''}`}
//               />
//               <circle 
//                 cx="70" 
//                 cy="70" 
//                 r="8" 
//                 fill="#FFD700"
//                 className={`transition-all duration-500 ${isHovered ? 'animate-pulse scale-125' : ''}`}
//               />
//               <path 
//                 d="M45 30 L55 30 L50 20 Z" 
//                 fill="#FFD700"
//                 className={`transition-all duration-300 ${isHovered ? 'rotate-180' : ''}`}
//                 style={{ transformOrigin: '50px 25px' }}
//               />
//             </svg>
//           );
//         case 'ecommerce':
//           return (
//             <svg 
//               width="80" 
//               height="80" 
//               viewBox="0 0 100 100" 
//               className={`transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
//             >
//               <path 
//                 d="M20 25 L25 25 L30 60 L80 60 L85 35 L35 35" 
//                 fill="none" 
//                 stroke="#FFD700" 
//                 strokeWidth="3"
//                 className={`transition-all duration-300 ${isHovered ? 'stroke-[#F5DEB3]' : ''}`}
//               />
//               <circle 
//                 cx="40" 
//                 cy="75" 
//                 r="5" 
//                 fill="#B8860B"
//                 className={`transition-all duration-500 ${isHovered ? 'animate-bounce' : ''}`}
//               />
//               <circle 
//                 cx="70" 
//                 cy="75" 
//                 r="5" 
//                 fill="#B8860B"
//                 className={`transition-all duration-500 ${isHovered ? 'animate-bounce' : ''}`}
//               />
//               <rect 
//                 x="40" 
//                 y="40" 
//                 width="30" 
//                 height="15" 
//                 fill="#FFD700" 
//                 opacity={isHovered ? "0.8" : "0.5"}
//                 className="transition-all duration-300"
//               />
//             </svg>
//           );
//         case 'branding':
//           return (
//             <svg 
//               width="80" 
//               height="80" 
//               viewBox="0 0 100 100" 
//               className={`transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
//             >
//               <polygon 
//                 points="50,15 65,35 85,35 70,50 75,70 50,60 25,70 30,50 15,35 35,35" 
//                 fill="none" 
//                 stroke="#FFD700" 
//                 strokeWidth="3"
//                 className={`transition-all duration-500 ${isHovered ? 'fill-[#FFD700] fill-opacity-30 rotate-12' : ''}`}
//                 style={{ transformOrigin: '50px 42.5px' }}
//               />
//               <circle 
//                 cx="50" 
//                 cy="42.5" 
//                 r="10" 
//                 fill="#B8860B"
//                 className={`transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`}
//               />
//             </svg>
//           );
//         case 'marketing':
//           return (
//             <svg 
//               width="80" 
//               height="80" 
//               viewBox="0 0 100 100" 
//               className={`transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
//             >
//               <path 
//                 d="M20 50 L35 35 L50 50 L65 25 L80 40" 
//                 fill="none" 
//                 stroke="#FFD700" 
//                 strokeWidth="3"
//                 className={`transition-all duration-300 ${isHovered ? 'stroke-[#F5DEB3]' : ''}`}
//               />
//               <circle 
//                 cx="20" 
//                 cy="50" 
//                 r="4" 
//                 fill="#B8860B"
//                 className={`transition-all duration-500 ${isHovered ? 'animate-ping' : ''}`}
//               />
//               <circle 
//                 cx="35" 
//                 cy="35" 
//                 r="4" 
//                 fill="#FFD700"
//                 className={`transition-all duration-500 ${isHovered ? 'animate-ping' : ''}`}
//               />
//               <circle 
//                 cx="50" 
//                 cy="50" 
//                 r="4" 
//                 fill="#B8860B"
//                 className={`transition-all duration-500 ${isHovered ? 'animate-ping' : ''}`}
//               />
//               <circle 
//                 cx="65" 
//                 cy="25" 
//                 r="4" 
//                 fill="#FFD700"
//                 className={`transition-all duration-500 ${isHovered ? 'animate-ping' : ''}`}
//               />
//               <circle 
//                 cx="80" 
//                 cy="40" 
//                 r="4" 
//                 fill="#B8860B"
//                 className={`transition-all duration-500 ${isHovered ? 'animate-ping' : ''}`}
//               />
//               <path 
//                 d="M15 70 L85 70 M15 80 L85 80" 
//                 stroke="#FFD700" 
//                 strokeWidth="2" 
//                 opacity="0.5"
//               />
//             </svg>
//           );
//         default:
//           return null;
//       }
//     };

//     return (
//       <div className="flex items-center justify-center mb-6">
//         {getIconAnimation()}
//       </div>
//     );
//   };

//   const services = [
//     {
//       id: 1,
//       title: "Web Development",
//       description: "Custom websites and web applications built with cutting-edge technologies for optimal performance and user experience.",
//       icon: "web",
//       features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern UI/UX"]
//     },
//     {
//       id: 2,
//       title: "Mobile App Development",
//       description: "Native and cross-platform mobile applications that deliver seamless experiences across all devices.",
//       icon: "mobile",
//       features: ["iOS & Android", "Cross-Platform", "App Store Ready", "Push Notifications"]
//     },
//     {
//       id: 3,
//       title: "UI/UX Design",
//       description: "Beautiful, intuitive designs that captivate users and drive engagement through thoughtful user experience.",
//       icon: "design",
//       features: ["User Research", "Wireframing", "Prototyping", "Visual Design"]
//     },
//     {
//       id: 4,
//       title: "E-commerce Solutions",
//       description: "Complete e-commerce platforms with secure payment processing and inventory management systems.",
//       icon: "ecommerce",
//       features: ["Payment Gateway", "Inventory System", "Admin Dashboard", "Mobile Commerce"]
//     },
//     {
//       id: 5,
//       title: "Brand Identity",
//       description: "Comprehensivebranding solutions that establish your unique identity and market presence.",
//       icon: "branding",
//       features: ["Logo Design", "Brand Guidelines", "Marketing Materials", "Brand Strategy"]
//     },
//     {
//       id: 6,
//       title: "Digital Marketing",
//       description: "Strategic digital marketing campaigns that boost your online presence and drive measurable results.",
//       icon: "marketing",
//       features: ["Social Media", "Content Strategy", "Analytics", "Campaign Management"]
//     }
//   ];

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const cardId = parseInt(entry.target.dataset.cardId);
//             setVisibleCards(prev => [...new Set([...prev, cardId])]);
//           }
//         });
//       },
//       { threshold: 0.2 }
//     );

//     const cards = sectionRef.current?.querySelectorAll('.service-card');
//     cards?.forEach(card => observer.observe(card));

//     return () => observer.disconnect();
//   }, []);

//   const ServiceCard = ({ service, index, isVisible }) => {
//     const [isHovered, setIsHovered] = useState(false);

//     return (
//       <div
//         data-card-id={service.id}
//         className={`service-card group relative bg-gradient-to-br from-[#121212] to-[#1C1C1C] 
//           border border-[#FFD700]/20 rounded-2xl p-8 cursor-pointer overflow-hidden
//           transform transition-all duration-700 hover:scale-105 hover:border-[#FFD700]/60
//           ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
//           hover:shadow-2xl hover:shadow-[#FFD700]/20`}
//         style={{ 
//           transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
//           background: isHovered ? 'linear-gradient(135deg, #1C1C1C 0%, #121212 100%)' : undefined
//         }}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//       >
//         {/* Animated Background Gradient */}
//         <div className={`absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 via-transparent to-[#B8860B]/5 
//           opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
//         {/* Floating Particles Effect */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {[...Array(6)].map((_, i) => (
//             <div
//               key={i}
//               className={`absolute w-1 h-1 bg-[#FFD700] rounded-full opacity-0 
//                 group-hover:opacity-60 transition-all duration-1000`}
//               style={{
//                 left: `${20 + (i * 15)}%`,
//                 top: `${10 + (i * 10)}%`,
//                 animationDelay: `${i * 200}ms`,
//                 animation: isHovered ? 'float 3s ease-in-out infinite' : 'none'
//               }}
//             />
//           ))}
//         </div>

//         {/* Content */}
//         <div className="relative z-10">
//           {/* Lottie Icon */}
//           <LottieIcon type={service.icon} isHovered={isHovered} />

//           {/* Title */}
//           <h3 className={`text-2xl font-bold mb-4 transition-all duration-300
//             ${isHovered ? 'text-[#F5DEB3] scale-105' : 'text-[#FFD700]'}`}>
//             {service.title}
//           </h3>

//           {/* Description */}
//           <p className={`text-gray-300 mb-6 leading-relaxed transition-all duration-300
//             ${isHovered ? 'text-white' : ''}`}>
//             {service.description}
//           </p>

//           {/* Features */}
//           <div className="space-y-2">
//             {service.features.map((feature, featureIndex) => (
//               <div
//                 key={featureIndex}
//                 className={`flex items-center space-x-3 transform transition-all duration-300`}
//                 style={{ 
//                   transitionDelay: isHovered ? `${featureIndex * 100}ms` : '0ms',
//                   transform: isHovered ? 'translateX(10px)' : 'translateX(0px)'
//                 }}
//               >
//                 <div className={`w-2 h-2 rounded-full transition-all duration-300
//                   ${isHovered ? 'bg-[#F5DEB3] scale-150' : 'bg-[#B8860B]'}`} />
//                 <span className={`text-sm transition-colors duration-300
//                   ${isHovered ? 'text-[#F5DEB3]' : 'text-gray-400'}`}>
//                   {feature}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Hover Action Button */}
//           <div className={`mt-6 transform transition-all duration-500 overflow-hidden
//             ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
//             <button className="w-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black 
//               font-semibold py-3 px-6 rounded-lg hover:from-[#F5DEB3] hover:to-[#FFD700] 
//               transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
//               Learn More
//             </button>
//           </div>
//         </div>

//         {/* Corner Accent */}
//         <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#FFD700]/20 to-transparent 
//           rounded-bl-full transform transition-all duration-500 
//           ${isHovered ? 'scale-150 from-[#FFD700]/40' : 'scale-100'}`} />
//       </div>
//     );
//   };

//   return (
//     <section 
//       ref={sectionRef}
//       id="services" 
//       className="min-h-screen bg-black py-20 px-4 overflow-hidden"
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-5xl md:text-6xl font-bold text-[#FFD700] mb-6 
//             transform transition-all duration-1000 hover:scale-105">
//             Our Services
//           </h2>
//           <div className="w-32 h-1 bg-gradient-to-r from-[#FFD700] to-[#B8860B] mx-auto mb-8 
//             transform transition-all duration-700 hover:w-48" />
//           <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             We deliver comprehensive digital solutions that transform your vision into reality, 
//             combining cutting-edge technology with exceptional design.
//           </p>
//         </div>

//         {/* Services Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <ServiceCard
//               key={service.id}
//               service={service}
//               index={index}
//               isVisible={visibleCards.includes(service.id)}
//             />
//           ))}
//         </div>

        

//         {/* Bottom CTA */}
//         <div className="text-center mt-16">
//           <div className="inline-block bg-gradient-to-r from-[#FFD700]/10 to-[#B8860B]/10 
//             border border-[#FFD700]/30 rounded-2xl p-8 backdrop-blur-sm">
//             <h3 className="text-2xl font-bold text-[#FFD700] mb-4">
//               Ready to Start Your Project?
//             </h3>
//             <p className="text-gray-300 mb-6">
//               Let's discuss how we can bring your vision to life
//             </p>
//             <button className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black 
//               font-bold py-4 px-8 rounded-lg hover:from-[#F5DEB3] hover:to-[#FFD700] 
//               transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
//               Get Started
//             </button>
//           </div>
//         </div>
//       </div>

//       <style>
//         {`
//           @keyframes float {
//             0%, 100% { transform: translateY(0px) rotate(0deg); }
//             50% { transform: translateY(-20px) rotate(180deg); }
//           }
          
//           @keyframes spin {
//             from { transform: rotate(0deg); }
//             to { transform: rotate(360deg); }
//           }
//         `}
//       </style>
//     </section>
//   );
// };

// export default Services;


import React, { useState, useEffect, useRef } from 'react';

const Services = () => {
  const sectionRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState([]);

  // Lottie Animation Component (Custom implementation since we can't import actual Lottie)
  const LottieIcon = ({ type, isHovered }) => {
    const getIconAnimation = () => {
      switch (type) {
        case 'web':
          return (
            <svg 
              width="80" 
              height="80" 
              viewBox="0 0 100 100" 
              className={`transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            >
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="#FFD700" 
                strokeWidth="2"
                className={`${isHovered ? 'animate-spin' : ''}`}
                style={{ 
                  transformOrigin: '50px 50px',
                  animation: isHovered ? 'spin 2s linear infinite' : 'none'
                }}
              />
              <path 
                d="M20 30 L80 30 M20 50 L80 50 M20 70 L80 70" 
                stroke="#FFD700" 
                strokeWidth="2"
                className={`transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}
              />
              <rect 
                x="25" 
                y="25" 
                width="50" 
                height="50" 
                fill="none" 
                stroke="#B8860B" 
                strokeWidth="2"
                className={`transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : 'scale-100'}`}
                style={{ transformOrigin: '50px 50px' }}
              />
            </svg>
          );
        case 'mobile':
          return (
            <svg 
              width="80" 
              height="80" 
              viewBox="0 0 100 100" 
              className={`transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            >
              <rect 
                x="30" 
                y="10" 
                width="40" 
                height="80" 
                rx="8" 
                fill="none" 
                stroke="#FFD700" 
                strokeWidth="3"
                className={`transition-all duration-300 ${isHovered ? 'stroke-[#F5DEB3]' : ''}`}
              />
              <rect 
                x="35" 
                y="20" 
                width="30" 
                height="50" 
                fill="#FFD700" 
                opacity={isHovered ? "0.8" : "0.5"}
                className="transition-all duration-300"
              />
              <circle 
                cx="50" 
                cy="80" 
                r="3" 
                fill="#FFD700"
                className={`transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`}
              />
              <line 
                x1="40" 
                y1="25" 
                x2="60" 
                y2="25" 
                stroke="#000" 
                strokeWidth="2"
                className={`transition-all duration-500 ${isHovered ? 'animate-bounce' : ''}`}
              />
            </svg>
          );
        case 'design':
          return (
            <svg 
              width="80" 
              height="80" 
              viewBox="0 0 100 100" 
              className={`transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            >
              <path 
                d="M20 80 Q50 20 80 80" 
                fill="none" 
                stroke="#FFD700" 
                strokeWidth="3"
                className={`transition-all duration-300 ${isHovered ? 'stroke-[#F5DEB3]' : ''}`}
              />
              <circle 
                cx="30" 
                cy="70" 
                r="8" 
                fill="#B8860B"
                className={`transition-all duration-500 ${isHovered ? 'animate-pulse scale-125' : ''}`}
              />
              <circle 
                cx="70" 
                cy="70" 
                r="8" 
                fill="#FFD700"
                className={`transition-all duration-500 ${isHovered ? 'animate-pulse scale-125' : ''}`}
              />
              <path 
                d="M45 30 L55 30 L50 20 Z" 
                fill="#FFD700"
                className={`transition-all duration-300 ${isHovered ? 'rotate-180' : ''}`}
                style={{ transformOrigin: '50px 25px' }}
              />
            </svg>
          );
        case 'ecommerce':
          return (
            <svg 
              width="80" 
              height="80" 
              viewBox="0 0 100 100" 
              className={`transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            >
              <path 
                d="M20 25 L25 25 L30 60 L80 60 L85 35 L35 35" 
                fill="none" 
                stroke="#FFD700" 
                strokeWidth="3"
                className={`transition-all duration-300 ${isHovered ? 'stroke-[#F5DEB3]' : ''}`}
              />
              <circle 
                cx="40" 
                cy="75" 
                r="5" 
                fill="#B8860B"
                className={`transition-all duration-500 ${isHovered ? 'animate-bounce' : ''}`}
              />
              <circle 
                cx="70" 
                cy="75" 
                r="5" 
                fill="#B8860B"
                className={`transition-all duration-500 ${isHovered ? 'animate-bounce' : ''}`}
              />
              <rect 
                x="40" 
                y="40" 
                width="30" 
                height="15" 
                fill="#FFD700" 
                opacity={isHovered ? "0.8" : "0.5"}
                className="transition-all duration-300"
              />
            </svg>
          );
        case 'branding':
          return (
            <svg 
              width="80" 
              height="80" 
              viewBox="0 0 100 100" 
              className={`transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            >
              <polygon 
                points="50,15 65,35 85,35 70,50 75,70 50,60 25,70 30,50 15,35 35,35" 
                fill="none" 
                stroke="#FFD700" 
                strokeWidth="3"
                className={`transition-all duration-500 ${isHovered ? 'fill-[#FFD700] fill-opacity-30 rotate-12' : ''}`}
                style={{ transformOrigin: '50px 42.5px' }}
              />
              <circle 
                cx="50" 
                cy="42.5" 
                r="10" 
                fill="#B8860B"
                className={`transition-all duration-300 ${isHovered ? 'animate-pulse' : ''}`}
              />
            </svg>
          );
        case 'marketing':
          return (
            <svg 
              width="80" 
              height="80" 
              viewBox="0 0 100 100" 
              className={`transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            >
              <path 
                d="M20 50 L35 35 L50 50 L65 25 L80 40" 
                fill="none" 
                stroke="#FFD700" 
                strokeWidth="3"
                className={`transition-all duration-300 ${isHovered ? 'stroke-[#F5DEB3]' : ''}`}
              />
              <circle 
                cx="20" 
                cy="50" 
                r="4" 
                fill="#B8860B"
                className={`transition-all duration-500 ${isHovered ? 'animate-ping' : ''}`}
              />
              <circle 
                cx="35" 
                cy="35" 
                r="4" 
                fill="#FFD700"
                className={`transition-all duration-500 ${isHovered ? 'animate-ping' : ''}`}
              />
              <circle 
                cx="50" 
                cy="50" 
                r="4" 
                fill="#B8860B"
                className={`transition-all duration-500 ${isHovered ? 'animate-ping' : ''}`}
              />
              <circle 
                cx="65" 
                cy="25" 
                r="4" 
                fill="#FFD700"
                className={`transition-all duration-500 ${isHovered ? 'animate-ping' : ''}`}
              />
              <circle 
                cx="80" 
                cy="40" 
                r="4" 
                fill="#B8860B"
                className={`transition-all duration-500 ${isHovered ? 'animate-ping' : ''}`}
              />
              <path 
                d="M15 70 L85 70 M15 80 L85 80" 
                stroke="#FFD700" 
                strokeWidth="2" 
                opacity="0.5"
              />
            </svg>
          );
        default:
          return null;
      }
    };

    return (
      <div className="flex items-center justify-center mb-6">
        {getIconAnimation()}
      </div>
    );
  };

  const services = [
    {
      id: 1,
      title: "Web Development",
      description: "Custom websites and web applications built with cutting-edge technologies for optimal performance and user experience.",
      icon: "web",
      features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern UI/UX"]
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications that deliver seamless experiences across all devices.",
      icon: "mobile",
      features: ["iOS & Android", "Cross-Platform", "App Store Ready", "Push Notifications"]
    },
    {
      id: 3,
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that captivate users and drive engagement through thoughtful user experience.",
      icon: "design",
      features: ["User Research", "Wireframing", "Prototyping", "Visual Design"]
    },
    {
      id: 4,
      title: "E-commerce Solutions",
      description: "Complete e-commerce platforms with secure payment processing and inventory management systems.",
      icon: "ecommerce",
      features: ["Payment Gateway", "Inventory System", "Admin Dashboard", "Mobile Commerce"]
    },
    {
      id: 5,
      title: "Brand Identity",
      description: "Comprehensivebranding solutions that establish your unique identity and market presence.",
      icon: "branding",
      features: ["Logo Design", "Brand Guidelines", "Marketing Materials", "Brand Strategy"]
    },
    {
      id: 6,
      title: "Digital Marketing",
      description: "Strategic digital marketing campaigns that boost your online presence and drive measurable results.",
      icon: "marketing",
      features: ["Social Media", "Content Strategy", "Analytics", "Campaign Management"]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(entry.target.dataset.cardId);
            setVisibleCards(prev => [...new Set([...prev, cardId])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current?.querySelectorAll('.service-card');
    cards?.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const ServiceCard = ({ service, index, isVisible }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        data-card-id={service.id}
        className={`service-card group relative bg-gradient-to-br from-[#121212] to-[#1C1C1C] 
          border border-[#FFD700]/20 rounded-2xl p-8 cursor-pointer overflow-hidden
          transform transition-all duration-700 hover:scale-105 hover:border-[#FFD700]/60
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
          hover:shadow-2xl hover:shadow-[#FFD700]/20`}
        style={{ 
          transitionDelay: isVisible ? `${index * 150}ms` : '0ms',
          background: isHovered ? 'linear-gradient(135deg, #1C1C1C 0%, #121212 100%)' : undefined
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 via-transparent to-[#B8860B]/5 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-[#FFD700] rounded-full opacity-0 
                group-hover:opacity-60 transition-all duration-1000`}
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${10 + (i * 10)}%`,
                animationDelay: `${i * 200}ms`,
                animation: isHovered ? 'float 3s ease-in-out infinite' : 'none'
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Lottie Icon */}
          <LottieIcon type={service.icon} isHovered={isHovered} />

          {/* Title */}
          <h3 className={`text-2xl font-bold mb-4 transition-all duration-300
            ${isHovered ? 'text-[#F5DEB3] scale-105' : 'text-[#FFD700]'}`}>
            {service.title}
          </h3>

          {/* Description */}
          <p className={`text-gray-300 mb-6 leading-relaxed transition-all duration-300
            ${isHovered ? 'text-white' : ''}`}>
            {service.description}
          </p>

          {/* Features */}
          <div className="space-y-2">
            {service.features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                className={`flex items-center space-x-3 transform transition-all duration-300`}
                style={{ 
                  transitionDelay: isHovered ? `${featureIndex * 100}ms` : '0ms',
                  transform: isHovered ? 'translateX(10px)' : 'translateX(0px)'
                }}
              >
                <div className={`w-2 h-2 rounded-full transition-all duration-300
                  ${isHovered ? 'bg-[#F5DEB3] scale-150' : 'bg-[#B8860B]'}`} />
                <span className={`text-sm transition-colors duration-300
                  ${isHovered ? 'text-[#F5DEB3]' : 'text-gray-400'}`}>
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Hover Action Button */}
          <div className={`mt-6 transform transition-all duration-500 overflow-hidden
            ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <button className="w-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black 
              font-semibold py-3 px-6 rounded-lg hover:from-[#F5DEB3] hover:to-[#FFD700] 
              transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Learn More
            </button>
          </div>
        </div>

        {/* Corner Accent */}
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#FFD700]/20 to-transparent 
          rounded-bl-full transform transition-all duration-500 
          ${isHovered ? 'scale-150 from-[#FFD700]/40' : 'scale-100'}`} />
      </div>
    );
  };

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="min-h-screen bg-black py-20 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-[#FFD700] mb-6 
            transform transition-all duration-1000 hover:scale-105">
            Our Services
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#FFD700] to-[#B8860B] mx-auto mb-8 
            transform transition-all duration-700 hover:w-48" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We deliver comprehensive digital solutions that transform your vision into reality, 
            combining cutting-edge technology with exceptional design.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              isVisible={visibleCards.includes(service.id)}
            />
          ))}
        </div>

        {/* Animated Digital Wave Section */}
        <div className="mt-16 relative w-full h-48 overflow-hidden bg-gradient-to-b from-black to-[#1C1C1C]">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 100" preserveAspectRatio="xMidYMax slice">
            <path 
              d="M0,100 C300,50 600,150 900,50 C1200,150 1500,50 1440,100 L1440,0 L0,0 Z" 
              fill="#FFD700"
              className="wave1"
            />
            <path 
              d="M0,120 C300,70 600,170 900,70 C1200,170 1500,70 1440,120 L1440,0 L0,0 Z" 
              fill="#B8860B"
              className="wave2"
            />
          </svg>
          {/* Floating Particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#FFD700] rounded-full opacity-50"
              style={{
                left: `${10 + (i * 15)}%`,
                top: `${20 + (Math.random() * 60)}%`,
                animation: 'float 4s ease-in-out infinite',
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-[#FFD700]/10 to-[#B8860B]/10 
            border border-[#FFD700]/30 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-[#FFD700] mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-300 mb-6">
              Let's discuss how we can bring your vision to life
            </p>
            <button className="bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black 
              font-bold py-4 px-8 rounded-lg hover:from-[#F5DEB3] hover:to-[#FFD700] 
              transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              Get Started
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes wave {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }

          .wave1 {
            animation: wave 4s ease-in-out infinite;
          }

          .wave2 {
            animation: wave 5s ease-in-out infinite;
            animation-delay: 0.5s;
          }
        `}
      </style>
    </section>
  );
};

export default Services;