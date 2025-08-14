import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/src/components/auth/AuthProvider";
import {
  marketingProjectService,
  MarketingProject,
  CreateProjectData,
  CreateConversationData,
  MarketingConversation,
} from "@/lib/marketing-project-service";
import { toast } from "sonner";

export function useMarketingProjects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<MarketingProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Load projects on mount and when user changes
  useEffect(() => {
    let isMounted = true;
    let loadingTimeout: NodeJS.Timeout;

    if (user) {
      loadProjects();
      
      // Set a timeout to prevent infinite loading
      loadingTimeout = setTimeout(() => {
        if (isMounted && loading) {
          console.warn("Projects loading timeout - forcing loading to false");
          setLoading(false);
          setError("Loading timeout - please refresh the page");
        }
      }, 8000); // 8 second timeout
    } else {
      if (isMounted) {
        setProjects([]);
        setLoading(false);
      }
    }

    return () => {
      isMounted = false;
      clearTimeout(loadingTimeout);
    };
  }, [user, loading]);

  // Load all projects for the current user
  const loadProjects = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const userProjects = await marketingProjectService.getProjects();
      
      // Check if component is still mounted before updating state
      if (userProjects !== null) {
        setProjects(userProjects);
      }
    } catch (err) {
      setError("Failed to load projects");
      console.error("Error loading projects:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Create a new project
  const createProject = useCallback(
    async (
      projectData: CreateProjectData
    ): Promise<MarketingProject | null> => {
      if (!user) {
        toast.error("You must be logged in to create projects");
        return null;
      }

      try {
        setLoading(true);
        console.log("Creating project with user:", user.id);

        const newProject = await marketingProjectService.createProject(
          projectData
        );

        if (newProject) {
          setProjects((prev) => [newProject, ...prev]);
          toast.success("Project created successfully!");
          return newProject;
        } else {
          toast.error("Failed to create project");
          return null;
        }
      } catch (err) {
        setError("Failed to create project");
        toast.error("Failed to create project");
        console.error("Error creating project:", err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  // Update an existing project
  const updateProject = useCallback(
    async (
      id: string,
      updates: Partial<MarketingProject>
    ): Promise<boolean> => {
      try {
        const updatedProject = await marketingProjectService.updateProject(
          id,
          updates
        );

        if (updatedProject) {
          setProjects((prev) =>
            prev.map((project) =>
              project.id === id ? updatedProject : project
            )
          );
          toast.success("Project updated successfully!");
          return true;
        } else {
          toast.error("Failed to update project");
          return false;
        }
      } catch (err) {
        setError("Failed to update project");
        toast.error("Failed to update project");
        console.error("Error updating project:", err);
        return false;
      }
    },
    []
  );

  // Delete a project
  const deleteProject = useCallback(async (id: string): Promise<boolean> => {
    try {
      const success = await marketingProjectService.deleteProject(id);

      if (success) {
        setProjects((prev) => prev.filter((project) => project.id !== id));
        toast.success("Project deleted successfully!");
        return true;
      } else {
        toast.error("Failed to delete project");
        return false;
      }
    } catch (err) {
      setError("Failed to delete project");
      toast.error("Failed to delete project");
      console.error("Error deleting project:", err);
      return false;
    }
  }, []);

  // Search projects
  const searchProjects = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        await loadProjects();
        return;
      }

      try {
        setLoading(true);
        const searchResults = await marketingProjectService.searchProjects(
          query
        );
        setProjects(searchResults);
      } catch (err) {
        setError("Failed to search projects");
        console.error("Error searching projects:", err);
      } finally {
        setLoading(false);
      }
    },
    [loadProjects]
  );

  // Get project conversations
  const getProjectConversations = useCallback(
    async (projectId: string): Promise<MarketingConversation[]> => {
      try {
        return await marketingProjectService.getProjectConversations(projectId);
      } catch (err) {
        console.error("Error loading project conversations:", err);
        return [];
      }
    },
    []
  );

  // Add conversation message
  const addConversationMessage = useCallback(
    async (
      conversationData: CreateConversationData
    ): Promise<MarketingConversation | null> => {
      try {
        const message = await marketingProjectService.addConversationMessage(
          conversationData
        );

        if (message) {
          // Update the project's last_accessed timestamp in the local state
          setProjects((prev) =>
            prev.map((project) =>
              project.id === conversationData.project_id
                ? { ...project, last_accessed: new Date().toISOString() }
                : project
            )
          );
        }

        return message;
      } catch (err) {
        console.error("Error adding conversation message:", err);
        return null;
      }
    },
    []
  );

  // Get filtered projects based on search query
  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.platform &&
        project.platform.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Refresh projects
  const refreshProjects = useCallback(() => {
    loadProjects();
  }, [loadProjects]);

  return {
    projects,
    filteredProjects,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    createProject,
    updateProject,
    deleteProject,
    searchProjects,
    getProjectConversations,
    addConversationMessage,
    refreshProjects,
    loadProjects,
  };
}
