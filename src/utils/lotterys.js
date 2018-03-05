import _ from 'lodash'
import store2 from 'store2'
const lotterys = {
  // 获取封盘时间
  getSealplateTime (lotteryClass) {
    switch (lotteryClass) {
      case 'pk10':
        return 30
      case 'cqssc':
        return 60
      case 'xyft':
        return 30
      case 'pcdd':
        return 30
      case 'cqxync':
        return 120
      case 'gdklsf':
        return 60
      case 'marksix':
        return 0
      default:
        return 30
    }
  },
  // 在 缓存中 根据名称获取当前彩种标题
  getClassifyCache (key) {
    return store2.get(key)
  },
  // 设置缓存
  setClassifyCache (key, value) {
    store2.set(key, value)
  },
  // 获取当前游戏的缓存
  getCurrentGameCache (key) {
    return store2.get(key)
  },
  // 设置当前游戏玩法的缓存
  setCyrrentGameCache (key, value) {
    store2.set(key, value)
  },
  // 根据名称获取id
  getIdByClassifyName (classifyName) {
    switch (classifyName) {
      case 'pk10':
        return 1
      case 'cqssc':
        return 2
      case 'xyft':
        return 3
      case 'pcdd':
        return 4
      case 'cqxync':
        return 5
      case 'gdklsf':
        return 6
      case 'marksix':
        return 7
      default:
        return 1
    }
  },
  // 根据id 获取名称
  transformNameByClassNumber (classNumber) {
    switch (classNumber) {
      case 1:
        return 'pk10'
      case 2:
        return 'cqssc'
      case 3:
        return 'xyft'
      case 4:
        return 'pcdd'
      case 5:
        return 'cqxync'
      case 6:
        return 'gdklsf'
      case 7:
        return 'marksix'
      default:
        return ''
    }
  },
  // 根据当前彩种获取副标题列表
  getSubListByClassNumber (list, classNumber) {
    if (list && list.length > 0) {
      const current = _.find(list, item => item.classify_code === classNumber)
      return current ? current.child : []
    }
    return []
  },
  // 设置游戏缓存
  setGamesCache (key, value) {
    store2.set(key, value)
  },
  // 获取游戏缓存
  getGamesCache (key) {
    return store2.get(key)
  },
  // 获取当前彩种下所有的游戏玩法
  getGameListByClassCode (classCode) {
    return store2.get(classCode)
  },
  // 根据当前副标题 获取游戏玩法
  getGameListBySub (gameData, subId) {
    if (gameData && gameData[subId]) {
      /* return _.filter(gameList, item => item.number_class === subId) */
      return gameData[subId]
    }
    return []
  },
  // 根据游戏玩法 获取单个类型的玩法
  getCurrentGameBytype (currentGame, gameType) {
    if (currentGame && currentGame.length > 0) {
      return _.filter(currentGame, item => item.number_info.type === gameType)
    }
    return []
  }
  // setLhcSubTitle (data) {
  //   const group = _.groupBy(data.child, item => {
  //     return item.classify_name.startsWith('特码') || item.classify_name.startsWith('正码')
  //   })
  //   console.log(group)
  //   let array = []
  //   /* _.forEach(data.child, item => {
  //     let obj = {}
  //     obj.child = []
  //     if (item.classify_name.startsWith('特码')) {
  //       obj.classify_name = '特码'
  //       obj.child.push({classify_name: item.classify_name, classify_code: item.classify_code})
  //       array.push(obj)
  //     } else if (item.classify_name.startsWith('正码')) {
  //       obj.classify_name = '特码'
  //       obj.child.push({classify_name: item.classify_name, classify_code: item.classify_code})
  //       array.push(obj)
  //     } else if (item.classify_name.includes('正特')) {
  //       obj.classify_name = '正码特'
  //       obj.child.push({classify_name: item.classify_name, classify_code: item.classify_code})
  //       array.push(obj)
  //     } else if (item.classify_name.includes('正特')) {
  //       obj.classify_name = '正码特'
  //       obj.child.push({classify_name: item.classify_name, classify_code: item.classify_code})
  //       array.push(obj)
  //     } else {
  //       array.push(item)
  //     }
  //   }) */
  //   console.log(array)
  // }
}
export {lotterys}
