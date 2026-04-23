<template>
	<view class="question-bank-page">
		<view class="search-panel">
			<view class="search-row">
				<view class="search-box">
					<uni-icons type="search" size="16" color="#9aa3b7"></uni-icons>
					<input
						class="search-input"
						type="text"
						v-model="keyword"
						placeholder="搜索试题名称，如：2025高一数学期中卷"
						placeholder-class="search-placeholder"
					/>
				</view>
				<button class="search-btn" @click="handleSearch">搜索</button>
			</view>

			<view class="filter-row">
				<picker class="select-wrap" :range="schools" :value="selectedSchool" @change="onSchoolChange">
					<view class="select-box">{{ schools[selectedSchool] }}</view>
				</picker>
				<picker class="select-wrap" :range="subjects" :value="selectedSubject" @change="onSubjectChange">
					<view class="select-box">{{ subjects[selectedSubject] }}</view>
				</picker>
				<picker class="select-wrap" :range="grades" :value="selectedGrade" @change="onGradeChange">
					<view class="select-box">{{ grades[selectedGrade] }}</view>
				</picker>
				<button class="filter-btn" @click="openFilterDrawer">
					<uni-icons type="settings" size="14" color="#3f67f3"></uni-icons>
					<text>筛选</text>
				</button>
			</view>
		</view>

		<view class="result-row">
			<text class="result-count">共 {{ filteredQuestions.length }} 套试题</text>
			<text class="result-sort">默认排序：综合推荐</text>
		</view>

		<view class="question-list">
			<view class="question-card" v-for="item in filteredQuestions" :key="item.id">
				<image class="thumb" :src="item.thumb" mode="aspectFill"></image>
				<view class="card-main">
					<text class="name">{{ item.name }}</text>
					<view class="meta-line">
						<text class="date">{{ item.date }}</text>
						<text class="page-count">{{ item.pages }}页</text>
					</view>
					<view class="bottom-line">
						<text class="price">¥{{ item.price }}</text>
						<view class="views">
							<uni-icons type="eye" size="15" color="#8f9bb2"></uni-icons>
							<text>{{ item.views }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view v-if="!filteredQuestions.length" class="empty-box">
			<uni-icons type="search" size="24" color="#9aa3b7"></uni-icons>
			<text>暂无匹配试题，请调整筛选条件</text>
		</view>

		<uni-drawer ref="filterDrawer" mode="right" :width="300">
			<view class="drawer-body">
				<text class="drawer-title">全部筛选条件</text>
				<view class="drawer-group">
					<text class="group-label">试卷类型</text>
					<view class="tag-row">
						<text class="tag" v-for="item in paperTypes" :key="item">{{ item }}</text>
					</view>
				</view>
				<view class="drawer-group">
					<text class="group-label">题量区间</text>
					<view class="tag-row">
						<text class="tag" v-for="item in amountRanges" :key="item">{{ item }}</text>
					</view>
				</view>
				<view class="drawer-group">
					<text class="group-label">难度</text>
					<view class="tag-row">
						<text class="tag" v-for="item in levels" :key="item">{{ item }}</text>
					</view>
				</view>
				<button class="drawer-close" @click="closeFilterDrawer">完成</button>
			</view>
		</uni-drawer>
	</view>
</template>

<script>
const questionData = [
	{
		id: 1,
		name: '2025学年高一数学上册期中测试卷（含解析）',
		school: '全部学校',
		subject: '数学',
		grade: '高一',
		price: '9.90',
		date: '2026-03-12',
		views: 1286,
		pages: 12,
		thumb: '/static/c1.png'
	},
	{
		id: 2,
		name: '某重点中学高二物理月考卷（力学综合）',
		school: '第一中学',
		subject: '物理',
		grade: '高二',
		price: '12.80',
		date: '2026-02-20',
		views: 934,
		pages: 10,
		thumb: '/static/c2.png'
	},
	{
		id: 3,
		name: '2026届高三英语二轮复习阅读专项训练',
		school: '实验中学',
		subject: '英语',
		grade: '高三',
		price: '15.00',
		date: '2026-01-28',
		views: 2201,
		pages: 18,
		thumb: '/static/c3.png'
	},
	{
		id: 4,
		name: '初二语文下册单元综合测试（含作文指导）',
		school: '育才中学',
		subject: '语文',
		grade: '初二',
		price: '7.50',
		date: '2026-03-05',
		views: 763,
		pages: 8,
		thumb: '/static/c4.png'
	},
	{
		id: 5,
		name: '高三化学实验与反应原理专题卷',
		school: '第一中学',
		subject: '化学',
		grade: '高三',
		price: '11.60',
		date: '2026-03-30',
		views: 1468,
		pages: 14,
		thumb: '/static/c5.png'
	}
]

export default {
	data() {
		return {
			keyword: '',
			schools: ['全部学校', '第一中学', '实验中学', '育才中学'],
			subjects: ['全部科目', '语文', '数学', '英语', '物理', '化学'],
			grades: ['全部年级', '初二', '高一', '高二', '高三'],
			selectedSchool: 0,
			selectedSubject: 0,
			selectedGrade: 0,
			questions: questionData,
			paperTypes: ['月考', '期中', '期末', '专题训练', '联考'],
			amountRanges: ['10题以下', '10-20题', '20-30题', '30题以上'],
			levels: ['基础', '提升', '冲刺']
		}
	},
	computed: {
		filteredQuestions() {
			return this.questions.filter((item) => {
				const matchKeyword = !this.keyword || item.name.toLowerCase().includes(this.keyword.toLowerCase())
				const schoolValue = this.schools[this.selectedSchool]
				const subjectValue = this.subjects[this.selectedSubject]
				const gradeValue = this.grades[this.selectedGrade]
				const matchSchool = schoolValue === '全部学校' || item.school === schoolValue
				const matchSubject = subjectValue === '全部科目' || item.subject === subjectValue
				const matchGrade = gradeValue === '全部年级' || item.grade === gradeValue
				return matchKeyword && matchSchool && matchSubject && matchGrade
			})
		}
	},
	methods: {
		handleSearch() {
			uni.showToast({ title: '已完成检索', icon: 'none' })
		},
		onSchoolChange(event) {
			this.selectedSchool = Number(event.detail.value)
		},
		onSubjectChange(event) {
			this.selectedSubject = Number(event.detail.value)
		},
		onGradeChange(event) {
			this.selectedGrade = Number(event.detail.value)
		},
		openFilterDrawer() {
			this.$refs.filterDrawer.open()
		},
		closeFilterDrawer() {
			this.$refs.filterDrawer.close()
		}
	}
}
</script>

<style>
.question-bank-page {
	min-height: 100vh;
	box-sizing: border-box;
	padding: 24rpx;
	background: #f5f7fb;
}

.search-panel {
	background: #ffffff;
	padding: 24rpx;
	border-radius: 20rpx;
	box-shadow: 0 8rpx 30rpx rgba(31, 36, 51, 0.06);
}

.search-row {
	display: flex;
	gap: 16rpx;
}

.search-box {
	flex: 1;
	display: flex;
	align-items: center;
	gap: 12rpx;
	background: #f6f8fe;
	border-radius: 14rpx;
	padding: 0 18rpx;
	height: 74rpx;
}

.search-input {
	flex: 1;
	font-size: 26rpx;
	color: #1f2433;
}

.search-placeholder {
	color: #9aa3b7;
}

.search-btn {
	height: 74rpx;
	line-height: 74rpx;
	border-radius: 14rpx;
	background: linear-gradient(135deg, #4f7bff, #3f67f3);
	color: #fff;
	font-size: 26rpx;
	padding: 0 28rpx;
}

.search-btn::after,
.filter-btn::after,
.drawer-close::after {
	border: none;
}

.filter-row {
	margin-top: 18rpx;
	display: flex;
	flex-wrap: wrap;
	gap: 14rpx;
}

.select-wrap {
	flex: 1;
	min-width: 180rpx;
}

.select-box {
	height: 64rpx;
	line-height: 64rpx;
	padding: 0 20rpx;
	border-radius: 12rpx;
	background: #f6f8fe;
	font-size: 24rpx;
	color: #47506b;
}

.filter-btn {
	display: flex;
	align-items: center;
	gap: 8rpx;
	height: 64rpx;
	line-height: 64rpx;
	padding: 0 20rpx;
	border-radius: 12rpx;
	font-size: 24rpx;
	color: #3f67f3;
	background: #eef3ff;
}

.result-row {
	margin-top: 22rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 4rpx;
}

.result-count {
	font-size: 25rpx;
	font-weight: 600;
	color: #1f2433;
}

.result-sort {
	font-size: 22rpx;
	color: #9aa3b7;
}

.question-list {
	margin-top: 16rpx;
	display: flex;
	flex-direction: column;
	gap: 16rpx;
}

.question-card {
	display: flex;
	gap: 16rpx;
	padding: 18rpx;
	border-radius: 18rpx;
	background: #ffffff;
	box-shadow: 0 10rpx 30rpx rgba(17, 33, 84, 0.06);
}

.thumb {
	width: 172rpx;
	height: 172rpx;
	border-radius: 14rpx;
	background: #eef1f9;
}

.card-main {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-width: 0;
}

.name {
	font-size: 28rpx;
	font-weight: 600;
	color: #1f2433;
	line-height: 1.45;
}

.meta-line {
	display: flex;
	align-items: center;
	gap: 16rpx;
	margin-top: 10rpx;
}

.date,
.page-count {
	font-size: 22rpx;
	color: #78829a;
}

.bottom-line {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 14rpx;
}

.price {
	font-size: 34rpx;
	font-weight: 700;
	color: #ff4c4f;
}

.views {
	display: flex;
	align-items: center;
	gap: 8rpx;
	font-size: 22rpx;
	color: #8f9bb2;
}

.empty-box {
	margin-top: 80rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10rpx;
	color: #8f9bb2;
	font-size: 24rpx;
}

.drawer-body {
	height: 100%;
	padding: 34rpx 26rpx;
	background: #fff;
	box-sizing: border-box;
}

.drawer-title {
	font-size: 30rpx;
	font-weight: 700;
	color: #1f2433;
}

.drawer-group {
	margin-top: 28rpx;
}

.group-label {
	font-size: 24rpx;
	color: #66708b;
}

.tag-row {
	margin-top: 14rpx;
	display: flex;
	flex-wrap: wrap;
	gap: 12rpx;
}

.tag {
	padding: 10rpx 16rpx;
	border-radius: 999rpx;
	background: #f4f6fb;
	font-size: 22rpx;
	color: #596583;
}

.drawer-close {
	margin-top: 34rpx;
	height: 72rpx;
	line-height: 72rpx;
	border-radius: 12rpx;
	font-size: 26rpx;
	color: #fff;
	background: linear-gradient(135deg, #4f7bff, #3f67f3);
}
</style>
