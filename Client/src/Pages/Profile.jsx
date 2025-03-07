import React from "react";

const user = {
  name: "John",
  email: "john@example.com",
  contact_no: "0987654321",
  position: "Student",
  usage_time: "4hr",
  No_of_test: "5",
  Jioned_on: "25-10-2024",
  test_data: [
    { subject: "Maths", score: 5 },
    { subject: "Physics", score: 50 },
    { subject: "Biology", score: 55 },
  ],
};

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 to-blue-600 text-gray-900 flex flex-col items-center py-10">
      {/* Profile Header */}
      <h1 className="text-5xl font-bold text-white bg-black w-full text-center py-5 rounded-lg shadow-md">
        Your Profile
      </h1>

      {/* Profile Details */}
      <div className="bg-white shadow-lg rounded-lg p-8 mt-6 w-3/4 max-w-2xl">
        <p className="text-xl font-semibold">👤 Name: {user.name}</p>
        <p className="text-lg text-gray-700">📧 Email: {user.email}</p>
        <p className="text-lg text-gray-700">📞 Phone: {user.contact_no}</p>
        <p className="text-lg text-gray-700">🎓 Position: {user.position}</p>
      </div>

      {/* Participation Details */}
      <div className="bg-white shadow-lg rounded-lg p-8 mt-6 w-3/4 max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Participation
        </h2>
        <p className="text-lg text-gray-700">⏳ Average Usage: {user.usage_time}</p>
        <p className="text-lg text-gray-700">📝 Tests Taken: {user.No_of_test}</p>
      </div>

      {/* Test Scores Table */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-3/4 max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Test Scores
        </h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              {user.test_data.map((unit, index) => (
                <th key={index} className="border border-gray-300 px-4 py-2">
                  {unit.subject}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="text-center bg-gray-100">
              {user.test_data.map((unit, index) => (
                <td key={index} className="border border-gray-300 px-4 py-2">
                  {unit.score}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Additional Info */}
      <div className="bg-white shadow-lg rounded-lg p-8 mt-6 w-3/4 max-w-2xl text-center">
        <h3 className="text-xl font-semibold">📅 Active Since: {user.Jioned_on}</h3>
      </div>
    </div>
  );
};

export default Profile;
