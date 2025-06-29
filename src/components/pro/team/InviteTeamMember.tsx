
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Send, Loader2 } from 'lucide-react';

interface InviteTeamMemberProps {
  onInviteSent: () => void;
}

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  role: z.string({
    required_error: "Please select a role for this team member",
  }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const InviteTeamMember: React.FC<InviteTeamMemberProps> = ({ onInviteSent }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      role: '',
      message: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: FormValues) => {
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Team member invited successfully', {
      description: `An invitation has been sent to ${values.email}`,
    });
    
    onInviteSent();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input 
                  placeholder="colleague@example.com" 
                  type="email"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="contentManager">Content Manager</SelectItem>
                  <SelectItem value="guide">Guide</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This determines what permissions they will have
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Personal Message (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Add a personal note to your invite"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" onClick={onInviteSent}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Invitation
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default InviteTeamMember;
