"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@nextui-org/react";

import { useUser,useClerk } from "@clerk/nextjs";


import { submitBudget } from '@/lib/actions/budget.action';

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type TaskFormState = {
  item: string;
  cost: number|string;
  status: string;
};

type TaskFormErrors = {
  item?: string;
  cost?: number|string;
  status?: string;
};

 


const AddBudget = ({}) => {
  const options = ['Paid', 'Not Paid' ];
  const [item, setItem] = useState("");
  const [cost, setCost] = useState<number | string>('');

  const [status, setStatus] = useState("");
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(true);


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
    item: '',
    cost: 0,
    status: '',
  });

  const [errors, setErrors] = useState<TaskFormErrors>({});
  const handleStatusChange = (option:string) => {
    setStatus(option);
  };
 
  const handleRadioChange = (field: keyof TaskFormState) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [field]: ev.target.value,
    });
   
    setCost(formState.cost)
    setItem(formState.item)
   
  };

  const handleSubmitClick = async () => {
    const newErrors: TaskFormErrors = {};

    if (!formState.item) {
      newErrors.item = 'Item is required';
    }

    if (!formState.cost) {
      newErrors.cost = 'Cost is required';
    }


    if (!status) {
      newErrors.status = 'Status is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log('Form submitted', formState);
      
    

   // Update or insert the user's rating into the Supabase database
  const  {  error:any } =  await submitBudget({ status,item,cost, path: `/budget`})
 
   if (error) {
    console.error('Error fetching vendor data:', error.message);
    } else {
      console.log('Form submitted', formState.status);
      toast({
        description: "Budget successfully  added.",
      })
      setIsModalOpen(false);
    }      
       
    
      setErrors({});
      // Additional form submission logic goes here
    }
  };

  



  

  


  return (
    <>
         
      <Button className="bg-rose-600 font-bold text-white"  variant="outline"  onClick={checkSignin}> <PlusCircledIcon className="mr-2 h-4 w-4 " />Add a budget</Button>
      {isModalOpen && (
      <Modal 
      backdrop="blur" 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
      }}
    >
     <ModalContent className="bg-white">
       {(onClose) => (
      <>
        <ModalHeader className="flex flex-col gap-1 py-3 text-center font-bold">Add a Budget</ModalHeader>
        <ModalBody className="flex flex-col place-items-center gap-1">
          <div className="flex flex-col gap-1">
            <div className="grid w-full max-w-sm gap-1.5">
              <Label htmlFor="item">Specify a budget item</Label>
              <Input
                className="bg-slate-50 shadow-md"
                type="text"
                id="item"
                placeholder="e.g. caterer cost"
                value={formState.item}
                onChange={handleRadioChange('item')}
              />
              {errors.item && <span className="text-red-500">{errors.item}</span>}
            </div>

            <div className="my-3 grid w-full max-w-sm gap-1.5">
              <Label htmlFor="cost">Cost of Item</Label>
              <Input
                className="bg-slate-50 shadow-md"
                type="number"
                id="cost"
                placeholder="e.g. GHS 5000"
                value={formState.cost}
                onChange={handleRadioChange('cost')}
              />
              {errors.cost && <span className="text-red-500">{errors.cost}</span>}
            </div>

            <div className="my-3 grid w-full max-w-sm gap-1.5">
              <Label htmlFor="status">Status</Label>
              {options.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    value={option}
                    checked={status === option}
                    onChange={() => handleStatusChange(option)}
                  />
                 
                  {option}
                </label>
               
              ))}
              
              {errors.status && <span className="text-red-500">{errors.status}</span>}
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="py-5">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-rose-600 font-bold text-white sm:w-40 md:w-40" onClick={handleSubmitClick}>
            Add Budget
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

export default AddBudget
