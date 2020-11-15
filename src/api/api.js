import * as axios from 'axios' 

const instance = axios.create({ 
    baseURL: 'https://testrepobackend.herokuapp.com/',  
    headers: { 
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    }
}) 

export const authApi = { 
    setToken(token) { 
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + token; 
    },
    login(username, pass) { 
        return instance.post(`authenticate/login`, { 
            "Username": username, 
            "Password": pass
        }) 
    },
    register(formData) { 
        return instance.post(`authenticate/register`, { 
            "Username": formData.login,
            "Email": formData.email,
            "Password": formData.password
        })
    }
}

export const transactionsApi = {
    getTransactions(pageNumber = 1, pageSize = 10) { 
        return instance.get(`transaction/index?PageNumber=${pageNumber}&PageSize=${pageSize}`)
    },
    createTransactions(formData) { 
        return instance.post(`transaction/create`, formData)
    }
}

export const categoriesApi = {
    getCategories() {  
        return instance.get(`operation/Index`)
    },
    createCategory(formData) {   
        return instance.post(`operation/create`, { 
            "name": formData.name, 
            "operationTypeId": formData.type
        })
    },
    editCategory(formData) {
        return instance.put(`operation/edit`)
    },
    deleteCategory(id) { 
        return instance.delete(`operation/delete`, {
            "Id": id
        })
    }
} 
 
export const bankAccountsApi = {
    getScores() { 
        return instance.get(`score/scores`)
    },
    createScore() {
        return instance.post(`score/create`) 
    },
    editScore(formData) {
        return instance.put(`score/edit`)
    },
    deleteScore() {
        return instance.delete(`score/scores`) 
    }
}

export const contragentsApi = {
    getContragents() {
        return instance.get(`counterparty/index`)
    },
    createContragent() {
        return instance.post(`counterparty/index`)    
    },
    editContragent(formData) {
        return instance.put(`counterparty/edit`)
    },
    deleteContragent() {
        return instance.delete(`counterparty/index`)    
    }
}

export const projectsApi = {
    getProjects() {
        return instance.get(`project`)
    },
    createProject(formData) { 
        return instance.post(`project`, formData)    
    },
    editProject(formData) {
        return instance.put(`project`)
    },
    deleteProject() {
        return instance.delete(`project`)    
    }
}