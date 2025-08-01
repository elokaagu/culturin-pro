import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import {
  Save,
  Eye,
  Edit,
  Trash2,
  Clock,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  GripVertical,
  Plus,
  Camera,
  FileText,
  ExternalLink,
  Bed,
  UtensilsCrossed,
  Landmark,
  Bus,
  Navigation,
  Sun,
  Moon,
  Coffee,
  Music,
  Ticket,
  Bot,
} from "lucide-react";
import Image from "@/components/ui/image";
import { ItineraryType, ItineraryModule } from "@/data/itineraryData";

interface ItineraryPreviewProps {
  itinerary: ItineraryType & {
    modules?: ItineraryModule[];
    price?: number;
    currency?: string;
    groupSize?: { min: number; max: number };
    difficulty?: string;
  };
  onSaveChanges?: () => void;
}

const ItineraryPreview: React.FC<ItineraryPreviewProps> = ({
  itinerary,
  onSaveChanges,
}) => {
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [activeDay, setActiveDay] = useState(1);
  const [modules, setModules] = useState<ItineraryModule[]>(
    itinerary.modules || []
  );
  const [editingModule, setEditingModule] = useState<string | null>(null);
  const [draggedModule, setDraggedModule] = useState<string | null>(null);
  const { toast } = useToast();

  // Reset modules when itinerary changes
  useEffect(() => {
    if (itinerary.id) {
      setModules(itinerary.modules || []);
      setActiveDay(1);
    }
  }, [itinerary.id, itinerary.modules]);

  // Create tabs for each day in the itinerary
  const dayTabs = Array.from({ length: itinerary.days || 3 }, (_, i) => i + 1);

  // Get the appropriate icon based on module type
  const getModuleIcon = (type: string) => {
    switch (type) {
      case "Accommodation":
        return <Bed className="h-4 w-4 text-blue-500" />;
      case "Meal":
        return <UtensilsCrossed className="h-4 w-4 text-orange-500" />;
      case "Photo Opportunity":
        return <Camera className="h-4 w-4 text-pink-500" />;
      case "Attraction":
        return <Landmark className="h-4 w-4 text-purple-500" />;
      case "Location":
        return <MapPin className="h-4 w-4 text-red-500" />;
      case "Transportation":
        return <Bus className="h-4 w-4 text-green-500" />;
      case "Activity":
        return <Navigation className="h-4 w-4 text-cyan-500" />;
      case "Time Section":
        return <Sun className="h-4 w-4 text-yellow-500" />;
      case "Break":
        return <Coffee className="h-4 w-4 text-brown-500" />;
      case "Narrative":
        return <Music className="h-4 w-4 text-teal-500" />;
      case "Experience":
        return <Ticket className="h-4 w-4 text-amber-500" />;
      case "Journey":
        return <Bot className="h-4 w-4 text-blue-600" />;
      default:
        return <Landmark className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, day: number) => {
    e.preventDefault();

    try {
      const moduleData = e.dataTransfer.getData("moduleData");
      if (!moduleData) {
        return;
      }

      const moduleInfo = JSON.parse(moduleData);

      // Add icon back based on type since it couldn't be serialized
      const newModule: ItineraryModule = {
        ...moduleInfo,
        id: `${moduleInfo.id}-${Date.now()}`,
        day,
        position: modules.filter((m) => m.day === day).length,
        time: "09:00",
        duration: 60,
        description: moduleInfo.description || "",
        location: "",
        price: 0,
        notes: "",
        images: [],
      };

      setModules((prev) => [...prev, newModule]);
      toast({
        title: "Module Added",
        description: `Added ${moduleInfo.title} to Day ${day}`,
      });
    } catch (err) {
      console.error("Failed to parse module data:", err);
      toast({
        title: "Error",
        description: "Failed to add module. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDelete = (moduleId: string) => {
    setModules((prev) => prev.filter((m) => m.id !== moduleId));
    setEditingModule(null);
    toast({
      title: "Module Removed",
      description: "Module has been removed from the itinerary",
    });
  };

  const handleEdit = (moduleId: string) => {
    setEditingModule(moduleId === editingModule ? null : moduleId);
  };

  const handleModuleUpdate = (
    moduleId: string,
    updates: Partial<ItineraryModule>
  ) => {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id === moduleId) {
          return { ...m, ...updates };
        }
        return m;
      })
    );
  };

  const handleDragStart = (e: React.DragEvent, moduleId: string) => {
    setDraggedModule(moduleId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleReorder = (e: React.DragEvent, targetModuleId: string) => {
    e.preventDefault();
    if (!draggedModule || draggedModule === targetModuleId) return;

    const draggedIndex = modules.findIndex((m) => m.id === draggedModule);
    const targetIndex = modules.findIndex((m) => m.id === targetModuleId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newModules = [...modules];
    const [draggedItem] = newModules.splice(draggedIndex, 1);
    newModules.splice(targetIndex, 0, draggedItem);

    // Update positions
    newModules.forEach((module, index) => {
      if (module.day === draggedItem.day) {
        module.position = index;
      }
    });

    setModules(newModules);
    setDraggedModule(null);
  };

  const handleSaveChanges = () => {
    // In a real application, this would save to a backend
    toast({
      title: "Changes Saved",
      description: "Your itinerary changes have been published successfully.",
    });
    if (onSaveChanges) onSaveChanges();
  };

  const calculateDayTotal = (day: number) => {
    return modules
      .filter((m) => m.day === day)
      .reduce((total, module) => total + (module.price || 0), 0);
  };

  const calculateTotalDuration = (day: number) => {
    return modules
      .filter((m) => m.day === day)
      .reduce((total, module) => total + (module.duration || 0), 0);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ""}`;
    }
    return `${mins}m`;
  };

  const ModuleEditForm = ({ module }: { module: ItineraryModule }) => (
    <Card className="mt-2">
      <CardContent className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`title-${module.id}`}>Title</Label>
            <Input
              id={`title-${module.id}`}
              value={module.title}
              onChange={(e) =>
                handleModuleUpdate(module.id, { title: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor={`time-${module.id}`}>Time</Label>
            <Input
              id={`time-${module.id}`}
              type="time"
              value={module.time || "09:00"}
              onChange={(e) =>
                handleModuleUpdate(module.id, { time: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor={`duration-${module.id}`}>Duration (minutes)</Label>
            <Input
              id={`duration-${module.id}`}
              type="number"
              value={module.duration || 60}
              onChange={(e) =>
                handleModuleUpdate(module.id, {
                  duration: parseInt(e.target.value) || 60,
                })
              }
            />
          </div>
          <div>
            <Label htmlFor={`price-${module.id}`}>Price ($)</Label>
            <Input
              id={`price-${module.id}`}
              type="number"
              step="0.01"
              value={module.price || 0}
              onChange={(e) =>
                handleModuleUpdate(module.id, {
                  price: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>
        </div>
        <div>
          <Label htmlFor={`location-${module.id}`}>Location</Label>
          <Input
            id={`location-${module.id}`}
            value={module.location || ""}
            onChange={(e) =>
              handleModuleUpdate(module.id, { location: e.target.value })
            }
            placeholder="Enter location"
          />
        </div>
        <div>
          <Label htmlFor={`description-${module.id}`}>Description</Label>
          <Textarea
            id={`description-${module.id}`}
            value={module.description || ""}
            onChange={(e) =>
              handleModuleUpdate(module.id, { description: e.target.value })
            }
            placeholder="Describe this activity..."
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor={`notes-${module.id}`}>Notes</Label>
          <Textarea
            id={`notes-${module.id}`}
            value={module.notes || ""}
            onChange={(e) =>
              handleModuleUpdate(module.id, { notes: e.target.value })
            }
            placeholder="Additional notes or requirements..."
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  );

  const PreviewMode = () => (
    <div className="space-y-6">
      {/* Itinerary Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{itinerary.title}</CardTitle>
              <p className="text-gray-600 mt-2">{itinerary.description}</p>
            </div>
            {itinerary.image && (
              <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                <Image
                  src={itinerary.image}
                  alt={itinerary.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {itinerary.days} days
            </Badge>
            {itinerary.price && (
              <Badge variant="outline" className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />${itinerary.price}{" "}
                {itinerary.currency || "USD"}
              </Badge>
            )}
            {itinerary.groupSize && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {itinerary.groupSize.min}-{itinerary.groupSize.max} people
              </Badge>
            )}
            {itinerary.difficulty && (
              <Badge variant="outline">{itinerary.difficulty}</Badge>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Day by Day Preview */}
      {dayTabs.map((day) => {
        const dayModules = modules
          .filter((module) => module.day === day)
          .sort((a, b) => (a.position || 0) - (b.position || 0));

        const dayTotal = calculateDayTotal(day);
        const totalDuration = calculateTotalDuration(day);

        return (
          <Card key={day}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">
                  Day {day}
                </CardTitle>
                <div className="flex gap-2">
                  {totalDuration > 0 && (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Clock className="h-3 w-3" />
                      {formatDuration(totalDuration)}
                    </Badge>
                  )}
                  {dayTotal > 0 && (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <DollarSign className="h-3 w-3" />${dayTotal}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {dayModules.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No activities planned for this day
                </p>
              ) : (
                <div className="space-y-4">
                  {dayModules.map((module, index) => (
                    <div
                      key={module.id}
                      className="flex gap-4 p-4 border rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        {getModuleIcon(module.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{module.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            {module.time && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {module.time}
                              </span>
                            )}
                            {module.duration && (
                              <span>({formatDuration(module.duration)})</span>
                            )}
                          </div>
                        </div>
                        {module.description && (
                          <p className="text-gray-600 mb-2">
                            {module.description}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                          {module.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {module.location}
                            </span>
                          )}
                          {module.price && module.price > 0 && (
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />${module.price}
                            </span>
                          )}
                        </div>
                        {module.notes && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                            <strong>Notes:</strong> {module.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h3 className="text-lg font-semibold">
            Travel Itinerary: {itinerary.title}
          </h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="border rounded-md overflow-hidden flex">
              <Button
                variant={viewMode === "edit" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("edit")}
                className="rounded-none"
              >
                Edit
              </Button>
              <Button
                variant={viewMode === "preview" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("preview")}
                className="rounded-none"
                aria-label="Preview"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            <Button size="sm" onClick={handleSaveChanges}>
              <Save className="h-4 w-4 mr-1" /> Save Changes
            </Button>
          </div>
        </div>
      </div>

      {viewMode === "preview" ? (
        <ScrollArea className="flex-1 p-4">
          <PreviewMode />
        </ScrollArea>
      ) : (
        <Tabs
          defaultValue={String(activeDay)}
          onValueChange={(value) => setActiveDay(Number(value))}
          className="flex-1"
        >
          <div className="border-b sticky top-0 bg-white z-10">
            <div className="overflow-x-auto">
              <TabsList className="mx-4 my-2 min-w-max">
                {dayTabs.map((day) => {
                  const dayModules = modules.filter((m) => m.day === day);
                  const dayTotal = calculateDayTotal(day);
                  return (
                    <TabsTrigger
                      key={day}
                      value={String(day)}
                      className="flex flex-col min-w-[80px]"
                    >
                      <span>
                        Day {day}
                      </span>
                      <div className="flex gap-1 text-xs">
                        <span>{dayModules.length} items</span>
                        {dayTotal > 0 && <span>${dayTotal}</span>}
                      </div>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
          </div>

          <ScrollArea className="flex-1">
            {dayTabs.map((day) => (
              <TabsContent key={day} value={String(day)} className="m-0 p-0">
                <div 
                  className="min-h-[400px] p-4 hover:bg-blue-50/50 transition-colors duration-200"
                  onDrop={(e) => handleDrop(e, day)}
                  onDragOver={handleDragOver}
                >
                  <div 
                    className={`border-2 border-dashed rounded-lg p-8 mb-4 text-center transition-all duration-200 ${
                      modules.filter((m) => m.day === day).length === 0
                        ? "bg-blue-50 border-blue-200 hover:bg-blue-100"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Plus className="h-8 w-8 text-gray-400" />
                      <p className="text-gray-600 font-medium">
                        {modules.filter((m) => m.day === day).length === 0
                          ? "Drag modules here to build your itinerary"
                          : "Drag more modules or rearrange existing ones"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Available modules: Accommodation, Meal, Attraction, Transportation, Activity, Photo, Break, Location
                      </p>
                    </div>
                  </div>

                  {modules
                    .filter((module) => module.day === day)
                    .sort((a, b) => (a.position || 0) - (b.position || 0))
                    .map((module) => (
                      <div
                        key={module.id}
                        className="border rounded-lg mb-4 overflow-hidden"
                        draggable
                        onDragStart={(e) => handleDragStart(e, module.id)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleReorder(e, module.id)}
                      >
                        <div className="bg-white p-3 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                            {getModuleIcon(module.type)}
                            <div>
                              <span className="font-medium">
                                {module.title}
                              </span>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                {module.time && (
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {module.time}
                                  </span>
                                )}
                                {module.duration && (
                                  <span>
                                    ({formatDuration(module.duration)})
                                  </span>
                                )}
                                {module.price && module.price > 0 && (
                                  <span className="flex items-center gap-1">
                                    <DollarSign className="h-3 w-3" />$
                                    {module.price}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(module.id)}
                            >
                              <Edit className="h-3 w-3 mr-1" />
                              {editingModule === module.id ? "Done" : "Edit"}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(module.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {editingModule === module.id && (
                          <ModuleEditForm module={module} />
                        )}

                        {editingModule !== module.id && (
                          <div className="px-3 pb-3">
                            {module.description && (
                              <p className="text-sm text-gray-600 mb-2">
                                {module.description}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                              {module.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {module.location}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </ScrollArea>
        </Tabs>
      )}
    </div>
  );
};

export default ItineraryPreview;
