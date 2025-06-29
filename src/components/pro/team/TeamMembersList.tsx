'use client'

import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, User, Crown, Mail, Calendar, UserX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  joined: string;
  status: 'active' | 'pending';
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sofia Rodriguez',
    email: 'sofia@example.com',
    role: 'Owner',
    avatar: '',
    joined: 'Jan 12, 2025',
    status: 'active'
  },
  {
    id: '2',
    name: 'Marco Chen',
    email: 'marco@example.com',
    role: 'Admin',
    avatar: '',
    joined: 'Mar 5, 2025',
    status: 'active'
  },
  {
    id: '3',
    name: 'Aisha Johnson',
    email: 'aisha@example.com',
    role: 'Content Manager',
    avatar: '',
    joined: 'Apr 18, 2025',
    status: 'active'
  },
  {
    id: '4',
    name: 'Priya Patel',
    email: 'priya@example.com',
    role: 'Guide',
    avatar: '',
    joined: 'May 1, 2025',
    status: 'pending'
  }
];

const TeamMembersList: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);

  const handleRemoveMember = () => {
    if (memberToRemove) {
      setMembers(members.filter(member => member.id !== memberToRemove.id));
      toast.success(`${memberToRemove.name} has been removed from your team`);
      setMemberToRemove(null);
    }
  };

  const resendInvite = (email: string) => {
    toast.success(`Invitation resent to ${email}`);
  };

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-primary/10">
                        {member.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {member.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {member.role === 'Owner' && <Crown className="h-3.5 w-3.5 text-amber-500" />}
                    {member.role === 'Admin' && <User className="h-3.5 w-3.5 text-blue-500" />}
                    {member.role}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-gray-500" />
                    {member.joined}
                  </div>
                </TableCell>
                <TableCell>
                  {member.status === 'active' ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Pending
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {member.status === 'pending' ? (
                        <DropdownMenuItem onClick={() => resendInvite(member.email)}>
                          Resend Invite
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                      )}
                      {member.role !== 'Owner' && (
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => setMemberToRemove(member)}
                        >
                          Remove
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!memberToRemove} onOpenChange={(open) => !open && setMemberToRemove(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove team member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {memberToRemove?.name}? They will no longer have access to your Culturin Pro dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveMember} className="bg-red-600 hover:bg-red-700">
              <UserX className="mr-2 h-4 w-4" />
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TeamMembersList;
