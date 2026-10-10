'use client';

import React from 'react';
import { 
  Users, 
  UserCheck, 
  Shield, 
  Mail, 
  Plus, 
  CheckCircle2, 
  Clock 
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
    <div className="flex-1 overflow-y-auto bg-[#f8fafc] p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase font-mono">
              Role-Based Access Governance
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
            Security Team & Authorization
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage analysts authorized to triage quarantined brand messages and sign statutory DMCA requests.
          </p>
        </div>

        <button className="px-3.5 py-1.5 rounded-md bg-sky-600 hover:bg-sky-700 text-white text-xs font-medium mercury-transition flex items-center gap-1.5 mercury-btn-press">
          <Plus className="w-4 h-4" />
          Invite Security Officer
        </button>
      </div>

      {/* Team Roster Card */}
      <div className="mercury-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/60 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Active SOC Analysts ({teamMembers.length})
          </span>
          <span className="text-xs text-slate-400 font-mono">
            SAML 2.0 / Okta SSO Connected
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 mercury-transition">
              <div className="flex items-center gap-3.5">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-900">{member.name}</span>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      {member.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">{member.email}</div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    <strong>{member.role}</strong> • <span className="text-slate-500">{member.accessLevel}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400 self-end md:self-auto">
                <span className="tnum">Active {member.lastActive}</span>
                <button className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium">
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
