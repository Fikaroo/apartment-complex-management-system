
import React from 'react'
type IProps={
  headers:string[],
    }
const Tables:React.FC<IProps> = ({headers}) => {

  return (
    <React.Fragment>
  <div className="flex flex-1">
  <div className="py-4 overflow-x-auto sm:mx-6 sm:px-6 lg:mx-8 lg:px-8">
    <div className="align-middle inline-block min-w-full  overflow-hidden sm:rounded-lg border-b border-gray-200">
      <table className="min-w-full">
        <thead>
          <tr>
          {
            headers.map((header,id)=>(
              <th key={id} className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
            ))
          }
          </tr>
         
        
        </thead>
        <tbody>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <img className="rounded-full" src="/icons/exclamation.svg" alt="" />
                </div>
                <div className="ml-4">
                  <div className="text-sm leading-5 font-medium text-gray-900">31.03.2023</div>
          
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-gray-900">Director</div>
      
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
            
                A menzili
             
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
            Menzil
            </td>
            <td className="px-6 py-4 whitespace-no-wrap text-right border-b  border-gray-200 text-sm leading-5 font-medium">
              <img className='ml-4' src='/icons/edit.svg'/>
            </td>
          </tr>
          <tr>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10  flex items-center justify-center">
                  <img className="rounded-full" src="/icons/checked.svg" alt="" />
                </div>
                <div className="ml-4">
                  <div className="text-sm leading-5 font-medium text-gray-900">Bernard Lane</div>
                  
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <div className="text-sm leading-5 text-gray-900">Director</div>
           
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
             
                Active
              
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
              Owner
            </td>
            <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
            <img className='ml-4' src='/icons/edit.svg'/>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
  </div>
</div>

    </React.Fragment>
  )
}

export default Tables