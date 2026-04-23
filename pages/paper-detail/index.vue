<template>
	<view class="paper-detail-page">
		<view class="header-card">
			<text class="title">{{ detail.name }}</text>
			<view class="meta-row">
				<text>{{ detail.date }}</text>
				<text>{{ detail.pages }}页</text>
				<text>{{ detail.views }}人浏览</text>
				<text>{{ detail.size }}</text>
			</view>
		</view>

		<view class="divider"></view>

		<view class="preview-section">
			<view class="section-head">
				<text class="section-title">试卷预览</text>
			</view>
			<view class="preview-page" v-for="(img, idx) in previewImages" :key="img">
				<image :src="img" mode="widthFix" class="preview-img"></image>
				<text class="page-index">第{{ idx + 1 }}页</text>
			</view>
		</view>

		<view class="preview-tip">
			<text>预览结束，还剩 {{ leftPages }} 页内容，购买后可下载完整试卷与答案解析。</text>
		</view>

		<view class="safe-space"></view>

		<view class="purchase-bar common-paybar">
			<view class="share-box" @click="handleShare">
				<uni-icons type="redo" size="18" color="#65708d"></uni-icons>
				<text>分享</text>
			</view>
			<view class="price-box">
				<text class="current-price common-pay-price">¥{{ detail.price }}</text>
				</view>
			<button class="buy-btn common-pay-btn" @click="handleBuy">立即购买</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			detail: {
				name: '高三化学实验与反应原理专题卷',
				price: '11.60',
								date: '2026-03-30',
				pages: 14,
				views: 1468,
				size: '3.8MB'
			},
			previewImages: ['/static/c7.png', '/static/c8.png']
		}
	},
	computed: {
		leftPages() {
			const left = Number(this.detail.pages) - 2
			return left > 0 ? left : 0
		}
	},
	onLoad(options) {
		if (!options) return
		this.detail = {
			...this.detail,
			name: options.name ? decodeURIComponent(options.name) : this.detail.name,
			price: options.price || this.detail.price,
			date: options.date || this.detail.date,
			pages: options.pages ? Number(options.pages) : this.detail.pages,
			views: options.views ? Number(options.views) : this.detail.views
		}
	},
	methods: {
		handleShare() {
			uni.showToast({ title: '分享功能开发中', icon: 'none' })
		},
		handleBuy() {
			uni.navigateTo({
				url: `/pages/checkout/index?type=paper&title=${encodeURIComponent(this.detail.name)}&price=${this.detail.price}`
			})
		}
	}
}
</script>

<style>
.paper-detail-page { min-height: 100vh; background: #f5f7fb; padding: 24rpx; box-sizing: border-box; }
.header-card { background: #fff; border-radius: 18rpx; padding: 24rpx; box-shadow: 0 8rpx 24rpx rgba(26, 43, 90, 0.06); }
.title { font-size: 34rpx; font-weight: 700; color: #1f2433; line-height: 1.5; }
.meta-row { margin-top: 16rpx; display: flex; flex-wrap: wrap; gap: 26rpx; font-size: 22rpx; color: #7a859d; line-height: 1.8; }
.divider { height: 2rpx; background: #e8edf7; margin: 20rpx 0; }
.preview-section { background: #fff; border-radius: 18rpx; padding: 20rpx; box-shadow: 0 8rpx 24rpx rgba(26, 43, 90, 0.06); margin-bottom: 24rpx; }
.section-head { display: flex; align-items: center; margin-bottom: 14rpx; }
.section-title { font-size: 28rpx; font-weight: 700; color: #1f2433; }
.preview-page { margin-bottom: 18rpx; background: #f8faff; border-radius: 12rpx; padding: 12rpx; }
.preview-page:last-child { margin-bottom: 0; }
.preview-img { width: 100%; border-radius: 10rpx; }
.page-index { margin-top: 10rpx; display: block; font-size: 21rpx; color: #75819b; text-align: center; }
.preview-tip { background: #fff8eb; color: #af7d22; font-size: 23rpx; padding: 16rpx 18rpx; border-radius: 12rpx; line-height: 1.6; margin-bottom: 28rpx; }
.safe-space { height: 140rpx; }
.purchase-bar { }
.share-box { width: 94rpx; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 21rpx; color: #65708d; }
.price-box { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.current-price { font-size: 36rpx; font-weight: 700; color: #ff4c4f; line-height: 1.2; }
.buy-btn { }
</style>
