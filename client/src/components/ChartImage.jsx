const ChartImage = ({ src, alt, caption }) => (
  <figure className="my-6">
    <img
      src={src}
      alt={alt}
      className="w-full border border-hairline rounded-md"
    />
    {caption && (
      <figcaption className="text-sm text-graphite mt-2 max-w-prose">
        {caption}
      </figcaption>
    )}
  </figure>
);

export default ChartImage;
