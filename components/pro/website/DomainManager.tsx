"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { 
  Globe, 
  Plus, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  ExternalLink,
  Copy,
  Trash2,
  Shield,
  Zap,
  Info
} from 'lucide-react';

const DomainManager: React.FC = () => {
  const [domains, setDomains] = useState([
    {
      id: '1',
      domain: 'barcelonaculturaltours.com',
      status: 'active',
      isPrimary: true,
      sslStatus: 'active',
      addedDate: '2024-01-15',
      expiryDate: '2025-01-15',
      dnsRecords: [
        { type: 'A', name: '@', value: '192.168.1.1', ttl: 3600, status: 'verified' },
        { type: 'CNAME', name: 'www', value: 'barcelonaculturaltours.com', ttl: 3600, status: 'verified' },
        { type: 'TXT', name: '@', value: 'v=spf1 include:_spf.culturin.com ~all', ttl: 3600, status: 'verified' }
      ]
    },
    {
      id: '2',
      domain: 'culturalbarcelona.com',
      status: 'pending',
      isPrimary: false,
      sslStatus: 'pending',
      addedDate: '2024-02-01',
      expiryDate: '2025-02-01',
      dnsRecords: [
        { type: 'A', name: '@', value: '192.168.1.1', ttl: 3600, status: 'pending' },
        { type: 'CNAME', name: 'www', value: 'culturalbarcelona.com', ttl: 3600, status: 'pending' }
      ]
    }
  ]);

  const [newDomain, setNewDomain] = useState('');
  const [isAddingDomain, setIsAddingDomain] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const { toast } = useToast();

  const handleAddDomain = async () => {
    if (!newDomain) return;

    setIsAddingDomain(true);
    
    // Simulate API call
    setTimeout(() => {
      const domain = {
        id: Date.now().toString(),
        domain: newDomain,
        status: 'pending',
        isPrimary: false,
        sslStatus: 'pending',
        addedDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        dnsRecords: [
          { type: 'A', name: '@', value: '192.168.1.1', ttl: 3600, status: 'pending' },
          { type: 'CNAME', name: 'www', value: newDomain, ttl: 3600, status: 'pending' }
        ]
      };

      setDomains([...domains, domain]);
      setNewDomain('');
      setIsAddingDomain(false);

      toast({
        title: "Domain Added",
        description: `${newDomain} has been added. Please configure DNS records to complete setup.`
      });
    }, 2000);
  };

  const handleSetPrimary = (domainId) => {
    setDomains(domains.map(d => ({
      ...d,
      isPrimary: d.id === domainId
    })));

    toast({
      title: "Primary Domain Updated",
      description: "Your primary domain has been changed successfully."
    });
  };

  const handleDeleteDomain = (domainId) => {
    const domain = domains.find(d => d.id === domainId);
    if (domain?.isPrimary) {
      toast({
        title: "Cannot Delete Primary Domain",
        description: "Please set another domain as primary before deleting this one.",
        variant: "destructive"
      });
      return;
    }

    setDomains(domains.filter(d => d.id !== domainId));
    toast({
      title: "Domain Deleted",
      description: "Domain has been removed from your account."
    });
  };

  const handleCopyDNSRecord = (record) => {
    navigator.clipboard.writeText(record.value);
    toast({
      title: "Copied to Clipboard",
      description: "DNS record value has been copied."
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'failed': return <AlertCircle className="h-4 w-4" />;
      case 'expired': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Domain Management</h2>
          <p className="text-gray-600">Manage your custom domains and DNS settings</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Domain
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Custom Domain</DialogTitle>
              <DialogDescription>
                Connect your own domain to your Culturin Pro website
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="domain">Domain Name</Label>
                <Input
                  id="domain"
                  placeholder="yourdomain.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                />
              </div>
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Make sure you have access to your domain's DNS settings. You'll need to configure DNS records after adding the domain.
                </AlertDescription>
              </Alert>
              <Button 
                onClick={handleAddDomain} 
                disabled={!newDomain || isAddingDomain}
                className="w-full"
              >
                {isAddingDomain ? 'Adding Domain...' : 'Add Domain'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Domain List */}
      <div className="grid gap-4">
        {domains.map((domain) => (
          <Card key={domain.id} className={domain.isPrimary ? 'border-blue-200 bg-blue-50/30' : ''}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-gray-500" />
                  <div>
                    <CardTitle className="text-lg">{domain.domain}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(domain.status)}>
                        {getStatusIcon(domain.status)}
                        <span className="ml-1">{domain.status}</span>
                      </Badge>
                      {domain.isPrimary && (
                        <Badge variant="outline">Primary</Badge>
                      )}
                      <Badge className={getStatusColor(domain.sslStatus)}>
                        <Shield className="h-3 w-3 mr-1" />
                        SSL {domain.sslStatus}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!domain.isPrimary && domain.status === 'active' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetPrimary(domain.id)}
                    >
                      Set as Primary
                    </Button>
                  )}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedDomain(domain)}
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>DNS Configuration - {domain.domain}</DialogTitle>
                        <DialogDescription>
                          Configure these DNS records with your domain provider
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Alert>
                          <Info className="h-4 w-4" />
                          <AlertDescription>
                            Add these DNS records to your domain provider's control panel. Changes may take up to 24 hours to propagate.
                          </AlertDescription>
                        </Alert>
                        <div className="space-y-3">
                          {domain.dnsRecords.map((record, index) => (
                            <div key={index} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{record.type}</Badge>
                                  <Badge className={getStatusColor(record.status)}>
                                    {getStatusIcon(record.status)}
                                    <span className="ml-1">{record.status}</span>
                                  </Badge>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCopyDNSRecord(record)}
                                >
                                  <Copy className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                  <Label className="text-xs text-gray-500">Name</Label>
                                  <p className="font-mono">{record.name}</p>
                                </div>
                                <div>
                                  <Label className="text-xs text-gray-500">Value</Label>
                                  <p className="font-mono break-all">{record.value}</p>
                                </div>
                                <div>
                                  <Label className="text-xs text-gray-500">TTL</Label>
                                  <p className="font-mono">{record.ttl}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {!domain.isPrimary && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteDomain(domain.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <Label className="text-gray-500">Added</Label>
                  <p>{new Date(domain.addedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Expires</Label>
                  <p>{new Date(domain.expiryDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-gray-500">DNS Records</Label>
                  <p>{domain.dnsRecords.filter(r => r.status === 'verified').length} of {domain.dnsRecords.length} verified</p>
                </div>
              </div>
              
              {domain.status === 'pending' && (
                <Alert className="mt-4">
                  <Clock className="h-4 w-4" />
                  <AlertDescription>
                    Domain verification is in progress. Please ensure DNS records are configured correctly.
                  </AlertDescription>
                </Alert>
              )}
              
              {domain.status === 'failed' && (
                <Alert className="mt-4" variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Domain verification failed. Please check your DNS records and try again.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Domain Setup Guide */}
      <Card>
        <CardHeader>
          <CardTitle>Domain Setup Guide</CardTitle>
          <CardDescription>Follow these steps to connect your custom domain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-0.5">
                <span className="text-xs font-bold px-1">1</span>
              </div>
              <div>
                <h4 className="font-medium">Add Your Domain</h4>
                <p className="text-sm text-gray-600">Click "Add Domain" and enter your domain name.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-0.5">
                <span className="text-xs font-bold px-1">2</span>
              </div>
              <div>
                <h4 className="font-medium">Configure DNS Records</h4>
                <p className="text-sm text-gray-600">Add the provided DNS records to your domain provider's control panel.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-0.5">
                <span className="text-xs font-bold px-1">3</span>
              </div>
              <div>
                <h4 className="font-medium">Wait for Verification</h4>
                <p className="text-sm text-gray-600">DNS changes can take up to 24 hours to propagate worldwide.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 rounded-full p-1 mt-0.5">
                <span className="text-xs font-bold px-1">4</span>
              </div>
              <div>
                <h4 className="font-medium">SSL Certificate</h4>
                <p className="text-sm text-gray-600">We'll automatically provision an SSL certificate once DNS is verified.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <ExternalLink className="h-4 w-4 mr-2" />
              Domain Registrar Guide
            </Button>
            <Button variant="outline" className="justify-start">
              <Zap className="h-4 w-4 mr-2" />
              DNS Propagation Checker
            </Button>
            <Button variant="outline" className="justify-start">
              <Shield className="h-4 w-4 mr-2" />
              SSL Certificate Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainManager;
