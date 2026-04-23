<template>
	<view class="checkout-page">
		<view class="section goods-section">
			<text class="section-title">商品信息</text>
			<view class="goods-row">
				<image class="goods-cover" :src="checkout.cover" mode="aspectFill"></image>
				<view class="goods-main">
					<text class="goods-title">{{ checkout.title }}</text>
					<text class="goods-type">{{ checkout.typeLabel }}</text>
					<text class="goods-price">¥{{ checkout.price.toFixed(2) }}</text>
				</view>
			</view>
		</view>

		<view class="section" v-if="checkout.type === 'activity'">
			<text class="section-title">选择学生</text>
			<picker class="student-picker" :range="students" range-key="name" :value="selectedStudentIndex" @change="onStudentChange">
				<view class="picker-value">{{ students[selectedStudentIndex].name }}（{{ students[selectedStudentIndex].grade }}）</view>
			</picker>
		</view>

		<view class="section">
			<view class="line-between">
				<text class="section-title">积分抵扣</text>
				<switch :checked="usePoints" color="#3f67f3" @change="onPointsSwitch" />
			</view>
			<view class="points-row" v-if="usePoints">
				<text>可用积分：{{ availablePoints }}</text>
				<input class="points-input" type="number" v-model="pointsInput" @input="handlePointsInput" />
			</view>
			<text class="tips">积分与金额 1:1 抵扣，最多可抵扣 ¥{{ maxDeduction.toFixed(2) }}</text>
		</view>

		<view class="section">
			<text class="section-title">支付方式</text>
			<view class="pay-channel">
				<uni-icons type="weixin" size="20" color="#23c343"></uni-icons>
				<text>微信支付</text>
				<text class="channel-tag">默认</text>
			</view>
		</view>

		<view class="section amount-section">
			<view class="line-between"><text>商品金额</text><text>¥{{ checkout.price.toFixed(2) }}</text></view>
			<view class="line-between"><text>积分抵扣</text><text class="minus">-¥{{ pointsDeduction.toFixed(2) }}</text></view>
			<view class="line-between total"><text>应付金额</text><text class="payable">¥{{ payableAmount.toFixed(2) }}</text></view>
		</view>

		<view class="safe-space"></view>
		<view class="bottom-bar">
			<view class="bottom-price">
				<text>合计：</text>
				<text class="price">¥{{ payableAmount.toFixed(2) }}</text>
			</view>
			<button class="pay-btn" @click="submitPayment">立即支付</button>
		</view>

		<uni-popup ref="payPopup" type="bottom" background-color="#fff">
			<view class="pay-popup">
				<text class="popup-title">模拟支付结果</text>
				<view class="popup-row">
					<button class="popup-btn popup-success" @click="finishPay('success')">支付成功</button>
					<button class="popup-btn popup-fail" @click="finishPay('fail')">支付失败</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			checkout: {
				title: '实验中学高三数学压轴题专项训练（A卷）',
				type: 'paper',
				typeLabel: '在线试卷下载',
				price: 12.9,
				cover: '/static/c6.png'
			},
			students: [
				{ name: '张小明', grade: '高三(1)班' },
				{ name: '李晓彤', grade: '高二(3)班' }
			],
			selectedStudentIndex: 0,
			availablePoints: 80,
			usePoints: false,
			pointsInput: '0'
		}
	},
	computed: {
		maxDeduction() {
			return Math.min(this.availablePoints, this.checkout.price)
		},
		pointsDeduction() {
			if (!this.usePoints) return 0
			const n = Number(this.pointsInput) || 0
			return Math.min(Math.max(n, 0), this.maxDeduction)
		},
		payableAmount() {
			return this.checkout.price - this.pointsDeduction
		}
	},
	onLoad(options) {
		if (!options) return
		const type = options.type || 'paper'
		this.checkout = {
			...this.checkout,
			title: options.title ? decodeURIComponent(options.title) : this.checkout.title,
			price: options.price ? Number(options.price) : this.checkout.price,
			type,
			typeLabel: type === 'activity' ? '活动报名' : '在线试卷下载',
			cover: options.cover ? decodeURIComponent(options.cover) : this.checkout.cover
		}
	},
	methods: {
		onStudentChange(e) {
			this.selectedStudentIndex = Number(e.detail.value)
		},
		onPointsSwitch(e) {
			this.usePoints = e.detail.value
		},
		handlePointsInput(e) {
			const raw = e.detail.value.replace(/[^\d]/g, '')
			this.pointsInput = raw
		},
		submitPayment() {
			this.$refs.payPopup.open()
		},
		finishPay(result) {
			this.$refs.payPopup.close()
			const student = this.checkout.type === 'activity' ? this.students[this.selectedStudentIndex].name : ''
			uni.navigateTo({
				url: `/pages/pay-result/index?status=${result}&amount=${this.payableAmount.toFixed(2)}&title=${encodeURIComponent(this.checkout.title)}&type=${this.checkout.type}&student=${encodeURIComponent(student)}`
			})
		}
	}
}
</script>

