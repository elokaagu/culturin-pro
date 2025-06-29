'use client'

import React, { useState } from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, UserPlus, Mail, MessageSquare, Star, Gift, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

// Sample guest data
const initialGuests = [
  { 
    id: 'c1', 
    name: 'Sofia Martinez', 
    email: 'sofia@example.com', 
    phone: '+1 555-123-4567', 
    lastInteraction: '2023-05-10', 
    status: 'Active',
    bookings: 3,
    totalSpent: '$785',
    notes: 'Interested in cultural tours with historical focus.',
    preferences: 'History, Architecture, Local Cuisine',
    loyaltyPoints: 350,
    birthday: '1985-08-15',
    anniversary: null,
    npsScore: 9
  },
  { 
    id: 'c2', 
    name: 'James Wilson', 
    email: 'james@example.com', 
    phone: '+1 555-987-6543', 
    lastInteraction: '2023-06-15', 
    status: 'Active',
    bookings: 1,
    totalSpent: '$250',
    notes: 'Prefers group experiences, looking for summer booking.',
    preferences: 'Group Tours, Photography',
    loyaltyPoints: 100,
    birthday: '1990-06-22',
    anniversary: '2018-09-30',
    npsScore: 8
  },
  { 
    id: 'c3', 
    name: 'Elena Petrova', 
    email: 'elena@example.com', 
    phone: '+1 555-456-7890', 
    lastInteraction: '2023-04-22', 
    status: 'Inactive',
    bookings: 2,
    totalSpent: '$520',
    notes: 'Follow up about the fall festival experience.',
    preferences: 'Cultural Festivals, Music',
    loyaltyPoints: 220,
    birthday: '1983-12-10',
    anniversary: null,
    npsScore: 7
  },
  { 
    id: 'c4', 
    name: 'Marcus Johnson', 
    email: 'marcus@example.com', 
    phone: '+1 555-789-0123', 
    lastInteraction: '2023-06-30', 
    status: 'Prospect',
    bookings: 0,
    totalSpent: '$0',
    notes: 'Referred by Sofia Martinez, interested in cooking classes.',
    preferences: 'Culinary, Workshops',
    loyaltyPoints: 0,
    birthday: '1988-03-15',
    anniversary: null,
    npsScore: null
  },
  { 
    id: 'c5', 
    name: 'Aisha Patel', 
    email: 'aisha@example.com', 
    phone: '+1 555-321-6540', 
    lastInteraction: '2023-07-05', 
    status: 'Active',
    bookings: 5,
    totalSpent: '$1,275',
    notes: 'VIP guest, prefers private experiences. Birthday in August.',
    preferences: 'Private Tours, Art, Wine Tasting',
    loyaltyPoints: 650,
    birthday: '1979-08-22',
    anniversary: '2005-04-18',
    npsScore: 10
  }
];

