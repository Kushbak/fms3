const initialState = {
    transactions: [
        // {
        //     id: 9,
        //     date: new Date().toLocaleString().slice(0, -3),
        //     type: 'Расход',
        //     amount: 200,
        //     account: 'Наличные',
        //     contragent: 'Айсалкын',
        //     category: 'Коммерческие проекты',
        //     project: 'Neobis Clubs',
        // },
        // {
        //     id: 8,
        //     date: new Date().toLocaleString().slice(0, -3),
        //     type: 'Расход',
        //     amount: 180,
        //     account: 'Элсом',
        //     contragent: 'Санира',
        //     category: 'Оплаты за курсы',
        //     project: 'Neolabs',
        // },
        // {
        //     id: 7,
        //     date: new Date().toLocaleString().slice(0, -3),
        //     type: 'Расход',
        //     amount: 180,
        //     account: 'KICB',
        //     contragent: 'Айсалкын',
        //     category: 'Оплаты за курсы',
        //     project: 'Neobis Clubs',
        // },
        // {
        //     id: 6,
        //     date: new Date().toLocaleString().slice(0, -3),
        //     type: 'Расход',
        //     amount: 200,
        //     account: 'KICB',
        //     contragent: 'Нодир',
        //     category: 'Коммуналка',
        //     project: 'Neobis Clubs',
        // },
        // {
        //     id: 5,
        //     date: new Date().toLocaleString().slice(0, -3),
        //     type: 'Расход',
        //     amount: 180,
        //     account: 'Демир банк',
        //     contragent: 'Санира',
        //     category: 'Зарплата',
        //     project: 'Neolabs',
        // },
        // {
        //     id: 4,
        //     date: new Date().toLocaleString().slice(0, -3),
        //     type: 'Расход',
        //     amount: 180,
        //     account: 'Наличные',
        //     contragent: 'Айсалкын',
        //     category: 'Зарплата',
        //     project: 'Neobis Clubs',
        // },
        // {
        //     id: 3,
        //     date: new Date().toLocaleString().slice(0, -3),
        //     type: 'Расход',
        //     amount: 180,
        //     account: 'Элсом',
        //     contragent: 'Нодир',
        //     category: 'Аренда',
        //     project: 'Neobis Studio',
        // },
        // {
        //     id: 2,
        //     date: new Date().toLocaleString().slice(0, -3),
        //     type: 'Доход',
        //     amount: 180,
        //     account: 'Элсом',
        //     contragent: 'Легенда',
        //     category: 'Премия',
        //     project: 'Neobis Studio',
        // },
        // {
        //     id: 1,
        //     date: new Date().toLocaleString().slice(0, -3),
        //     type: 'Доход',
        //     amount: 200,
        //     account: 'Демир банк',
        //     contragent: 'Легенда',
        //     category: 'Аренда',
        //     project: 'Neobis Clubs',
        // },
    ],
    transactionsFetching: false,
    creatingTransaction: false,
    isPostMsgDisplayed: false,
    totalTransactionsCount: 0,
    currentPage: 1,
    pagesSize: 10,
}

const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_TRANSACTIONS': {
            return {
                ...state,
                transactions: [...action.transactions]
            }
        }
        case 'ADD_TRANSACTION': {
            return {
                ...state,
                transactions: [ { id: state.transactions.length + 1, ...action.transaction }, ...state.transactions ]
            }
        }
        case 'TRANSACTIONS_FETCHING': {
            return {
                ...state,
                transactionsFetching: action.transactionsFetching
            }
        }
        case 'CREATING_TRANSACTION': {
            return {
                ...state,
                creatingTransaction: action.creatingTransaction
            }
        } 
        case 'DISPLAY_POST_MSG': {
            return {
                ...state,
                isPostMsgDisplayed: action.postMsg
            }
        }
        case 'SET_CURRENT_PAGE': {
            return { ...state, currentPage: action.currentPage }
        }

        case 'SET_TOTAL_USERS_COUNT': {
            return { ...state, totalUsersCount: action.totalUsersCount }
        }
        default:
            return state
    }
}

export default transactionsReducer