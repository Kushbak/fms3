import { projectsApi } from "../api/api"
import { categoriesFetching } from "./categories"
import { DisplayPostMsg } from "./transactions"

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
    try {
        dispatch(categoriesFetching(true))
        projectsApi.getProjects()
            .then(res => {
                dispatch(setProjects(res.data))
                dispatch(categoriesFetching(false))
            })
            .catch(e => {
                getProjects()
                console.log(e)
            })
    } catch (e) {
        console.log(e)
    }
}

export const createProject = (formData) => (dispatch) => {
    try {
        projectsApi.createProject(formData).then(res => {
            dispatch(getProjects())

            dispatch(DisplayPostMsg([res.data.message, true]))
        })
    } catch (e) {
        console.log(e)
    }
}

export const editProject = (formData) => (dispatch) => {
    try {
        projectsApi.editProject(formData).then(res => {
            dispatch(editProjectSuccess(res.data))

            dispatch(DisplayPostMsg([res.data.message, true]))
        })
    } catch (e) {
        console.log(e)
    }
}

export const deleteProject = (formData) => (dispatch) => {
    try {
        projectsApi.deleteProject(formData).then(res => {
            dispatch(getProjects())

            dispatch(DisplayPostMsg([res.data.message, true]))
        })
    } catch (e) {
        console.log(e)
    }
}