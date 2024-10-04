// src/components/SetMembersForm.tsx 
import styles from '../styles/Home.module.css';

interface SetMembersFormProps {
    handleMembersChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSetMembers: () => Promise<void>;
}

const SetMembersForm = ({ handleMembersChange, handleSetMembers }: SetMembersFormProps) => {
    return (
        <div>
            <textarea
                placeholder="Enter members (one per line)"
                onChange={handleMembersChange}
                rows={10} // Adjust the number of rows as needed
            />
            <button className={styles.card} onClick={handleSetMembers}>
                Set Members
            </button>
        </div>
    );
};

export default SetMembersForm;