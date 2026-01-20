'use client';

import { roundsData } from '@/Components/Data/data';
import { CIRFourSvg, CIROneSvg, CIRThreeSvg, CIRTwoSvg, DoubleArrowSvg, DownArrow, EyeSvg, PanelSvg } from '@/Components/Svg/SvgContainer';
import React, { useState } from 'react';
import { LuEye } from 'react-icons/lu';

const Voting = () => {
  const [activeTab, setActiveTab] = useState(1);
  const activeRound = roundsData.find(round => round.id === activeTab) || roundsData[0];
  return (
    <div>
      <section className="space-y-4 px-6 py-8 rounded-2xl custom_border custom_shadow">
        <div className='space-y-6'>
          <div className='flex gap-4 justify-between'>
            <div>
              <h4 className='text-[#101828] text-[32px] font-medium mb-2'>{activeRound.title}</h4>
              <p className='text-secondary-black text-xl'>{activeRound.phase}</p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex gap-2 h-fit">
              {roundsData.map((round) => (
                <button
                  key={round.id}
                  onClick={() => setActiveTab(round.id)}
                  className={`px-4 py-2 text-lg rounded-lg transition-colors ${activeTab === round.id
                    ? 'bg-[#1977DD] text-white'
                    : 'bg-[#EFF6FF] text-[#1977DD] hover:bg-[#d8e6fa]'
                    }`}
                >
                  Round {round.id}
                </button>
              ))}
            </div>
          </div>
          <p className="text-primary-black text-xl">{activeRound.description}</p>
        </div>

        <div className='space-y-6'>

          {/* Challenge Section (if exists) */}
          {activeRound.challenge && (
            <div className="bg-[#EFF6FF] custom_border custom_shadow space-y-4 px-6 py-8 rounded-xl">
              <h3 className="font-medium text-2xl text-primary-black">{activeRound.challenge.title}</h3>
              <p className="text-tertiary-blue text-xl">{activeRound.challenge.question}</p>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Participants */}
            <div className="flex items-start gap-3">
              <div className="bg-[#1977DD29] rounded-full size-[70px] flex items-center justify-center">
                <CIROneSvg />
              </div>
              <div>
                <p className="text-secondary-black text-2xl mb-1">Participants</p>
                <p className="text-2xl text-[#0F172B]">{activeRound.participants}</p>
              </div>
            </div>

            {/* Advancing */}
            <div className="flex items-start gap-3">
              <div className="bg-[#1977DD29] rounded-full size-[70px] flex items-center justify-center">
                <CIRTwoSvg />
              </div>
              <div>
                <p className="text-secondary-black text-2xl mb-1">Advancing</p>
                <p className="text-2xl text-[#0F172B]">
                  {activeRound.advancing} ({activeRound.advancingPercentage}%)
                </p>
              </div>
            </div>

            {/* Time Left */}
            <div className="flex items-start gap-3">
              <div className="bg-[#1977DD29] rounded-full size-[70px] flex items-center justify-center">
                <CIRThreeSvg />
              </div>
              <div>
                <p className="text-secondary-black text-2xl mb-1">Time Left</p>
                <p className="text-2xl text-[#0F172B]">{activeRound.timeLeft}</p>
              </div>
            </div>

            {/* Voting Weight */}
            <div className="flex items-start gap-3">
              <div className="bg-[#1977DD29] rounded-full size-[70px] flex items-center justify-center">
                <CIRFourSvg />
              </div>
              <div>
                <p className="text-secondary-black text-2xl mb-1">Voting Weight</p>
                <p className="text-2xl text-[#0F172B]">{activeRound.votingWeight}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className='my-[48px] px-6 py-8 flex items-center gap-4 justify-between rounded-xl custom_border custom_shadow bg-white'>
        <div className='flex items-center gap-3'>
          <button className='cursor-pointer rounded-lg px-4 py-2 bg-[#EFF6FF] text-[#1977DD] border border-[#1977DD] text-lg'>All</button>
          <button className='cursor-pointer rounded-lg px-4 py-2 bg-[#F1F5F9] text-[#314158] text-lg'>Advancing</button>
          <button className='cursor-pointer rounded-lg px-4 py-2 bg-[#F1F5F9] text-[#314158] text-lg'>At Risk</button>
          <button className='cursor-pointer rounded-lg px-4 py-2 bg-[#F1F5F9] text-[#314158] text-lg'>Eliminated</button>
        </div>
        <div className='flex items-center gap-3'>
          <PanelSvg />
          <button className='cursor-pointer rounded-lg px-5 py-2 custom_border flex items-center gap-4 text-[#314158] text-lg'>All Categories <DownArrow /></button>
          <DoubleArrowSvg />
          <button className='cursor-pointer rounded-lg px-5 py-2 custom_border flex items-center gap-4 text-[#314158] text-lg'>Highest Score <DownArrow /></button>
          <button className='cursor-pointer rounded-lg px-4 py-2 bg-[#F1F5F9] text-[#314158] text-lg'>100 businesses</button>
        </div>
      </div>
      <section className='overflow-x-auto mb-5'>
        <table className='min-w-[1400px] w-full'>
          <thead className='bg-primary-blue text-white w-full'>
            <tr>
              <th className='p-7 text-2xl font-medium text-left'>Rank</th>
              <th className='p-7 text-2xl font-medium text-left'>Business</th>
              <th className='p-7 text-2xl font-medium'>Category</th>
              <th className='p-7 text-2xl font-medium'>Total Score</th>
              <th className='p-7 text-2xl font-medium'>Trend</th>
              <th className='p-7'></th>
            </tr>
          </thead>
          <tbody className='bg-gray-50'>
            {Array(50).fill(null).map((_, index) => (
              <tr key={index} className='border-b border-gray-200'>
                <td className='p-7'>
                  <div className='size-[48px] bg-[#EFF6FF] text-xl text-secondary-blue flex items-center justify-center rounded-xl shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)]'>
                    #4
                  </div>
                </td>
                <td className='p-7'>
                  <h6 className='text-primary-black text-xl'>Urban Threads Boutique</h6>
                  <p className='text-secondary-black'>Michael Johnson</p>
                </td>
                <td className='text-xl text-center text-primary-black'>Professional Services</td>
                <td className='p-7'>
                  <p className='text-primary-blue text-2xl font-medium text-center'>4,821</p>
                  <p className='text-secondary-black text-lg text-center'>points</p>
                </td>
                <td className='text-center text-2xl text-secondary-black'>- +34</td>
                <td className='p-7'>
                  <div className='flex justify-end items-center'>
                    <button className='py-2 px-4 flex items-center gap-1 rounded-lg bg-primary-blue text-white text-lg'><LuEye size={18} /> View Profile</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export default Voting



