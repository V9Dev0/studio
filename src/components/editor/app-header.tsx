import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Icons, Logo } from '@/components/icons';
import { ExportDialog } from './export-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from '@/components/ui/sidebar'; // Import SidebarTrigger

interface AppHeaderProps {
  onToggleLeftSidebar?: () => void;
  onToggleRightSidebar?: () => void;
}

export const AppHeader: FC<AppHeaderProps> = ({ onToggleLeftSidebar, onToggleRightSidebar }) => {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-md">
      <div className="flex items-center gap-4">
        {onToggleLeftSidebar && (
          <Button variant="ghost" size="icon" onClick={onToggleLeftSidebar} className="md:hidden">
            <Icons.menu />
            <span className="sr-only">Toggle Left Sidebar</span>
          </Button>
        )}
        <div className="flex items-center gap-2">
          <Logo className="h-7 w-7 text-primary" />
          <h1 className="font-headline text-xl font-semibold text-foreground">
            Visionary Editor
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm">
          <Icons.cloud className="mr-2" />
          <span>Saved</span>
        </Button>
        <div className="flex -space-x-2">
          <Avatar className="h-7 w-7 border-2 border-background">
            <AvatarImage src="https://placehold.co/32x32.png?text=U1" data-ai-hint="user avatar" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar className="h-7 w-7 border-2 border-background">
            <AvatarImage src="https://placehold.co/32x32.png?text=U2" data-ai-hint="user avatar" />
            <AvatarFallback>U2</AvatarFallback>
          </Avatar>
        </div>
        
        <ExportDialog>
          <Button size="sm">
            <Icons.uploadCloud className="mr-2" />
            Export
          </Button>
        </ExportDialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://placehold.co/40x40.png?text=ME" data-ai-hint="user avatar" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {onToggleRightSidebar && (
           <Button variant="ghost" size="icon" onClick={onToggleRightSidebar} className="md:hidden">
            <Icons.sliders />
            <span className="sr-only">Toggle Right Sidebar</span>
          </Button>
        )}
      </div>
    </header>
  );
};
