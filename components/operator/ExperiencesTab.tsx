
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {
  onCreateExperience: () => void;
};

const ExperiencesTab: React.FC<Props> = ({ onCreateExperience }) => (
  <div className="bg-white p-8 rounded-lg border border-gray-200 text-center">
    <h2 className="text-xl font-medium mb-2">My Experiences</h2>
    <p className="text-gray-500 mb-6">Manage your tours, workshops, and cultural experiences</p>
    <Button
      className="bg-black hover:bg-gray-800 text-white"
      onClick={onCreateExperience}
    >
      <Plus className="w-4 h-4 mr-2" />
      Add New Experience
    </Button>
  </div>
);

export default ExperiencesTab;
