"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,useDisclosure} from "@nextui-org/react";
import { useUser,useClerk } from "@clerk/nextjs";

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


import { submitCheckList } from '@/lib/actions/checkList.actions';

type TaskFormState = {
  title: string;
  category: string;
  date: string;
  status: string;
};

type TaskFormErrors = {
  title?: string;
  category?: string;
  date?: string;
  status?: string;
};
 


const AddCheckList = ({}) => {
  const options = ['Todo', 'In Progress','Done','Cancelled' ];
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(true);



  

  const [category, setCategory] = useState('');
  

  const dropdownItems = ['Venue', 'Caterer', 'Decor', 'Photographer','Mc','Dj','Food and Drinks','MakeUp','Ring','Transport'];
  const { toast } = useToast()

  const { isSignedIn, user } = useUser(); // Hook to check sign-in status
  const { openSignIn } = useClerk(); // Clerk function to open sign-in modal

  const checkSignin = () => {
    if (isSignedIn) {
     // console.log(`User is signed in: ${user?.fullName || "User"}`);
     onOpen();
    } else {
      // Trigger Clerk's sign-in modal
      openSignIn();
    }
  };


  const [formState, setFormState] = useState<TaskFormState>({
    title: '',
    category: '',
    date: '',
    status: '',
  });

  const [errors, setErrors] = useState<TaskFormErrors>({});

  const handleChange = (field: keyof TaskFormState) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [field]: ev.target.value,
    });
    setCategory(formState.category);
    setDate(formState.date)
    setTitle(formState.title)
    setStatus(formState.status);
  };

  const handleSubmitClick = async () => {
    const newErrors: TaskFormErrors = {};

    if (!formState.title) {
      newErrors.title = 'Title is required';
    }

    if (!formState.category) {
      newErrors.category = 'Category is required';
    }

    if (!formState.date) {
      newErrors.date = 'Date is required';
    }

    if (!formState.status) {
      newErrors.status = 'Status is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log('Form submitted', formState);


      const  { data, error } =  await submitCheckList({ status,title,category,date, path: `/Clist`})
 
      if (error) {
       console.error('Error fetching data:', error.message);
       } else {
         toast({
           description: "Task successfully  added.",
         })
         setIsModalOpen(false);
       }      
      
      setErrors({});
      // Additional form submission logic goes here
    }
  };

  

  


  return (
    <>
         
      <Button className="bg-rose-600 font-bold text-white"  variant="outline"  onClick={checkSignin}> <PlusCircledIcon className="mr-2 h-4 w-4 " />Add a Task</Button>
      {isModalOpen && (
      <Modal 
      backdrop="blur" 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
      }}
    >
       <ModalContent className='bg-white'>
      {(onClose) => (
        <>
          <ModalHeader className="flex flex-col gap-1 py-3 text-center font-bold">Add a Task</ModalHeader>
          <ModalBody className="flex flex-col place-items-center gap-1">
            <div className="flex flex-col gap-1">
              <div className="grid w-full max-w-sm gap-1.5">
                <Label htmlFor="item">Specify a title for the task</Label>
                <Input 
                  className='bg-slate-50 shadow-md' 
                  type="text" 
                  id="item" 
                  placeholder="e.g. caterer cost"
                  value={formState.title}
                  onChange={handleChange('title')} 
                />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
              </div>

              <div className="my-3 grid w-full max-w-sm gap-1.5">
                <Label htmlFor="cost">Category</Label>
                <select
                  id="dropdown"
                  value={formState.category}
                  onChange={handleChange('category')}
                  className='bg-slate-50 pb-5 shadow-md'
                >
                  {dropdownItems.map((item, index) => (
                    <option key={index} value={item} className='scroll-auto bg-slate-200 text-center'>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500">{errors.category}</p>}
              </div>

              <div className="my-3 grid w-full max-w-sm gap-1.5">
                <Label htmlFor="cost">Date</Label>
                <input
                  type="date"
                  value={formState.date}
                  onChange={handleChange('date')}
                  className='bg-slate-50 shadow-md'
                />
                {errors.date && <p className="text-red-500">{errors.date}</p>}
              </div>

              <div className='my-3 grid w-full max-w-sm gap-1.5 bg-slate-50 shadow-md'>
                <Label htmlFor="cost">Status</Label>
                {options.map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      value={option}
                      checked={formState.status === option}
                      onChange={() => setFormState({ ...formState, status: option })}
                    />
                    {option}
                  </label>
                ))}
                {errors.status && <p className="text-red-500">{errors.status}</p>}
              </div>
            </div>
          </ModalBody>
          <ModalFooter className='py-5'>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="bg-rose-600 font-bold text-white sm:w-40 md:w-40" onClick={handleSubmitClick}>
              Add Task
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
    </Modal>
    )}
    </>
  )
}

export default AddCheckList