
import React, { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar, 
  Grid3X3, 
  List, 
  MoreHorizontal, 
  Share2, 
  Copy, 
  Archive, 
  BarChart3,
  Globe,
  TrendingUp,
  Sparkles,
  Filter,
  Search
} from 'lucide-react';
import ItineraryCard from './ItineraryCard';
import ItineraryListCard from './ItineraryListCard';
import ItineraryCalendarView from './ItineraryCalendarView';
import { ItineraryType } from '@/data/itineraryData';
import { toast } from 'sonner';

interface ItineraryTabsProps {
  activeTab: string;
  itineraries: ItineraryType[];
  onCreateNewItinerary: () => void;
  onEditItinerary: (itinerary: ItineraryType) => void;
}

type ViewMode = 'card' | 'list' | 'calendar';

const ItineraryTabs: React.FC<ItineraryTabsProps> = ({
  activeTab,
  itineraries,
  onCreateNewItinerary,
  onEditItinerary,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [selectedItineraries, setSelectedItineraries] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Calculate completion percentage for each itinerary
  const getCompletionPercentage = (itinerary: ItineraryType) => {
    let completed = 0;
    let total = 4; // title, image, description, pricing

    if (itinerary.title && itinerary.title !== "New Itinerary") completed++;
    if (itinerary.image) completed++;
    if (itinerary.description && itinerary.description !== "Start building your cultural experience itinerary") completed++;
    if (itinerary.price) completed++;

    return Math.round((completed / total) * 100);
  };

  // Get trending/popular itineraries (mock data)
  const getTrendingItineraries = () => {
    return itineraries.filter((_, index) => index < 2); // First 2 are trending
  };

  const handleBulkSelect = (itineraryId: string) => {
    setSelectedItineraries(prev => 
      prev.includes(itineraryId) 
        ? prev.filter(id => id !== itineraryId)
        : [...prev, itineraryId]
    );
  };

  const handleSelectAll = () => {
    if (selectedItineraries.length === itineraries.length) {
      setSelectedItineraries([]);
    } else {
      setSelectedItineraries(itineraries.map(i => i.id));
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedItineraries.length === 0) {
      toast.error("Please select itineraries first");
      return;
    }

    switch (action) {
      case 'publish':
        toast.success(`Published ${selectedItineraries.length} itineraries`);
        break;
      case 'archive':
        toast.success(`Archived ${selectedItineraries.length} itineraries`);
        break;
      case 'duplicate':
        toast.success(`Duplicated ${selectedItineraries.length} itineraries`);
        break;
      case 'delete':
        toast.success(`Deleted ${selectedItineraries.length} itineraries`);
        break;
    }
    setSelectedItineraries([]);
  };

  const handleQuickAction = (itineraryId: string, action: string) => {
    const itinerary = itineraries.find(i => i.id === itineraryId);
    if (!itinerary) return;

    switch (action) {
      case 'duplicate':
        toast.success(`Duplicated "${itinerary.title}"`);
        break;
      case 'share':
        toast.success(`Share link copied for "${itinerary.title}"`);
        break;
      case 'archive':
        toast.success(`Archived "${itinerary.title}"`);
        break;
      case 'analytics':
        toast.success(`Opening analytics for "${itinerary.title}"`);
        break;
      case 'push-to-website':
        toast.success(`Pushed "${itinerary.title}" to website`);
        break;
    }
  };

  const trendingItineraries = getTrendingItineraries();

  return (
    <>
      <TabsContent value="itineraries" className="mt-6">
        {/* Header with view controls and bulk actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center border rounded-lg p-1 bg-white">
              <Button
                variant={viewMode === 'card' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('card')}
                className="h-8 px-3"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 px-3"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'calendar' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('calendar')}
                className="h-8 px-3"
              >
                <Calendar className="h-4 w-4" />
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search itineraries..."
                  className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-culturin-indigo"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedItineraries.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {selectedItineraries.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('publish')}
              >
                Publish
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('duplicate')}
              >
                <Copy className="h-4 w-4 mr-1" />
                Duplicate
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('archive')}
              >
                <Archive className="h-4 w-4 mr-1" />
                Archive
              </Button>
            </div>
          )}

          <Button 
            onClick={onCreateNewItinerary} 
            className="w-full sm:w-auto text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Create New Itinerary</span>
            <span className="sm:hidden">Create New</span>
          </Button>
        </div>

        {/* Trending Section */}
        {trendingItineraries.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-orange-500" />
              <h3 className="text-lg font-semibold">✨ Trending This Week</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trendingItineraries.map((itinerary) => (
                <div key={itinerary.id} className="relative">
                  <ItineraryCard
                    {...itinerary}
                    onEdit={() => onEditItinerary(itinerary)}
                    onQuickAction={handleQuickAction}
                    completionPercentage={getCompletionPercentage(itinerary)}
                    isTrending={true}
                  />
                  <Badge className="absolute top-2 left-2 bg-orange-500 text-white z-30">
                    Trending
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        {itineraries.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed mx-4 sm:mx-0">
            <h3 className="text-lg sm:text-xl font-medium mb-2">No Itineraries Yet</h3>
            <p className="text-gray-500 mb-6 text-sm sm:text-base px-4">Start creating your first itinerary</p>
            <Button 
              onClick={onCreateNewItinerary} 
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Create New Itinerary
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Bulk Select Header */}
            {viewMode === 'list' && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Checkbox
                  checked={selectedItineraries.length === itineraries.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm text-gray-600">
                  {selectedItineraries.length === itineraries.length ? 'Deselect All' : 'Select All'}
                </span>
              </div>
            )}

            {/* Content based on view mode */}
            {viewMode === 'card' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {itineraries.map((itinerary) => (
                  <div key={itinerary.id} className="relative">
                    <Checkbox
                      checked={selectedItineraries.includes(itinerary.id)}
                      onCheckedChange={() => handleBulkSelect(itinerary.id)}
                      className="absolute top-2 left-2 z-30 bg-white rounded"
                    />
                    <ItineraryCard
                      {...itinerary}
                      onEdit={() => onEditItinerary(itinerary)}
                      onQuickAction={handleQuickAction}
                      completionPercentage={getCompletionPercentage(itinerary)}
                    />
                  </div>
                ))}
              </div>
            )}

            {viewMode === 'list' && (
              <div className="space-y-3">
                {itineraries.map((itinerary) => (
                  <div key={itinerary.id} className="flex items-center gap-3">
                    <Checkbox
                      checked={selectedItineraries.includes(itinerary.id)}
                      onCheckedChange={() => handleBulkSelect(itinerary.id)}
                    />
                    <ItineraryListCard
                      {...itinerary}
                      onEdit={() => onEditItinerary(itinerary)}
                      onQuickAction={handleQuickAction}
                      completionPercentage={getCompletionPercentage(itinerary)}
                    />
                  </div>
                ))}
              </div>
            )}

            {viewMode === 'calendar' && (
              <ItineraryCalendarView
                itineraries={itineraries}
                onEditItinerary={onEditItinerary}
                onQuickAction={handleQuickAction}
              />
            )}
          </div>
        )}
      </TabsContent>
    </>
  );
};

export default ItineraryTabs;
