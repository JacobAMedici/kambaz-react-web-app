import {createSlice} from "@reduxjs/toolkit";
import {courses, enrollments} from "../Database";
import {v4 as uuidv4} from "uuid";
import * as courseClient from "../Courses/client";
import * as userClient from "../Account/client";

const initialState = {
    courses: courses,
    enrollments: enrollments
};

// The following three functions were generated with the help of ChatGPT as I did not know
// how to implement them properly using the reading due to my implementation
export const addCourseAsync = (course: any) => async (dispatch: any) => {
    try {
        const newCourse = await userClient.createCourse(course);
        dispatch(addCourse(newCourse));
    } catch (e) {
        console.error("Failed to add course", e);
    }
};

export const deleteCourseAsync = (courseId: string) => async (dispatch: any) => {
    try {
        await courseClient.deleteCourse(courseId);
        dispatch(deleteCourse(courseId));
    } catch (e) {
        console.error("Failed to delete course", e);
    }
}

export const updateCourseAsync = (course: any) => async (dispatch: any) => {
    try {
        const updatedCourse = await courseClient.updateCourse(course);
        dispatch(updateCourse(updatedCourse));
    } catch (e) {
        console.error("Failed to update course", e);
    }
};

export const enrollAsync = (userId: string, courseId: string) => async (dispatch: any) => {
    try {
        await userClient.enrollInCourse(userId, courseId);
        dispatch(enroll({ userId, cid: courseId }));
    } catch (e) {
        console.error("Failed to enroll", e);
    }
};

export const unenrollAsync = (userId: string, courseId: string) => async (dispatch: any) => {
    try {
        await userClient.unenrollFromCourse(userId, courseId);
        dispatch(unenroll({ userId, cid: courseId }));
    } catch (e) {
        console.error("Failed to unenroll", e);
    }
};


const modulesSlice = createSlice({
    name: "courses",
    initialState,

    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload;
        },

        addCourse: (state, {payload: course}) => {
            state.courses = [...state.courses, {...course, _id: uuidv4()}] as any;
        },

        deleteCourse: (state, {payload: cid}) => {
            state.courses = state.courses.filter(
                (m: any) => m._id !== cid);
        },

        updateCourse: (state, { payload: updated }) => {
            state.courses = state.courses.map((c: any) =>
                c._id === updated._id ? updated : c
            );
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
export const {setCourses, addCourse, deleteCourse, updateCourse, enroll, unenroll} =
    modulesSlice.actions;
export default modulesSlice.reducer;