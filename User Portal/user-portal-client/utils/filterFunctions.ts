export const joinCoursesCS = (courses: Array<any>) => {
    const coursesIds = courses.map(course => {
      return course.value
    });
    return coursesIds.join(',');
  }