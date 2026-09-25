const StatPlate = ({ number, label, negative = false }) => (
  <div className="border border-hairline rounded-md px-5 py-4 inline-block mr-4 mb-4">
    <span
      className={`font-mono text-2xl font-semibold block ${
        negative ? "text-brick" : "text-pine"
      }`}
    >
      {number}
    </span>
    <span className="text-sm text-graphite max-w-[22ch] block mt-1">
      {label}
    </span>
  </div>
);

export default StatPlate;
