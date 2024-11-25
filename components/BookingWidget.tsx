"use client"
import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure} from "@nextui-org/react";
// import {Input} from "@nextui-org/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BookVendor } from "@/lib/actions/booking.actions";
import { revalidatePath } from 'next/cache'
import { ReloadIcon } from "@radix-ui/react-icons";

import { useUser,useClerk } from "@clerk/nextjs";


interface FormState {
  date: string;
  time: string;
  numberOfGuests: string;
}

interface Errors {
  date?: string;
  time?: string;
  numberOfGuests?: string;
}


export interface BookingWidgetParams {
  profile_id: string;
  vendorId: string;
  price:number;
  username: any;
  vendorName:string
  email: any;
  path:string;
 
  
}


export default function BookingWidget({vendorId,profile_id,price,vendorName,username,email,path } : BookingWidgetParams) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [redirect, setRedirect] = useState("");
  const [message, setMessage] = useState('');
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const { toast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<FormState>({
    date: '',
    time: '',
    numberOfGuests: ''
  });
  const [errors, setErrors] = useState<Errors>({});

  const { isSignedIn, user } = useUser(); // Hook to check sign-in status
  const { openSignIn } = useClerk(); // Clerk function to open sign-in modal

  
  const validateSmallForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formState.date) newErrors.date = 'Date is required';
    if (!formState.time) newErrors.time = 'Time is required';
    if (!formState.numberOfGuests) newErrors.numberOfGuests = 'Number of guests is required';
    else if (parseInt(formState.numberOfGuests, 10) <= 0) newErrors.numberOfGuests = 'Number of guests must be greater than 0';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
    setDate(formState.date);
    setTime(formState.time);
    setNumberOfGuests(formState.numberOfGuests);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();


    if (isSignedIn) {
      console.log(`User is signed in: ${user?.fullName || "User"}`);
    } else {
      // Trigger Clerk's sign-in modal
      openSignIn();
    }


    
    if (validateSmallForm()) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', formState);
      onOpen();
    }
  };

  const validateForm = () => {

 

    if (!phoneNumber.trim()) {
      toast({
        description: "Phone number is required.",
      });
      return false;
    }
    if (!message.trim()) {
      toast({
        description: "Message is required.",
      });
      return false;
    }
    return true;
  };
  const handleSubmitClick = async () => {
  
    if (!validateForm()) return;
     // Update or insert the user's rating into the Supabase database
     setLoading(true);
     const response:any|null =  await BookVendor({ vendorId,profile_id,message,email,date,time,price,username,numberOfGuests,phoneNumber  })
 
     if (!response) {
      console.error('Error fetching vendor data);
      } else {
       
        toast({
          description: "Your message has been sent.",
        })
        setLoading(false);
        setIsModalOpen(false);
      }      
     
  }
  




  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: GH&#8373;{price} 
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4 text-sm">
            <label>Event Date:</label>
            <input
              type="date"
              name="date"
              value={formState.date}
              onChange={handleChange}
            />
       {errors.date && <p className="text-red-500">{errors.date}</p>}
          </div>
          <div className="py-3 px-4 border-l text-sm">
            <label>Event Time:</label>
            <input
              type="time"
              name="time"
              value={formState.time}
              onChange={handleChange}
            />
 {errors.time && <p className="text-red-500">{errors.time}</p>}

          </div>
        </div>
        <div className="py-3 px-4 border-t text-sm">
          <label>Number of guests:</label>
          <input
            type="number"
            name="numberOfGuests"
            value={formState.numberOfGuests}
            onChange={handleChange}
          />
        {errors.numberOfGuests && <p className="text-red-500">{errors.numberOfGuests}</p>}
        </div>
     
      </div>
      <Button className=" my-3 w-full bg-rose-600 font-bold text-white sm:w-96 md:w-80"  onClick={handleSubmit}>Book Vendor</Button>
      {isModalOpen && (
      <Modal 
      backdrop="blur" 
      isOpen={isOpen} 
      onOpenChange={onOpenChange}
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
      }}
    >
      <ModalContent className='h-auto w-1/2 bg-white md:h-auto'>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 py-3 text-center font-bold">{vendorName}</ModalHeader>
            <ModalBody className="flex flex-col gap-6"  >
            <p className="font-bold ">Message Vendor</p>
              <div  className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap"> 
                 {/* Name */}
                

                 <Input
          type="text"
         
          placeholder="Name"
          
          className="rounded-lg bg-white shadow-md"
          value={username}
          
           disabled
         
         
          
          
        />
              </div>
              <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap" >
              
                 {/* Email  and phone number */}

                 <Input
          type="email"
         
          placeholder="Email"
         
          className="rounded-lg bg-white shadow-md"
          
          value={email}
          disabled
          
          
        />
             <Input
          type="tel"
          
          placeholder="PhoneNumber"
         
          className="rounded-lg bg-white shadow-md"
          value={phoneNumber}
          onChange={(ev) => setPhoneNumber(ev.target.value)}
           
       
        />
             </div>

              <div className="grid w-full max-w-sm items-center gap-1.5" >
                 {/* Event date */}
                 <Label htmlFor="email">Event Date</Label>
                 <Input
          type="date"
         
          placeholder="month"
          value={formState.date}
          disabled
         
          className="rounded-lg bg-white shadow-md"

         
          
          
        />
       
          
              </div>
              <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message"  value={message}  onChange={(e) => setMessage(e.target.value)} />
    </div>
            </ModalBody>
            <ModalFooter className='py-5'>
              
            <Button className='rounded-md bg-primary-500 text-white' onClick={handleSubmitClick} disabled={loading}>
            {loading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Submit'
            )}
          </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    )}
    </div>
  );
}
