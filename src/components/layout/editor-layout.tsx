"use client"; // This component manages state for sidebars, so it's a client component

import * as React from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import { AppHeader } from '@/components/editor/app-header';
import { LeftPanel } from '@/components/editor/panels/left-panel';
import { MainContentPanel } from '@/components/editor/main-content-panel';
import { RightPanel } from '@/components/editor/panels/right-panel';

// Helper component to access sidebar context for toggling
function EditorHeaderWithToggle() {
  const { toggleSidebar: toggleLeft, setOpenMobile: setLeftOpenMobile } = useSidebar(); // Assuming left sidebar is the default one controlled by `toggleSidebar`
  // We need another way to control the right sidebar or use a more advanced context.
  // For simplicity, this example will only toggle the main sidebar (left one) from header on mobile.
  // A more robust solution might involve separate contexts or a global state manager.
  
  // This is a simplified toggle for demo purposes.
  // In a real app, you'd need a more sophisticated way to distinguish which sidebar to toggle
  // or have separate triggers. The current shadcn/ui/sidebar is designed with one main collapsible sidebar.
  // For a dual-sidebar editor layout, we might need to extend or customize it.
  // For now, on mobile, header buttons will toggle their respective sheets.

  const leftSidebarContext = useSidebar(); // Assuming this is for the left one
  // const rightSidebarContext = useSidebar(); // This would be problematic if using the same provider instance

  return (
    <AppHeader
      onToggleLeftSidebar={() => {
        if (leftSidebarContext.isMobile) {
          leftSidebarContext.setOpenMobile(!leftSidebarContext.openMobile);
        } else {
          // This will toggle the 'main' sidebar controlled by the provider.
          // If using multiple <Sidebar> components, their desktop behavior needs care.
          // Typically, one Sidebar is primary. Let's assume left.
          leftSidebarContext.setOpen(!leftSidebarContext.open); 
        }
      }}
      // onToggleRightSidebar={() => { /* similar logic for right sidebar */ }}
    />
  );
}


export default function EditorLayout() {
  // The shadcn SidebarProvider is designed for one primary collapsible sidebar.
  // To have two independent collapsible sidebars (left and right), we might need:
  // 1. Two SidebarProviders (might conflict or be complex).
  // 2. Custom logic to manage the state of both sidebars.
  // 3. A single SidebarProvider and manage 'open' state for left, and use a separate state for right for desktop.
  //    On mobile, Sheet components can be independently controlled.

  // For this implementation, we'll use the SidebarProvider for the left sidebar primarily.
  // The right sidebar will be always visible on desktop and a separate sheet on mobile if needed.
  // Or, we can try to make them both part of the same responsive system.
  // Let's try to make them both responsive with the single provider for now.
  // The `collapsible="icon"` or `collapsible="offcanvas"` will apply to the main sidebar.
  // We can have them both as `variant="sidebar"` and control their open state.

  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render nothing or a fallback skeleton on the server to avoid hydration mismatch
    // as SidebarProvider relies on client-side logic (cookies, window size)
    return <div className="h-screen w-screen bg-background" />;
  }
  
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-screen flex-col overflow-hidden">
        <EditorHeaderWithToggle />
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <Sidebar side="left" variant="sidebar" collapsible="icon" className="w-80 md:w-72 lg:w-80 border-r">
             {/* The `collapsible` prop will make this one shrink to icon size */}
            <LeftPanel />
          </Sidebar>

          {/* Main Content Area */}
          <SidebarInset className="flex-1 overflow-auto">
            <MainContentPanel />
          </SidebarInset>

          {/* Right Sidebar - This one won't be icon-collapsible by default from provider, handle manually or make it fixed width */}
          {/* For a true dual-collapsible setup, shadcn sidebar might need extension or custom state management */}
          <div className="hidden md:flex md:w-72 lg:w-80 border-l flex-col bg-sidebar">
             {/* This is a simple fixed right sidebar for desktop */}
            <RightPanel />
          </div>
           {/* Mobile Right Sidebar (Sheet) - This needs separate state management if SidebarProvider is only for left */}
        </div>
      </div>
    </SidebarProvider>
  );
}
