
import React, { useState } from 'react';
import ProDashboardLayout from '@/components/pro/ProDashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, UserPlus, Mail, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Sample client data
const initialClients = [
  { 
    id: 'c1', 
    name: 'Sofia Martinez', 
    email: 'sofia@example.com', 
    phone: '+1 555-123-4567', 
    lastInteraction: '2023-05-10', 
    status: 'Active',
    bookings: 3,
    totalSpent: '$785',
    notes: 'Interested in cultural tours with historical focus.'
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
    notes: 'Prefers group experiences, looking for summer booking.'
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
    notes: 'Follow up about the fall festival experience.'
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
    notes: 'Referred by Sofia Martinez, interested in cooking classes.'
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
    notes: 'VIP client, prefers private experiences. Birthday in August.'
  }
];

const ClientsTable = ({ clients, onViewClient }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input 
            placeholder="Search clients..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Client
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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>
                  <div>{client.email}</div>
                  <div className="text-sm text-gray-500">{client.phone}</div>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    client.status === 'Active' ? 'bg-green-100 text-green-800' : 
                    client.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {client.status}
                  </span>
                </TableCell>
                <TableCell>{client.lastInteraction}</TableCell>
                <TableCell>{client.bookings}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => onViewClient(client)}>
                      <span className="sr-only">View details</span>
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <span className="sr-only">Email client</span>
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <span className="sr-only">Message client</span>
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

const ClientDetails = ({ client, onBack }) => {
  const { toast } = useToast();
  const [notes, setNotes] = useState(client.notes);

  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Client notes have been updated successfully."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-medium">{client.name}</h3>
          <p className="text-gray-500">{client.email} • {client.phone}</p>
        </div>
        <Button variant="outline" onClick={onBack}>Back to List</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Client Status</h4>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                client.status === 'Active' ? 'bg-green-100 text-green-800' : 
                client.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 
                'bg-blue-100 text-blue-800'
              }`}>
                {client.status}
              </span>
              <span className="text-2xl font-semibold">{client.status}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Total Bookings</h4>
            <p className="text-2xl font-semibold">{client.bookings}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Total Spent</h4>
            <p className="text-2xl font-semibold">{client.totalSpent}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h4 className="font-medium mb-2">Client Notes</h4>
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
        <h4 className="font-medium">Recent Bookings</h4>
        {client.bookings > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {client.bookings >= 1 && (
                <TableRow>
                  <TableCell>2023-06-15</TableCell>
                  <TableCell>Cultural Heritage Tour</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>$250</TableCell>
                </TableRow>
              )}
              {client.bookings >= 2 && (
                <TableRow>
                  <TableCell>2023-05-22</TableCell>
                  <TableCell>Local Food Experience</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>$270</TableCell>
                </TableRow>
              )}
              {client.bookings >= 3 && (
                <TableRow>
                  <TableCell>2023-04-10</TableCell>
                  <TableCell>Artisan Workshop</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell>$265</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <p className="text-gray-500">No bookings yet</p>
        )}
      </div>
    </div>
  );
};

const ProCRMPage = () => {
  const [activeTab, setActiveTab] = useState('all-clients');
  const [clients, setClients] = useState(initialClients);
  const [selectedClient, setSelectedClient] = useState(null);
  const { toast } = useToast();

  const handleViewClient = (client) => {
    setSelectedClient(client);
  };

  const handleBackToList = () => {
    setSelectedClient(null);
  };

  return (
    <ProDashboardLayout
      title="Client CRM"
      subtitle="Manage your customer relationships"
    >
      {selectedClient ? (
        <ClientDetails client={selectedClient} onBack={handleBackToList} />
      ) : (
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="all-clients">All Clients</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="prospects">Prospects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-clients">
            <Card>
              <CardContent className="pt-6">
                <ClientsTable 
                  clients={clients} 
                  onViewClient={handleViewClient} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="active">
            <Card>
              <CardContent className="pt-6">
                <ClientsTable 
                  clients={clients.filter(c => c.status === 'Active')} 
                  onViewClient={handleViewClient} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactive">
            <Card>
              <CardContent className="pt-6">
                <ClientsTable 
                  clients={clients.filter(c => c.status === 'Inactive')} 
                  onViewClient={handleViewClient} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="prospects">
            <Card>
              <CardContent className="pt-6">
                <ClientsTable 
                  clients={clients.filter(c => c.status === 'Prospect')} 
                  onViewClient={handleViewClient} 
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </ProDashboardLayout>
  );
};

export default ProCRMPage;
