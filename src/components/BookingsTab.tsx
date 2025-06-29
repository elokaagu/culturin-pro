'use client'

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, CreditCard, Edit, FileText } from 'lucide-react';

const BookingsTab = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample booking data
  const bookings = [
    { 
      id: 'BK-1001', 
      guest: 'Emma Thompson', 
      experience: 'Cultural Heritage Walk', 
      date: '2025-05-24', 
      amount: '£95.00',
      status: 'confirmed',
      guests: 2,
      addOns: ['Tea Ceremony', 'Local Market Tour']
    },
    { 
      id: 'BK-1002', 
      guest: 'Michael Chen', 
      experience: 'Food & Culinary Tour', 
      date: '2025-05-26', 
      amount: '£120.00',
      status: 'pending',
      guests: 4,
      addOns: ['Cooking Class']
    },
    { 
      id: 'BK-1003', 
      guest: 'Sarah Johnson', 
      experience: 'Artisan Workshop Visit', 
      date: '2025-05-29', 
      amount: '£75.00',
      status: 'completed',
      guests: 1,
      addOns: []
    },
    { 
      id: 'BK-1004', 
      guest: 'David Rodriguez', 
      experience: 'Sunset Cultural Tour', 
      date: '2025-05-31', 
      amount: '£85.00',
      status: 'confirmed',
      guests: 3,
      addOns: ['Traditional Dance Performance']
    },
    { 
      id: 'BK-1005', 
      guest: 'Aisha Patel', 
      experience: 'Heritage Site Tour', 
      date: '2025-06-02', 
      amount: '£110.00',
      status: 'cancelled',
      guests: 2,
      addOns: []
    }
  ];
  
  const filteredBookings = bookings.filter(booking => {
    // Filter by status
    if (filter !== 'all' && booking.status !== filter) return false;
    
    // Filter by search query
    if (searchQuery && !booking.guest.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !booking.experience.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !booking.id.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex-1 w-full sm:max-w-xs">
          <Input 
            placeholder="Search bookings..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All bookings</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="whitespace-nowrap">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No bookings found</p>
          </div>
        ) : (
          filteredBookings.map(booking => (
            <Card key={booking.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-4 bg-white">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div>
                        <h3 className="font-medium">{booking.experience}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(booking.date).toLocaleDateString('en-GB', { 
                            day: 'numeric',
                            month: 'short', 
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getStatusBadge(booking.status)}
                        <span className="text-sm text-gray-500">
                          {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <div className="text-right">
                        <div className="font-medium">{booking.guest}</div>
                        <div className="text-sm text-gray-500">{booking.id}</div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {booking.addOns.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Add-ons:</span>
                        <div className="flex flex-wrap gap-2">
                          {booking.addOns.map((addon, i) => (
                            <Badge key={i} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                              {addon}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingsTab;
