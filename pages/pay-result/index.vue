<template>
	<view class="pay-result-page">
		<view class="result-card">
			<uni-icons :type="isSuccess ? 'checkbox-filled' : 'clear'" :color="isSuccess ? '#24b15f' : '#ff5a5f'" size="54"></uni-icons>
			<text class="result-title">{{ isSuccess ? '支付成功' : '支付失败' }}</text>
			<text class="result-desc">{{ isSuccess ? '订单已完成，可在“我的订单”查看' : '请检查网络或支付方式后重试' }}</text>

			<view class="summary">
				<view class="summary-row"><text>商品名称</text><text class="value">{{ title }}</text></view>
				<view class="summary-row"><text>商品类型</text><text class="value">{{ type === 'activity' ? '活动报名' : '在线试卷下载' }}</text></view>
				<view class="summary-row" v-if="student"><text>报名学生</text><text class="value">{{ student }}</text></view>
				<view class="summary-row"><text>支付金额</text><text class="value price">¥{{ amount }}</text></view>
			</view>
		</view>

		<view class="action-group">
			<button class="btn btn-primary" @click="goOrders">查看订单</button>
			<button class="btn btn-light" @click="goHome">返回首页</button>
			<button v-if="!isSuccess" class="btn btn-primary" @click="retryPay">重新支付</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			status: 'success',
			amount: '0.00',
			title: '',
			type: 'paper',
			student: ''
		}
	},
	computed: {
		isSuccess() {
			return this.status === 'success'
		}
	},
	onLoad(options) {
		if (!options) return
		this.status = options.status || 'success'
		this.amount = options.amount || '0.00'
		this.title = options.title ? decodeURIComponent(options.title) : '未命名商品'
		this.type = options.type || 'paper'
		this.student = options.student ? decodeURIComponent(options.student) : ''
	},
	methods: {
		goOrders() {
			uni.navigateTo({ url: '/pages/my-orders/index' })
		},
		goHome() {
			uni.switchTab({ url: '/pages/index/index' })
		},
		retryPay() {
			uni.navigateBack({ delta: 1 })
		}
	}
}
</script>

<style>
.pay-result-page { min-height: 100vh; background: #f5f7fb; padding: 24rpx; }
.result-card { background: #fff; border-radius: 18rpx; padding: 30rpx 24rpx; text-align: center; box-shadow: 0 10rpx 28rpx rgba(19, 35, 86, 0.06); }
.result-title { margin-top: 14rpx; display: block; font-size: 36rpx; color: #1f2433; font-weight: 700; }
.result-desc { margin-top: 8rpx; display: block; font-size: 23rpx; color: #79839b; }
.summary { margin-top: 24rpx; border-top: 1px dashed #e9edf7; padding-top: 16rpx; }
.summary-row { display: flex; justify-content: space-between; gap: 14rpx; font-size: 24rpx; color: #61708d; margin-top: 12rpx; text-align: left; }
.summary-row .value { color: #1f2433; max-width: 420rpx; text-align: right; }
.summary-row .price { color: #ff4c4f; font-size: 32rpx; font-weight: 700; }
.action-group { margin-top: 22rpx; display: flex; flex-direction: column; gap: 12rpx; }
.btn { height: 72rpx; line-height: 72rpx; border-radius: 12rpx; font-size: 26rpx; }
.btn::after { border: none; }
.btn-primary { background: linear-gradient(135deg, #4f7bff, #3f67f3); color: #fff; }
.btn-light { background: #f1f4fb; color: #5f6b86; }
</style>
