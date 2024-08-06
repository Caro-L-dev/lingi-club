import { Star } from "lucide-react";

function Score() {
  return (
    <div>
      <span className="flex items-center">
        <span>⭐</span>
        <span>⭐</span>
        <span>⭐</span>
        <span>⭐</span>
        <Star size={19} strokeWidth={2} />
      </span>
    </div>
  );
}

export default Score;