const GuestsTable = ({ guests, onViewGuest }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    guest.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search guests..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Guest
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Interaction</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Loyalty</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGuests.map((guest) => (
              <TableRow key={guest.id}>
                <TableCell className="font-medium">{guest.name}</TableCell>
                <TableCell>
                  <div>{guest.email}</div>
                  <div className="text-sm text-gray-500">{guest.phone}</div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    guest.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    guest.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {guest.status}
                  </span>
                </TableCell>
                <TableCell>{guest.lastInteraction}</TableCell>
                <TableCell>{guest.bookings}</TableCell>
                <TableCell>
                  {guest.loyaltyPoints > 0 ? (
                    <div className="flex items-center">
                      <Gift className="h-3 w-3 text-amber-500 mr-1" />
                      <span>{guest.loyaltyPoints} pts</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onViewGuest(guest)}>
                      <span className="sr-only">View details</span>
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <span className="sr-only">Email guest</span>
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <span className="sr-only">Message guest</span>
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const GuestDetails = ({ guest, onBack }) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState(guest.notes);

  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Guest notes have been updated successfully."
    });
  };

  const getNextMilestone = () => {
    if (!guest.birthday) return null;
    
    const today = new Date();
    const birthday = new Date(guest.birthday);
    
    // Set birthday to current year
    birthday.setFullYear(today.getFullYear());
    
    // If birthday already passed this year, get next year's
    if (birthday < today) {
      birthday.setFullYear(today.getFullYear() + 1);
    }
    
    // Calculate days until birthday - FIX: Convert to timestamp milliseconds before calculation
    const daysUntil = Math.ceil((birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      type: 'Birthday',
      date: birthday.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
      daysUntil
    };
  };
  
  const nextMilestone = getNextMilestone();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-medium">{guest.name}</h3>
          <p className="text-gray-500">{guest.email} • {guest.phone}</p>
        </div>
        <Button variant="outline" onClick={onBack}>Back to List</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Guest Status</h4>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                guest.status === 'Active' ? 'bg-green-100 text-green-800' : 
                guest.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                'bg-blue-100 text-blue-800'
              }`}>
                {guest.status}
              </span>
              <span className="text-2xl font-semibold">{guest.status}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Loyalty Points</h4>
            <div className="flex items-center">
              <Gift className="h-5 w-5 text-amber-500 mr-2" />
              <p className="text-2xl font-semibold">{guest.loyaltyPoints}</p>
            </div>
            {guest.loyaltyPoints >= 500 && (
              <Badge className="mt-2 bg-amber-100 text-amber-800 hover:bg-amber-200">VIP Status</Badge>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Total Spent</h4>
            <p className="text-2xl font-semibold">{guest.totalSpent}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium mb-2">Guest Preferences</h4>
            <div className="flex flex-wrap gap-2">
              {guest.preferences?.split(', ').map((pref, i) => (
                <Badge key={i} variant="outline" className="bg-blue-50">{pref}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h4 className="font-medium mb-2">Important Dates</h4>
            <div className="space-y-3">
              {guest.birthday && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                    <span>Birthday: {new Date(guest.birthday).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  {nextMilestone && (
                    <Badge className={nextMilestone.daysUntil < 30 ? "bg-amber-100 text-amber-800" : ""}>
                      In {nextMilestone.daysUntil} days
                    </Badge>
                  )}
                </div>
              )}
              
              {guest.anniversary && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-rose-600" />
                  <span>Anniversary: {new Date(guest.anniversary).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              )}
              
              {!guest.birthday && !guest.anniversary && (
                <p className="text-gray-500">No important dates recorded</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Guest Notes</h4>
            {guest.npsScore && (
              <div className="flex items-center bg-gray-100 px-2 py-1 rounded-md">
                <Star className="h-4 w-4 text-amber-500 mr-1" />
                <span className="text-sm font-medium">NPS Score: {guest.npsScore}/10</span>
              </div>
            )}
          </div>
          <div className="space-y-4">
            <textarea
              className="w-full min-h-[100px] p-2 border rounded-md"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
            <Button onClick={handleSaveNotes}>Save Notes</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h4 className="font-medium">Travel History</h4>
        {guest.bookings > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guest.bookings >= 1 && (
                <TableRow>
                  <TableCell>2023-06-15</TableCell>
                  <TableCell>Cultural Heritage Tour</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>$250</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[1,2,3,4,5].map(star => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${star <= 5 ? "text-amber-500" : "text-gray-300"}`} 
                          fill={star <= 5 ? "currentColor" : "none"} 
                        />
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {guest.bookings >= 2 && (
                <TableRow>
                  <TableCell>2023-05-22</TableCell>
                  <TableCell>Local Food Experience</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>$270</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[1,2,3,4,5].map(star => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${star <= 4 ? "text-amber-500" : "text-gray-300"}`} 
                          fill={star <= 4 ? "currentColor" : "none"} 
                        />
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {guest.bookings >= 3 && (
                <TableRow>
                  <TableCell>2023-04-10</TableCell>
                  <TableCell>Artisan Workshop</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>$265</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[1,2,3,4,5].map(star => (
                        <Star 
                          key={star} 
                          className={`h-4 w-4 ${star <= 5 ? "text-amber-500" : "text-gray-300"}`} 
                          fill={star <= 5 ? "currentColor" : "none"} 
                        />
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <p className="text-gray-500">No bookings yet</p>
        )}
      </div>
      
      <div className="pt-4 border-t">
        <h4 className="font-medium mb-3">Guest Engagement</h4>
        <div className="space-x-2">
          <Button variant="outline" className="bg-blue-50">
            <Mail className="h-4 w-4 mr-2" />
            Send Email
          </Button>
          <Button variant="outline" className="bg-blue-50">
            <Gift className="h-4 w-4 mr-2" />
            Send Loyalty Offer
          </Button>
          <Button variant="outline" className="bg-blue-50">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Follow-up
          </Button>
        </div>
      </div>
    </div>
  );
};

const ProCRMPage = () => {
  const [activeTab, setActiveTab] = useState('all-clients');
  const [guests, setGuests] = useState(initialGuests);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const { toast } = useToast();

  const handleViewGuest = (guest) => {
    setSelectedGuest(guest);
  };

  const handleBackToList = () => {
    setSelectedGuest(null);
  };

  return (
    <ProDashboardLayout
      title="Guest CRM"
      subtitle="Connect every journey to the next"
    >
      {selectedGuest ? (
        <GuestDetails guest={selectedGuest} onBack={handleBackToList} />
      ) : (
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="all-clients">All Guests</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="prospects">Prospects</TabsTrigger>
            <TabsTrigger value="vip">VIP</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-clients">
            <Card>
              <CardContent className="pt-6">
                <GuestsTable 
                  guests={guests} 
                  onViewGuest={handleViewGuest} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="active">
            <Card>
              <CardContent className="pt-6">
                <GuestsTable 
                  guests={guests.filter(c => c.status === 'Active')} 
                  onViewGuest={handleViewGuest} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactive">
            <Card>
              <CardContent className="pt-6">
                <GuestsTable 
                  guests={guests.filter(c => c.status === 'Inactive')} 
                  onViewGuest={handleViewGuest} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="prospects">
            <Card>
              <CardContent className="pt-6">
                <GuestsTable 
                  guests={guests.filter(c => c.status === 'Prospect')} 
                  onViewGuest={handleViewGuest} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vip">
            <Card>
              <CardContent className="pt-6">
                <GuestsTable 
                  guests={guests.filter(c => c.loyaltyPoints >= 500)} 
                  onViewGuest={handleViewGuest} 
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
      
      {/* Lifecycle Automation Banner */}
      {!selectedGuest && (
        <Card className="mt-6 border-blue-100 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium text-blue-900">Lifecycle Automation</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Set up automations to nurture your guest relationships throughout their journey.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="bg-white border-blue-200">
                  <Calendar className="h-4 w-4 mr-2" />
                  Birthday Reminders
                </Button>
                <Button size="sm" variant="outline" className="bg-white border-blue-200">
                  <Star className="h-4 w-4 mr-2" />
                  Review Requests
                </Button>
                <Button size="sm" variant="outline" className="bg-white border-blue-200">
                  <Gift className="h-4 w-4 mr-2" />
                  Loyalty Campaigns
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </ProDashboardLayout>
  );
};

export default ProCRMPage;
