import * as yup from "yup";
export const InitialValues = {
    submissionFile: '',
    studentComment: '',
}

export const SASchema = yup.object().shape({
    submissionFile: yup.string().required("Please provide your assignment submission file."),
    studentComment: yup.string().min(5, 'Student Comment has to be longer than 5 characters')
})