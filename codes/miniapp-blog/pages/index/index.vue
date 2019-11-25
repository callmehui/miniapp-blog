<template>
	<view class="home">
		<!-- 搜索框-->
		<view class="search-bar-wrapper">
			<uni-search 
				class="search"
				:placeholder="searchBar.placeholder"
				:radius="searchBar.radius"
				@confirm="confirmSearch"></uni-search>
		</view>
		<!-- tab切换 -->
		<view class="tabs-wrapper">
			<view class="tabs">
				<view class="tab-item">
					<view class="tab-header-wrapper">
						<view 	class="tab-header" 
								:class="{'actived': selectedTabIndex === index}"
								v-for="(item, index) in tabs" 
								:key="index" 
								@tap="changeTab(index, item.tabsHeader.value)">
							{{ item.tabsHeader.text }}
						</view>
					</view>
					<scroll-view class="tab-content-wrapper" 
								:scroll-y="true" 
								:enable-back-to-top="true"
								v-show="selectedTabIndex === index"
								v-for="(item, index) in tabs" 
								:key="index" >
						<!-- 筛选 -->
						<view class="filter-hotlevel" v-if="index === 1">
							<view class="filter" 
									:class="{'active': subItem.active}" 
									v-for="(subItem, subIndex) in hotlevelFilters" 
									:key="subIndex" 
									@tap="changeHotLevel(subIndex)">
								<text>{{subItem.name}}</text>
							</view>
						</view>	
						<!-- 文章列表 -->
						<view 
							class="tab-content" 
							v-for="(subItem, subIndex) in item.tabsContent"
							:key="subIndex"
							@tap="viewArticle(subItem.objectId)">
							<view class="title">{{ subItem.title }}</view>
							<view class="image-wrapper">
								<image class="image" :src="subItem.illustrationUrl" mode="aspectFill"></image>
							</view>
							<view class="tools-wrapper">
								<view class="tools-item-wrapper">
									<view class="tools-item">
										<text class="icon">&#xe716;</text>
										<text>{{ timeMillisFormat(Date.parse(subItem.updatedAt), 'yyyy-MM-dd')}}</text>
									</view>
									<view class="tools-item">
										<text class="icon">&#xe601;</text>
										<text>{{ subItem.browserNum }}</text>
									</view>
									<view class="tools-item">
										<text class="icon">&#xe674;</text>
										<text>{{ subItem.likeNum }}</text>
									</view>
									<view class="tools-item">
										<text class="icon">&#xe60e;</text>
										<text>{{ subItem.commentNum }}</text>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<uni-load-more v-if="showLoadMore" class="load-more" :status="loadMoreType"></uni-load-more>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import UniSearch from '@/components/uni-search-bar/uni-search-bar.vue'
	import UniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import articleImage from '@/common/image/article.png'
	import * as apiHome from '@/api/home.js'
	
	export default {
		components: {
			'uni-search': UniSearch,
			'uni-load-more': UniLoadMore
		},
		data() {
			return {
				searchBar: {
					placeholder: '搜索感兴趣的文章',
					radius: 25
				},
				selectedTabIndex: 0,
				tabs: [
					{
						tabsHeader: {
							text: '最新',
							type: 'updatetime',
							actived: true
						},
						limit: 10,
						offset: 0,
						tabsContent: []
					},{
						tabsHeader: {
							text: '热门',
							type: 'hotlevel',
							order: '',
							actived: true
						},
						limit: 10,
						offset: 0,
						tabsContent: []
					},{
						tabsHeader: {
							text: '标签',
							type: 'tag',
							filter: '',
							actived: true
						},
						limit: 10,
						offset: 0,
						tabsContent: []
					},
				],
				hotlevelFilters: [
					{
						name: '浏览最多',
						value: 'browserNum',
						active: true
					},
					{
						name: '点赞最多',
						value: 'likeNum',
						active: false
					},
					{
						name: '评论最多',
						value: 'commentNum',
						active: false
					},
				],
				tagFilters: [],				
				showLoadMore: false,
				loadMoreType: 'loading'
			}
		},
		onLoad() {
			this.getArticleSummarys()
		},
		onReachBottom () {
			console.log('loadMore......')
			this.showLoadMore = true
			setTimeout(() => {
				this.showLoadMore = false
			}, 1000)
		},
		methods: {
			confirmSearch (value) {
				console.log(value)
			},
			changeTab (index, value) {
				this.selectedTabIndex = index
				let currentTab = this.tabs[index]
				const params = {
					limit: currentTab.limit,
					offset: currentTab.offset,
					type: currentTab.tabsHeader.type,
					filter: currentTab.tabsHeader.filter,
					order: currentTab.tabsHeader.order,
				} 
				this.getArticleSummarys(params.limit, params.offset, params.type, params.filter, params.order)
			},
			changeHotLevel (val) {
				this.hotlevelFilters.forEach((item, index) => {
					if (val === index) {
						item.active = true
						this.tabs[1].tabsHeader.order = item.value
					} else {
						item.active = false
					}
				})
				const params = {
					limit: this.tabs[1].limit,
					offset: this.tabs[1].offset,
					type: this.tabs[1].tabsHeader.type,
					filter: this.tabs[1].tabsHeader.filter,
					order: this.tabs[1].tabsHeader.order,
				} 
				this.getArticleSummarys(params.limit, params.offset, params.type, params.filter, params.order)
			},
			getArticleSummarys (limit, offset, type, filter, order) {
				uni.showLoading({
					title: '加載中...',
					mask: true
				})
				apiHome.getArticleSummarys(limit, offset, type, filter, order)
					.then(response => {
						this.tabs[this.selectedTabIndex].tabsContent = response.result
						uni.hideLoading()
					})
			},
			viewArticle (id) {
				uni.navigateTo({
					url: `../articledetail/articledetail?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

$primary-color: #409EFF;	

@font-face {
	font-family: 'iconfont';
	src: url('../../common/font/iconfont.ttf') format('truetype');
};	
	
.home {
	.search-bar-wrapper {
		display: flex;
		width: 100%;
		padding: 12rpx 30rpx;
		box-sizing: border-box;
		.search {
			flex: 1;
		}
	}
	.tabs-wrapper {
		padding: 0 30rpx;
		.tabs {
			.tab-item {
				.tab-header-wrapper {
					display: flex;
					align-items: center;
					border-bottom: 1px solid #f0f0f0;
					.tab-header {
						line-height: 90rpx;
						flex: 1;
						text-align: center;
						font-size: 16px;
						color: #666666;
						cursor: pointer;
					}
					.actived {
						font-weight: bold;
						color: $primary-color;
						border-bottom: 2px solid $primary-color;
					}
				}
				.tab-content-wrapper {
					border-bottom: 1px solid #eeeeee;
					.filter-hotlevel {
						display: flex;
						padding: 20rpx 20rpx;
						border-bottom: 2px solid #eeeeee;
						.filter {
							font-size: 14px;
							color: #666666;
							background-color: #F1F1F1;
							margin-right: 16rpx;
							padding: 12rpx 16rpx;
							border-radius: 40rpx;
						}
						.active {
							color: #FFFFFF;
							background-color: $primary-color;
						}
					}
					.tab-content {
						margin-top: 40rpx;
						padding-bottom: 20rpx;
						border-bottom: 1px solid #f0f0f0;
						.title {
							font-size: 16px;
							color: #333333;
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
									font-size: 14px;
									color: #999999;
									margin-right: 20rpx;
									&:last-child {
										margin-right: 0;
									}
									.icon {
										font-family: iconfont;
										font-size: 14px;
										color: #999999;
										margin-right: 8rpx;
									}
								}
							}
						}
					}
				}
				.load-more {
					width: 100%;
					height: 60rpx;
				}
			}
		}
	}
}
</style>
