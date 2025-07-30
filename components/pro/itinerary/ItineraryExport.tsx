import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Download,
  Share2,
  FileText,
  Image,
  Mail,
  Link,
  Printer,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import { ItineraryType, ItineraryModule } from "@/data/itineraryData";

interface ItineraryExportProps {
  itinerary: ItineraryType & {
    price?: number;
    currency?: string;
    groupSize?: { min: number; max: number };
    difficulty?: string;
  };
  modules: ItineraryModule[];
}

const ItineraryExport: React.FC<ItineraryExportProps> = ({
  itinerary,
  modules,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? `${mins}m` : ""}`;
    }
    return `${mins}m`;
  };

  const calculateDayTotal = (day: number) => {
    return modules
      .filter((m) => m.day === day)
      .reduce((total, module) => total + (module.price || 0), 0);
  };

  const generateShareUrl = () => {
    // In a real app, this would generate a proper shareable URL
    const url = `${window.location.origin}/itinerary/shared/${itinerary.id}`;
    setShareUrl(url);
    return url;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied to clipboard",
        description: "Share link has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const exportToPDF = async () => {
    setIsExporting(true);

    // Simulate PDF generation
    setTimeout(() => {
      // In a real app, this would generate and download a PDF
      const element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," +
          encodeURIComponent(generateTextVersion())
      );
      element.setAttribute(
        "download",
        `${itinerary.title.replace(/\s+/g, "_")}_itinerary.txt`
      );
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setIsExporting(false);
      toast({
        title: "Export Complete",
        description: "Your itinerary has been exported successfully.",
      });
    }, 2000);
  };

  const exportToCalendar = () => {
    // Generate iCal format
    let icalContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:Culturin Pro
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:${itinerary.title}
X-WR-CALDESC:${itinerary.description}
BEGIN:VTIMEZONE
TZID:UTC
END:VTIMEZONE
`;

    modules.forEach((module, index) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + module.day - 1);

      if (module.time) {
        const [hours, minutes] = module.time.split(":");
        startDate.setHours(parseInt(hours), parseInt(minutes));
      }

      const endDate = new Date(startDate);
      endDate.setMinutes(endDate.getMinutes() + (module.duration || 60));

      const formatDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
      };

      icalContent += `BEGIN:VEVENT
UID:${module.id}@culturin.com
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${module.title}
DESCRIPTION:${module.description || ""}
LOCATION:${module.location || ""}
END:VEVENT
`;
    });

    icalContent += "END:VCALENDAR";

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/calendar;charset=utf-8," + encodeURIComponent(icalContent)
    );
    element.setAttribute(
      "download",
      `${itinerary.title.replace(/\s+/g, "_")}_calendar.ics`
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Calendar Export",
      description:
        "Calendar file has been downloaded. Import it to your calendar app.",
    });
  };

  const generateTextVersion = () => {
    let content = `${itinerary.title}\n${"=".repeat(
      itinerary.title.length
    )}\n\n`;
    content += `${itinerary.description}\n\n`;

    if (itinerary.price) {
      content += `Price: $${itinerary.price} ${itinerary.currency || "USD"}\n`;
    }
    if (itinerary.groupSize) {
      content += `Group Size: ${itinerary.groupSize.min}-${itinerary.groupSize.max} people\n`;
    }
    if (itinerary.difficulty) {
      content += `Difficulty: ${itinerary.difficulty}\n`;
    }
    content += `Duration: ${itinerary.days} days\n\n`;

    for (let day = 1; day <= itinerary.days; day++) {
      const dayModules = modules
        .filter((m) => m.day === day)
        .sort((a, b) => (a.position || 0) - (b.position || 0));

      const dayTotal = calculateDayTotal(day);

      content += `Day ${day}\n${"-".repeat(6)}\n`;

      if (dayTotal > 0) {
        content += `Daily Cost: $${dayTotal}\n`;
      }

      dayModules.forEach((module, index) => {
        content += `\n${index + 1}. ${module.title}`;
        if (module.time) content += ` (${module.time})`;
        if (module.duration) content += ` - ${formatDuration(module.duration)}`;
        content += "\n";

        if (module.description) content += `   ${module.description}\n`;
        if (module.location) content += `   📍 ${module.location}\n`;
        if (module.price && module.price > 0)
          content += `   💰 $${module.price}\n`;
        if (module.notes) content += `   📝 ${module.notes}\n`;
      });

      content += "\n";
    }

    return content;
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Itinerary: ${itinerary.title}`);
    const body = encodeURIComponent(
      `Check out this amazing itinerary I created:\n\n${generateShareUrl()}\n\n${generateTextVersion()}`
    );
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  const printItinerary = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${itinerary.title} - Itinerary</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
              .day { margin-bottom: 30px; }
              .day-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
              .activity { margin-bottom: 15px; padding: 10px; border-left: 3px solid #007bff; }
              .activity-title { font-weight: bold; }
              .activity-details { color: #666; font-size: 14px; }
              .meta { display: flex; gap: 20px; margin-bottom: 20px; }
              .meta span { padding: 5px 10px; background: #f5f5f5; border-radius: 3px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${itinerary.title}</h1>
              <p>${itinerary.description}</p>
              <div class="meta">
                ${
                  itinerary.price
                    ? `<span>$${itinerary.price} ${
                        itinerary.currency || "USD"
                      }</span>`
                    : ""
                }
                ${
                  itinerary.groupSize
                    ? `<span>${itinerary.groupSize.min}-${itinerary.groupSize.max} people</span>`
                    : ""
                }
                <span>${itinerary.days} days</span>
                ${
                  itinerary.difficulty
                    ? `<span>${itinerary.difficulty}</span>`
                    : ""
                }
              </div>
            </div>
            ${Array.from({ length: itinerary.days }, (_, i) => i + 1)
              .map((day) => {
                const dayModules = modules
                  .filter((m) => m.day === day)
                  .sort((a, b) => (a.position || 0) - (b.position || 0));

                return `
                <div class="day">
                  <div class="day-title">Day ${day}</div>
                  ${dayModules
                    .map(
                      (module) => `
                    <div class="activity">
                      <div class="activity-title">${module.title}</div>
                      <div class="activity-details">
                        ${module.time ? `⏰ ${module.time}` : ""} 
                        ${
                          module.duration
                            ? `(${formatDuration(module.duration)})`
                            : ""
                        }
                        ${module.location ? `📍 ${module.location}` : ""}
                        ${
                          module.price && module.price > 0
                            ? `💰 $${module.price}`
                            : ""
                        }
                      </div>
                      ${
                        module.description ? `<p>${module.description}</p>` : ""
                      }
                      ${
                        module.notes
                          ? `<p><strong>Notes:</strong> ${module.notes}</p>`
                          : ""
                      }
                    </div>
                  `
                    )
                    .join("")}
                </div>
              `;
              })
              .join("")}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Export & Share
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="export" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="export">Export Options</TabsTrigger>
              <TabsTrigger value="share">Share & Collaborate</TabsTrigger>
            </TabsList>

            <TabsContent value="export" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={exportToPDF}
                  disabled={isExporting}
                  className="flex items-center gap-2 h-auto p-4 flex-col"
                  variant="outline"
                >
                  <FileText className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium">PDF Export</div>
                    <div className="text-xs text-gray-500">
                      Professional format
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={exportToCalendar}
                  className="flex items-center gap-2 h-auto p-4 flex-col"
                  variant="outline"
                >
                  <Calendar className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium">Calendar (.ics)</div>
                    <div className="text-xs text-gray-500">
                      Import to calendar apps
                    </div>
                  </div>
                </Button>

                <Button
                  onClick={printItinerary}
                  className="flex items-center gap-2 h-auto p-4 flex-col"
                  variant="outline"
                >
                  <Printer className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium">Print Version</div>
                    <div className="text-xs text-gray-500">Physical copy</div>
                  </div>
                </Button>

                <Button
                  onClick={() => {
                    const text = generateTextVersion();
                    copyToClipboard(text);
                  }}
                  className="flex items-center gap-2 h-auto p-4 flex-col"
                  variant="outline"
                >
                  <Copy className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium">Copy Text</div>
                    <div className="text-xs text-gray-500">
                      Plain text format
                    </div>
                  </div>
                </Button>
              </div>

              {isExporting && (
                <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                  <span className="text-blue-700">Generating export...</span>
                </div>
              )}
            </TabsContent>

            <TabsContent value="share" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Shareable Link</label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      value={shareUrl || generateShareUrl()}
                      readOnly
                      className="flex-1 px-3 py-2 border rounded-md bg-gray-50 text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={() =>
                        copyToClipboard(shareUrl || generateShareUrl())
                      }
                      className="flex items-center gap-1"
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      {copied ? "Copied" : "Copy"}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Anyone with this link can view the itinerary
                  </p>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button
                    onClick={shareViaEmail}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Share via Email
                  </Button>

                  <Button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: itinerary.title,
                          text: itinerary.description,
                          url: shareUrl || generateShareUrl(),
                        });
                      } else {
                        copyToClipboard(shareUrl || generateShareUrl());
                      }
                    }}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Native Share
                  </Button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Share Preview</h4>
                  <div className="border rounded-lg p-3 bg-white">
                    <div className="flex items-start gap-3">
                      {itinerary.image && (
                        <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0"></div>
                      )}
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">
                          {itinerary.title}
                        </h5>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {itinerary.description}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {itinerary.days} days
                          </Badge>
                          {itinerary.price && (
                            <Badge variant="outline" className="text-xs">
                              ${itinerary.price}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ItineraryExport;
