import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import 'chart.js/auto';

const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulated fetch from local JSON or Mongo
    const fetchData = async () => {
      try {
        // Mock data - replace this with API call if needed
        const analytics = {
          followers: [1200, 1250, 1280, 1295, 1330, 1360, 1400],
          engagement: [
            { post: 1, likes: 320, comments: 25 },
            { post: 2, likes: 400, comments: 40 },
            { post: 3, likes: 290, comments: 10 },
            { post: 4, likes: 500, comments: 60 },
            { post: 5, likes: 450, comments: 50 },
          ],
          bestPostTime: "Wednesday 7 PM",
        };

        setData(analytics);
      } catch (error) {
        console.error("Error loading analytics:", error);
      }
    };

    fetchData();
  }, []);

  if (!data) return <div>Reading Analytics...</div>;

  // Prepare Line Chart data
  const chartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Follower Growth",
        data: data.followers,
        borderColor: "#4bc0c0",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="mt-5">
      <h2>Instagram Analytics</h2>

      <div className="my-4">
        <h4>Follower Growth (Last 7 Days)</h4>
        <Line data={chartData} />
      </div>

      <div className="mt-4">
        <h4>Engagement Summary</h4>
        {data.engagement.map((post, idx) => (
          <p key={idx}>
            Post {post.post}: {post.likes} Likes, {post.comments} Comments
          </p>
        ))}
      </div>

      <div className="mt-3">
        <h4>Best Time to Post</h4>
        <p>{data.bestPostTime}</p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
