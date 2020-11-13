import { projectsApi } from "../api/api"
import { categoriesFetching } from "./categories"

export const setProjects = (projects) => ({
    type: 'SET_PROJECTS',
    projects
}) 
export const addProject = (project) => ({
    type: 'ADD_PROJECTS',
    project
}) 
export const editProjectSuccess = (project) => ({ 
    type: 'EDIT_PROJECT',
    project
})
export const removeProject = (project) => ({
    type: 'REMOVE_PROJECT',
    project
})  



export const getProjects = () => (dispatch) => {
    dispatch(categoriesFetching(true))
    projectsApi.getProjects()
        .then(res => { 
            dispatch(setProjects(res.data)) 
            dispatch(categoriesFetching(false))
        })
}

export const createProject = (formData) => (dispatch) => { 
    projectsApi.createProject(formData).then(res => { 
        dispatch(getProjects())
    })
}

export const editProject = (formData) => (dispatch) => {
    projectsApi.editProject(formData).then(res => {
        dispatch(editProjectSuccess(res.data))
    })
}  

export const deleteProject = (formData) => (dispatch) => {
    projectsApi.deleteProject(formData).then(res => {
        dispatch(getProjects())
    })
}