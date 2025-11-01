const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-20 h-20 flex items-center justify-center overflow-visible">
                <img 
                  src="https://haiintel.com/assets/white-logo-nobg-1-bLeBMUHY.svg" 
                  alt="HaiIntel Logo" 
                  className="w-48 h-48" 
                  style={{ filter: 'hue-rotate(-10deg) saturate(250%) brightness(1.2) contrast(1.8)' }}
                />
              </div>
            </div>
            <p className="text-white/80 leading-relaxed">
              Partnering with CIOs to embed human-rooted AI into enterprise transformation — accelerating outcomes through intelligence-first systems.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-smooth">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin h-5 w-5">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-smooth">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter h-5 w-5">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">HaiProducts</h4>
            <ul className="space-y-3 text-white/80">
              <li><a href="#" className="hover:text-white transition-smooth">HaiIntel-Recode</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">HaiReach</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">HaiOnboarding</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">HaiResolve</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">HaiModels</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-3 text-white/80">
              <li><a href="#" className="hover:text-white transition-smooth">Intelligence HaiPODs</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">AI Architecture</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Legacy Modernization</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">CIO Partnership</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-4 text-white/80">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail h-5 w-5 text-white">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>hello@haiintel.com</span>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone h-5 w-5 text-white">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin h-5 w-5 text-white mt-0.5">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>
                  Global Headquarters<br />
                  Enterprise AI District
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">© 2025 HaiIntel. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-smooth">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-smooth">Terms of Service</a>
              <a href="#" className="hover:text-white transition-smooth">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;