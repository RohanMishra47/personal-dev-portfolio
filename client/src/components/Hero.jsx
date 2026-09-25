import aboutData from "../data/about.json";

const Hero = ({ headline, subhead }) => {
  return (
    <section className="max-w-3xl mx-auto px-6 pt-28 pb-12 md:pt-32">
      <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center mb-12">
        <img
          src={aboutData.image}
          alt={aboutData.name}
          className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover
            border-2 border-white shadow-lg ring-1 ring-hairline mx-auto md:mx-0"
        />

        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-ink">
            {aboutData.name}
          </h2>
          <p className="font-mono text-sm md:text-base text-graphite mt-1">
            {aboutData.role}
          </p>
        </div>
      </div>

      <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink leading-tight tracking-tight">
        {headline}
      </h1>

      <p className="font-serif text-lg text-graphite mt-6 leading-relaxed max-w-prose">
        {subhead}
      </p>

      <div className="mt-8 flex flex-wrap gap-3 justify-center md:justify-start">
        <a
          href="#projects"
          className="inline-flex items-center gap-2 bg-pine text-paper px-5 py-3 rounded-md font-mono text-sm hover:bg-pine-dark transition-colors"
        >
          See Projects ↓
        </a>

        <a
          href={aboutData.resume}
          download
          className="inline-flex items-center gap-2 border border-hairline text-ink px-5 py-3 rounded-md font-mono text-sm hover:border-pine hover:text-pine transition-colors"
        >
          Resume
        </a>
      </div>
    </section>
  );
};

export default Hero;
