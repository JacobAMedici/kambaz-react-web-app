import { createSlice } from "@reduxjs/toolkit";
import * as courseClient from "../client.ts";

const initialState = {
    assignments: [],
};

// This was recommended by ChatGPT to handle async actions
export const loadAssignments = (courseId: any) => async (dispatch: any) => {
    const assignments = await courseClient.findAssignmentsForCourse(courseId);
    dispatch(setAssignments(assignments));
};

const modulesSlice = createSlice({
    name: "modules",
    initialState,
    reducers: {
        // I used ChatGPT to do the part of this file where it calculates the max ID already
        addAssignment: (state, { payload: assignment }) => {
            const maxId = state.assignments.reduce((max: number, a: any) => {
                const idNum = parseInt(a._id, 10);
                return isNaN(idNum) ? max : Math.max(max, idNum);
            }, 0);

            const newAssignment = {
                ...assignment,
                _id: (maxId + 1).toString(),
            };

            state.assignments = [...state.assignments, newAssignment] as any;
        },

        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === assignment._id ? assignment : a
            ) as any;
        },

        deleteAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (a: any) => a._id !== assignmentId);
        },

        setAssignments: (state, action) => {
            state.assignments = action.payload;
        }
    },
});
export const { addAssignment, deleteAssignment, updateAssignment, setAssignments } =
    modulesSlice.actions;
export default modulesSlice.reducer;