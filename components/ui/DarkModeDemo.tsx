"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "./button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";

export function DarkModeDemo() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dark Mode Color Scheme Demo</h2>
        <Button onClick={toggleTheme} variant="outline">
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Background Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Background Colors</CardTitle>
            <CardDescription>Main background variations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-16 bg-background border rounded-lg flex items-center justify-center">
              <span className="text-foreground font-medium">Main Background</span>
            </div>
            <div className="h-16 bg-card border rounded-lg flex items-center justify-center">
              <span className="text-card-foreground font-medium">Card Background</span>
            </div>
            <div className="h-16 bg-muted border rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground font-medium">Muted Background</span>
            </div>
          </CardContent>
        </Card>

        {/* Text Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Text Colors</CardTitle>
            <CardDescription>Text color hierarchy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-background rounded-lg">
              <p className="text-foreground font-semibold">Primary Text</p>
              <p className="text-muted-foreground">Secondary Text</p>
              <p className="text-muted-foreground/70">Muted Text</p>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Elements</CardTitle>
            <CardDescription>Buttons and actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full">Primary Action</Button>
            <Button variant="secondary" className="w-full">Secondary Action</Button>
            <Button variant="outline" className="w-full">Outline Button</Button>
          </CardContent>
        </Card>

        {/* Borders and Dividers */}
        <Card>
          <CardHeader>
            <CardTitle>Borders & Dividers</CardTitle>
            <CardDescription>Border color system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-16 border-2 border-border rounded-lg flex items-center justify-center">
              <span className="text-foreground font-medium">Main Border</span>
            </div>
            <div className="h-16 border-2 border-input rounded-lg flex items-center justify-center">
              <span className="text-foreground font-medium">Input Border</span>
            </div>
          </CardContent>
        </Card>

        {/* Glass Effects */}
        <Card>
          <CardHeader>
            <CardTitle>Glass Effects</CardTitle>
            <CardDescription>Glass morphism components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-16 glass-base rounded-lg flex items-center justify-center">
              <span className="text-foreground font-medium">Glass Base</span>
            </div>
            <div className="h-16 glass-card rounded-lg flex items-center justify-center">
              <span className="text-foreground font-medium">Glass Card</span>
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
            <CardDescription>Available color options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="h-8 bg-primary rounded"></div>
              <div className="h-8 bg-secondary rounded"></div>
              <div className="h-8 bg-accent rounded"></div>
              <div className="h-8 bg-destructive rounded"></div>
              <div className="h-8 bg-muted rounded"></div>
              <div className="h-8 bg-popover rounded"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Instructions */}
      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
          <CardDescription>Available CSS classes and utilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Background Classes:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>bg-background</code> - Main background</li>
                <li><code>bg-card</code> - Card background</li>
                <li><code>bg-muted</code> - Muted background</li>
                <li><code>bg-sidebar</code> - Sidebar background</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Text Classes:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><code>text-foreground</code> - Primary text</li>
                <li><code>text-muted-foreground</code> - Secondary text</li>
                <li><code>text-card-foreground</code> - Card text</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
