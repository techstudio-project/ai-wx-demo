<template>
	<view class="activity-detail-page">
		<view class="head-card">
			<text class="activity-name">{{ activity.name }}</text>
			<view class="status-row">
				<text class="status-tag" :class="statusClass">{{ activity.status }}</text>
				<text v-if="activity.status === '报名中'" class="countdown">报名剩余：{{ countdownText }}</text>
			</view>
		</view>

		<view class="detail-block">
			<text class="detail-title">活动详情</text>
			<rich-text class="detail-richtext" :nodes="activity.detailHtml"></rich-text>
		</view>

		<view class="safe-space"></view>

		<view class="purchase-bar common-paybar">
			<view class="share-box" @click="handleShare">
				<uni-icons type="redo" size="18" color="#65708d"></uni-icons>
				<text>分享</text>
			</view>
			<view class="price-box">
				<text class="current-price common-pay-price">¥{{ activity.fee }}</text>
				</view>
			<button class="buy-btn common-pay-btn" @click="handleSignup">立即报名</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			activity: {
				name: '2026高考冲刺百日誓师与学科提分营',
				status: '报名中',
				endAt: '2026-05-20 20:00:00',
				fee: '99.00',
								detailHtml:
					'<div style="line-height:1.9;color:#4f5a76;font-size:14px;">' +
					'<p><strong>活动亮点</strong></p>' +
					'<p>1. 名校名师直播串讲，覆盖语数英物化核心高频考点；</p>' +
					'<p>2. 赠送冲刺阶段学习规划模板与每日打卡任务；</p>' +
					'<p>3. 报名成功后可获取专属资料包与回放权限。</p>' +
					'<p><strong>适合人群</strong></p>' +
					'<p>高三在读学生、复读考生及需要短期提分的学习者。</p>' +
					'</div>'
			},
			timer: null,
			countdownText: '--'
		}
	},
	computed: {
		statusClass() {
			return this.activity.status === '报名中' ? 'is-open' : 'is-closed'
		}
	},
	onLoad(options) {
		if (options.name) this.activity.name = decodeURIComponent(options.name)
		this.updateCountdown()
		if (this.activity.status === '报名中') {
			this.timer = setInterval(this.updateCountdown, 1000)
		}
	},
	onUnload() {
		if (this.timer) clearInterval(this.timer)
	},
	methods: {
		updateCountdown() {
			const now = new Date().getTime()
			const end = new Date(this.activity.endAt.replace(/-/g, '/')).getTime()
			const diff = end - now
			if (diff <= 0) {
				this.countdownText = '已截止'
				this.activity.status = '报名已结束'
				if (this.timer) clearInterval(this.timer)
				return
			}
			const day = Math.floor(diff / (24 * 60 * 60 * 1000))
			const hour = Math.floor((diff / (60 * 60 * 1000)) % 24)
			const min = Math.floor((diff / (60 * 1000)) % 60)
			const sec = Math.floor((diff / 1000) % 60)
			this.countdownText = `${day}天 ${hour}时 ${min}分 ${sec}秒`
		},
		handleShare() {
			uni.showToast({ title: '分享功能开发中', icon: 'none' })
		},
		handleSignup() {
			uni.navigateTo({
				url: `/pages/checkout/index?type=activity&title=${encodeURIComponent(this.activity.name)}&price=${this.activity.fee}`
			})
		}
	}
}
</script>

<style>
.activity-detail-page { min-height: 100vh; background: #f5f7fb; padding: 24rpx; box-sizing: border-box; }
.head-card { background: #fff; border-radius: 18rpx; padding: 24rpx; box-shadow: 0 8rpx 24rpx rgba(26, 43, 90, 0.06); }
.activity-name { font-size: 34rpx; font-weight: 700; color: #1f2433; line-height: 1.45; }
.status-row { margin-top: 16rpx; display: flex; align-items: center; gap: 16rpx; flex-wrap: wrap; }
.status-tag { padding: 8rpx 16rpx; border-radius: 999rpx; font-size: 22rpx; }
.status-tag.is-open { background: #e9f8ee; color: #20a153; }
.status-tag.is-closed { background: #fbeaea; color: #d35454; }
.countdown { font-size: 23rpx; color: #ff7c24; }
.detail-block { margin-top: 18rpx; background: #fff; border-radius: 18rpx; padding: 22rpx; box-shadow: 0 8rpx 24rpx rgba(26, 43, 90, 0.06); }
.detail-title { font-size: 28rpx; color: #1f2433; font-weight: 700; }
.detail-richtext { margin-top: 14rpx; }
.safe-space { height: 140rpx; }
.purchase-bar { }
.share-box { width: 94rpx; display: flex; flex-direction: column; align-items: center; justify-content: center; font-size: 21rpx; color: #65708d; }
.price-box { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.current-price { font-size: 36rpx; font-weight: 700; color: #ff4c4f; line-height: 1.2; }
.buy-btn { }
</style>
