<template>
	<scroll-view class="article-detail" :scroll-y="true">
		<view class="article-wrapper">
			<!-- header -->
			<view class="header">
				<view class="title">
					<text>{{ articleObj.title }}</text>
				</view>
				<view class="image-wrapper"><image class="image" :src="articleObj.illustrationUrl" mode="aspectFill"></image></view>
				<view class="tools-wrapper">
					<view class="tools-item-wrapper">
						<view class="tools-item">
							<text class="icon">&#xe716;</text>
							<text>{{ timeMillisFormat(Date.parse(articleObj.updatedAt), 'yyyy-MM-dd') }}</text>
						</view>
						<view class="tools-item">
							<text class="icon">&#xe601;</text>
							<text>{{ articleObj.browserNum }}</text>
						</view>
						<view class="tools-item">
							<text class="icon">&#xe674;</text>
							<text>{{ articleObj.likeNum }}</text>
						</view>
						<view class="tools-item">
							<text class="icon">&#xe60e;</text>
							<text>{{ articleObj.commentNum }}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- content -->
			<view class="content">
				<!-- summary -->
				<view class="summary">
					<rich-text class="summary-content" :nodes="articleObj.summary"></rich-text>
				</view>
				<!-- body -->
				<view class="body">
					<rich-text class="body-content" :nodes="articleObj.content"></rich-text>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
import * as apiArticleDetail from '@/api/articledetail.js';

export default {
	data() {
		return {
			articleObj: {}
		};
	},
	onLoad(option) {
		console.log(option);
		console.log(option.id);
		this.getArticleDetail(option.id);
	},
	methods: {
		getArticleDetail(articleID) {
			// 查询文章详情
			uni.showLoading({
				title: '加載中...',
				mask: true
			})
			apiArticleDetail.getArticleDetail(articleID).then(response => {
				this.articleObj = response.result
				uni.hideLoading()
			});
		}
	}
};
</script>

<style lang="scss">
@font-face {
	font-family: 'iconfont';
	src: url('../../common/font/iconfont.ttf') format('truetype');
}

.article-detail {
	display: flex;
	.article-wrapper {
		padding: 0 30rpx;
		.header {
			.title {
				font-size: 16px;
				color: #666666;
				margin: 40rpx 0 20rpx;
			}
			.image-wrapper {
				padding: 20rpx 0;
				.image {
					width: 100%;
					max-height: 320rpx;
				}
			}
			.tools-wrapper {
				display: flex;
				flex-direction: row-reverse;
				.tools-item-wrapper {
					display: flex;
					align-items: center;
					.tools-item {
						font-size: 12px;
						color: #aaaaaa;
						margin-right: 20rpx;
						&:last-child {
							margin-right: 0;
						}
						.icon {
							font-family: iconfont;
							font-size: 12px;
							color: #aaaaaa;
							margin-right: 8rpx;
						}
					}
				}
			}
		}
		.content {
			.summary {
				background-color: #f2f7fb;
				border-left: 16rpx solid #dce6f0;
				margin: 60rpx 0 40rpx;
				padding: 30rpx 40rpx;
				color: #85969c;
				font-size: 14px;
				.summary-content {
					line-height: 50rpx;
				}
			}
			.body {
				color: #3e3e3e;
				font-size: 14px;
				padding: 0 24rpx;
				margin-bottom: 60rpx;
				.body-content {
					line-height: 60rpx;
				}
			}
		}
	}
}
</style>
