"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Star } from "lucide-react";
import { FaLinkedinIn, FaXTwitter, FaInstagram } from "react-icons/fa6";
import GlassCard from "@/components/ui/GlassCard";
import LazyImage from "@/components/ui/LazyImage";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface Agent {
  id: string;
  name: string;
  slug: string;
  title: string;
  email: string;
  phone: string;
  image: string;
  bio: string;
  specialties: string[];
  socialLinks: { platform: string; url: string }[];
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
}

interface AgentCardProps {
  agent: Agent;
  index?: number;
}

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: <FaLinkedinIn className="w-4 h-4" />,
  twitter: <FaXTwitter className="w-4 h-4" />,
  instagram: <FaInstagram className="w-4 h-4" />,
};

export default function AgentCard({ agent, index = 0 }: AgentCardProps) {
  return (
    <GlassCard delay={index * 0.1} className="overflow-hidden group">
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden">
          <LazyImage
            src={agent.image}
            alt={agent.name}
            className="w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />
        </div>
        {agent.isFeatured && (
          <div className="absolute top-3 left-3">
            <Badge variant="gold">Featured</Badge>
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-bold text-white">{agent.name}</h3>
          <p className="text-sm text-gold-400">{agent.title}</p>
        </div>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
          <span className="text-sm text-white/70">
            <span className="font-num">{agent.rating}</span> (<span className="font-num">{agent.reviewCount}</span> reviews)
          </span>
        </div>
        <p className="text-sm text-white/60 line-clamp-2">{agent.bio}</p>
        <div className="flex flex-wrap gap-2">
          {agent.specialties.map((specialty) => (
            <span
              key={specialty}
              className="text-xs px-2.5 py-1 rounded-full border border-white/10 text-white/50"
            >
              {specialty}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 pt-2 border-t border-white/5">
          {agent.socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-white/40 hover:text-gold-400 hover:border-gold-400/30 transition-colors"
            >
              {socialIcons[link.platform]}
            </a>
          ))}
          <div className="flex-1" />
          <Button
            variant="ghost"
            size="sm"
            icon={<Mail className="w-3.5 h-3.5" />}
            onClick={() => (window.location.href = `mailto:${agent.email}`)}
          >
            Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={<Phone className="w-3.5 h-3.5" />}
            onClick={() => (window.location.href = `tel:${agent.phone}`)}
          >
            Call
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
