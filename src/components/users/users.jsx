import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../api/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUsers();
        if (response.status === 200) {
          setUsers(Array.isArray(response.data) ? response.data : []);
        } else {
          setError("Failed to fetch users");
          setUsers([]);
        }
      } catch (err) {
        setError("Error fetching users: " + err.message);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  if (!users || users.length === 0) {
    return <div className="text-center py-8">No users found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {users.map((user) => (
        <div
          key={user._id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {user.profilePicture && (
            <img
              src={user.profilePicture}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Contact:</span> {user.contactNumber}
            </p>
            {user.dateOfBirth && (
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Date of Birth:</span>{" "}
                {new Date(user.dateOfBirth).toLocaleDateString()}
              </p>
            )}
            {user.enrollmentNumber && (
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Enrollment Number:</span>{" "}
                {user.enrollmentNumber}
              </p>
            )}
            {user.department && (
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Department:</span> {user.department}
              </p>
            )}
            {user.passoutYear && (
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Passout Year:</span>{" "}
                {user.passoutYear}
              </p>
            )}
            {user.semester && (
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Semester:</span> {user.semester}
              </p>
            )}
            {user.role && user.role.length > 0 && (
              <div className="mt-2">
                <h4 className="font-medium mb-1">Roles:</h4>
                <ul className="list-disc list-inside text-gray-600">
                  {user.role.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users; 