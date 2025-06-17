import Database from "../Database/index.js";
import model from "./model.js";
import {v4 as uuidv4} from "uuid";

export function findModulesForCourse(courseId) {
    return model.find({ course: courseId });
    // const { modules } = Database;
    // return modules.filter((module) => module.course === courseId);
}

export function deleteModule(moduleId) {
    return model.deleteOne({ _id: moduleId });
    // const { modules } = Database;
    // const initialLength = modules.length;
    //
    // Database.modules = modules.filter((module) => module._id !== moduleId);
    // // I wasn't sure what to return, so I asked ChatGPT
    // return Database.modules.length < initialLength;
}

export function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    return model.create(newModule);
    // Database.modules = [...Database.modules, module];
    // return module;
}

export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, moduleUpdates);
    // const { modules } = Database;
    // const module = modules.find((module) => module._id === moduleId);
    // Object.assign(module, moduleUpdates);
    // return module;
}
