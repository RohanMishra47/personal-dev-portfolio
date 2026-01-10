## 🌐 Personal Developer Portfolio

A modern, lightweight developer portfolio built with **React** and deployed as a static site on **Vercel** — designed to showcase projects with instant loading and seamless user experience.

## 🚀 Tech Stack

- **Frontend**: React, Vanilla CSS (transitioning to Tailwind CSS)
- **Data Management**: JSON-based project and about data
- **Contact Form**: Web3Forms integration
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel (static hosting)

🔗 **Live Link:** [View Portfolio](https://personal-dev-portfolio-front-git-6b1edc-rohanmishra47s-projects.vercel.app/)

## ✨ Features

🔹 **Instant Loading**: Static site architecture ensures sub-second load times  
🔹 **Dynamic Project Showcase**: Projects are managed through JSON configuration files  
🔹 **Functional Contact Form**: Integrated with Web3Forms for reliable message delivery  
🔹 **Responsive Design**: Fully mobile-friendly with a clean, minimalist layout  
🔹 **Performance Optimized**: Deployed on Vercel's edge network for global fast access  
🔹 **Built-in Analytics**: Tracks visitor engagement using Vercel Analytics

## 🏗️ Architecture Decision

Initially built as a full-stack application with an Express.js backend, I migrated to a static architecture after recognizing that:

- A portfolio site doesn't require server-side logic for its core functionality
- Static hosting eliminates cold start delays common with free-tier backends
- Simpler architecture means easier maintenance and faster performance

This decision reduced load times from 30-60 seconds (cold start) to under 1 second while maintaining all essential features.

## 🧩 Future Improvements

- Complete migration to Tailwind CSS for consistent styling
- Acquire custom domain for professional branding
- Add dark mode toggle
- Implement project filtering by technology stack

## ⚙️ Setup Instructions

```bash
# Clone the repository
git clone https://github.com/RohanMishra47/personal-dev-portfolio.git

# Navigate to project directory
cd personal-dev-portfolio

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

## 📝 Updating Content

**Projects**: Edit `/src/data/projects.json`  
**About Section**: Edit `/src/data/about.json`  
**Contact Form**: Configure Web3Forms access key in environment variables

## 🧠 Philosophy

**"Don't make AI do your work. Make it help you."**  
This portfolio reflects my approach — balancing automation with craftsmanship, and choosing the right tool for the job.

## 💬 Support & Contact

If you have questions, suggestions, or face any issues:

- Open an [issue](https://github.com/RohanMishra47/personal-dev-portfolio/issues) on this repository
- Connect with me on [LinkedIn](https://www.linkedin.com/in/rohan-mishra-6391bb372/)
- Reach out on [Twitter/X](https://x.com/RohanMishr19102)

I'm always open to feedback and collaboration opportunities!

---

**⭐ If you find this project helpful, consider giving it a star!**
