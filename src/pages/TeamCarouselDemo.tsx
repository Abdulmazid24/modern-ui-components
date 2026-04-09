import React from 'react';
import { TeamCarousel } from '../components/carousel';
import type { TeamMember } from '../components/carousel';
import { Globe } from 'lucide-react';

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const SocialIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-flex">{children}</span>
);

const teamMembers: TeamMember[] = [
  {
    id: 'lisa',
    name: 'Lisa Anderson',
    role: 'MARKETING MANAGER',
    imageUrl: '/team/member-1.png',
    socials: [
      { icon: <SocialIcon><XIcon /></SocialIcon>, href: '#', label: 'Twitter' },
      { icon: <SocialIcon><LinkedInIcon /></SocialIcon>, href: '#', label: 'LinkedIn' },
    ],
  },
  {
    id: 'james',
    name: 'James Wilson',
    role: 'LEAD DEVELOPER',
    imageUrl: '/team/member-2.png',
    socials: [
      { icon: <SocialIcon><Globe size={14} /></SocialIcon>, href: '#', label: 'Website' },
      { icon: <SocialIcon><LinkedInIcon /></SocialIcon>, href: '#', label: 'LinkedIn' },
    ],
  },
  {
    id: 'sarah',
    name: 'Sarah Chen',
    role: 'UX DESIGNER',
    imageUrl: '/team/member-3.png',
    socials: [
      { icon: <SocialIcon><XIcon /></SocialIcon>, href: '#', label: 'Twitter' },
      { icon: <SocialIcon><LinkedInIcon /></SocialIcon>, href: '#', label: 'LinkedIn' },
    ],
  },
  {
    id: 'michael',
    name: 'Michael Brown',
    role: 'CEO & FOUNDER',
    imageUrl: '/team/member-4.png',
    socials: [
      { icon: <SocialIcon><LinkedInIcon /></SocialIcon>, href: '#', label: 'LinkedIn' },
    ],
  },
  {
    id: 'emily',
    name: 'Emily Davis',
    role: 'PRODUCT MANAGER',
    imageUrl: '/team/member-5.png',
    socials: [
      { icon: <SocialIcon><XIcon /></SocialIcon>, href: '#', label: 'Twitter' },
      { icon: <SocialIcon><Globe size={14} /></SocialIcon>, href: '#', label: 'Website' },
    ],
  },
];

export const TeamCarouselDemo: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #0a0a0f 0%, #111118 30%, #0d0d14 100%)',
        fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Title */}
      <div className="text-center mb-6 mt-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight leading-tight">
          <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
            Modern
          </span>{' '}
          Team Carousel
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
          A sleek 3D carousel showcasing team members with interactive transitions
        </p>
      </div>

      {/* Carousel */}
      <TeamCarousel
        members={teamMembers}
        radius={300}
        cardWidth={240}
        cardHeight={320}
        autoPlay={4000}
        heading="OUR TEAM"
      />

      {/* Footer */}
      <p className="text-gray-600/40 text-xs mt-8 tracking-widest uppercase">
        Use arrows, dots, or click any card ✨
      </p>
    </div>
  );
};
