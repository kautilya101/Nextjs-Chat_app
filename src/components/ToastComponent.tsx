"use client"
import React, { useEffect } from 'react'
import { useToast } from './ui/use-toast'

export default function ToastComponent({title,description}: {title:string,description:string}) {
  const { toast } = useToast();

  useEffect(() => {
    if (title) {
      toast({
        title: title,
        description: description
      });
    }
  }, [title, toast]); 

  return null; 
}

