import {createSlice} from "@reduxjs/toolkit";
import {courses, enrollments} from "../Database";
import {v4 as uuidv4} from "uuid";

const initialState = {
    courses: courses,
    enrollments: enrollments
};
const modulesSlice = createSlice({
    name: "courses",
    initialState,

    reducers: {
        addCourse: (state, {payload: course}) => {
            state.courses = [...state.courses, {...course, _id: uuidv4()}] as any;
            console.log("Adding course");
        },

        deleteCourse: (state, {payload: cid}) => {
            state.courses = state.courses.filter(
                (m: any) => m._id !== cid);
        },

        updateCourse: (state, {payload: course}) => {
            state.courses = state.courses.map((m: any) =>
                m._id === course._id ? course : m
            ) as any;
        },

        enroll: (state, { payload: payload }) => {
            const alreadyEnrolled = state.enrollments.some(
                (enrollment: any) =>
                    enrollment.user === payload.userId && enrollment.course === payload.cid
            );

            if (!alreadyEnrolled) {
                state.enrollments = [...state.enrollments,
                    {
                        _id: uuidv4(),
                        user: payload.userId,
                        course: payload.cid
                    }
                ] as any;
            }
        },

        unenroll: (state, {payload: payload}) => {
            state.enrollments = state.enrollments.filter(
                (enrollment: any) =>
                    !(enrollment.user === payload.userId && enrollment.course === payload.cid)
            );
        },

    },
});
export const {addCourse, deleteCourse, updateCourse, enroll, unenroll} =
    modulesSlice.actions;
export default modulesSlice.reducer;