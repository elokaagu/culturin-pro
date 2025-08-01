
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Filter } from 'lucide-react';

interface AnalyticsFilterProps {
  timeFrame: string;
  onTimeFrameChange: (value: string) => void;
  onExport?: () => void;
}

const AnalyticsFilter: React.FC<AnalyticsFilterProps> = ({ 
  timeFrame, 
  onTimeFrameChange, 
  onExport 
}) => {
  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      // Default export functionality
      const data = {
        timeFrame,
        exportDate: new Date().toISOString(),
        data: "Analytics data would be exported here"
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={timeFrame} onValueChange={onTimeFrameChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">This year</SelectItem>
              <SelectItem value="month">This month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={timeFrame === "7days" ? "default" : "outline"}
            size="sm"
            onClick={() => onTimeFrameChange("7days")}
            className="text-xs"
          >
            7 days
          </Button>
          <Button
            variant={timeFrame === "30days" ? "default" : "outline"}
            size="sm"
            onClick={() => onTimeFrameChange("30days")}
            className="text-xs"
          >
            30 days
          </Button>
          <Button
            variant={timeFrame === "90days" ? "default" : "outline"}
            size="sm"
            onClick={() => onTimeFrameChange("90days")}
            className="text-xs"
          >
            90 days
          </Button>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleExport}
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Export
      </Button>
    </div>
  );
};

export default AnalyticsFilter;
