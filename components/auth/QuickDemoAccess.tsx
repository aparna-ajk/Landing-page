'use client';

import React from 'react';
import { DemoRoleCard, DemoRoleType } from './DemoRoleCard';

interface DemoRoleConfig {
  id: DemoRoleType;
  title: string;
  description: string;
  email: string;
}

export const DEMO_ROLES: DemoRoleConfig[] = [
  {
    id: 'doctor',
    title: 'Doctor',
    description: 'Clinical Dashboard',
    email: 'dr.smith@medicare-health.org',
  },
  {
    id: 'nurse',
    title: 'Nurse',
    description: 'Care Workspace',
    email: 'nurse.clara@medicare-health.org',
  },
  {
    id: 'admin',
    title: 'Admin',
    description: 'Hospital Operations',
    email: 'admin.marcus@medicare-health.org',
  },
  {
    id: 'staff',
    title: 'Staff',
    description: 'Staff Workspace',
    email: 'staff.james@medicare-health.org',
  },
];

interface QuickDemoAccessProps {
  selectedRole: DemoRoleType | null;
  loadingRole?: DemoRoleType | null;
  onSelectRole: (role: DemoRoleType, email: string) => void;
  className?: string;
  dict?: {
    title: string;
    subtitle: string;
  };
}

export const QuickDemoAccess: React.FC<QuickDemoAccessProps> = ({
  selectedRole,
  loadingRole,
  onSelectRole,
  className = '',
  dict = {
    title: 'Quick Demo Access',
    subtitle: 'Explore MediCare using a predefined role.',
  },
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Header & Subtitle */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-[#102A43] dark:text-white flex items-center gap-1.5">
            {dict.title}
            <span className="w-1.5 h-1.5 rounded-full bg-[#18C7C9] animate-pulse" />
          </h4>
          <p className="text-[11px] text-[#627D98] dark:text-[#9FB3C8]">
            {dict.subtitle}
          </p>
        </div>
      </div>

      {/* 2x2 Grid on Desktop/Tablet */}
      <div className="grid grid-cols-2 gap-2">
        {DEMO_ROLES.map((role) => (
          <DemoRoleCard
            key={role.id}
            id={role.id}
            title={role.title}
            description={role.description}
            isSelected={selectedRole === role.id}
            isLoading={loadingRole === role.id}
            onClick={() => onSelectRole(role.id, role.email)}
          />
        ))}
      </div>
    </div>
  );
};
