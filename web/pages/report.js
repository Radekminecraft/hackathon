import { useState, useEffect } from "react";
import Header from "@/components/header";

export async function getServerSideProps() {
  const animals = await prisma.animal.findMany({
    include: {
      updates: true,
    },
  });
  return {
    props: {
      animals: JSON.parse(JSON.stringify(animals)),
    },
  };
}

export default function Report({ animals }) {
  const [hour, setHour] = useState(0); // Default hour
  const [average, setAverage] = useState(null); // Average for the selected hour

  const handleHourChange = (selectedHour) => {
    const targetHour = parseInt(selectedHour, 10) || 0;
    setHour(targetHour);
  };

  useEffect(() => {
    if (animals && hour !== null) {
      const now = new Date();

      // Calculate the dates for yesterday and the day before yesterday
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      const dayBeforeYesterday = new Date(now);
      dayBeforeYesterday.setDate(now.getDate() - 2);

      // Filter updates for the selected hour
      const filteredUpdates = (updates, targetDate) =>
        updates.filter((update) => {
          const updateDate = new Date(update.updateAt);
          return (
            updateDate.getDate() === targetDate.getDate() &&
            updateDate.getHours() === hour
          );
        });

      // Extract and compute the average for all animals
      const averages = animals.map((animal) => {
        const updates = animal.updates;
        const yesterdayUpdates = filteredUpdates(updates, yesterday);
        const dayBeforeUpdates = filteredUpdates(updates, dayBeforeYesterday);

        const values = [
          ...yesterdayUpdates.map((u) => u.animalsIn),
          ...dayBeforeUpdates.map((u) => u.animalsIn),
        ];

        if (values.length === 0) return null;
        const avg =
          values.reduce((sum, count) => sum + count, 0) / values.length;
        return { type: animal.type, average: avg };
      });

      setAverage(averages.filter((avg) => avg !== null));
    }
  }, [hour, animals]);

  return (
    <>
      <Header />
      <div className="p-8 font-sans bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
          Animal Report
        </h1>

        <div className="flex justify-center items-center mb-6">
          <label
            htmlFor="hour"
            className="text-xl font-medium mr-2 text-blue-600"
          >
            Hour of the Day (0-23):
          </label>

          {/* Custom Number Input */}
          <div className="flex items-center border border-blue-400 rounded-lg overflow-hidden">
            <button
              onClick={() => handleHourChange(hour > 0 ? hour - 1 : 23)}
              className="w-12 h-12 bg-blue-500 text-white text-2xl font-semibold hover:bg-blue-600 focus:outline-none"
            >
              -
            </button>
            <input
              type="text"
              value={hour}
              readOnly
              className="w-16 text-center py-2 bg-white text-xl font-semibold border-l-2 border-r-2 border-blue-400 focus:outline-none"
            />
            <button
              onClick={() => handleHourChange(hour < 23 ? hour + 1 : 0)}
              className="w-12 h-12 bg-blue-500 text-white text-2xl font-semibold hover:bg-blue-600 focus:outline-none"
            >
              +
            </button>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Average Animal Counts for Selected Hour
        </h2>
        <ul className="space-y-4">
          {average &&
            average.map((animal) => (
              <li
                key={animal.type}
                className="flex justify-between items-center p-4 bg-white border-2 border-gray-300 rounded-lg shadow-md hover:bg-gray-100 transition"
              >
                <span className="text-lg font-medium text-gray-700">
                  {animal.type}
                </span>
                <span className="text-lg font-semibold text-gray-800">
                  {animal.average.toFixed(2)}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
