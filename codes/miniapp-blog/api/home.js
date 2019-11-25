import * as request from '@/common/js/request.js'

function getArticleSummarys (limit = 10, offset = 0, type, filter, order) { // 查询文章简略信息
	console.log(limit, offset, type, filter, order);
	return request.request({
		method: 'post', 
		url: '/api/miniapp/home/articlelist', 
		data: {
			limit,
			offset,
			type,
			filter,
			order
		}
	})
}

export {
	getArticleSummarys
}