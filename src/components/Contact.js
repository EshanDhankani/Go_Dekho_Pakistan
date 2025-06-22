import React, { useState, useRef, useEffect, useCallback } from 'react';

const AnimatedInput = React.memo(({
  type = 'text',
  name,
  label,
  value,
  onChange,
  required = false,
  rows = null
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(value.length > 0);
  const inputRef = useRef(null); // Reference to the input/textarea element

  useEffect(() => {
    setHasValue(value.length > 0);
  }, [value]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    if (inputRef.current) {
      inputRef.current.focus(); // Ensure focus is maintained
    }
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const InputComponent = rows ? 'textarea' : 'input';

  return (
    <div className="relative group">
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 to-[#B8860B]/5 
        rounded-lg transition-all duration-500 transform
        ${isFocused ? 'scale-105 from-[#FFD700]/10 to-[#B8860B]/10' : 'scale-100'}`} />

      <div className="relative">
        <InputComponent
          ref={inputRef}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows={rows}
          className={`w-full bg-[#1C1C1C] border-2 rounded-lg px-4 transition-all duration-300
            text-white placeholder-transparent peer resize-none
            ${rows ? 'py-4 pt-6' : 'py-4 pt-6'}
            ${isFocused 
              ? 'border-[#FFD700] shadow-lg shadow-[#FFD700]/20' 
              : 'border-[#FFD700]/30 hover:border-[#FFD700]/50'
            }`}
          placeholder={label}
          required={required}
        />

        {/* Floating Label */}
        <label className={`absolute left-4 transition-all duration-300 pointer-events-none
          ${isFocused || hasValue 
            ? 'top-2 text-xs text-[#FFD700] font-medium' 
            : 'top-4 text-base text-gray-400'
          }`}>
          {label}
          {required && <span className="text-[#FFD700] ml-1">*</span>}
        </label>

        {/* Animated Border Effect */}
        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#B8860B]
          transition-all duration-500 transform
          ${isFocused ? 'w-full scale-x-100' : 'w-0 scale-x-0'}`} />
      </div>

      {/* Field Icon */}
      <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300
        ${isFocused ? 'text-[#FFD700] scale-110' : 'text-gray-500'}`}>
        {name === 'name' && (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        )}
        {name === 'email' && (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        )}
        {name === 'subject' && (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        )}
        {name === 'message' && (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Memoization: Only re-render if value or onChange changes
  return prevProps.value === nextProps.value && prevProps.onChange === nextProps.onChange;
});

const AnimatedSelect = ({ name, label, value, onChange, options, required = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <div className={`absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 to-[#B8860B]/5 
        rounded-lg transition-all duration-500 transform
        ${isFocused ? 'scale-105 from-[#FFD700]/10 to-[#B8860B]/10' : 'scale-100'}`} />
      
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full bg-[#1C1C1C] border-2 rounded-lg px-4 py-4 pt-6 
            text-white appearance-none cursor-pointer transition-all duration-300
            ${isFocused 
              ? 'border-[#FFD700] shadow-lg shadow-[#FFD700]/20' 
              : 'border-[#FFD700]/30 hover:border-[#FFD700]/50'
            }`}
          required={required}
        >
          <option value="" className="bg-[#1C1C1C] text-gray-400">Select {label}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value} className="bg-[#1C1C1C] text-white">
              {option.label}
            </option>
          ))}
        </select>
        
        <label className={`absolute left-4 transition-all duration-300 pointer-events-none
          ${isFocused || value 
            ? 'top-2 text-xs text-[#FFD700] font-medium' 
            : 'top-4 text-base text-gray-400'
          }`}>
          {label}
          {required && <span className="text-[#FFD700] ml-1">*</span>}
        </label>

        <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300
          ${isFocused ? 'text-[#FFD700]' : 'text-gray-500'}`}>
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>

        <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#B8860B]
          transition-all duration-500 transform
          ${isFocused ? 'w-full scale-x-100' : 'w-0 scale-x-0'}`} />
      </div>
    </div>
  );
};

