import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Clock,
  MapPin
} from "lucide-react";
import { ExperienceType } from "@/data/experienceData";

interface ExperienceCalendarViewProps {
  experiences: ExperienceType[];
  onEditItinerary: (experience: ExperienceType) => void;
  onQuickAction: (itineraryId: string, action: string) => void;
}

const ExperienceCalendarView: React.FC<ExperienceCalendarViewProps> = ({
  experiences,
  onEditItinerary,
  onQuickAction,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const firstDayIndex = firstDayOfMonth.getDay();

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push({ day: null, experiences: [] });
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayItineraries = experiences.filter(experience => {
        // Mock logic: assign experiences to random days
        return experience.id.charCodeAt(0) % daysInMonth === day - 1;
      });
      days.push({ day, date, experiences: dayItineraries });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500';
      case 'draft':
        return 'bg-yellow-500';
      case 'archived':
        return 'bg-gray-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            {monthNames[currentMonth]} {currentYear}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousMonth}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextMonth}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day Headers */}
          {dayNames.map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-gray-500 bg-gray-50 rounded"
            >
              {day}
            </div>
          ))}
          
          {/* Calendar Days */}
          {calendarDays.map((dayData, index) => (
            <div
              key={index}
              className={`min-h-[120px] p-2 border border-gray-200 ${
                dayData.day ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              {dayData.day && (
                <>
                  <div className="text-sm font-medium text-gray-900 mb-2">
                    {dayData.day}
                  </div>
                  
                  {/* Experiences for this day */}
                  <div className="space-y-1">
                    {dayData.experiences.slice(0, 2).map((experience) => (
                      <div
                        key={experience.id}
                        className="p-2 bg-blue-50 border border-blue-200 rounded text-xs cursor-pointer hover:bg-blue-100 transition-colors"
                        onClick={() => onEditItinerary(experience)}
                      >
                        <div className="font-medium text-blue-900 truncate">
                          {experience.title}
                        </div>
                        <div className="flex items-center gap-1 text-blue-700">
                          <Clock className="h-2 w-2" />
                          {experience.days}d
                        </div>
                        <Badge
                          className={`${getStatusColor(experience.status)} text-white text-xs mt-1`}
                        >
                          {experience.status}
                        </Badge>
                      </div>
                    ))}
                    
                    {dayData.experiences.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{dayData.experiences.length - 2} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Legend</h4>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Published</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Draft</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded"></div>
              <span>Archived</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceCalendarView; 