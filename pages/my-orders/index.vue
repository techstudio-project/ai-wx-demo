<template>
	<view class="my-orders-page">
		<view class="sticky-tabs">
			<view
				v-for="tab in tabs"
				:key="tab.key"
				class="tab-item"
				:class="{ active: activeTab === tab.key }"
				@click="activeTab = tab.key"
			>
				{{ tab.label }}
			</view>
		</view>

		<view class="order-list" v-if="filteredOrders.length">
			<view class="order-card" v-for="order in filteredOrders" :key="order.id">
				<view class="order-head">
					<text class="order-no">订单号：{{ order.no }}</text>
					<text class="status" :class="`status-${order.statusKey}`">{{ order.statusText }}</text>
				</view>

				<view class="goods-row">
					<image class="goods-cover" :src="order.cover" mode="aspectFill"></image>
					<view class="goods-main">
						<text class="goods-title">{{ order.title }}</text>
						<text class="goods-type">{{ order.type }}</text>
						<view class="goods-bottom">
							<text class="price">¥{{ order.price }}</text>
							<text class="count">x1</text>
						</view>
					</view>
				</view>

				<view class="meta-row">
					<text>下单时间：{{ order.createAt }}</text>
					<text>支付方式：{{ order.payType }}</text>
				</view>

				<view class="action-row">
					<button v-if="order.statusKey === 'pending'" class="btn btn-light" @click="cancelOrder(order)">取消订单</button>
					<button v-if="order.statusKey === 'pending'" class="btn btn-primary" @click="payNow(order)">立即支付</button>
					<button v-if="order.statusKey === 'paid' && order.type.includes('试卷')" class="btn btn-primary" @click="downloadNow(order)">下载试卷</button>
					<button v-if="order.statusKey === 'paid' && order.type.includes('活动')" class="btn btn-primary" @click="viewTicket(order)">查看报名信息</button>
					<button v-if="order.statusKey === 'closed'" class="btn btn-light" @click="reorder(order)">重新下单</button>
				</view>
			</view>
		</view>

		<view v-else class="empty-box">
			<uni-icons type="wallet" size="28" color="#a3acc2"></uni-icons>
			<text>暂无订单记录</text>
		</view>
	</view>
</template>

<script>
const mockOrders = [
	{ id: 1, no: 'V202604230001', statusKey: 'pending', statusText: '待支付', title: '2026高考冲刺百日誓师与学科提分营', type: '活动报名', price: '99.00', createAt: '2026-04-23 10:22', payType: '微信支付', cover: '/static/c9.png' },
	{ id: 2, no: 'V202604220013', statusKey: 'paid', statusText: '已完成', title: '实验中学高三数学压轴题专项训练（A卷）', type: '在线试卷下载', price: '12.90', createAt: '2026-04-22 19:05', payType: '支付宝', cover: '/static/c6.png' },
	{ id: 3, no: 'V202604180088', statusKey: 'closed', statusText: '已关闭', title: '高二物理电磁场专题测试（含解析）', type: '在线试卷下载', price: '10.50', createAt: '2026-04-18 08:49', payType: '微信支付', cover: '/static/c7.png' }
]

export default {
	data() {
		return {
			activeTab: 'all',
			tabs: [
				{ key: 'all', label: '全部' },
				{ key: 'pending', label: '待支付' },
				{ key: 'paid', label: '已完成' },
				{ key: 'closed', label: '已关闭' }
			],
			orders: mockOrders
		}
	},
	computed: {
		filteredOrders() {
			if (this.activeTab === 'all') return this.orders
			return this.orders.filter((item) => item.statusKey === this.activeTab)
		}
	},
	methods: {
		cancelOrder() {
			uni.showToast({ title: '订单已取消', icon: 'none' })
		},
		payNow(order) {
			const type = order.type.includes('活动') ? 'activity' : 'paper'
			uni.navigateTo({
				url: `/pages/checkout/index?type=${type}&title=${encodeURIComponent(order.title)}&price=${order.price}&cover=${encodeURIComponent(order.cover)}`
			})
		},
		downloadNow() {
			uni.showToast({ title: '下载任务已创建', icon: 'none' })
		},
		viewTicket() {
			uni.showToast({ title: '查看报名信息', icon: 'none' })
		},
		reorder() {
			uni.showToast({ title: '重新下单', icon: 'none' })
		}
	}
}
</script>

<style>
.my-orders-page { min-height: 100vh; background: #f5f7fb; }
.sticky-tabs { position: sticky; top: 0; z-index: 30; display: flex; justify-content: space-around; background: #fff; border-bottom: 1px solid #ebeff8; padding: 10rpx 0; }
.tab-item { font-size: 25rpx; color: #7a86a0; padding: 14rpx 8rpx; position: relative; }
.tab-item.active { color: #2f57f4; font-weight: 700; }
.tab-item.active::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; margin: auto; width: 70%; height: 6rpx; border-radius: 999rpx; background: #2f57f4; }
.order-list { padding: 18rpx 20rpx 30rpx; display: flex; flex-direction: column; gap: 16rpx; }
.order-card { background: #fff; border-radius: 16rpx; padding: 18rpx; box-shadow: 0 10rpx 26rpx rgba(20, 37, 87, 0.06); }
.order-head { display: flex; align-items: center; justify-content: space-between; }
.order-no { font-size: 22rpx; color: #8a94ab; }
.status { font-size: 24rpx; font-weight: 600; }
.status-pending { color: #f58c2c; }
.status-paid { color: #25a85f; }
.status-closed { color: #9aa3b8; }
.goods-row { margin-top: 16rpx; display: flex; gap: 14rpx; }
.goods-cover { width: 150rpx; height: 150rpx; border-radius: 12rpx; }
.goods-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.goods-title { font-size: 27rpx; color: #1f2433; line-height: 1.4; font-weight: 600; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.goods-type { margin-top: 8rpx; display: inline-block; width: fit-content; font-size: 21rpx; color: #4c6ef5; background: #ebf1ff; border-radius: 999rpx; padding: 6rpx 14rpx; }
.goods-bottom { margin-top: auto; display: flex; align-items: center; justify-content: space-between; }
.price { font-size: 34rpx; color: #ff4c4f; font-weight: 700; }
.count { font-size: 22rpx; color: #8f9bb2; }
.meta-row { margin-top: 14rpx; padding-top: 14rpx; border-top: 1px dashed #edf1f9; display: flex; flex-direction: column; gap: 8rpx; font-size: 22rpx; color: #7f8aa2; }
.action-row { margin-top: 16rpx; display: flex; justify-content: flex-end; gap: 12rpx; }
.btn { height: 60rpx; line-height: 60rpx; border-radius: 999rpx; font-size: 23rpx; padding: 0 24rpx; }
.btn::after { border: none; }
.btn-light { background: #f4f6fb; color: #5c6885; }
.btn-primary { background: linear-gradient(135deg, #4f7bff, #3f67f3); color: #fff; }
.empty-box { margin-top: 180rpx; display: flex; flex-direction: column; align-items: center; gap: 12rpx; font-size: 24rpx; color: #97a2ba; }
</style>
