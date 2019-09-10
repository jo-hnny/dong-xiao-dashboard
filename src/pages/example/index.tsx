import React from 'react'
import styles from './index.module.scss'
import { Input, Button, Alert, Form, Icon } from 'antd'
import { IExample } from '../../types'
import Api from '../../api'
import classnames from 'classnames'

const SizeMap = {
  0: {
    width: 165,

    height: 270
  },

  1: {
    width: 135,
    height: 135
  },

  2: {
    width: 195,
    height: 135
  },

  3: {
    width: 165,
    height: 270
  },

  4: { width: 195, height: 135 },

  5: {
    width: 135,
    height: 135
  }
}
interface IState {
  examples: IExample[]

  activeExample: IExample

  activeIndex: keyof typeof SizeMap
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
    },

    activeIndex: 0
  }

  componentDidMount() {
    this.getExamples()
  }

  getExamples = async () => {
    const { lists } = await Api.getExamples()

    this.setState({
      examples: lists,
      activeExample: JSON.parse(JSON.stringify(lists[0]))
    })
  }

  handleSelect = (activeExample: IExample, activeIndex: number) => () => {
    this.setState({
      activeExample: JSON.parse(JSON.stringify(activeExample)),

      activeIndex: activeIndex as keyof typeof SizeMap
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

    this.setState(({ activeExample }) => ({
      activeExample: { ...activeExample, cover_url: filePAth }
    }))
  }

  handleInputChange = (
    key: keyof IExample
  ): React.ReactEventHandler<HTMLInputElement> => ({ currentTarget }) => {
    const { value } = currentTarget

    this.setState(({ activeExample }) => ({
      activeExample: { ...activeExample, [key]: value }
    }))
  }

  handleSave = async () => {
    const { activeExample } = this.state

    console.log(activeExample)

    await Api.updateExample(activeExample)

    this.setState(({ examples, activeExample }) => {
      const newExamples = examples.map(item => {
        if (item.id === activeExample.id) {
          return JSON.parse(JSON.stringify(activeExample))
        }

        return item
      })

      return { examples: newExamples }
    })
  }

  render() {
    const { examples, activeExample, activeIndex } = this.state
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
                onClick={this.handleSelect(
                  {
                    id,
                    name,
                    cover_url,
                    picture_info,
                    video_url
                  },
                  index
                )}
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

        <Form
          labelCol={{ span: 2, offset: 0 }}
          wrapperCol={{ span: 12, offset: 0 }}
          labelAlign="left"
        >
          <Form.Item label="封面">
            <div
              className={styles.upload}
              style={{
                backgroundImage: `url(${activeExample.cover_url})`,
                width: `${SizeMap[activeIndex].width}px`,
                height: `${SizeMap[activeIndex].height}px`
              }}
            >
              <Icon type="plus" className={styles.icon} />

              <input
                className={styles.fileinput}
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={this.handleUpload}
              />
            </div>

            <Alert
              className={styles.tip}
              message="建议像素：1280*720， JPG、PNG格式， 大小不超过5M"
              type="info"
            />
          </Form.Item>

          <Form.Item label="案例说明">
            <Input
              value={activeExample.picture_info}
              onChange={this.handleInputChange('picture_info')}
            />
          </Form.Item>

          <Form.Item label="视频地址">
            <Input
              value={activeExample.video_url}
              onChange={this.handleInputChange('video_url')}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 4, offset: 2 }}>
            <Button type="primary" size="large" onClick={this.handleSave}>
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
