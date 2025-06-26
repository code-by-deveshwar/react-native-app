import { TextInput } from "react-native";

/**
 * SearchBar component
 * Reusable search input for filtering users
 */
export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (text: string) => void;
}) {
  return (
    <TextInput
      className="bg-white/90 text-black p-3 rounded-2xl mb-4 mt-10 h-12"
      placeholder="Search by name..."
      placeholderTextColor="#666"
      value={value}
      onChangeText={onChange}
    />
  );
}
