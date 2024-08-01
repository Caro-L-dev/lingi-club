import { Star } from "lucide-react";

function Score() {
  return (
    <div>
      <span className="flex">
        <Star className="text-secondary" strokeWidth={2} />
        <Star className="text-secondary" strokeWidth={2} />
        <Star className="text-secondary" strokeWidth={2} />
        <Star className="text-secondary" strokeWidth={2} />
        <Star className="text-secondary" strokeWidth={2} />
      </span>
    </div>
  );
}

export default Score;
