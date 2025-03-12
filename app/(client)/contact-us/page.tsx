import React from 'react'
import ClientHeader from "@/components/client-header"
import { Card, CardContent} from "@/components/ui/card"
import Image from "next/image"
import {  Accordion,  AccordionContent,  AccordionItem,  AccordionTrigger,} from "@/components/ui/accordion"

const contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-100 to-white ">
        {/* Header */}
        <ClientHeader />
        
        <h1 className='pt-8 text-4xl font-bold flex justify-center m-4'>CONTACT US</h1>

        {/*Content*/}
        <section className='py-2 flex justify-center m-4 w-full max-w-[800px] mx-auto'>
          <Card>
            <CardContent className="space-y-2 text-center">
              <div className="flex justify-center w-full m-2">
                <Image src="/trinity_logo_lengthwise.png" alt="Trinity University of Asia" width={400} height={200} />
              </div>
              <p className='text-2xl font-bold font-serif text-green-900'>Cathedral Heights, 275 E. Rodriguez Sr. Avenue, Quezon City, Philippines</p>
              
              <p className='font-bold  text-green-900 pt-4'> EMAILS:</p> 

              <ul>
                <li>Admission and Registration Office : admission@tua.edu.ph</li>
                <li>High School: highschool@tua.edu.ph</li>
                <li>Inquiries: inquiry@tua.edu.ph</li>
              </ul>

              <p className='font-bold text-lg text-green-900 pt-4'>TELEPHONE DIRECTORY</p>
              <p className='font-bold text-2xl text-green-900'>TRUNKLINE (632) 8702 2882</p>
              
              <p className='font-bold text-lg text-green-900 pt-4'>TUA Cellphone Numbers</p>
              <ul>
                <li>THS – 0916 642 7222</li>
                <li>CAHS – 0936 911 8061</li>
                <li>CASE – 0945 459 3677</li>
                <li>CBMA – 0963 140 6772</li>
                <li>CEIS – 0956 521 5810</li>
                <li>CHTM – 0916 250 4954</li>
                <li>CMT – 0926 064 4236</li>
              </ul>

              <Accordion type="single" collapsible>
                <AccordionItem value="phoneDirectory">
                  <AccordionTrigger className="font-bold text-green-900 text-xl">Other Telephone Numbers</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex justify-center w-full">
                      <Image src="/TUATelephoneDirectory.png" alt="Trinity University of Asia Telephone Directory" width={500} height={1400} />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

            </CardContent>
          </Card>
        </section>
    </div>
  )
}

export default contact