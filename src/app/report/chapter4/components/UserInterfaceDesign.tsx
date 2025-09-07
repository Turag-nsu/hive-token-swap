import React from 'react';
import { UIDesignPrinciples } from './UIDesignPrinciples';
import { MobileResponsiveness } from './MobileResponsiveness';

export const UserInterfaceDesign: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl text-purple-400 mt-6">4.5 User Interface Design</h3>
      <p className="text-gray-300 leading-relaxed">
        The user interface follows modern design principles:
      </p>

      <h4 className="text-lg text-cyan-400 mt-4">4.5.1 Design System</h4>
      <p className="text-gray-300 leading-relaxed">
        The platform implements a consistent design system with:
      </p>
      <ul className="text-gray-300 list-disc list-inside mt-2 space-y-1">
        <li>Dark/light theme support</li>
        <li>Glassmorphism effects</li>
        <li>Futuristic color palette</li>
        <li>Responsive layouts</li>
        <li>Animated transitions</li>
      </ul>
      
      <UIDesignPrinciples />
      <MobileResponsiveness />
    </div>
  );
};