import { Star } from "lucide-react";

const UserNoteStars: React.FC<{ note: number }> = ({ note }) => {
    const NOTE_MAX = 5;
    const NOTE_MIN = 1;
    if (note > NOTE_MAX || note < NOTE_MIN) return null;
    const starsEmpty = 5 - note
    return (
        <div className="flex">
            {Array.from({ length: note }, (_, index) => {
                return <Star color="orange" fill="orange" key={index} />;
            })}
            {Array.from({ length: starsEmpty }, (_, index) => {
                return <Star color="orange" fill="white" key={index} />;
            })}
        </div>
    );
};

export default UserNoteStars;
