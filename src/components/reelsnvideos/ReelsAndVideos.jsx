import React, { useState, useEffect } from "react";
import { getAllReelsAndVideos } from "../../api/api";

const ReelsAndVideos = () => {
  const [reelsAndVideos, setReelsAndVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllReelsAndVideos();
        if (response.status === 200) {
          setReelsAndVideos(response.data?.data || []);
        } else {
          setError("Failed to fetch reels and videos");
        }
      } catch (err) {
        setError("An error occurred while fetching reels and videos");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (reelsAndVideos.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 dark:text-gray-400">No reels or videos found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reelsAndVideos.map((item) => (
        <div
          key={item._id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
        >
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {item.title}
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Type: {item.type}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Category: {item.category}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Uploaded: {new Date(item.uploadDate).toLocaleDateString()}
              </p>
            </div>
            {item.thumbnail && (
              <div className="mt-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded"
                />
              </div>
            )}
            {item.type === "video" && item.videoUrl && (
              <div className="mt-4">
                <video
                  src={item.videoUrl}
                  controls
                  className="w-full rounded"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReelsAndVideos; 