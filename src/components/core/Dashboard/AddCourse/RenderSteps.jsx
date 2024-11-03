import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa"
import CourseInformation from './CourseInformation/CourseInformation';
import CourseBuliderForm from './CourseBuilder/CourseBuliderForm';
import PublishCourse from './PublishCourse';

export default function RenderSteps() {
    const {step}=useSelector((state)=>state.course);

    const steps=[
        {
            id:1,
            title:"Course Information",
        },
        {
            id:2,
            title:"Course Builder",
        },
        {
            id:3,
            title:"publish",
        },

    ]
  return (
    <>
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item,index) => (
          < React.Fragment key={item.id}>
            <div
              className="flex flex-col items-center "
             
            >
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                } ${step > item.id && "bg-yellow-50 text-yellow-50"}} `}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-richblack-900" />
                ) : (
                  item.id
                )}
              </button>
              
            </div>
            {item.id !== steps.length && (
              <React.Fragment>
                <div
                  className={`h-[calc(34px/2)] w-[33%]  border-dashed border-b-2 ${
                  step > item.id  ? "border-yellow-50" : "border-richblack-500"
                } `}
                ></div>
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <React.Fragment  key={item.id}>
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
             
            >
              
              <p
                className={`text-sm ${
                  step >= item.id ? "text-richblack-5" : "text-richblack-500"
                }`}
              >
                {item.title}
              </p>
            </div>
            
          </React.Fragment>
        ))}
      </div>
    {step===1 && <CourseInformation/>}
   {step===2 && <CourseBuliderForm/>}
  {step===3 && <PublishCourse/>}
    </>
  )
}
