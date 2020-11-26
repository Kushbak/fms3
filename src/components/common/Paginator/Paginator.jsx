import React, { useState } from 'react'
import styles from './Paginator.module.css'
import arrow from '../../../assets/img/icons/arrow.svg'


const Paginator = (props) => {
    let [portionNumber, setPortionNumber] = useState(1)
    let [pageNumber, setPageNumber] = useState()
    let portionSize = 10
    let pagesCount = Math.ceil(props.totalUsersCount / props.pagesSize)

    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionNumber = portionNumber * portionSize

    if(!pages.length) return <></>
    return (
        <div className={styles.paginator}>
            <div className={styles.forChangingPages}> 
                <img src={arrow} alt='left'
                    onClick={() => { setPortionNumber(portionNumber - 1) }} 
                    className={
                        [
                        styles.arrows, 
                        styles.leftArrow, 
                        portionNumber > 1 && styles.showedArrow
                    ].join(' ') } 
                />
                <div className={ styles.selectPageBlock }>
                    {pages
                        .filter(page => page >= leftPortionNumber && page <= rightPortionNumber)
                        .map(page => 
                            <button 
                            key={page}
                            onClick={() => { props.onChangeCurrentPage(page) }} 
                            className={ [styles.selectPageBtn, props.currentPage === page && styles.selectedPage].join(' ') }> 
                                { page }
                            </button>
                        )
                    } 
                </div>
                <img src={arrow} alt='right'
                    onClick={() => { setPortionNumber(portionNumber + 1) }} 
                    className={
                        [
                            styles.arrows, 
                            styles.rightArrow, 
                            portionCount > portionNumber && styles.showedArrow
                        ].join(' ') 
                    } 
                />
                <div className={ styles.setPageBlock }>
                    <input type="text" value={ pageNumber } onChange={ (e) => setPageNumber(e.target.value)  } />
                    <button onClick={ pageNumber ? () => props.onChangeCurrentPage(pageNumber) : undefined} >Перейти</button>
                </div>
            </div>
        </div>
    )
}

export default Paginator

