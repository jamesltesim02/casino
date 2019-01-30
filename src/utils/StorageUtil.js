/**
 * 保存数据到localStorage,将会转为json字符串保存
 *
 * @param {string} key
 *      数据的key
 * @param {object} value
 *      数据值
 */
export const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

/**
 * 从localStage中获取值
 *
 * @param {string} key
 *      对应值的key
 * @param {any} defaultValue
 *      默认值
 */
export const loadFromStorage = (key, defaultValue) => {
  let value = JSON.parse(localStorage.getItem(key) || 'null')

  if (!value && defaultValue) {
    value = defaultValue
    saveToStorage(key, value)
  }

  return value
}

/**
 * 从localStage中删除指定的值
 * @param {string} key
 *      将要删除的值的key
 */
export const removeFromStorage = (key) => {
  localStorage.removeItem(key)
}

/**
 * 接口数据缓存策略
 * 默认从localStorage中获取数据,如果没有获取到则从dataLoader函数查询
 *
 * @param {string} key
 *      缓存数据的key
 * @param {number} duration
 *      缓存数据的生命时长,默认为10秒
 * @param {function} dataLoader
 *      默认的数据加载函数(如果缓存中没有或已经超时,则会从dataLoader中重新获取)
 */
export const getCacheData = async (
  key,
  duration = 10000,
  dataLoader = async () => {}
) => {
  // 从缓存中加载数据
  const cacheData = loadFromStorage(key)

  // 判断数据是否有效
  if (cacheData && Date.now() - cacheData.cacheTime < duration) {
    return cacheData.data
  }

  // 调用接口查询数据
  const newData = await dataLoader()

  // 保存到缓存中
  if (newData) {
    saveToStorage(key, {
      data: newData,
      cacheTime: Date.now()
    })
  }

  return newData
}
