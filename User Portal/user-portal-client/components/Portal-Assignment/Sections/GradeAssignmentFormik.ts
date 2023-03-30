import * as yup from "yup";
export const InitialValues = {
    gradedBy: '',
    remark: '',
    marksObtained: 0
}

export const GASchema = yup.object().shape({
    marksObtained: yup.number().required('Provide the marks obtained'),
    remark: yup.string().required('Leave a remark')
})