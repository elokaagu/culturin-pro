
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, DollarSign } from "lucide-react";
import { settingsService } from "@/lib/settings-service";

interface ExperienceEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  experience: {
    id: string;
    title: string;
    location: string;
    description?: string;
    price?: number;
    duration?: string;
    groupSize?: string;
  } | null;
  onSave?: (updatedExperience: any) => void;
}

const ExperienceEditModal = ({ open, onOpenChange, experience, onSave }: ExperienceEditModalProps) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: experience?.title || "",
    location: experience?.location || "",
    description: experience?.description || "Immerse yourself in authentic cultural experiences...",
    price: experience?.price || 45,
    duration: experience?.duration || "3 hours",
    groupSize: experience?.groupSize || "2-8 people",
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!experience) return;
    
    setIsSaving(true);
    
    try {
      const updatedExperience = {
        ...experience,
        ...formData
      };

      // Call the parent's onSave callback if provided
      if (onSave) {
        onSave(updatedExperience);
      }

      // Save to database using the settings service
      await settingsService.saveExperienceSettings(updatedExperience);
      
      toast({
        title: "Experience Updated",
        description: `${formData.title} has been successfully updated and saved.`,
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving experience:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save experience. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!experience) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Edit Experience
            <Badge className="bg-green-100 text-green-800">Active</Badge>
          </DialogTitle>
          <DialogDescription>
            Update your experience details and settings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Basic Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title">Experience Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter experience title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Location
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Enter location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your experience"
                className="min-h-[100px]"
              />
            </div>
          </div>

          {/* Pricing & Details */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Pricing & Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Price per Person
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
                  placeholder="45"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Duration
                </Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  placeholder="3 hours"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="groupSize" className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                Group Size
              </Label>
              <Input
                id="groupSize"
                value={formData.groupSize}
                onChange={(e) => handleInputChange("groupSize", e.target.value)}
                placeholder="2-8 people"
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="bg-black hover:bg-gray-800 text-white"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExperienceEditModal;
