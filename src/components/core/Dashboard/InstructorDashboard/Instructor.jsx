import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

const Instructor = () => {
    const {token}=useSelector((state)=>state.auth)
    const {user} =useSelector((state)=>state.profile)
    const [loading,setLoading]=useState(false)
    const[instructorData,setInstructorData]=useState([]);
    const [courses,setCourses]=useState([]);


    useEffect(()=>{
        const getCourseDataWithStats=async()=>{
            setLoading(false);
            const instructorApiData=await getInstructorData(token);
            const result= await fetchInstructorCourses(token);

            if( instructorApiData && instructorApiData.length)
                setInstructorData(instructorApiData);
            
            if(result){
                setCourses(result);
            }
            setLoading(false);

        }
        getCourseDataWithStats();

    },[])

    const totalAMount=instructorData?.reduce((acc,curr)=>acc+curr.totalAMountGenerated,0);
    const totalstudents=instructorData?.reduce((acc,curr)=>acc+curr.totalAMountGenerated,0);
  return (
    <div>I
    <div className='text-white'>
         <h1>hi {user?.firstName}</h1>
         <p>Lets start something new</p>
    </div>

    {loading?(<div className='spinner'></div>)
    :courses.length>0
    ?(<div>
        <div>
        <InstructorChart courses={instructorData}/>
        <div>
            <p>Statistics</p>
            <p>{courses.length}</p>
        </div>
        <div>
            <p>Total Students</p>
            <p>{totalstudents}</p>
        </div>

        <div>
            <p>totalIncome</p>
            <p>{totalAMount}</p>
        </div>
    </div>
    <div>
        <div>
            <p>Your Courses</p>
            <Link to="/dashboard/my-courses">
                   <p>View ALL</p>

            </Link>
        </div>
        <div>
            {
                courses.slice(0.3).map((course)=>{
                    <div>
                        <img
                            src={course.thumbnail}
                        />
                        <div>
                            <p>
                                {course.className}
                            </p>
                            <div>
                                <p>{course.studentsEnrolled.length}</p>
                                <p>|</p>
                                <p>Rs {courses.price}</p>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
    </div>):(
        <div>
            <p> U have not created any courses yet</p>
        </div>
    )
    }
    </div>
  )
}

export default Instructor