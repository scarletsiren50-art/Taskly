import { LoaderCircle } from "lucide-react";

const LoadingState = ({
  message = "Loading...",
}) => {
  return (
    <div className="loading-state">
      <LoaderCircle
        size={28}
        className="loading-spinner"
      />

      <span>{message}</span>
    </div>
  );
};

export default LoadingState;