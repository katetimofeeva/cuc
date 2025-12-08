import React from "react";

interface Step {
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: Step[];
}

const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <ol className="space-y-6">
        {steps.map((step, index) => (
          <li
            key={index}
            className="flex "
          >
            {/* Step Number */}
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-custom-gradient shadow-border-shadow rounded-full text-lg font-bold">
              {index + 1}
            </div>
            {/* Content */}
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-gray-700">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProcessSteps;
