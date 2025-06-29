
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TeamMembersList from './TeamMembersList';
import TeamRoles from './TeamRoles';
import InviteTeamMember from './InviteTeamMember';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const TeamManagement: React.FC = () => {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <Tabs defaultValue="members" className="w-full">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="members">Team Members</TabsTrigger>
              <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            </TabsList>
            
            <Button onClick={() => setIsInviteOpen(true)}>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Team Member
            </Button>
          </div>
          
          <TabsContent value="members" className="mt-6">
            <TeamMembersList />
          </TabsContent>
          
          <TabsContent value="roles" className="mt-6">
            <TeamRoles />
          </TabsContent>
        </Tabs>
      </div>

      <Sheet open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Invite Team Member</SheetTitle>
          </SheetHeader>
          <InviteTeamMember onInviteSent={() => setIsInviteOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default TeamManagement;
