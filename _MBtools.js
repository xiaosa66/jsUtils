export default {
  // +++++++++++++++数组++++++++++
  // 数组去重
  uniqueArr (arr) {
    return [...new Set(arr)]
  },
  // 数组顺序打乱
  upsetArr (arr) {
    return arr.sort(() => {
      return Math.random() - 0.5
    })
  },

  // 数组最大值
  // 这一块的封装，主要是针对数字类型的数组
  maxArr (arr) {
    return Math.max.apply(null, arr)
  },
  // 数组最小值
  minArr (arr) {
    return Math.min.apply(null, arr)
  },

  // 这一块的封装，主要是针对数字类型的数组
  // 数组求和
  sumArr (arr) {
    return arr.reduce((pre, cur) => pre + cur)
  },

  // 数组平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活了！
  covArr (arr) {
    return this.sumArr(arr) / arr.length
  },
  // 从数组中随机获取元素
  randomOne (arr) {
    return arr[Math.floor(Math.random() * arr.length)]
  },

  // 回数组（字符串）一个元素出现的次数
  // getEleCount('asd56+asdasdwqe','a')
  // result：3
  // getEleCount([1,2,3,4,5,66,77,22,55,22],22)
  // result：2
  getEleCount (obj, ele) {
    let num = 0
    for (let i = 0, len = obj.length; i < len; i++) {
      if (ele === obj[i]) {
        num++
      }
    }
    return num
  },

  // 返回数组（字符串）出现最多的几次元素和出现次数
  // arr, rank->长度，默认为数组长度，ranktype，排序方式，默认降序
  // 返回值：el->元素，count->次数
  // getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2])
  // result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2},{"el":"4","count":1},{"el":"5","count":1},{"el":"6","count":1}]
  // 默认情况，返回所有元素出现的次数
  // getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3)
  // 传参（rank=3），只返回出现次数排序前三的
  // result：[{"el":"2","count":6},{"el":"1","count":4},{"el":"3","count":2}]
  // getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],null,1)
  // 传参（ranktype=1,rank=null），升序返回所有元素出现次数
  // result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1},{"el":"3","count":2},{"el":"1","count":4},{"el":"2","count":6}]
  // getCount([1,2,3,1,2,5,2,4,1,2,6,2,1,3,2],3,1)
  // 传参（rank=3，ranktype=1），只返回出现次数排序（升序）前三的
  // result：[{"el":"6","count":1},{"el":"5","count":1},{"el":"4","count":1}]
  getCount (arr, rank, ranktype) {
    let obj = {}; let k; let arr1 = []
    // 记录每一元素出现的次数
    for (let i = 0, len = arr.length; i < len; i++) {
      k = arr[i]
      if (obj[k]) {
        obj[k]++
      } else {
        obj[k] = 1
      }
    }
    // 保存结果{el-'元素'，count-出现次数}
    for (let o in obj) {
      arr1.push({ el: o, count: obj[o] })
    }
    // 排序（降序）
    arr1.sort(function (n1, n2) {
      return n2.count - n1.count
    })
    // 如果ranktype为1，则为升序，反转数组
    if (ranktype === 1) {
      arr1 = arr1.reverse()
    }
    let rank1 = rank || arr1.length
    return arr1.slice(0, rank1)
  },

  // 得到n1-n2下标的数组
  // getArrayNum([0,1,2,3,4,5,6,7,8,9],5,9)
  // result：[5, 6, 7, 8, 9]
  // getArrayNum([0,1,2,3,4,5,6,7,8,9],2) 不传第二个参数,默认返回从n1到数组结束的元素
  // result：[2, 3, 4, 5, 6, 7, 8, 9]
  getArrayNum (arr, n1, n2) {
    return arr.slice(n1, n2)
  },

  // 筛选数组
  // 删除值为'val'的数组元素
  // removeArrayForValue(['test','test1','test2','test','aaa'],'test','%')
  // result：["aaa"]   带有'test'的都删除
  // removeArrayForValue(['test','test1','test2','test','aaa'],'test')
  // result：["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
  removeArrayForValue (arr, val, type) {
    return arr.filter(item => type ? item.indexOf(val) === -1 : item !== val)
  },
  // 获取对象数组某些项
  // let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
  // getOptionArray(arr,'a,c')
  // result：[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]
  // getOptionArray(arr,'b',1)
  // result：[2, 3, 9, 2, 5]
  getOptionArray (arr, keys) {
    let newArr = []
    if (!keys) {
      return arr
    }
    let _keys = keys.split(','); let newArrOne = {}
    // 是否只是需要获取某一项的值
    if (_keys.length === 1) {
      for (let i = 0, len = arr.length; i < len; i++) {
        newArr.push(arr[i][keys])
      }
      return newArr
    }
    for (let i = 0, len = arr.length; i < len; i++) {
      newArrOne = {}
      for (let j = 0, len1 = _keys.length; j < len1; j++) {
        newArrOne[_keys[j]] = arr[i][_keys[j]]
      }
      newArr.push(newArrOne)
    }
    return newArr
  },
  // 排除数组某些项
  // let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
  // filterOptionArray(arr,'a')
  // result：[{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]
  // filterOptionArray(arr,'a,c')
  // result：[{b:2},{b:3},{b:9},{b:2},{b:5}]
  filterOptionArray (arr, keys) {
    let newArr = []
    let _keys = keys.split(','); let newArrOne = {}
    for (let i = 0, len = arr.length; i < len; i++) {
      newArrOne = {}
      for (let key in arr[i]) {
        // 如果key不存在排除keys里面,添加数据
        if (_keys.indexOf(key) === -1) {
          newArrOne[key] = arr[i][key]
        }
      }
      newArr.push(newArrOne)
    }
    return newArr
  },
  // 对象数组的排序
  // let arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
  // ecDo.arraySort(arr,'a,b')a是第一排序条件，b是第二排序条件
  // result：[{"a":1,"b":2,"c":9},{"a":2,"b":3,"c":5},{"a":4,"b":2,"c":5},{"a":4,"b":5,"c":7},{"a":5,"b":9}]
  arraySort (arr, sortText) {
    if (!sortText) {
      return arr
    }
    let _sortText = sortText.split(',').reverse(); let _arr = arr.slice(0)
    for (let i = 0, len = _sortText.length; i < len; i++) {
      _arr.sort((n1, n2) => {
        return n1[_sortText[i]] - n2[_sortText[i]]
      })
    }
    return _arr
  },
  // 数组扁平化
  steamroller (arr) {
    let newArr = []; let _this = this
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        // 如果是数组，调用(递归)steamroller 将其扁平化
        // 然后再 push 到 newArr 中
        newArr.push.apply(newArr, _this.steamroller(arr[i]))
      } else {
        // 不是数组直接 push 到 newArr 中
        newArr.push(arr[i])
      }
    }
    return newArr
  },
  // 另一种写法
  // steamroller([1,2,[4,5,[1,23]]])
  // [1, 2, 4, 5, 1, 23]
  /*
     * i=0 newArr.push(arr[i])  [1]
     * i=1 newArr.push(arr[i])  [1,2]
     * i=2 newArr = newArr.concat(steamroller(arr[i]));  执行到下面
     * 第一次i=2进入后 i=0, newArr.push(arr[i]);  [4]
     * 第一次i=2进入后 i=1, newArr.push(arr[i]);  [4，5]
     *  * i=2 newArr = newArr.concat(steamroller(arr[i]));  执行到下面
     * 第二次i=2进入后 i=0, newArr.push(arr[i]);  [1]
     * 第二次i=2进入后 i=1, newArr.push(arr[i]);  [1，23]  执行到下面
     * 第二次循环完，回到第一次进入后  newArr = newArr.concat(steamroller(arr[i]));  [4,5].concat([1,23])   [4,5,1,23]
     * 然后回到第一次   [1,2].concat([4,5,1,23])
     */
  //  steamroller(arr) {
  //      let newArr = [];
  //      for (let i = 0; i < arr.length; i++) {
  //          if (Array.isArray(arr[i])) {
  //              // 如果是数组，调用(递归)steamroller 将其扁平化
  //              // 然后再 push 到 newArr 中
  //              newArr = newArr.concat(steamroller(arr[i]));
  //          } else {
  //              // 不是数组直接 push 到 newArr 中
  //              newArr.push(arr[i]);
  //          }
  //      }
  //      return newArr;
  //  },

  // +++++++++++++++字符串++++++++++
  // 检测字符串
  // checkType('165226226326','phone')
  // result：false
  checkType (str, type) {
    switch (type) {
      case 'email':
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)
      case 'phone':
        return /^1[3|4|5|7|8][0-9]{9}$/.test(str)
      case 'tel':
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str)
      case 'number':
        return /^[0-9]$/.test(str)
      case 'english':
        return /^[a-zA-Z]+$/.test(str)
      case 'text':
        return /^\w+$/.test(str)
      case 'chinese':
        return /^[\u4E00-\u9FA5]+$/.test(str)
      case 'lower':
        return /^[a-z]+$/.test(str)
      case 'upper':
        return /^[A-Z]+$/.test(str)
      default:
        return true
    }
  },
  // 去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
  // trim('  1235asd',1)
  // result：1235asd
  trim (str, type) {
    switch (type) {
      case 1:
        return str.replace(/\s+/g, '')
      case 2:
        return str.replace(/(^\s*)|(\s*$)/g, '')
      case 3:
        return str.replace(/(^\s*)/g, '')
      case 4:
        return str.replace(/(\s*$)/g, '')
      default:
        return str
    }
  },
  /* type
     1:首字母大写
     2：首字母小写
     3：大小写转换
     4：全部大写
     5：全部小写
     * */
  // changeCase('asdasd',1)
  // result：Asdasd
  changeCase (str, type) {
    function ToggleCase (str) {
      let itemText = ''
      str.split('').forEach(item => {
        if (/^([a-z]+)/.test(item)) {
          itemText += item.toUpperCase()
        } else if (/^([A-Z]+)/.test(item)) {
          itemText += item.toLowerCase()
        } else {
          itemText += item
        }
      })
      return itemText
    }

    switch (type) {
      case 1:
        return str.replace(/\b\w+\b/g, function (word) {
          return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase()
        })
      case 2:
        return str.replace(/\b\w+\b/g, function (word) {
          return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase()
        })
      case 3:
        return ToggleCase(str)
      case 4:
        return str.toUpperCase()
      case 5:
        return str.toLowerCase()
      default:
        return str
    }
  },
  // 字符串循环复制
  // repeatStr(str->字符串, count->次数)
  // repeatStr('123',3)
  // "result：123123123"
  repeatStr (str, count) {
    return str.repeat(count)
  },
  // 字符串替换(字符串,要替换的字符或者正则表达式（不要写g）,替换成什么)
  // ecDo.replaceAll('这里是上海，中国第三大城市，广东省省会，简称穗，','上海','广州')
  // result："这里是广州，中国第三大城市，广东省省会，简称穗，"
  replaceAll (str, AFindText, ARepText) {
    let raRegExp = new RegExp(AFindText, 'g')
    return str.replace(raRegExp, ARepText)
  },
  // 字符替换*
  // replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
  replaceStr (str, regArr, type = 0, ARepText = '*') {
    let regtext = ''

    let Reg = null

    let replaceText = ARepText
    // replaceStr('18819322663',[3,5,3],0)
    // result：188*****663
    // repeatStr是在上面定义过的（字符串循环复制），大家注意哦
    if (regArr.length === 3 && type === 0) {
      regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
      Reg = new RegExp(regtext)
      let replaceCount = this.repeatStr(replaceText, regArr[1])
      return str.replace(Reg, '$1' + replaceCount + '$2')
    }
    // replaceStr('asdasdasdaa',[3,5,3],1)
    // result：***asdas***
    else if (regArr.length === 3 && type === 1) {
      regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
      Reg = new RegExp(regtext)
      let replaceCount1 = this.repeatStr(replaceText, regArr[0])
      let replaceCount2 = this.repeatStr(replaceText, regArr[2])
      return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
    }
    // replaceStr('1asd88465asdwqe3',[5],0)
    // result：*****8465asdwqe3
    else if (regArr.length === 1 && type === 0) {
      regtext = '(^\\w{' + regArr[0] + '})'
      Reg = new RegExp(regtext)
      let replaceCount = this.repeatStr(replaceText, regArr[0])
      return str.replace(Reg, replaceCount)
    }
    // replaceStr('1asd88465asdwqe3',[5],1,'+')
    // result："1asd88465as+++++"
    else if (regArr.length === 1 && type === 1) {
      regtext = '(\\w{' + regArr[0] + '}$)'
      Reg = new RegExp(regtext)
      let replaceCount = this.repeatStr(replaceText, regArr[0])
      return str.replace(Reg, replaceCount)
    }
  },
  // 检测密码强度
  // checkPwd('12asdASAD')
  // result：3(强度等级为3)
  checkPwd (str) {
    let nowLv = 0
    if (str.length < 6) {
      return nowLv
    }
    if (/[0-9]/.test(str)) {
      nowLv++
    }
    if (/[a-z]/.test(str)) {
      nowLv++
    }
    if (/[A-Z]/.test(str)) {
      nowLv++
    }
    if (/[\.|-|_]/.test(str)) {
      nowLv++
    }
    return nowLv
  },
  // 随机码
  // count取值范围2-36

  // randomWord(10)
  // result："2584316588472575"

  // randomWord(14)
  // result："9b405070dd00122640c192caab84537"

  // randomWord(36)
  // result："83vhdx10rmjkyb9"

  randomWord (count) {
    return Math.random().toString(count).substring(2)
  },

  // 查找字符串
  // let strTest='sad44654blog5a1sd67as9dablog4s5d16zxc4sdweasjkblogwqepaskdkblogahseiuadbhjcibloguyeajzxkcabloguyiwezxc967'
  // countStr(strTest,'blog')
  // result：6
  countStr (str, strSplit) {
    return str.split(strSplit).length - 1
  },
  // 过滤字符串(html标签，表情，特殊字符)
  // 字符串，替换内容（special-特殊字符,html-html标签,emjoy-emjoy表情,word-小写字母，WORD-大写字母，number-数字,chinese-中文），要替换成什么，默认'',保留哪些特殊字符
  // 如果需要过滤多种字符，type参数使用,分割，如下栗子
  // 过滤字符串的html标签，大写字母，中文，特殊字符，全部替换成*,但是特殊字符'%'，'?'，除了这两个，其他特殊字符全部清除
  // let str='asd    654a大蠢sasdasdASDQWEXZC6d5#%^*^&*^%^&*$\\"\'#@!()*/-())_\'":"{}?<div></div><img src=""/>啊实打实大蠢猪自行车这些课程';
  // ecDo.filterStr(str,'html,WORD,chinese,special','*','%?')
  // result："asd    654a**sasdasd*********6d5#%^*^&*^%^&*$\"'#@!()*/-())_'":"{}?*****************"
  filterStr (str, type, restr = '', spstr) {
    let typeArr = type.split(','); let _str = str
    for (let i = 0, len = typeArr.length; i < len; i++) {
      // 是否是过滤特殊符号
      let pattern
      if (typeArr[i] === 'special') {
        let regText = '$()[]{}?\|^*+./\"\'+'
        // 是否有哪些特殊符号需要保留
        if (spstr) {
          let _spstr = spstr.split(''); let _regText = '[^0-9A-Za-z\\s'
          for (let j = 0, len1 = _spstr.length; j < len1; j++) {
            if (regText.indexOf(_spstr[j]) === -1) {
              _regText += _spstr[j]
            } else {
              _regText += '\\' + _spstr[j]
            }
          }
          _regText += ']'
          pattern = new RegExp(_regText, 'g')
        } else {
          pattern = new RegExp('[^0-9A-Za-z\\s]', 'g')
        }
      }
      switch (typeArr[i]) {
        case 'special':
          _str = _str.replace(pattern, restr)
          break
        case 'html':
          _str = _str.replace(/<\/?[^>]*>/g, restr)
          break
        case 'emjoy':
          _str = _str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/g, restr)
          break
        case 'word':
          _str = _str.replace(/[a-z]/g, restr)
          break
        case 'WORD':
          _str = _str.replace(/[A-Z]/g, restr)
          break
        case 'number':
          _str = _str.replace(/[0-9]/g, restr)
          break
        case 'chinese':
          _str = _str.replace(/[\u4E00-\u9FA5]/g, restr)
          break
      }
    }
    return _str
  },
  // 格式化处理字符串
  // ecDo.formatText('1234asda567asd890')
  // result："12,34a,sda,567,asd,890"
  // ecDo.formatText('1234asda567asd890',4,' ')
  // result："1 234a sda5 67as d890"
  // ecDo.formatText('1234asda567asd890',4,'-')
  // result："1-234a-sda5-67as-d890"
  formatText (str, size = 3, delimiter = ',') {
    let regText = '\\B(?=(\\w{' + size + '})+(?!\\w))'
    let reg = new RegExp(regText, 'g')
    return str.replace(reg, delimiter)
  },
  // 找出最长单词 (Find the Longest word in a String)
  // longestWord('Find the Longest word in a String')
  // result：7
  // longestWord('Find|the|Longest|word|in|a|String','|')
  // result：7
  longestWord (str, splitType = /\s+/g) {
    let _max = 0; let _item = ''
    let strArr = str.split(splitType)
    strArr.forEach(item => {
      if (_max < item.length) {
        _max = item.length
        _item = item
      }
    })
    return { el: _item, max: _max }
  },
  // 句中单词首字母大写 (Title Case a Sentence)
  // 这个我也一直在纠结，英文标题，即使是首字母大写，也未必每一个单词的首字母都是大写的，但是又不知道哪些应该大写，哪些不应该大写
  // ecDo.titleCaseUp('this is a title')
  // "This Is A Title"
  titleCaseUp (str, splitType = /\s+/g) {
    let strArr = str.split(splitType)

    let result = ''
    strArr.forEach(item => {
      result += this.changeCase(item, 1) + ' '
    })
    return this.trim(result, 4)
  },

  // ++++++cookie++++++
  // 设置cookie
  setCookie (name, value, iDay) {
    let oDate = new Date()
    oDate.setDate(oDate.getDate() + iDay)
    document.cookie = name + '=' + value + ';expires=' + oDate
  },
  // 获取cookie
  getCookie (name) {
    let arr = document.cookie.split('; '); let arr2
    for (let i = 0; i < arr.length; i++) {
      arr2 = arr[i].split('=')
      if (arr2[0] == name) {
        return arr2[1]
      }
    }
    return ''
  },
  // 删除cookie
  removeCookie (name) {
    this.setCookie(name, 1, -1)
  },
  // 图片滚动懒加载
  // @className {string} 要遍历图片的类名
  // @num {number} 距离多少的时候开始加载 默认 0
  // 比如，一张图片距离文档顶部3000，num参数设置200，那么在页面滚动到2800的时候，图片加载。不传num参数就滚动，num默认是0，页面滚动到3000就加载
  // html代码
  // <p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
  // <p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
  // <p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>....
  // data-src储存src的数据，到需要加载的时候把data-src的值赋值给src属性，图片就会加载。
  // 详细可以查看testLoadImg.html

  // window.onload = function() {
  //	loadImg('load-img',100);
  //	window.onscroll = function() {
  //		loadImg('load-img',100);
  //		}
  // }
  loadImg (className = 'ec-load-img', num = 0, errorUrl = null) {
    let oImgLoad = document.getElementsByClassName(className)
    for (let i = 0, len = oImgLoad.length; i < len; i++) {
      // 如果图片已经滚动到指定的高度
      if (document.documentElement.clientHeight + document.documentElement.scrollTop > oImgLoad[i].offsetTop - num && !oImgLoad[i].isLoad) {
        // 记录图片是否已经加载
        oImgLoad[i].isLoad = true
        // 设置过渡，当图片下来的时候有一个图片透明度变化
        oImgLoad[i].style.cssText = "transition: ''; opacity: 0;"
        if (oImgLoad[i].dataset) {
          this.aftLoadImg(oImgLoad[i], oImgLoad[i].dataset.src, errorUrl, function (o) {
            // 添加定时器，确保图片已经加载完了，再把图片指定的的class，清掉，避免重复编辑
            setTimeout(() => {
              if (o.isLoad) {
                this.removeClass(o, className)
                o.style.cssText = ''
              }
            }, 1000)
          })
        } else {
          this.aftLoadImg(oImgLoad[i], oImgLoad[i].getAttribute('data-src'), errorUrl, function (o) {
            // 添加定时器，确保图片已经加载完了，再把图片指定的的class，清掉，避免重复编辑
            setTimeout(() => {
              if (o.isLoad) {
                this.removeClass(o, className)
                o.style.cssText = ''
              }
            }, 1000)
          })
        }
        (function (i) {
          setTimeout(() => {
            oImgLoad[i].style.cssText = 'transition:all 1s; opacity: 1;'
          }, 16)
        })(i)
      }
    }
  }
}
