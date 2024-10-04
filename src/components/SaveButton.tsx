import { useSavedNumbers } from '../app/context/SavedNumbersContext';

type SaveButtonProps = {
  currentNumbers: number[];
};

export function SaveButton({ currentNumbers }: SaveButtonProps) {
  const { addSavedSet } = useSavedNumbers();

  return (
    <button 
      onClick={() => addSavedSet(currentNumbers)}
      className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
    >
      Save Current Set
    </button>
  );
}