import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Eye, MessageCircle, Heart, Search } from "lucide-react";

const api = import.meta.env.VITE_API;

const fetchFlowers = async ({ queryKey }: { queryKey: string[] }) => {
    const [_key] = queryKey;
    const { data } = await axios.get(
        `${api}/user/blog?access_token=67e4e24624236cc35fd2032d&search`
    );
    return data;
};

const Blog = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["flowers"],
        queryFn: fetchFlowers,
    });

    const [search, setSearch] = useState("");

    const filteredData = data?.data.filter(
        (user: any) =>
            user.title.toLowerCase().includes(search.toLowerCase()) ||
            user.short_description.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    if (error)
        return (
            <div className="text-center py-10 text-red-500">
                Error fetching blog users
            </div>
        );

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">My Feed</h2>

            {/* Search Input */}
            <div className="relative mb-8 max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={20}
                />
            </div>

            {/* Blog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredData?.length > 0 ? (
                    filteredData.map((user: any, index: number) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition duration-300"
                        >
                            <h3 className="text-xl font-semibold mb-2">
                                {user.title}
                            </h3>
                            <p className="text-gray-700 text-sm mb-4">
                                {user.short_description}
                            </p>
                            <div className="flex justify-between text-gray-500 text-sm pt-4 border-t">
                                <div className="flex items-center gap-1">
                                    <Eye size={16} />
                                    {user.views || 0}
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageCircle size={16} />
                                    {user.comments || 0}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Heart size={16} />
                                    {user.likes || 0}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        No results found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
