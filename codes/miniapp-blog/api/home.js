import * as request from '@/common/js/request.js'

function getArticleSummarys (limit = 10, offset = 0, order = 'descUpdateAt') { // 查询文章简略信息
	return request.request({
		method: 'post', 
		url: '/api/home/home/articlelist', 
		data: {
			limit: limit,
			offset: offset,
			order: order
		}
	})
}

export {
	getArticleSummarys
}