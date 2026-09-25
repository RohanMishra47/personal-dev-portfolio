const CaseStudySection = ({ title, children }) => (
  <section className="mb-14">
    <h2 className="font-mono text-sm text-graphite border-b border-hairline pb-3 mb-6">
      {title}
    </h2>
    {children}
  </section>
);

export default CaseStudySection;
