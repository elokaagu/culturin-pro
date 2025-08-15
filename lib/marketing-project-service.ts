import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export interface MarketingProject {
  id: string;
  user_id: string;
  title: string;
  type: "blog" | "social" | "email" | "flyer" | "scratch" | "url_import";
  platform?:
    | "instagram"
    | "facebook"
    | "twitter"
    | "linkedin"
    | "email"
    | "general";
  content?: string;
  metadata?: any;
  status: "active" | "archived" | "deleted";
  created_at: string;
  updated_at: string;
  last_accessed: string;
}

export interface MarketingConversation {
  id: string;
  project_id: string;
  user_id: string;
  message_type: "user" | "bot";
  content: string;
  metadata?: any;
  timestamp: string;
  sequence_order: number;
}

export interface CreateProjectData {
  title: string;
  type: MarketingProject["type"];
  platform?: MarketingProject["platform"];
  content?: string;
  metadata?: any;
}

export interface CreateConversationData {
  project_id: string;
  message_type: "user" | "bot";
  content: string;
  metadata?: any;
}

class MarketingProjectService {
  // Get all projects for the current user
  async getProjects(): Promise<MarketingProject[]> {
    try {
      // Check if user is authenticated
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.log("User not authenticated, returning empty projects list");
        return [];
      }

      const { data: projects, error } = await supabase
        .from("marketing_projects")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .order("last_accessed", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
        throw error;
      }

      return projects || [];
    } catch (error) {
      console.error("Error in getProjects:", error);
      return [];
    }
  }

  // Get a specific project by ID
  async getProject(id: string): Promise<MarketingProject | null> {
    try {
      // Get current user for filtering
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.log("User not authenticated, returning null");
        return null;
      }

      const { data: project, error } = await supabase
        .from("marketing_projects")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching project:", error);
        throw error;
      }

      return project;
    } catch (error) {
      console.error("Error in getProject:", error);
      return null;
    }
  }

  // Create a new project
  async createProject(
    projectData: CreateProjectData
  ): Promise<MarketingProject | null> {
    try {
      // First, get the current user to ensure we have a valid user_id
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Authentication error:", authError);
        throw new Error("User not authenticated");
      }

      // Add the user_id to the project data
      const projectWithUser = {
        ...projectData,
        user_id: user.id,
      };

      console.log("Creating project with data:", projectWithUser);

      const { data: project, error } = await supabase
        .from("marketing_projects")
        .insert([projectWithUser])
        .select()
        .single();

      if (error) {
        console.error("Error creating project:", error);
        throw error;
      }

      return project;
    } catch (error) {
      console.error("Error in createProject:", error);
      return null;
    }
  }

  // Update an existing project
  async updateProject(
    id: string,
    updates: Partial<MarketingProject>
  ): Promise<MarketingProject | null> {
    try {
      // Get current user for verification
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.error("User not authenticated");
        throw new Error("User not authenticated");
      }

      // Verify the project belongs to the user
      const { data: existingProject, error: projectError } = await supabase
        .from("marketing_projects")
        .select("user_id")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (projectError || !existingProject) {
        console.error("Project not found or access denied");
        throw new Error("Project not found or access denied");
      }

      const { data: project, error } = await supabase
        .from("marketing_projects")
        .update(updates)
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating project:", error);
        throw error;
      }

      return project;
    } catch (error) {
      console.error("Error in updateProject:", error);
      return null;
    }
  }

  // Delete a project (soft delete by setting status to deleted)
  async deleteProject(id: string): Promise<boolean> {
    try {
      // Get current user for verification
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.error("User not authenticated");
        throw new Error("User not authenticated");
      }

      // Verify the project belongs to the user
      const { data: existingProject, error: projectError } = await supabase
        .from("marketing_projects")
        .select("user_id")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

      if (projectError || !existingProject) {
        console.error("Project not found or access denied");
        throw new Error("Project not found or access denied");
      }

      const { error } = await supabase
        .from("marketing_projects")
        .update({ status: "deleted" })
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error deleting project:", error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error("Error in deleteProject:", error);
      return false;
    }
  }

  // Get conversations for a specific project
  async getProjectConversations(
    projectId: string
  ): Promise<MarketingConversation[]> {
    try {
      // Get current user for filtering
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.log("User not authenticated, returning empty conversations");
        return [];
      }

      // First verify the project belongs to the user
      const { data: project, error: projectError } = await supabase
        .from("marketing_projects")
        .select("user_id")
        .eq("id", projectId)
        .eq("user_id", user.id)
        .single();

      if (projectError || !project) {
        console.log("Project not found or access denied");
        return [];
      }

      const { data: conversations, error } = await supabase
        .from("marketing_conversations")
        .select("*")
        .eq("project_id", projectId)
        .order("sequence_order", { ascending: true });

      if (error) {
        console.error("Error fetching conversations:", error);
        throw error;
      }

      return conversations || [];
    } catch (error) {
      console.error("Error in getProjectConversations:", error);
      return [];
    }
  }

  // Add a new conversation message
  async addConversationMessage(
    conversationData: CreateConversationData
  ): Promise<MarketingConversation | null> {
    try {
      // Get current user for verification
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.error("User not authenticated");
        throw new Error("User not authenticated");
      }

      // Verify the project belongs to the user
      const { data: project, error: projectError } = await supabase
        .from("marketing_projects")
        .select("user_id")
        .eq("id", conversationData.project_id)
        .eq("user_id", user.id)
        .single();

      if (projectError || !project) {
        console.error("Project not found or access denied");
        throw new Error("Project not found or access denied");
      }

      // Get the next sequence order for this project
      const { data: lastMessage } = await supabase
        .from("marketing_conversations")
        .select("sequence_order")
        .eq("project_id", conversationData.project_id)
        .order("sequence_order", { ascending: false })
        .limit(1)
        .single();

      const nextSequenceOrder = (lastMessage?.sequence_order || 0) + 1;

      const { data: conversation, error } = await supabase
        .from("marketing_conversations")
        .insert([
          {
            ...conversationData,
            sequence_order: nextSequenceOrder,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error adding conversation message:", error);
        throw error;
      }

      // Update the project's last_accessed timestamp
      await this.updateProject(conversationData.project_id, {});

      return conversation;
    } catch (error) {
      console.error("Error in addConversationMessage:", error);
      return null;
    }
  }

  // Search projects by title or type
  async searchProjects(query: string): Promise<MarketingProject[]> {
    try {
      // Get current user for filtering
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.log("User not authenticated, returning empty search results");
        return [];
      }

      const { data: projects, error } = await supabase
        .from("marketing_projects")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .or(`title.ilike.%${query}%,type.ilike.%${query}%`)
        .order("last_accessed", { ascending: false });

      if (error) {
        console.error("Error searching projects:", error);
        throw error;
      }

      return projects || [];
    } catch (error) {
      console.error("Error in searchProjects:", error);
      return [];
    }
  }

  // Get project statistics
  async getProjectStats(): Promise<{
    total: number;
    byType: Record<string, number>;
  }> {
    try {
      // Get current user for filtering
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        console.log("User not authenticated, returning empty stats");
        return { total: 0, byType: {} };
      }

      const { data: projects, error } = await supabase
        .from("marketing_projects")
        .select("type")
        .eq("user_id", user.id)
        .eq("status", "active");

      if (error) {
        console.error("Error fetching project stats:", error);
        throw error;
      }

      const byType: Record<string, number> = {};
      projects?.forEach((project) => {
        byType[project.type] = (byType[project.type] || 0) + 1;
      });

      return {
        total: projects?.length || 0,
        byType,
      };
    } catch (error) {
      console.error("Error in getProjectStats:", error);
      return { total: 0, byType: {} };
    }
  }
}

export const marketingProjectService = new MarketingProjectService();
