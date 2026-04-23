<template>
	<view class="paper-tab">
		<view class="search-row">
			<view class="search-box">
				<uni-icons type="search" size="16" color="#9aa3b7"></uni-icons>
				<input class="search-input" v-model="keyword" placeholder="搜索该校试题名称" placeholder-class="search-placeholder" />
			</view>
		</view>

		<view class="filter-row">
			<view class="drop-field" @click="toggleDropdown('subject')">
				<text>{{ selectedSubjectLabel }}</text>
				<uni-icons :type="dropdownOpen.subject ? 'top' : 'bottom'" size="12" color="#73809d"></uni-icons>
			</view>
			<view class="drop-field" @click="toggleDropdown('grade')">
				<text>{{ selectedGradeLabel }}</text>
				<uni-icons :type="dropdownOpen.grade ? 'top' : 'bottom'" size="12" color="#73809d"></uni-icons>
			</view>
		</view>

		<view v-if="dropdownOpen.subject" class="dropdown-panel">
			<text class="dropdown-title">按科目筛选</text>
			<view class="option-grid">
				<text v-for="item in subjects" :key="item" class="option-tag" :class="{ active: selectedSubjectLabel === item }" @click="chooseOption('subject', item)">{{ item }}</text>
			</view>
		</view>
		<view v-if="dropdownOpen.grade" class="dropdown-panel">
			<text class="dropdown-title">按年级筛选</text>
			<view class="option-grid">
				<text v-for="item in grades" :key="item" class="option-tag" :class="{ active: selectedGradeLabel === item }" @click="chooseOption('grade', item)">{{ item }}</text>
			</view>
		</view>

		<view class="result-count">共 {{ filteredQuestions.length }} 套试题</view>

		<view class="question-list">
			<view class="question-card" v-for="item in filteredQuestions" :key="item.id">
				<image class="thumb" :src="item.thumb" mode="aspectFill"></image>
				<view class="card-main">
					<text class="name">{{ item.name }}</text>
					<text class="price">¥{{ item.price }}</text>
					<view class="stats-row">
						<view class="stats-left">
							<view class="views-wrap">
								<uni-icons type="eye" size="14" color="#8f9bb2"></uni-icons>
								<text>{{ item.views }}人浏览</text>
							</view>
							<view class="page-wrap"><text>📄</text><text>{{ item.pages }}页</text></view>
						</view>
						<text class="date">{{ item.date }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const paperData = [
	{ id: 1, name: '实验中学高三数学压轴题专项训练（A卷）', subject: '数学', grade: '高三', price: '12.90', date: '2026-04-03', views: 1532, pages: 14, thumb: '/static/c6.png' },
	{ id: 2, name: '实验中学高二物理电磁场专题测试', subject: '物理', grade: '高二', price: '10.50', date: '2026-03-20', views: 889, pages: 10, thumb: '/static/c7.png' },
	{ id: 3, name: '实验中学高一英语阅读理解周测合集', subject: '英语', grade: '高一', price: '9.60', date: '2026-03-15', views: 1260, pages: 16, thumb: '/static/c8.png' }
]

export default {
	name: 'RecommendedPapersTab',
	data() {
		return {
			keyword: '',
			subjects: ['全部科目', '语文', '数学', '英语', '物理', '化学'],
			grades: ['全部年级', '高一', '高二', '高三'],
			selectedSubjectLabel: '全部科目',
			selectedGradeLabel: '全部年级',
			dropdownOpen: { subject: false, grade: false },
			questions: paperData
		}
	},
	computed: {
		filteredQuestions() {
			return this.questions.filter((item) => {
				const matchKeyword = !this.keyword || item.name.toLowerCase().includes(this.keyword.toLowerCase())
				const matchSubject = this.selectedSubjectLabel === '全部科目' || item.subject === this.selectedSubjectLabel
				const matchGrade = this.selectedGradeLabel === '全部年级' || item.grade === this.selectedGradeLabel
				return matchKeyword && matchSubject && matchGrade
			})
		}
	},
	methods: {
		toggleDropdown(type) {
			const next = !this.dropdownOpen[type]
			this.dropdownOpen = { subject: false, grade: false }
			this.dropdownOpen[type] = next
		},
		chooseOption(type, value) {
			if (type === 'subject') this.selectedSubjectLabel = value
			if (type === 'grade') this.selectedGradeLabel = value
			this.dropdownOpen = { subject: false, grade: false }
		}
	}
}
</script>

<style>
.paper-tab { padding: 22rpx 24rpx 28rpx; }
.search-box { display: flex; align-items: center; gap: 10rpx; background: #f6f8fe; border-radius: 14rpx; padding: 0 16rpx; height: 72rpx; }
.search-input { flex: 1; font-size: 25rpx; }
.search-placeholder { color: #9aa3b7; }
.filter-row { margin-top: 14rpx; display: grid; grid-template-columns: 1fr 1fr; gap: 12rpx; }
.drop-field { height: 62rpx; border-radius: 12rpx; background: #f6f8fe; padding: 0 16rpx; display: flex; align-items: center; justify-content: space-between; font-size: 23rpx; color: #47506b; }
.dropdown-panel { margin-top: 12rpx; border-radius: 12rpx; background: #f8faff; padding: 14rpx; border: 1px solid #e7ecfb; }
.dropdown-title { font-size: 23rpx; color: #5d6885; }
.option-grid { margin-top: 10rpx; display: flex; flex-wrap: wrap; gap: 10rpx; }
.option-tag { padding: 8rpx 15rpx; border-radius: 999rpx; background: #fff; border: 1px solid #e6ebf7; color: #58627d; font-size: 22rpx; }
.option-tag.active { color: #3f67f3; border-color: #cdd9ff; background: #eef3ff; }
.result-count { margin-top: 16rpx; font-size: 24rpx; color: #1f2433; font-weight: 600; }
.question-list { margin-top: 14rpx; display: flex; flex-direction: column; gap: 14rpx; }
.question-card { display: flex; gap: 14rpx; background: #fff; border-radius: 16rpx; padding: 14rpx; box-shadow: 0 8rpx 24rpx rgba(17, 33, 84, 0.06); }
.thumb { width: 158rpx; height: 158rpx; border-radius: 12rpx; }
.card-main { flex: 1; min-height: 158rpx; display: flex; flex-direction: column; justify-content: space-between; }
.name { font-size: 27rpx; line-height: 1.45; color: #1f2433; font-weight: 600; min-height: 76rpx; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.price { font-size: 33rpx; font-weight: 700; color: #ff4c4f; }
.stats-row { display: flex; justify-content: space-between; align-items: center; }
.stats-left { display: flex; gap: 16rpx; align-items: center; color: #8f9bb2; font-size: 22rpx; }
.views-wrap, .page-wrap { display: flex; align-items: center; gap: 6rpx; }
.date { font-size: 22rpx; color: #78829a; }
</style>
