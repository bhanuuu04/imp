'use client';

import React from 'react';
import { 
  Users, 
  UserCheck, 
  Shield, 
  Mail, 
  Plus, 
  CheckCircle2, 
  Clock,
  Terminal,
  Key
} from 'lucide-react';

export function TeamPage() {
  const teamMembers = [
    {
      name: 'Elena Rostova',
      email: 'elena@astra.security',
      role: 'Head of Brand Protection',
      accessLevel: 'Admin / Full Authority',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      lastActive: '5 mins ago'
    },
    {
      name: 'Alex Mercer',
      email: 'alex@astra.security',
      role: 'Chief Information Security Officer',
      accessLevel: 'Security Admin',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      lastActive: '2 hours ago'
    },
    {
      name: 'Sarah Jenkins',
      email: 'sarah.j@astra.security',
      role: 'Lead Threat Analyst',
      accessLevel: 'Triage & Takedown Analyst',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      lastActive: 'Just now'
    },
    {
      name: 'Marcus Vance',
      email: 'marcus.v@astra.security',
      role: 'Legal & Intellectual Property Counsel',
      accessLevel: 'Legal Officer / DMCA Signer',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
      lastActive: 'Yesterday'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#030712] p-6 lg:p-8 space-y-6 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#1f2937]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
            <span className="text-[11px] font-semibold text-[#38bdf8] tracking-wider uppercase">
              Role-Based Access Control (RBAC)
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-[#f8fafc]">
            Security Team & Authorization
          </h1>
          <p className="text-xs text-[#94a3b8] mt-1 font-sans">
            Manage analysts authorized to triage quarantined brand messages and sign statutory DMCA requests.
          </p>
        </div>

        <button className="px-3.5 py-1.5 rounded-[6px] bg-[#38bdf8] hover:bg-[#7dd3fc] text-[#030712] text-xs font-bold transition flex items-center gap-1.5 active:scale-97">
          <Plus className="w-4 h-4" />
          Invite Officer
        </button>
      </div>

      {/* Team Roster Card */}
      <div className="pulumi-card overflow-hidden">
        <div className="px-5 py-3 border-b border-[#1f2937] bg-[#030712] flex items-center justify-between">
          <span className="text-xs font-semibold text-[#f8fafc] uppercase tracking-wider">
            Active SOC Analysts ({teamMembers.length})
          </span>
          <span className="text-xs text-[#94a3b8]">
            SAML 2.0 / OKTA SSO ATTESTED
          </span>
        </div>

        <div className="divide-y divide-[#1f2937]">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#111827]/80 transition">
              <div className="flex items-center gap-3.5">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-[6px] object-cover border border-[#1f2937]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-[#f8fafc] font-sans">{member.name}</span>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-900 px-2 py-0.5 rounded">
                      {member.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#94a3b8]">{member.email}</div>
                  <div className="text-xs text-[#94a3b8] mt-0.5">
                    <strong className="text-[#f8fafc]">{member.role}</strong> • <span>{member.accessLevel}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#94a3b8] self-end md:self-auto">
                <span className="tnum">Active {member.lastActive}</span>
                <button className="px-2.5 py-1 rounded-[6px] bg-[#111827] border border-[#1f2937] hover:bg-[#1f2937] text-[#94a3b8] hover:text-[#f8fafc] font-medium">
                  Manage Keys
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
