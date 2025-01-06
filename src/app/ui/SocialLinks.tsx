interface IProps {
  href: string;
  src: string;
  alt: string;
  className?: string;
}
const SocialLinks = ({ href, src, alt, className }: IProps) => {
  return (
    <div className="flex space-x-4">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <img
          src={src}
          alt={alt}
          className="w-8 h-8"
        />
      </a>
    </div>
  );
};

export default SocialLinks;
