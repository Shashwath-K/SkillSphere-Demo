import React from 'react';
interface SpeechLoadingPopupProps {
  open: boolean;
}
const SpeechLoadingPopup: React.FC<SpeechLoadingPopupProps> = ({ open }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center space-y-4">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
        <p className="text-gray-700 font-semibold">Loading, please wait...</p>
      </div>
    </div>
  );
};


export default SpeechLoadingPopup;