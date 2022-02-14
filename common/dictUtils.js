export function refreshDictList() {
	let commoneUrl = uni.getStorageSync('url');
	let accessToken = uni.getStorageSync('ACCESS_TOKEN');
	new Promise((resolve, reject) => {
		uni.request({
			url: commoneUrl + '/admin/dict/type/all',
			method: 'GET',
			dataType: 'json',
			header: {
				'content-type': 'application/json',
				'Authorization': 'Bearer ' + accessToken
			},
			success(res) {
				if (res.statusCode === 200) {
					resolve(res.data)
				} else {
					resolve(res.data)
				}
			},
			error(err) {
				reject(err)
			}
		})
	}).then(data => {
		if (data.code == 0) {
			uni.setStorageSync('dictList', JSON.stringify(data.data));
		}
	}).catch(err => {})
}

export function getDictLabel(type, value, defaultLabel) {
	if ((!value && value !== 0) || (!type && type !== 0)) {
		if (defaultLabel !== undefined) {
			return defaultLabel
		} else {
			return '--'
		}
	}
	let dictList = JSON.parse(uni.getStorageSync('dictList') || '[]')
	let dicts = dictList[type]
	if (dicts.length) {
		for (let i = 0; i < dicts.length; i++) {
			if (dicts[i].value && dicts[i].value.toString() === value.toString()) {
				return dicts[i].label
			}
		}
	}
	if (defaultLabel !== undefined) {
		return defaultLabel
	} else {
		return '--'
	}
}

export function getDictValue(type, label, defaultValue) {
	if ((!label && label !== 0) || (!type && type !== 0)) {
		if (defaultValue !== undefined) {
			return defaultValue
		} else {
			return '--'
		}
	}
	let dictList = JSON.parse(uni.getStorageSync('dictList') || '[]')
	let dicts = dictList[type]
	if (dicts.length) {
		for (let i = 0; i < dicts.length; i++) {
			if (dicts[i].label && dicts[i].label.toString() === label.toString()) {
				return dicts[i].value
			}
		}
	}
	if (defaultValue !== undefined) {
		return defaultValue
	} else {
		return '--'
	}
}

export function getDictList (type) {
  if (!type && type !== 0) {
    return []
  }
  let dictList = JSON.parse(uni.getStorageSync('dictList') || '[]')
  let dicts = dictList[type]
  return dicts || []
}

export default { refreshDictList,getDictLabel,getDictValue,getDictList }
