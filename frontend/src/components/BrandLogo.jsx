
const BrandLogo = ({ className = "" }) => {
  return (
    <img
      src="/assets/taskly-logo.png"
      alt="Taskly Logo"
      className={`taskly-brand-logo ${className}`}
    />
  );
};

export default BrandLogo;
