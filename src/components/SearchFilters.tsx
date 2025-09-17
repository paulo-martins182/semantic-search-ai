"use client";
import { useRouter } from "next/navigation";
import { IoIosSearch } from "react-icons/io";

export const SearchFilters = () => {
  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("q")?.toString().trim() || "";

    if (query) {
      router.push(`/?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative mb-5">
        <input
          name="q"
          type="text"
          placeholder="Search you prefer (e.g. 'something light and sweet')"
          className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <IoIosSearch className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
      </div>
    </form>
  );
};

export default SearchFilters;
