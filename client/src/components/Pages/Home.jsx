import React from "react";

const Home = ({ data }) => {
  if (!data) {
    return <div>No data available</div>;
  }
  return (


    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">ID</th>
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Age</th>
          <th className="px-4 py-2">Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="border px-4 py-2">{item.id}</td>
            <td className="border px-4 py-2">{item.name}</td>
            <td className="border px-4 py-2">{item.age}</td>
            <td className="border px-4 py-2">{item.email}</td>
          </tr>
        ))}
      </tbody>
    </table>

  );
};

export default Home;
