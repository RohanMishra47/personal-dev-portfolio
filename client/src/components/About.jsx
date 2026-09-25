import {
  FaAddressBook,
  FaFileDownload,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import aboutData from "../data/about.json";

const skillCategories = [
  {
    title: "Data & Analytics",
    items: [
      "SQL",
      "Python (pandas, matplotlib, seaborn)",
      "Power BI",
      "Statistical Analysis",
    ],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "Backend & DB",
    items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Prisma"],
  },
  {
    title: "DevOps & Tools",
    items: ["Docker", "Git", "Vercel", "Cloudflare"],
  },
];

const highlights = [
  {
    number: "3",
    label: "End-to-end analytics pipelines shipped, SQL → Python → Power BI",
  },
  { number: "100K+", label: "Orders analyzed in a single case study" },
  {
    number: "2",
    label:
      "Data-quality anomalies found and diagnosed before trusting the numbers",
  },
];

const About = () => {
  const aboutInfo = aboutData;

  if (!aboutInfo)
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-12">
        <div className="w-10 h-10 border-[3px] border-hairline border-t-pine rounded-full animate-spin" />
        <p className="text-graphite">Loading...</p>
      </div>
    );

  return (
    <section className="max-w-3xl mx-auto px-6 py-10 border-t border-hairline">
      <p className="text-lg md:text-xl text-ink/90 leading-relaxed max-w-prose">
        {aboutInfo.description}
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        {highlights.map((h) => (
          <div
            key={h.label}
            className="border border-hairline rounded-md px-5 py-4 flex-1 min-w-[180px]"
          >
            <span className="font-mono text-2xl font-semibold text-pine block">
              {h.number}
            </span>
            <span className="text-base text-graphite">{h.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="font-mono text-base md:text-lg text-graphite border-b border-hairline pb-3 mb-6">
          Technical expertise
        </h3>
        <div className="grid sm:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h4 className="font-mono text-sm md:text-base text-graphite mb-3">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-base text-ink border border-hairline rounded-sm px-2.5 py-1"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 flex flex-wrap gap-6 font-mono text-base">
        {aboutInfo.socials?.github && (
          <a
            href={aboutInfo.socials.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-pine border-b border-pine-light pb-px hover:text-pine-dark"
          >
            <FaGithub /> GitHub
          </a>
        )}
        {aboutInfo.socials?.linkedin && (
          <a
            href={aboutInfo.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-pine border-b border-pine-light pb-px hover:text-pine-dark"
          >
            <FaLinkedin /> LinkedIn
          </a>
        )}
        {aboutInfo.resume && (
          <a
            href={aboutInfo.resume}
            download
            className="flex items-center gap-2 text-pine border-b border-pine-light pb-px hover:text-pine-dark"
          >
            <FaFileDownload /> Resume
          </a>
        )}
        {aboutInfo.contact && aboutInfo.contact[0] && (
          <Link
            to={aboutInfo.contact[0].url}
            className="flex items-center gap-2 text-pine border-b border-pine-light pb-px hover:text-pine-dark"
          >
            <FaAddressBook /> {aboutInfo.contact[0].label}
          </Link>
        )}
      </div>
    </section>
  );
};

export default About;
