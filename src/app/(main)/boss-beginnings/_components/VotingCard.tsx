// components/Card.tsx
import Image from 'next/image';
import React from 'react';
import { FaArrowTrendUp } from 'react-icons/fa6';

interface CardProps {
  imageUrl: string;
  title: string;
  author: string;
  description: string;
  votes: number;
  totalVotes: number;
}

const VotingCard: React.FC<CardProps> = ({ imageUrl, title, author, description, votes, totalVotes }) => {
  const percentage = ((votes / totalVotes) * 100).toFixed(1);

  return (
    <div className="bg-white custom_shadow custom_border overflow-hidden">
      <figure className='w-full h-[401px] relative'>
        <div className='size-full absolute bg-black/30' />
        <Image src={imageUrl} width={762} height={401} alt={title} className="size-full object-cover" />
      </figure>
      <div className="p-4 md:p-8">
        <h3 className="text-xl md:text-[28px] font-semibold text-primary-black">{title}</h3>
        <p className='text-xl text-secondary-black mb-1.5'>by {author}</p>
        <p className="text-primary-black text-2xl">{description}</p>
        <div className="mt-4 md:mt-8">
          <div className="flex justify-between items-center">
            <span className="text-lg text-secondary-black">Community Votes</span>
            <span className="text-sm md:text-lg text-[#0A0A0A] flex items-center gap-3"><FaArrowTrendUp className='size-5 text-primary-blue' />{votes} votes ({percentage}%)</span>
          </div>
          <div className="mt-2 md:mt-4 w-full bg-[#CCDEF0] rounded-full h-3.5">
            <div
              className="bg-primary-blue h-3.5 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        <button className="w-full mt-4 md:mt-9 bg-primary-blue text-xl text-white py-2 md:py-3.5 rounded-full">Cast Free Vote</button>
      </div>
    </div>
  );
};

export default VotingCard;
