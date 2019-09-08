import axios from 'axios'
import cryptoRandomString from 'crypto-random-string'

const getOssToken = async () => {
  const { data } = await axios('token/oss')

  return data.data.uptoken
}

const geRandomName = ({ type }: File) => {
  const suffix = type.split('/').pop()

  return `${cryptoRandomString({ type: 'url-safe', length: 16 })}.${suffix}`
}

export const upload = async (file: File) => {
  const { accessid, dir, policy, signature, host } = await getOssToken()

  const { OSSInputUrlPrefix, OSSOutputUrlPrefix } = host

  const key = `${dir}${geRandomName(file)}`

  const formData = Object.entries({
    OSSAccessKeyId: accessid,
    key,
    success_action_status: '200',
    policy,
    signature,
    host: OSSOutputUrlPrefix,
    file
  }).reduce((formData, [key, value]) => {
    formData.append(key, value)

    return formData
  }, new FormData())

  await axios.post(OSSInputUrlPrefix, formData)

  return `${OSSOutputUrlPrefix}${key}`
}
