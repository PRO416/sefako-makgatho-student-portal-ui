import axios from 'axios';

const SMU_REST_API = 'http://127.0.0.1:8000';

export const getOneStudent = (studentNo, password) => {
  return axios({
    method: 'post',
    url: `${SMU_REST_API}/authenticate`,
    headers: {}, 
    data: {
      studentNum: studentNo,
      password: password
    }
  });
}

export const getStudentCourse = (id) => {
  return axios({
    method: 'get',
    url: `${SMU_REST_API}/students/${id}/courses/`,
  });
}

export const sendPostgraduateApplication = (studentId, courseId) => {
  return axios({
    method: 'post',
    url: `${SMU_REST_API}/students/courses/postgraduate/`,
    // headers: {
    //   "Access-Control-Allow-Origin": "*"
    // },
    data: {
      student_id: studentId,
      course_id: courseId
    }
  });
}

export const getAllSchools = () => {
  return axios({
    method: 'get',
    url: `${SMU_REST_API}/schools/`,
  });
}

export const getSchoolCourses = schoolId => {
  return axios({
    method: 'get',
    url: `${SMU_REST_API}/schools/${schoolId}/courses/`,
  });
}

export const getStudentModules = (studentId, courseId) => {
  return axios({
    method: 'get',
    url: `${SMU_REST_API}/students/${studentId}/courses/${courseId}/modules`,
  });
}