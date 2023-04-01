export const joinDDListValues = (courses: Array<any>) => {
  if (courses && courses.length) {
    const coursesIds = courses.map(course => {
      return course.value
    });
    return coursesIds.join(',');
  } else {
    return '';
  }
}