
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AnalyticsFilterProps {
  timeFrame: string;
  onTimeFrameChange: (value: string) => void;
}

const AnalyticsFilter: React.FC<AnalyticsFilterProps> = ({ timeFrame, onTimeFrameChange }) => {
  return (
    <div className="flex gap-3 items-center">
      <Select value={timeFrame} onValueChange={onTimeFrameChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Time period" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="7days">Last 7 days</SelectItem>
          <SelectItem value="30days">Last 30 days</SelectItem>
          <SelectItem value="90days">Last 90 days</SelectItem>
          <SelectItem value="year">This year</SelectItem>
          <SelectItem value="month">This month</SelectItem>
        </SelectContent>
      </Select>
      
      <Button variant="outline" size="sm">
        Export
      </Button>
    </div>
  );
};

export default AnalyticsFilter;
