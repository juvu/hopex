import React, { Component } from 'react'
import { connect } from 'dva'
import { ShowJsonTip, Input, NavPannel } from '@components'
import { classNames, _, Patterns } from '@utils'
import { PATH } from '@constants'
import styles from './MyAccount.less'

@connect(({ user: model, loading, dispatch }) => ({
  model,
  modelName: 'user',
  dispatch
}))
export default class View extends Component {
  renderStatus = (right) => {
    return right?(
      <div className={styles.right} >
        √
      </div >
    ):(
      <div>ahhah</div>
    )
  }

  render() {
    return (
      <div className={styles.myaccount} >
        <div className={styles.header} >
          <div className={styles.left} >
            <div className={styles.email} >2278095567@qq.com</div >
            <div className={styles.country} >中国</div >
          </div >
          <div className={styles.right} >
            <div >最后登录时间 :<span >2018-04-25</span ></div >
            <div >Ip :<span >121.29.15.199</span ></div >
          </div >
        </div >
        <div className={styles.down} >
          <div className={styles.safety} >
            <div className={styles.title} >安全设置</div >
            <ul >
              <li >
                <div className={styles.name} >登录密码</div >
                <div className={classNames(
                  styles.desc,
                  styles.loginpassword
                )} >
                  已经设置
                  <div className={styles.right} >
                    √
                  </div >
                </div >
                <div className={
                  classNames(
                    styles.button,
                    styles.login
                  )
                } >
                  修改
                </div >
              </li >
              <li >
                <div className={styles.name} >谷歌验证码</div >
                <div className={styles.desc} >提现，修改密码，及安全设置时用以输入谷歌验证码</div >
                <div className={styles.button} >修改</div >
              </li >
            </ul >
          </div >
        </div >
      </div >
    )
  }
}

