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
import { Sheet, SheetContent } from '@/components/ui/sheet'; // Added Sheet imports

// Helper component to access sidebar context for toggling
function EditorHeaderWithToggle({ onToggleRightSidebar }: { onToggleRightSidebar: () => void }) {
  const leftSidebarContext = useSidebar(); 

  return (
    <AppHeader
      onToggleLeftSidebar={() => {
        if (leftSidebarContext.isMobile) {
          leftSidebarContext.setOpenMobile(!leftSidebarContext.openMobile);
        } else {
          leftSidebarContext.setOpen(!leftSidebarContext.open); 
        }
      }}
      onToggleRightSidebar={onToggleRightSidebar} // Pass down the right sidebar toggle
    />
  );
}


export default function EditorLayout() {
  const [isClient, setIsClient] = React.useState(false);
  const [rightSidebarOpenMobile, setRightSidebarOpenMobile] = React.useState(false); // State for right mobile sidebar

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="h-screen w-screen bg-background" />;
  }
  
  const toggleRightSidebarMobile = () => {
    setRightSidebarOpenMobile(prev => !prev);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-screen flex-col overflow-hidden">
        <EditorHeaderWithToggle onToggleRightSidebar={toggleRightSidebarMobile} />
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
          <Sidebar side="left" variant="sidebar" collapsible="icon" className="w-80 md:w-72 lg:w-80 border-r">
            <LeftPanel />
          </Sidebar>

          {/* Main Content Area */}
          <SidebarInset className="flex-1 overflow-auto">
            <MainContentPanel />
          </SidebarInset>

          {/* Right Sidebar - Desktop */}
          <div className="hidden md:flex md:w-72 lg:w-80 border-l flex-col bg-card/50"> {/* Changed bg-sidebar to bg-card/50 for consistency */}
            <RightPanel />
          </div>

          {/* Right Sidebar - Mobile (Sheet) */}
          {isClient && ( // Ensure Sheet is only rendered on client
            <Sheet open={rightSidebarOpenMobile} onOpenChange={setRightSidebarOpenMobile}>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0 bg-card/50"> {/* Consistent background */}
                <RightPanel />
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}
