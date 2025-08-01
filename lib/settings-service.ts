import { supabase } from './supabase';
import { useUserData } from '@/src/contexts/UserDataContext';

export interface SettingsService {
  // General settings
  saveGeneralSettings: (settings: any) => Promise<void>;
  saveWebsiteSettings: (settings: any) => Promise<void>;
  
  // Admin content management
  saveCaseStudiesContent: (content: any) => Promise<void>;
  saveHelpCenterContent: (content: any) => Promise<void>;
  saveTestimonialsContent: (content: any) => Promise<void>;
  
  // Marketing content
  saveMarketingContent: (content: any) => Promise<void>;
  saveBrandVoice: (brandVoice: any) => Promise<void>;
  
  // Cards settings
  saveCardsSettings: (settings: any) => Promise<void>;
  
  // Experience settings
  saveExperienceSettings: (experience: any) => Promise<void>;
  
  // Website builder
  saveWebsiteData: (data: any) => Promise<void>;
  publishWebsite: (data: any) => Promise<void>;
}

class SupabaseSettingsService implements SettingsService {
  async saveGeneralSettings(settings: any): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('users')
      .update({
        full_name: settings.businessName,
        email: settings.email,
        bio: settings.bio,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.user.id);

    if (error) {
      console.error('Error saving general settings:', error);
      throw new Error(`Failed to save general settings: ${error.message}`);
    }
  }

  async saveWebsiteSettings(settings: any): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    // Save to localStorage for immediate persistence
    const existingData = localStorage.getItem('culturin_user_data');
    const userData = existingData ? JSON.parse(existingData) : {};
    
    const updatedUserData = {
      ...userData,
      websiteSettings: {
        ...userData.websiteSettings,
        ...settings,
        lastUpdated: new Date().toISOString(),
      },
    };

    localStorage.setItem('culturin_user_data', JSON.stringify(updatedUserData));

    // Also save to Supabase if we have a settings table
    try {
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.user.id,
          website_settings: settings,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.warn('Could not save to Supabase, but saved locally:', error);
      }
    } catch (error) {
      console.warn('Supabase save failed, but local save succeeded:', error);
    }
  }

  async saveCaseStudiesContent(content: any): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    // Save to localStorage for now (in a real app, you'd have a content table)
    const contentData = {
      type: 'case_studies',
      content,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem('case_studies_content', JSON.stringify(contentData));

    // Simulate API call for now
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async saveHelpCenterContent(content: any): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    const contentData = {
      type: 'help_center',
      content,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem('help_center_content', JSON.stringify(contentData));
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async saveTestimonialsContent(content: any): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    const contentData = {
      type: 'testimonials',
      content,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem('testimonials_content', JSON.stringify(contentData));
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async saveMarketingContent(content: any): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    const contentData = {
      type: 'marketing',
      content,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem('marketing_content', JSON.stringify(contentData));
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async saveBrandVoice(brandVoice: any): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    const brandVoiceData = {
      type: 'brand_voice',
      data: brandVoice,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem('brand_voice', JSON.stringify(brandVoiceData));
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async saveCardsSettings(settings: any): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    // Save to localStorage for now
    const settingsData = {
      type: 'cards_settings',
      settings,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem('cards_settings', JSON.stringify(settingsData));
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async saveExperienceSettings(experience: any): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    // Save to localStorage for now
    const experienceData = {
      type: 'experience_settings',
      experience,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem('experience_settings', JSON.stringify(experienceData));
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async saveWebsiteData(data: any): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    const websiteData = {
      ...data,
      lastModified: new Date().toISOString(),
      version: '1.0.0',
    };

    localStorage.setItem('websiteData', JSON.stringify(websiteData));
    localStorage.setItem('websiteLastSaved', new Date().toISOString());
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  async publishWebsite(data: any): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    const publishedData = {
      ...data,
      publishedAt: new Date().toISOString(),
      status: 'published',
    };

    localStorage.setItem('publishedWebsite', JSON.stringify(publishedData));
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// Export singleton instance
export const settingsService = new SupabaseSettingsService(); 