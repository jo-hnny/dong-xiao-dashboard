import React from 'react'
import styles from './index.module.scss'
import { Card, List, Upload, Input, Button, Alert, Form, Icon } from 'antd'
import { IExample } from '../../types'
import Api from '../../api'
import classnames from 'classnames'

interface IState {
  examples: IExample[]

  activeExample: IExample
}

export default class extends React.Component<any, IState> {
  state: IState = {
    examples: [],

    activeExample: {
      id: '',
      name: '',
      cover_url: '',
      picture_info: '',
      video_url: ''
    }
  }
  componentDidMount() {
    this.getExamples()
  }

  getExamples = async () => {
    const { lists } = await Api.getExamples()

    this.setState({ examples: lists })
  }

  handleSelect = (activeExample: IExample) => () => {
    this.setState({
      activeExample: JSON.parse(JSON.stringify(activeExample))
    })
  }

  handleUpload: React.ReactEventHandler<HTMLInputElement> = async ({
    currentTarget
  }) => {
    if (!currentTarget.files) return

    const file = (currentTarget.files as FileList)[0]

    console.log(file)

    const filePAth = await Api.upload(file)
    console.log(filePAth)
  }

  render() {
    const { examples, activeExample } = this.state
    return (
      <div className={styles.example}>
        <div className={styles.wall}>
          {examples.map(
            ({ id, name, cover_url, picture_info, video_url }, index) => (
              <div
                className={classnames(styles[`item-${index}`], styles.item, {
                  [styles.active]: activeExample.id === id
                })}
                key={index}
                onClick={this.handleSelect({
                  id,
                  name,
                  cover_url,
                  picture_info,
                  video_url
                })}
              >
                <div
                  className={styles.bg}
                  style={{
                    backgroundImage: `url(${cover_url})`
                  }}
                ></div>

                <div className={styles.cover}>
                  <p className={styles.text}>{picture_info}</p>
                  <p className={styles.index}>{index + 1}</p>
                </div>
              </div>
            )
          )}
        </div>

        <Form>
          <Form.Item>
            <div className={styles.upload}>
              <div className={styles['upload-button']}>
                <Icon type="plus" />
              </div>

              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={this.handleUpload}
              />

              {activeExample.cover_url && (
                <img className={styles.img} src={activeExample.cover_url} />
              )}
            </div>

            <Alert
              className={styles.tip}
              message="建议像素：1280*720， JPG、PNG格式， 大小不超过5M"
              type="info"
            />
          </Form.Item>

          <Form.Item>
            <Input className={styles.videourl} />
          </Form.Item>

          <Form.Item>
            <Button className={styles.save}>保存</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
