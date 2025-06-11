import Database from "../Database/index.js";

export function findModulesForCourse(courseId) {
    const { modules } = Database;
    return modules.filter((module) => module.course === courseId);
}
export function deleteModule(moduleId) {
    const { modules } = Database;
    const initialLength = modules.length;

    Database.modules = modules.filter((module) => module._id !== moduleId);
    // I wasn't sure what to return, so I asked ChatGPT
    return Database.modules.length < initialLength;
}

export function createModule(module) {
    Database.modules = [...Database.modules, module];
    return module;
}
export function updateModule(moduleId, moduleUpdates) {
    const { modules } = Database;
    const module = modules.find((module) => module._id === moduleId);
    Object.assign(module, moduleUpdates);
    return module;
}
