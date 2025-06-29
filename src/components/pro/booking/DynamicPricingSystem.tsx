'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Calendar, Users, TrendingUp, DollarSign, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface PricingRule {
  id: string;
  name: string;
  type: 'seasonal' | 'group' | 'early_bird' | 'last_minute';
  condition: string;
  adjustment: number;
  adjustmentType: 'percentage' | 'fixed';
  isActive: boolean;
}

interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
  symbol: string;
}

const DynamicPricingSystem = () => {
  const [basePricing, setBasePricing] = useState({
    basePrice: 100,
    baseCurrency: 'USD',
    minimumPrice: 50,
    maximumPrice: 500
  });

  const [pricingRules, setPricingRules] = useState<PricingRule[]>([
    {
      id: '1',
      name: 'Peak Season (Summer)',
      type: 'seasonal',
      condition: 'June-August',
      adjustment: 25,
      adjustmentType: 'percentage',
      isActive: true
    },
    {
      id: '2',
      name: 'Group Discount (5+ people)',
      type: 'group',
      condition: '5+ guests',
      adjustment: 15,
      adjustmentType: 'percentage',
      isActive: true
    },
    {
      id: '3',
      name: 'Early Bird (30+ days)',
      type: 'early_bird',
      condition: '30+ days advance',
      adjustment: 10,
      adjustmentType: 'percentage',
      isActive: true
    }
  ]);

  const [supportedCurrencies] = useState<CurrencyRate[]>([
    { code: 'USD', name: 'US Dollar', rate: 1.0, symbol: '$' },
    { code: 'EUR', name: 'Euro', rate: 0.85, symbol: '€' },
    { code: 'GBP', name: 'British Pound', rate: 0.73, symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', rate: 110.0, symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', rate: 1.25, symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', rate: 1.35, symbol: 'A$' },
    { code: 'MXN', name: 'Mexican Peso', rate: 20.0, symbol: '$' },
    { code: 'BRL', name: 'Brazilian Real', rate: 5.2, symbol: 'R$' }
  ]);

  const [newRule, setNewRule] = useState({
    name: '',
    type: 'seasonal' as const,
    condition: '',
    adjustment: 0,
    adjustmentType: 'percentage' as const
  });

  const calculatePrice = (currency: string, guestCount: number = 1, daysInAdvance: number = 0) => {
    let finalPrice = basePricing.basePrice;
    
    // Apply pricing rules
    pricingRules.forEach(rule => {
      if (!rule.isActive) return;
      
      let shouldApply = false;
      
      switch (rule.type) {
        case 'group':
          shouldApply = guestCount >= 5;
          break;
        case 'early_bird':
          shouldApply = daysInAdvance >= 30;
          break;
        case 'last_minute':
          shouldApply = daysInAdvance <= 7;
          break;
        case 'seasonal':
          // Simplified seasonal logic
          shouldApply = true;
          break;
      }
      
      if (shouldApply) {
        if (rule.adjustmentType === 'percentage') {
          finalPrice *= (1 + rule.adjustment / 100);
        } else {
          finalPrice += rule.adjustment;
        }
      }
    });
    
    // Apply currency conversion
    const currencyRate = supportedCurrencies.find(c => c.code === currency)?.rate || 1;
    finalPrice *= currencyRate;
    
    // Apply min/max constraints
    const minInCurrency = basePricing.minimumPrice * currencyRate;
    const maxInCurrency = basePricing.maximumPrice * currencyRate;
    
    finalPrice = Math.max(minInCurrency, Math.min(maxInCurrency, finalPrice));
    
    return Math.round(finalPrice * 100) / 100;
  };

  const addPricingRule = () => {
    if (!newRule.name || !newRule.condition) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const rule: PricingRule = {
      id: Date.now().toString(),
      ...newRule,
      isActive: true
    };
    
    setPricingRules([...pricingRules, rule]);
    setNewRule({
      name: '',
      type: 'seasonal',
      condition: '',
      adjustment: 0,
      adjustmentType: 'percentage'
    });
    
    toast.success('Pricing rule added successfully');
  };

  const removePricingRule = (id: string) => {
    setPricingRules(pricingRules.filter(rule => rule.id !== id));
    toast.success('Pricing rule removed');
  };

  const toggleRule = (id: string) => {
    setPricingRules(pricingRules.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
  };

  const getCurrencySymbol = (code: string) => {
    return supportedCurrencies.find(c => c.code === code)?.symbol || '$';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Dynamic Pricing System</h2>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          Multi-Currency Support
        </Badge>
      </div>

      <Tabs defaultValue="pricing" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pricing">Base Pricing</TabsTrigger>
          <TabsTrigger value="rules">Pricing Rules</TabsTrigger>
          <TabsTrigger value="currencies">Currencies</TabsTrigger>
          <TabsTrigger value="preview">Price Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Base Pricing Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="basePrice">Base Price</Label>
                  <Input
                    id="basePrice"
                    type="number"
                    value={basePricing.basePrice}
                    onChange={(e) => setBasePricing({
                      ...basePricing,
                      basePrice: Number(e.target.value)
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="baseCurrency">Base Currency</Label>
                  <Select
                    value={basePricing.baseCurrency}
                    onValueChange={(value) => setBasePricing({
                      ...basePricing,
                      baseCurrency: value
                    })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedCurrencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.symbol} {currency.code} - {currency.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minPrice">Minimum Price</Label>
                  <Input
                    id="minPrice"
                    type="number"
                    value={basePricing.minimumPrice}
                    onChange={(e) => setBasePricing({
                      ...basePricing,
                      minimumPrice: Number(e.target.value)
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="maxPrice">Maximum Price</Label>
                  <Input
                    id="maxPrice"
                    type="number"
                    value={basePricing.maximumPrice}
                    onChange={(e) => setBasePricing({
                      ...basePricing,
                      maximumPrice: Number(e.target.value)
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Pricing Rules Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add New Rule */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium mb-3">Add New Pricing Rule</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="ruleName">Rule Name</Label>
                    <Input
                      id="ruleName"
                      value={newRule.name}
                      onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                      placeholder="e.g., Summer Peak Season"
                    />
                  </div>
                  <div>
                    <Label htmlFor="ruleType">Rule Type</Label>
                    <Select
                      value={newRule.type}
                      onValueChange={(value: any) => setNewRule({ ...newRule, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="seasonal">Seasonal</SelectItem>
                        <SelectItem value="group">Group Size</SelectItem>
                        <SelectItem value="early_bird">Early Bird</SelectItem>
                        <SelectItem value="last_minute">Last Minute</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Input
                      id="condition"
                      value={newRule.condition}
                      onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
                      placeholder="e.g., June-August"
                    />
                  </div>
                  <div>
                    <Label htmlFor="adjustment">Adjustment</Label>
                    <Input
                      id="adjustment"
                      type="number"
                      value={newRule.adjustment}
                      onChange={(e) => setNewRule({ ...newRule, adjustment: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="adjustmentType">Type</Label>
                    <Select
                      value={newRule.adjustmentType}
                      onValueChange={(value: any) => setNewRule({ ...newRule, adjustmentType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage (%)</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={addPricingRule} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Pricing Rule
                </Button>
              </div>

              {/* Existing Rules */}
              <div className="space-y-3">
                {pricingRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium">{rule.name}</h4>
                        <Badge variant={rule.type === 'seasonal' ? 'default' : rule.type === 'group' ? 'secondary' : 'outline'}>
                          {rule.type}
                        </Badge>
                        {rule.isActive && <Badge variant="outline" className="bg-green-50 text-green-700">Active</Badge>}
                      </div>
                      <p className="text-sm text-gray-600">
                        {rule.condition} • {rule.adjustmentType === 'percentage' ? `${rule.adjustment}%` : `${getCurrencySymbol(basePricing.baseCurrency)}${rule.adjustment}`} adjustment
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={rule.isActive}
                        onCheckedChange={() => toggleRule(rule.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePricingRule(rule.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="currencies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Supported Currencies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportedCurrencies.map((currency) => (
                  <div key={currency.code} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{currency.symbol} {currency.code}</div>
                      <div className="text-sm text-gray-600">{currency.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Rate: {currency.rate}</div>
                      <div className="text-xs text-gray-500">vs {basePricing.baseCurrency}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Price Preview Across Scenarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Currency</th>
                      <th className="text-left p-3">Base Price</th>
                      <th className="text-left p-3">1 Guest</th>
                      <th className="text-left p-3">5 Guests</th>
                      <th className="text-left p-3">Early Bird</th>
                      <th className="text-left p-3">Last Minute</th>
                    </tr>
                  </thead>
                  <tbody>
                    {supportedCurrencies.slice(0, 6).map((currency) => (
                      <tr key={currency.code} className="border-b">
                        <td className="p-3 font-medium">{currency.symbol} {currency.code}</td>
                        <td className="p-3">{currency.symbol}{calculatePrice(currency.code, 1, 15).toFixed(2)}</td>
                        <td className="p-3">{currency.symbol}{calculatePrice(currency.code, 1, 15).toFixed(2)}</td>
                        <td className="p-3 text-green-600">{currency.symbol}{calculatePrice(currency.code, 5, 15).toFixed(2)}</td>
                        <td className="p-3 text-blue-600">{currency.symbol}{calculatePrice(currency.code, 1, 35).toFixed(2)}</td>
                        <td className="p-3 text-orange-600">{currency.symbol}{calculatePrice(currency.code, 1, 3).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DynamicPricingSystem;
