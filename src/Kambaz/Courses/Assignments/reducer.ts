import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
const initialState = {
    assignments: assignments,
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
        }
    },
});
export const { addAssignment, deleteAssignment, updateAssignment } =
    modulesSlice.actions;
export default modulesSlice.reducer;