<style>
.checkout-page { min-height: 100vh; background: #f5f7fb; padding: 20rpx; }
.section { background: #fff; border-radius: 16rpx; padding: 20rpx; margin-bottom: 16rpx; }
.section-title { font-size: 27rpx; font-weight: 700; color: #1f2433; }
.goods-row { margin-top: 14rpx; display: flex; gap: 14rpx; }
.goods-cover { width: 140rpx; height: 140rpx; border-radius: 12rpx; }
.goods-main { flex: 1; display: flex; flex-direction: column; }
.goods-title { font-size: 26rpx; line-height: 1.45; color: #1f2433; font-weight: 600; }
.goods-type { margin-top: 8rpx; font-size: 21rpx; color: #4c6ef5; }
.goods-price { margin-top: auto; color: #ff4c4f; font-size: 32rpx; font-weight: 700; }
.student-picker { margin-top: 14rpx; background: #f6f8fe; border-radius: 12rpx; padding: 0 14rpx; height: 68rpx; line-height: 68rpx; }
.picker-value { font-size: 24rpx; color: #42506d; }
.line-between { display: flex; align-items: center; justify-content: space-between; }
.points-row { margin-top: 12rpx; display: flex; justify-content: space-between; align-items: center; font-size: 23rpx; color: #67748f; }
.points-input { width: 170rpx; height: 58rpx; text-align: center; border-radius: 10rpx; background: #f6f8fe; font-size: 23rpx; }
.tips { margin-top: 10rpx; font-size: 21rpx; color: #97a2ba; display: block; }
.pay-channel { margin-top: 12rpx; display: flex; align-items: center; gap: 10rpx; font-size: 25rpx; color: #1f2433; }
.channel-tag { margin-left: auto; font-size: 20rpx; color: #23c343; background: #e8f8ec; padding: 6rpx 10rpx; border-radius: 999rpx; }
.amount-section { font-size: 24rpx; color: #44506b; display: flex; flex-direction: column; gap: 12rpx; }
.minus { color: #5f6b84; }
.total { margin-top: 6rpx; padding-top: 12rpx; border-top: 1px dashed #e9edf7; }
.payable { color: #ff4c4f; font-size: 34rpx; font-weight: 700; }
.safe-space { height: 130rpx; }
.bottom-bar { position: fixed; left: 0; right: 0; bottom: 0; background: #fff; border-top: 1px solid #e9edf7; padding: 14rpx 20rpx calc(14rpx + env(safe-area-inset-bottom)); display: flex; align-items: center; gap: 14rpx; }
.bottom-price { flex: 1; font-size: 24rpx; color: #5d6883; }
.bottom-price .price { font-size: 36rpx; color: #ff4c4f; font-weight: 700; }
.pay-btn { height: 72rpx; line-height: 72rpx; border-radius: 999rpx; background: linear-gradient(135deg, #4f7bff, #3f67f3); color: #fff; font-size: 26rpx; padding: 0 38rpx; }
.pay-btn::after, .popup-btn::after { border: none; }
.pay-popup { padding: 26rpx 24rpx 30rpx; }
.popup-title { text-align: center; display: block; font-size: 28rpx; color: #1f2433; font-weight: 700; }
.popup-row { margin-top: 18rpx; display: flex; gap: 12rpx; }
.popup-btn { flex: 1; height: 68rpx; line-height: 68rpx; border-radius: 12rpx; font-size: 25rpx; }
.popup-success { background: #2fb65d; color: #fff; }
.popup-fail { background: #f5f6fa; color: #56627d; }
</style>
