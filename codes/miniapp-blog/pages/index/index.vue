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
						<!-- 文章列表 -->
						<view 
							class="tab-content" 
							v-for="(subItem, subIndex) in item.tabsContent"
							:key="subIndex">
							<view class="title">{{ subItem.title }}</view>
							<view class="image-wrapper">
								<image class="image" :src="subItem.imageUrl" mode="widthFix"></image>
							</view>
							<view class="tools-wrapper">
								<view class="tools-item-wrapper">
									<view class="tools-item">
										<text class="icon">&#xe716;</text>
										<text>{{ subItem.updateAt }}</text>
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
							value: 'lastest',
							actived: true
						},
						tabsContent: [
							{
								id: '1',
								title: '双十一，我们在忙些什么',
								imageUrl: articleImage,
								updateAt: '2019-11-11',
								browserNum: 20,
								likeNum: 4,
								commentNum: 2
							},{
								id: '1',
								title: '双十一，我们在忙些什么',
								imageUrl: articleImage,
								updateAt: '2019-11-11',
								browserNum: 20,
								likeNum: 4,
								commentNum: 2
							},{
								id: '1',
								title: '双十一，我们在忙些什么',
								imageUrl: articleImage,
								updateAt: '2019-11-11',
								browserNum: 20,
								likeNum: 4,
								commentNum: 2
							}
						]
					},{
						tabsHeader: {
							text: '热门',
							value: 'hotest',
							actived: true
						},
						tabsContent: [
							{
								id: '1',
								title: '双十一，我们在忙些什么',
								imageUrl: articleImage,
								updateAt: '2019-11-11',
								likeNum: 4,
								browserNum: 20,
								commentNum: 2
							}
						]
					},{
						tabsHeader: {
							text: '标签',
							value: 'classify',
							actived: true
						},
						tabsContent: [
							{
								id: '1',
								title: '双十一，我们在忙些什么',
								imageUrl: articleImage,
								updateAt: '2019-11-11',
								likeNum: 4,
								browserNum: 20,
								commentNum: 2
							}
						]
					},
				],
				showLoadMore: false,
				loadMoreType: 'loading'
			}
		},
		onLoad() {

		},
		onReachBottom () {
			console.log('loadMore......')
			this.showLoadMore = true
			setTimeout(() => {
				this.showLoadMore = false
				// this.loadMoreType = 'loading'
				// setTimeout(() => {
				// 	this.showLoadMore = false
				// }, 1000)
			}, 1000)
		},
		methods: {
			confirmSearch (value) {
				console.log(value)
			},
			changeTab (index, value) {
				this.selectedTabIndex = index
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
					padding: 30rpx 0;
					.tab-content {
						.title {
							font-size: 16px;
							color: #333333;
						}
						.image-wrapper {
							padding: 20rpx 0;
							.image {
								width: 100%;
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
									color: #333333;
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
