import * as axios from 'axios'


const now = new Date()
const nextMonth = new Date().setMonth(now.getMonth() + 1)
const endOfMonth = new Date(nextMonth).setDate(now.getDate() - now.getDate())

const dateFormatting = (value) => {
    let a = new Date(value)

    let res = [
        addLeadZero(a.getMonth() + 1),
        addLeadZero(a.getDate()),
        a.getFullYear()
    ].join('.')

    console.log(res)

    function addLeadZero(val) {
        if (+val < 10) return '0' + val
        return val
    }
    return res
}

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
            "Username": formData.username,
            "Name": formData.firstName,
            "Surname": formData.lastName,
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
    },
    getStatistics(filterData) {
        let paramsObj = '?'
        if (filterData) {
            for (let item in filterData) {
                if (item !== 'StartDate' && item !== 'EndDate' && item !== 'OperationTypesId') {
                    filterData[item].forEach(value => {
                        paramsObj += `${item}=${value}&`
                    })
                }
            }
        }
        return instance.get(`Finance/Statistics${paramsObj}`, {
            params: {
                StartDate: filterData?.StartDate 
                    ? dateFormatting(filterData?.StartDate) 
                    : dateFormatting(new Date(new Date().setDate(1))),
                EndDate: filterData?.EndDate
                    ? dateFormatting(filterData?.EndDate)
                    : dateFormatting(new Date(endOfMonth)),
                OperationTypesId: filterData?.OperationTypesId
                    ? filterData?.OperationTypesId
                    : 1
            }
        })
    },
    getSettings() {
        return instance.get(`Finance/Settings`)
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
    createRemittance(formData) {
        return instance.post(`remittance/create`, {
            "actionDate": formData.actionDate,
            "sum": formData.sum,
            "scoreId": formData.scoreId,
            "score2Id": formData.score2Id,
            "description": formData.description
        })
    },
    getEditedRemittanceData(id) {
        return instance.get(`remittance/edit?id=${id}`)
    },
    editRemittance(formData) {
        return instance.put(`remittance/edit`, {
            "id": formData.id,
            "actionDate": formData.actionDate,
            "sum": +formData.sum,
            "scoreId": +formData.scoreId,
            "score2Id": +formData.score2Id,
            "description": formData.description,
        })
    }
}

export const bankAccountsApi = {
    getBankAccountsIndex() {
        return instance.get(`score/index`)
    },
    getBankAccountsDetail() {
        return instance.get(`score/scoresDetails`)
    },
    createBankAccount(formData) {
        return instance.post(`score/create`, formData)
    },
    editBankAccount(formData) {
        return instance.put(`score/edit`, {
            "id": formData.id,
            "code": formData.code,
            "name": formData.name,
            "paymentTypeId": formData.paymentTypeId
        })
    },
    deleteBankAccount(id) {
        return instance.delete(`score/delete?id=${+id}`)
    }
}

export const transactionsApi = {
    getTransactions(pageNumber = 1, pageSize = 10, filterData) {
        let paramsObj = ''
        if (filterData) {
            for (let item in filterData) {
                if (item !== 'StartDate' && item !== 'EndDate') {
                    filterData[item].forEach(value => {
                        paramsObj += `&${item}=${value}`
                    })
                }
            }
        }
        return instance.get(`financeactions/index?PageNumber=${pageNumber}&PageSize=${pageSize}${paramsObj}`, {
            params: {
                StartDate: filterData?.StartDate
                    ? dateFormatting(filterData.StartDate)
                    : dateFormatting(new Date(new Date().setDate(1))),
                EndDate: filterData?.EndDate
                    ? dateFormatting(filterData.EndDate)
                    : dateFormatting(new Date(endOfMonth)),
            }
        })
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
        return instance.put(`transaction/edit`, {
            "id": formData.id,
            "actionDate": formData.actionDate,
            "sum": formData.sum,
            "operationId": formData.operationId,
            "projectId": formData.projectId,
            "scoreId": formData.scoreId,
            "counterPartyId": formData.counterPartyId,
            "description": formData.description
        })
    },
    getEditedTransactionData(id) {
        return instance.get(`transaction/edit?id=${id}`)
    },
}

export const profileApi = {
    getProfile() {
        return instance.get(`User/GetUser`)
    },
    editProfile(formData) {
        return instance.put(`User/Edit`, formData)
    },
    changePassword(formData) {
        return instance.put(`User/ChangePassword`, formData)
    },
}
