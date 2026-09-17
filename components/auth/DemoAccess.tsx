'use client';

import React from 'react';
import { AnimatedIcon } from '../ui/AnimatedIcon';

export type DemoRoleType = 'doctor' | 'nurse' | 'admin' | 'staff';

interface DemoRoleConfig {
  id: DemoRoleType;
  title: string;
  description: string;
  email: string;
  iconType: 'doctor' | 'nurse' | 'admin' | 'staff';
  badgeColor: string;
}

const DEMO_ROLES: DemoRoleConfig[] = [
  {
    id: 'doctor',
    title: 'Doctor',
    description: 'Clinical workspace',
    email: 'dr.smith@medicare-health.org',
    iconType: 'doctor',
    badgeColor: 'text-medicare-blue bg-blue-500/10 border-blue-500/20',
  },
  {
    id: 'nurse',
    title: 'Nurse',
    description: 'Patient care workspace',
    email: 'nurse.clara@medicare-health.org',
    iconType: 'nurse',
    badgeColor: 'text-medicare-teal bg-teal-500/10 border-teal-500/20',
  },
  {
    id: 'admin',
    title: 'Admin',
    description: 'Hospital operations',
    email: 'admin.marcus@medicare-health.org',
    iconType: 'admin',
    badgeColor: 'text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  },
  {
    id: 'staff',
    title: 'Staff',
    description: 'Support workspace',
    email: 'staff.james@medicare-health.org',
    iconType: 'staff',
    badgeColor: 'text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  },
];

interface DemoAccessProps {
  selectedRole: DemoRoleType | null;
  onSelectRole: (role: DemoRoleType, email: string) => void;
  className?: string;
}

export const DemoAccess: React.FC<DemoAccessProps> = ({
  selectedRole,
  onSelectRole,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
            Quick Demo Access
            <span className="w-1.5 h-1.5 rounded-full bg-medicare-teal animate-ping" />
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Explore MediCare using a sample account
          </p>
        </div>
        {selectedRole && (
          <span className="text-[11px] font-semibold text-medicare-blue dark:text-cyan-400">
            Credentials loaded ✓
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {DEMO_ROLES.map((role) => {
          const isSelected = selectedRole === role.id;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onSelectRole(role.id, role.email)}
              className={`p-3 rounded-2xl flex flex-col items-center text-center transition-all duration-300 group
                border backdrop-blur-md relative overflow-hidden
                ${
                  isSelected
                    ? 'bg-medicare-blue/10 dark:bg-cyan-500/15 border-medicare-blue dark:border-cyan-400 shadow-[0_0_15px_rgba(22,135,245,0.25)] scale-[1.02]'
                    : 'bg-white/60 dark:bg-slate-900/60 border-gray-200/80 dark:border-gray-800 hover:border-medicare-blue/40 hover:bg-white dark:hover:bg-slate-900 hover:-translate-y-0.5 shadow-sm'
                }`}
            >
              {/* Selected top indicator bar */}
              {isSelected && (
                <span className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-medicare-blue to-medicare-teal" />
              )}

              {/* Icon */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6
                  ${role.badgeColor}`}
              >
                <AnimatedIcon type={role.iconType} size={18} />
              </div>

              {/* Role Name */}
              <span
                className={`text-xs font-bold leading-tight ${
                  isSelected ? 'text-medicare-blue dark:text-cyan-300' : 'text-gray-900 dark:text-white'
                }`}
              >
                {role.title}
              </span>

              {/* Description */}
              <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                {role.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
