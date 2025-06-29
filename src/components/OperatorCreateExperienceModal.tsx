'use client'

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  open: boolean;
  onOpenChange: (val: boolean) => void;
};

const OperatorCreateExperienceModal: React.FC<Props> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate creation and reset flow
    setTimeout(() => {
      toast({
        title: "Experience Created!",
        description: `"${title}" added successfully.`,
      });
      setTitle("");
      setLocation("");
      setImageFile(null);
      setSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Experience</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Title</label>
            <Input
              placeholder="Traditional Pottery Workshop"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={submitting}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Location</label>
            <Input
              placeholder="E.g., Oaxaca, Mexico"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              disabled={submitting}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Image (not uploaded for demo)</label>
            <Input type="file" accept="image/*" onChange={handleImage} disabled={submitting} />
            {imageFile && (
              <span className="block mt-1 text-xs text-gray-500">{imageFile.name}</span>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" className="bg-black text-white" disabled={submitting || !title || !location}>
              {submitting ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OperatorCreateExperienceModal;
