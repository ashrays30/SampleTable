import './index.css';
import {
  SINGLE_SELECTION,
  ACENDING_SORT_TYPE,
  DECENDING_SORT_TYPE,
  DEFAULT_SORT_TYPE
} from './constant.js'
import PropTypes from 'prop-types';
import { getKeyIndex, getSortLogic, filterIsSelectedforRadio } from './utils';
import { useEffect, useState } from 'react';
import sortingUpIcon from '../asserts/icons/sorting_up.svg'
import sortingDownIcon from '../asserts/icons/sorting_down.svg'
import sortingDefaultIcon from '../asserts/icons/sorting_default.svg'

function TableMain({ tableConfig, rowData, getSelectedRow, title }) {

  const MOBILE_WIDTH = 750;

  const { headers, isSelection, selectionType, isSortable } = tableConfig;
  const [data, setData] = useState([]);
  const [columnSortValue, setColumnSortValue] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth > MOBILE_WIDTH ? false : true);

  useEffect(() => {
    window.onresize = function(event) {
      if(event.target.innerWidth < MOBILE_WIDTH) {
        setIsMobile(true)
      }
      if(event.target.innerWidth > MOBILE_WIDTH) {
        setIsMobile(false)
      }
    };
  },[])

  useEffect(() => {
    const initData = []
    setColumnSortValue(getKeyIndex(headers).map(e => ({ ...e, sortValue: DEFAULT_SORT_TYPE })))
    rowData.length && rowData.forEach((row, index) => {
      initData.push({
        ...row,
        isSelected: row.isSelected || false,
        tableIndex: index
      })
    })

    if (selectionType === SINGLE_SELECTION) { filterIsSelectedforRadio(initData) }

    setData(initData)
  }, [rowData, tableConfig])


  const sortColumns = (columnKey) => {
    const clickedColumn = columnSortValue.find(col => col.key === columnKey);
    const sortValue = clickedColumn.sortValue;
    const isDecend = sortValue === DEFAULT_SORT_TYPE || sortValue === DECENDING_SORT_TYPE;
    if (isDecend) {
      clickedColumn.sortValue = ACENDING_SORT_TYPE
    } else {
      clickedColumn.sortValue = DECENDING_SORT_TYPE
    }
    const sortedData = data.sort(
      (col1, col2) => {
        const p1 = col1[columnKey].toString().toLowerCase();
        const p2 = col2[columnKey].toString().toLowerCase();
        return getSortLogic(p1, p2, isDecend);
      }
    )
    columnSortValue.map(col => {
      if(col.key !== columnKey){ 
        col.sortValue = DEFAULT_SORT_TYPE
      }
    })
    setColumnSortValue(columnSortValue)
    setData([...sortedData]);
  }

  const setSelectedValue = () => {
    getSelectedRow(data.filter(d => d.isSelected));
  }

  const handleCheckboxSelection = (tableIndex, isSelected) => {
    const clickedRow = data.find(row => row.tableIndex === tableIndex);
    clickedRow.isSelected = !isSelected;
    setData([...data]);
    setSelectedValue();
  }

  const handleRadioSelection = (tableIndex) => {
    data.map(row => (row.isSelected = row.tableIndex === tableIndex ? true : false))
    setData([...data]);
    setSelectedValue();
  }

  const getSortingIcon = (key) => {
    const column = columnSortValue.find(col => col.key === key)
    switch (column.sortValue) {
      case DEFAULT_SORT_TYPE:
        return <img src={sortingDefaultIcon} />
        break
      case ACENDING_SORT_TYPE:
        return <img src={sortingUpIcon} />
        break
      case DECENDING_SORT_TYPE:
        return <img src={sortingDownIcon} />
        break
    }
  }

  const getMobileCondition = () => {
    if((headers.length < 3 && isSelection) || (headers.length <= 3 && !isSelection)) {
      return false;
    } else if(isMobile) {
      return true;
    }else {
      return false;
    }
  }

  const getMobileRow = (headers, val) => {
    return [
      <td key={val.key+"1"}>{headers.map((h, i) => <div key={i} className='xs-row-head'>{`${h.value}:`}</div>)}</td>,
      <td key={val.key+"2"}>{headers.map((h, i) => <div key={i} className='xs-row-data'>{val[h.key] || ""}</div>)}</td>
    ]
  }

  return (<div className="table-main">
      <table>
      {!getMobileCondition() ? <thead>
          <tr>
            {isSelection && <th></th>}
            {headers.map((header, index) => <th data-testid={"test-sort-"+index} onClick={() => isSortable ? sortColumns(header.key): {}} key={index}>
              <b>{header.value}</b>
              {isSortable && <span className="sorting-icon">
                {columnSortValue.length && getSortingIcon(header.key)}
              </span>}
            </th>
            )}
          </tr>
        </thead>: <thead><tr><th colSpan={3}>{title}</th></tr></thead>}
        <tbody>
          {data.map((val, key) => {
            return (
              <tr key={key} className={val.isSelected ? "row-selected" : undefined}>
                {isSelection && (
                  selectionType === SINGLE_SELECTION ?
                    <td>
                      <label className="radio-container">
                        <input
                          type={'radio'}
                          checked={val.isSelected}
                          onChange={() => handleRadioSelection(val.tableIndex, val.isSelected)}
                          data-testid={"radio-box-"+val.tableIndex}
                        />
                        <span className="check"></span>
                      </label>
                    </td> :
                    <td>
                      <label className="container">
                        <input
                          type={'checkbox'}
                          checked={val.isSelected}
                          onChange={() => handleCheckboxSelection(val.tableIndex, val.isSelected)}
                          data-testid={"check-box-"+val.tableIndex}
                        />
                        <span className="mark"></span>
                      </label>

                    </td>
                )}
                {getMobileCondition()? getMobileRow(headers, val) :getKeyIndex(headers).map((title, index) => (
                  <td key={index}>{val[title.key] || ""}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>)
}

TableMain.prototype = {
  tableConfig: {
    headers: PropTypes.arrayOf,
    isSelection: PropTypes.bool,
    selectionType: PropTypes.oneOf(['single', 'multi']),
    isSortable: PropTypes.bool
  },
  rowData: PropTypes.arrayOf,
  getSelectedRow: PropTypes.func,
  title: PropTypes.string
}

export default TableMain;