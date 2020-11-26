import * as axios from 'axios' 

const instance = axios.create({ 
    baseURL: 'https://testrepobackend.herokuapp.com/',  
    headers: { 
        'Content-Type': 'application/json; charset=utf-8'
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
 
// ! edit, post
export const contragentsApi = {
    getContragents() {
        return instance.get(`counterparty/index`)
    },
    createContragent(formData) {
        return instance.post(`counterparty/create`, formData)
    },
    editContragent(formData) {
        return instance.put(`counterparty/edit`, formData)
    },
    deleteContragent(id) {
        return instance.delete(`counterparty/delete?id=${+id}`)
    }
}

export const statisticsApi = {
    getProjectStatistics() {
        return instance.get(`Finance/Projects`)
    },
    getOperationStatistics() {
        return instance.get(`Finance/Operations`)
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
        return instance.put(`operation/edit`, {
            "id": formData.id,
            "name": formData.name,
            "operationTypeId": formData.operationTypeId
        })
    },
    deleteCategory(id) {
        return instance.delete(`operation/delete?id=${+id}`)
    }
} 

// ! edit 
export const projectsApi = {
    getProjects() {
        return instance.get(`project`)
    },
    createProject(formData) {
        return instance.post(`project`, formData)
    },
    editProject(formData) {
        return instance.put(`project`, formData)
    },
    deleteProject(id) {
        return instance.delete(`project?id=${+id}`)
    }
}

export const remittanceApi = {
    getRemittance(pageNumber = 1, pageSize = 10) {
        return instance.get(`remittance/index?PageNumber=${pageNumber}&PageSize=${pageSize}`)
    },
    createRemittance(formData) { 
        debugger
        return instance.post(`remittance/create`, { 
            "actionDate": formData.actionDate,
            "sum": formData.sum,
            "scoreId":formData.scoreId,
            "score2Id": formData.score2Id,
            "description": formData.description
        })
    },
    editRemittance(formData) {
        return instance.put(`remittance/edit`, {
            "id": formData.id,
            "date": formData.date,
            "sum": +formData.sum,
            "scoreId": +formData.score1,
            "score2Id": +formData.score2,
            "description": formData.description,  
        })
    }
}

export const bankAccountsApi = {
    getBankAccounts() { 
        return instance.get(`score/scores`)
    },
    getBankAccountsDetail() {
        return instance.get(`score/scoresDetails`) 
    },
    createBankAccount(formData) {
        return instance.post(`score/create`, formData) 
    },
    editBankAccount(formData) { 
        return instance.put(`score/edit`, formData)
    },
    deleteBankAccount(id) {
        return instance.delete(`score/delete?id=${+id}`) 
    }
}

export const transactionsApi = {
    getTransactions(pageNumber = 1, pageSize = 10) {
        return instance.get(`financeactions/index?PageNumber=${pageNumber}&PageSize=${pageSize}`)
    },
    createTransaction(formData) { 
        return instance.post(`transaction/create`, { 
            "actionDate": formData.actionDate,
            "sum": formData.sum,
            "operationId": formData.operationId,
            "projectId": formData.projectId,
            "counterPartyId": formData.counterPartyId,
            "scoreId": formData.scoreId,
            "description": formData.description
        })
    },
    editTransaction(formData) {
        debugger
        return instance.put(`transaction/edit`, { 
            "id": formData.id,
            "actionDate": formData.actionDate,
            "sum": formData.sum, 
            "operationId": formData.operationId, 
            "projectId": formData.projectId, 
            "scoreId": formData.scoreId,
            "counterPartyId": formData.targetEntity, 
            "description": formData.description        
        })
    }
} 