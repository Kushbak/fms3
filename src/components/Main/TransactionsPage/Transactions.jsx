import React, { useState }  from 'react' 
import styles from './Transactions.module.css'  
import 'react-tippy/dist/tippy.css'
import { Popover, Dialog } from '@material-ui/core' 
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state"
import FilterModal from '../../common/FilterModal/FilterModalContainer'
import { DataGrid } from '@material-ui/data-grid'
import 'react-tippy/dist/tippy.css'
import GreenButton from '../../common/GreenButton/GreenButton'
import EditTransactionContainer from '../../EditTransaction/EditTransactionContainer'


const Transactions = (props) => {   
    const [isExportModalOpen, setExportModalOpen] = useState(false)
    const [isModalOpen, setEditModal] = useState(false)
    
    return (
        <div className={ styles.transactions }>
            <div className={ styles.tabsBlock }> 
                <GreenButton onClick={() => setExportModalOpen(true)}>
                    Экспортировать
                </GreenButton> 
                <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                        <div> 
                            <GreenButton {...bindTrigger(popupState)}>
                                Фильтр
                            </GreenButton>  
                            <Popover 
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center"
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center"
                                }}
                            >  
                                <FilterModal pageNumber={props.pageNumber} pageSize={props.pageSize} /> 
                            </Popover>
                        </div>
                    )}
                </PopupState>
            </div>
            <div className={styles.transactionsBlock}>   
                <DataGrid
                    components={{
                        loadingOverlay: props.CustomLoadingOverlay,
                        pagination: props.CustomPagination,
                    }}
                    loading={props.transactionsFetching} 
                    autoHeight  
                    rows={props.rows} 
                    columns={props.columns} 
                    className={props.classes.root}  
                    onCellClick={(e) => {
                        if (e.rowModel.data.discriminator === 'Transaction'){
                            props.getEditedTransactionData(e.rowModel.data.id)
                        } else {
                            props.getEditedRemittanceData(e.rowModel.data.id)
                        }
                        setEditModal(true)
                    }}
                />
            </div>
            <Dialog onClose={() => setExportModalOpen(false)} aria-labelledby="export_transaction_data_dialog" open={isExportModalOpen}>
                <div className={styles.exportBlock}>
                    <div className={styles.btnBlock}>
                        <GreenButton onClick={() => props.downloadReport(props.filterValues, 'excel')}>Экспорт в Excel</GreenButton>
                        <GreenButton disabled>Экспорт в (PDF)</GreenButton>
                    </div>
                    <p className={styles.comment}>Вы можете экспортировать фильтрованные финактивы</p>
                </div>
            </Dialog>

            <EditTransactionContainer isModalOpen={isModalOpen} setEditModal={setEditModal}/>
        </div>
    )
}

export default Transactions
