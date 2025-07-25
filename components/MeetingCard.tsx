"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { useToast } from "./ui/use-toast";
import InviteByEmailModal from './InviteByEmailModal';
import { useState } from 'react';

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          
        </div>
        {!isPreviousMeeting && (
          <>
            <div className="flex gap-2">
              <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
                {buttonIcon1 && (
                  <Image src={buttonIcon1} alt="feature" width={20} height={20} />
                )}
                &nbsp; {buttonText}
              </Button>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(link);
                  toast({
                    title: "Link Copied",
                  });
                }}
                className="bg-dark-4 px-6"
              >
                <Image
                  src="/icons/copy.svg"
                  alt="feature"
                  width={20}
                  height={20}
                />
                &nbsp; Copy Link
              </Button>
              <Button
                onClick={() => setInviteModalOpen(true)}
                className="bg-blue-1 px-6"
              >
                <Image
                  src="/icons/share.svg"
                  alt="invite"
                  width={20}
                  height={20}
                />
                &nbsp; Invite by Email
              </Button>
            </div>
            <InviteByEmailModal
              open={inviteModalOpen}
              onClose={() => setInviteModalOpen(false)}
              meetingLink={link}
            />
          </>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
