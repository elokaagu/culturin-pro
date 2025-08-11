"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Settings, Volume2, VolumeX, Save, X } from "lucide-react";
import { settingsService } from "@/lib/settings-service";
import { toast } from "sonner";

interface StudioSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudioSettings: React.FC<StudioSettingsProps> = ({ isOpen, onClose }) => {
  const [elevenLabsEnabled, setElevenLabsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadSettings();
    }
  }, [isOpen]);

  const loadSettings = async () => {
    try {
      const settings = await settingsService.getSettings();
      if (settings) {
        setElevenLabsEnabled(settings.elevenLabsEnabled ?? false);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const success = await settingsService.updateSettings({
        elevenLabsEnabled,
      });
      
      if (success) {
        toast.success("Settings saved successfully!");
        setHasChanges(false);
      } else {
        toast.error("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleElevenLabsToggle = (enabled: boolean) => {
    setElevenLabsEnabled(enabled);
    setHasChanges(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">Studio Settings</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* ElevenLabs Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {elevenLabsEnabled ? (
                  <Volume2 className="h-5 w-5 text-green-600" />
                ) : (
                  <VolumeX className="h-5 w-5 text-muted-foreground" />
                )}
                Text-to-Speech Integration
              </CardTitle>
              <CardDescription>
                Enable ElevenLabs AI voice generation for your marketing content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="eleven-labs-toggle">Enable ElevenLabs</Label>
                  <p className="text-sm text-muted-foreground">
                    Generate AI voiceovers for your content
                  </p>
                </div>
                <Switch
                  id="eleven-labs-toggle"
                  checked={elevenLabsEnabled}
                  onCheckedChange={handleElevenLabsToggle}
                />
              </div>
              
              {elevenLabsEnabled && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✅ ElevenLabs integration is now enabled. You can generate voiceovers for your content.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Separator />

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!hasChanges || isLoading}
              className="min-w-[100px]"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
