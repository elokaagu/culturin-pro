import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Image as ImageIcon, 
  Video, 
  File, 
  Search, 
  Grid3X3, 
  List,
  Trash2,
  Copy,
  Download,
  Eye
} from "lucide-react";
import { toast } from "sonner";

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  size: string;
  uploadedAt: string;
  tags: string[];
  alt?: string;
}

const MediaLibrary: React.FC = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: '1',
      name: 'mountain-adventure.jpg',
      type: 'image',
      url: '/lovable-uploads/2e9a9e9e-af76-4913-8148-9fce248d55c9.png',
      size: '2.4 MB',
      uploadedAt: '2024-01-15',
      tags: ['adventure', 'mountains', 'nature'],
      alt: 'Mountain adventure scene'
    },
    {
      id: '2',
      name: 'cultural-workshop.jpg',
      type: 'image',
      url: '/lovable-uploads/1a12120c-6cfd-4fe3-9571-0ea00be99ff3.png',
      size: '1.8 MB',
      uploadedAt: '2024-01-14',
      tags: ['cultural', 'workshop', 'local'],
      alt: 'Cultural workshop with local artisans'
    },
    {
      id: '3',
      name: 'city-tour-guide.jpg',
      type: 'image',
      url: '/lovable-uploads/31055680-5e98-433a-a30a-747997259663.png',
      size: '3.1 MB',
      uploadedAt: '2024-01-13',
      tags: ['city', 'guide', 'urban'],
      alt: 'Professional tour guide in city setting'
    }
  ]);
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      const newItems: MediaItem[] = Array.from(files).map((file, index) => ({
        id: `new-${Date.now()}-${index}`,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 
              file.type.startsWith('video/') ? 'video' : 'document',
        url: URL.createObjectURL(file),
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadedAt: new Date().toISOString().split('T')[0],
        tags: [],
        alt: file.name
      }));

      setMediaItems([...newItems, ...mediaItems]);
      setUploading(false);
      toast.success(`${files.length} file(s) uploaded successfully!`);
    }, 2000);
  };

  const handleDelete = (id: string) => {
    setMediaItems(mediaItems.filter(item => item.id !== id));
    setSelectedItems(selectedItems.filter(item => item !== id));
    toast.success('Media item deleted');
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  const filteredItems = mediaItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'document':
        return <File className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Media Library</h2>
          <p className="text-gray-600">Upload and manage your media assets</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </Button>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="bg-culturin-indigo hover:bg-culturin-indigo/90"
          >
            {uploading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Media
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search media by name or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Badge variant="outline">{filteredItems.length} items</Badge>
      </div>

      {/* Media Grid/List */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        : "space-y-2"
      }>
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedItems.includes(item.id) ? 'ring-2 ring-culturin-indigo' : ''
            }`}
            onClick={() => {
              if (selectedItems.includes(item.id)) {
                setSelectedItems(selectedItems.filter(id => id !== item.id));
              } else {
                setSelectedItems([...selectedItems, item.id]);
              }
            }}
          >
            <CardContent className="p-4">
              {viewMode === 'grid' ? (
                <>
                  <div className="relative mb-3">
                    <img
                      src={item.url}
                      alt={item.alt || item.name}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute top-2 right-2">
                      {getTypeIcon(item.type)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm truncate">{item.name}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{item.size}</span>
                      <span>{item.uploadedAt}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {item.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{item.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <img
                    src={item.url}
                    alt={item.alt || item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate">{item.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{item.size}</span>
                      <span>•</span>
                      <span>{item.uploadedAt}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {getTypeIcon(item.type)}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions for Selected Items */}
      {selectedItems.length > 0 && (
        <Card className="border-culturin-indigo">
          <CardHeader>
            <CardTitle className="text-sm">
              {selectedItems.length} item(s) selected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  selectedItems.forEach(id => {
                    const item = mediaItems.find(m => m.id === id);
                    if (item) handleCopyUrl(item.url);
                  });
                }}
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy URLs
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  selectedItems.forEach(id => {
                    const item = mediaItems.find(m => m.id === id);
                    if (item) {
                      const link = document.createElement('a');
                      link.href = item.url;
                      link.download = item.name;
                      link.click();
                    }
                  });
                }}
              >
                <Download className="h-3 w-3 mr-1" />
                Download
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  selectedItems.forEach(id => handleDelete(id));
                }}
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,.doc,.docx"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default MediaLibrary; 