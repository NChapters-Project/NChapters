import React from 'react'

const EditLeaders = () => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-32 ml-12 mr-12">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {/* Table header */}
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Leader's Name
            </th>
            <th scope="col" className="px-6 py-3">
              Leader's Email
            </th>
            <th scope="col" className="px-6 py-3">
              Club
            </th>
            
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
         
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              
              </td>
             
              
              <td className="px-6 py-4">
                <button onClick="" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
              </td>
              <td className="px-6 py-4">
               
                <button onClick="" className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
         
        </tbody>
      </table>
      
      
             
         
     
    </div>
  );
}

export default EditLeaders