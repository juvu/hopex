import React, { Component } from 'react'
import { classNames, moment, dealInterval, _, formatNumber } from '@utils'
import { Table, Mixin } from '@components'
import { SCROLLX } from '@constants'
import ScrollPannel from './components/ScrollPanel'
import styles from './index.less'


export default class View extends Component {
  startInit = () => {
   this.getPersonalEnsure()
  }

  getPersonalEnsure = (payload = {}) => {
    const { callback } = payload
    const { dispatch, modelName } = this.props
    dispatch({
      type: `${modelName}/getPersonalEnsure`,
      payload
    }).then((res) => {
        if (callback) return callback()
        dealInterval(() => {
          this.getPersonalEnsure(payload)
        })
      }
    )
  }

  render() {
    const { model: { personalEnsures, userInfo }, dispatch, modelName } = this.props
    const columns = [
      {
        title: '合约',
        dataIndex: 'market',
      },
      {
        title: '类型',
        dataIndex: 'type',
        render: (value, record) => record.side === '1' ? '卖出' : '买入'
      },
      {
        title: '杠杆倍数',
        dataIndex: 'leverage',
        render: (value, record) => value
      },
      {
        title: '数量(张)',
        dataIndex: 'amount',
      },
      {
        title: '委托价格',
        dataIndex: 'price',
        render: (value) => formatNumber(value, 4)
      },
      {
        title: '成交数量(张)',
        dataIndex: 'amount',
        render: (value, record) => value - record.left
      },
      {
        title: '成交均价',
        dataIndex: 'work',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '委托占用保证金',
        dataIndex: 'work',
      },
      {
        title: '手续费',
        dataIndex: 'taker_fee',
        render: (v) => formatNumber(v, 'p')
      },
      {
        title: '委托时间',
        dataIndex: 'ctime',
         render: (value) => moment.formatHMSFromSeconds(value)
      },
      {
        title: '状态',
        width: 100,
        dataIndex: 'amount',
        render: (value, record) => value && value === record.left ? '等待成交' : (value ? '部分成交' : null)
      },
      {
        title: '操作',
        dataIndex: 'amount',
        width: 150,
        render: (value, record) => {
          return (
            <>
              <span onClick={(e) => {
                e.stopPropagation()
                dispatch({
                  type: `${modelName}/doCancelPersonEnsure`,
                  payload: {
                    market: record.market,
                    orderId: record.orderId
                  }
                })
              }
              } >
              <a >撤销</a >
            </span >
              <span onClick={(e) => {
                e.stopPropagation()
                dispatch({
                  type: `${modelName}/getPersonEnsureDetail`,
                  payload: {
                    market: record.market,
                    orderId: record.orderId
                  }
                })
              }} >
              <a >成交明细</a >
            </span >
            </>
          )
        }
      },
    ]
    const dataSource = personalEnsures
    const tableProp = {
      className: styles.tableContainer,
      columns,
      dataSource: _.merge((new Array(4)).fill(), dataSource),
      onClickRow: (item) => {
        // console.log(item)
      },
      expandedRowRender: (record = {}) => {
        const { expand = [] } = record
        const columns = [
          {
            title: '成交时间',
            dataIndex: 'ctime',
            width: 100,
          },
          {
            title: '手续费',
            dataIndex: 'takefee',
          },
        ]
        return expand.length ? (
          <div style={{ height: (40 * 3) }} >
            <Table
              className={styles.expandetableContainer}
              columns={columns}
              dataSource={expand}
              scroll={{
                bounce: false
              }}
            />
          </div >
        ) : null
      },
      scroll: {
        x: SCROLLX.X
      },
      // loadingMore: (callback) => {
      //   this.getPersonalEnsure({callback})
      // }
    }
    return (
      <Mixin.Child that={this} >
        <div
          className={
            classNames(
              {
                view: true
              },
              styles.PersonEnsure
            )
          }
        >
          <ScrollPannel
            header={
              <div >活跃委托</div >
            }
          >
            <Table  {...tableProp} />

          </ScrollPannel >
        </div >
      </Mixin.Child >
    )
  }
}