const Contact = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: '',
    timeline: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        budget: '',
        timeline: ''
      });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };

  const budgetOptions = [
    { value: '5k-10k', label: '5,000 - 10,000' },
    { value: '10k-25k', label: '10,000 - 25,000' },
    { value: '25k-50k', label: '25,000 - 50,000' },
    { value: '50k+', label: '50,000+' }
  ];

  const timelineOptions = [
    { value: '1-2months', label: '1-2 Months' },
    { value: '3-4months', label: '3-4 Months' },
    { value: '5-6months', label: '5-6 Months' },
    { value: '6months+', label: '6+ Months' }
  ];

  return (
    <section ref={sectionRef} id="contact" className="min-h-screen bg-black py-20 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#FFD700] rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <h2 className="text-5xl md:text-6xl font-bold text-[#FFD700] mb-6">
            Get In Touch
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#FFD700] to-[#B8860B] mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to bring your vision to life? Let's discuss your project and create something amazing together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`transform transition-all duration-1000 delay-300
            ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="bg-gradient-to-br from-[#1C1C1C]/80 to-[#121212]/80 backdrop-blur-sm
              border border-[#FFD700]/20 rounded-2xl p-8 relative overflow-hidden">
              
              {/* Form Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[#FFD700] mb-2">Start Your Project</h3>
                <p className="text-gray-400">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>

              {/* Animated Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatedInput
                    name="name"
                    label="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <AnimatedInput
                    type="email"
                    name="email"
                    label="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <AnimatedInput
                  name="subject"
                  label="Project Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatedSelect
                    name="budget"
                    label="Project Budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    options={budgetOptions}
                  />
                  <AnimatedSelect
                    name="timeline"
                    label="Timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    options={timelineOptions}
                  />
                </div>

                <AnimatedInput
                  name="message"
                  label="Project Details"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  required
                />

                {/* Submit Button */}
                <div className="relative">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-[#FFD700] to-[#B8860B] text-black 
                      font-bold py-4 px-8 rounded-lg transition-all duration-300 transform
                      relative overflow-hidden group
                      ${isSubmitting 
                        ? 'opacity-75 cursor-not-allowed' 
                        : 'hover:from-[#F5DEB3] hover:to-[#FFD700] hover:scale-105 hover:shadow-xl'
                      }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r from-[#F5DEB3] to-[#FFD700] 
                      transform transition-transform duration-300 
                      ${isSubmitting ? 'translate-x-0' : '-translate-x-full group-hover:translate-x-0'}`} />
                    
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent mr-2" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                            fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </>
                      )}
                    </span>
                  </button>

                  {submitStatus === 'success' && (
                    <div className="absolute inset-0 bg-green-600 text-white font-bold py-4 px-8 
                      rounded-lg flex items-center justify-center animate-bounce">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Message Sent Successfully!
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className={`transform transition-all duration-1000 delay-500
            ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="space-y-8">
              {[
                {
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  ),
                  title: "Phone",
                  content: "+92 3333333333",
                  action: "Call us now"
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  ),
                  title: "Email",
                  content: "godekho@gmail.com",
                  action: "Send email"
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  ),
                  title: "Office",
                  content: "Saddar Karachi",
                  action: "Get directions"
                },
                {
                  icon: (
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  ),
                  title: "Hours",
                  content: "Mon - Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM",
                  action: "View schedule"
                }
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-[#1C1C1C]/60 to-[#121212]/60 
                    border border-[#FFD700]/20 rounded-xl p-6 backdrop-blur-sm
                    transform transition-all duration-300 hover:scale-105 hover:border-[#FFD700]/60
                    hover:shadow-lg hover:shadow-[#FFD700]/20">
                    <div className="flex items-start space-x-4">
                      <div className="text-[#FFD700] group-hover:text-[#F5DEB3] transition-colors duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-[#FFD700] mb-2 group-hover:text-[#F5DEB3] transition-colors duration-300">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 mb-3 whitespace-pre-line">
                          {item.content}
                        </p>
                        <span className="text-sm text-[#B8860B] group-hover:text-[#FFD700] 
                          transition-colors duration-300 flex items-center">
                          {item.action}
                          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 
                            transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="bg-gradient-to-br from-[#1C1C1C]/60 to-[#121212]/60 
                border border-[#FFD700]/20 rounded-xl p-6 backdrop-blur-xl">
                <h4 className="text-xl font-semibold text-[#FFD700] mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {[
                    { name: 'LinkedIn', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', href: 'https://www.linkedin.com/company/yourcompany' },
                    { name: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', href: 'https://twitter.com/yourcompany' },
                    { name: 'Instagram', icon: 'M12.315 2c2.662 0 2.99.013 4.041.058 1.051.046 1.768.217 2.398.46.634.243 1.173.573 1.71 1.11.537.537.867.867 1.11 1.71.243.63.414 1.347.46 2.398.045 1.051.058 1.379.058 4.041s-.013 2.99-.058 4.041c-.046 1.051-.217 1.768-.46 2.398-.243.634-.573 1.173-1.11 1.71-.537.537-.867.867-1.71 1.11-.63.243-1.347.414-2.398.46-1.051.045-1.379.058-4.041.058s-2.99-.013-4.041-.058c-1.051-.046-1.768-.217-2.398-.46-.634-.243-1.173-.573-1.71-1.11-.537-.537-.867-.867-1.11-1.71-.243-.63-.414-1.347-.46-2.398-.045-1.051-.058-1.379-.058-4.041s.013-2.99.058-4.041c.046-1.051.217-1.768.46-2.398.243-.634.573-1.173 1.11-1.71.537-.537.867-.867 1.71-1.11.63-.243 1.347-.414 2.398-.46C9.325 2.013 9.653 2 12.315 2zm0 1.802c-2.627 0-2.944.012-3.978.057-.964.043-1.488.202-1.845.343-.46.177-.79.385-1.134.73-.345.344-.553.674-.73 1.134-.141.357-.3.881-.343 1.845-.045 1.034-.057 1.351-.057 3.978s.012 2.944.057 3.978c.043.964.202 1.488.343 1.845.177.46.385.79.73 1.134.344.345.674.553 1.134.73.357.141.881.3 1.845.343.964.057 1.351.057 3.978.057s2.944-.012 3.978-.057c.964-.043 1.488-.202 1.845-.343.46-.177.79-.385 1.134-.73.345-.344.553-.674.73-1.134.141-.357.3-.881.343-1.845.045-.964.057-1.351.057-3.978s-.012-2.944-.057-3.978c-.043-.964-.202-1.488-.343-1.845-.177-.46-.385-.79-.73-1.134-.344-.345-.674-.553-1.134-.73-.357-.141-.881-.3-1.845-.343-.964-.045-1.351-.057-3.978-.057zm0 4.109a5.125 5.125 0 100 10.25 5.125 5.125 0 000-10.25zm0 1.625a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm4.875-.125a1.125 1.125 0 110 2.25 1.125 1.125 0 010-2.25z', href: 'https://www.instagram.com/yourcompany' }
                  ].map((social, index) => (
                    <a key={index} href={social.href} 
                      className="w-12 h-12 bg-[#FFD700]/20 border border-[#FFD700]/30 rounded-lg
                        flex items-center justify-center text-[#FFD700] hover:bg-[#FFD700] 
                        hover:text-black transition-all duration-300 transform hover:scale-110">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d={social.icon} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(0deg); }
          }
        `}
      </style>
    </section>
  );
};

export default Contact;