import React from 'react';

interface SetMembersFormProps {
    handleMembersChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSetMembers: () => Promise<void>;
}

const SetMembersForm = ({ handleMembersChange, handleSetMembers }: SetMembersFormProps) => {
    return (
        <div className="mt-4">
            <textarea
                className="w-full p-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter members (one per line)"
                onChange={handleMembersChange}
                rows={10} // Adjust the number of rows as needed
            />
            <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                onClick={handleSetMembers}
            >
                Set Members
            </button>
        </div>
    );
};

export default SetMembersForm;