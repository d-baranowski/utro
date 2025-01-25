"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SidebarContextProps {
  isOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  openMenuGroups: string[];
  openMenuGroup: (id: string) => void;
  closeMenuGroup: (id: string) => void;
  toggleMenuGroup: (id: string) => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const initialState = typeof window !== 'undefined' ? localStorage.getItem('sidebarOpen') === 'true' : true;
  const initialMenuGroups = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('openMenuGroups') || '[]') : [];

  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  const [openMenuGroups, setOpenMenuGroups] = useState<string[]>(initialMenuGroups);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebarOpen', isOpen.toString());
      localStorage.setItem('openMenuGroups', JSON.stringify(openMenuGroups));
    }
  }, [isOpen, openMenuGroups]);

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const openMenuGroup = (id: string) => setOpenMenuGroups((prev) => [...new Set([...prev, id])]);
  const closeMenuGroup = (id: string) => setOpenMenuGroups((prev) => prev.filter(groupId => groupId !== id));
  const toggleMenuGroup = (id: string) => {
    setOpenMenuGroups((prev) =>
      prev.includes(id) ? prev.filter(groupId => groupId !== id) : [...prev, id]
    );
  };

  return (
    <SidebarContext.Provider value={{ isOpen, openSidebar, closeSidebar, toggleSidebar, openMenuGroups, openMenuGroup, closeMenuGroup, toggleMenuGroup }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = (): SidebarContextProps => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};
