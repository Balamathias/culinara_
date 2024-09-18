'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from '@/lib/utils'
import { useMediaQuery } from './hooks/use-media-query'

interface DynamicModalProps {
    children: React.ReactNode,
    trigger?: React.ReactNode,
    open?: boolean,
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>,
    showCloseButton?: boolean,
    dialogClassName?: string,
    drawerClassName?: string,
    className?: string,
    dialogOnly?: boolean,
    drawerOnly?: boolean,
    dismissible?: boolean,
    closeModal?: (open?: boolean) => void
}
const DynamicModal = ({
  children, 
  trigger, 
  open, 
  setOpen, 
  dialogClassName, 
  drawerClassName, 
  showCloseButton, 
  dialogOnly=false, 
  drawerOnly=false, 
  dismissible=true,
  closeModal,
  className,
}: DynamicModalProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  if ((isDesktop || dialogOnly) && !drawerOnly) {
    return (
      <Dialog open={open} onOpenChange={closeModal ? closeModal : setOpen}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className={cn("rounded-xl border-none drop-shadow-md shadow-md focus:border-none bg-card outline-none focus-within:border-none", className, dialogClassName)}>
          <div className="flex flex-col gap-3 p-2.5">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} dismissible={dismissible}>
      <DrawerTrigger asChild>
        { trigger }
      </DrawerTrigger>
      <DrawerContent className={cn('flex flex-col bg-card flex-1 gap-3 border-none focus:border-none p-4 max-sm:pb-8 outline-none', className, drawerClassName)}>
        <div className="flex flex-col gap-3 overflow-auto">
            {children}
        </div>
        {showCloseButton && <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="destructive">Close</Button>
          </DrawerClose>
        </DrawerFooter>}
      </DrawerContent>
    </Drawer>
  )
}

export default DynamicModal