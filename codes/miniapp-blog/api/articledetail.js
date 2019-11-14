import * as request from '@/common/js/request.js'

function getArticleDetail (articleId) { // 查询指定文章的详细信息
	return request.request({
		method: 'get', 
		url: `/api/home/article/article?id=${articleId}`
	})
}

export {
	getArticleDetail
}