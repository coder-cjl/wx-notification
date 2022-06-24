// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isSeletedTag: 0,
        button1: "default",
        button2: "default",
        button3: "default",
        button4: "default",
        firstTime: "",
        lastTime: "",
        test_value: [],
        test_range: []
    },

    on24ButtonAction: function() {
        this.setData({
            isSeletedTag: 1,
            button1: "primary",
            button2: "default",
            button3: "default",
            button4: "default"
        })
    },

    on48ButtonAction: function() {
        this.setData({
            isSeletedTag: 2,
            button1: "default",
            button2: "primary",
            button3: "default",
            button4: "default"
        })
    },

    on72ButtonAction: function() {
        this.setData({
            isSeletedTag: 3,
            button1: "default",
            button2: "default",
            button3: "primary",
            button4: "default"
        })
    },

    on7dButtonAction: function() {
        this.setData({
            isSeletedTag: 4,
            button1: "default",
            button2: "default",
            button3: "default",
            button4: "primary"
        })
    },

    onPickerChange: function(e) {
        let year = this.getYears()[e.detail.value[0]];
        let month = this.getMonths()[e.detail.value[1]];
        let day = this.getMonthDays(year, month)[e.detail.value[2]];
        let hour = this.getHours()[e.detail.value[3]];
        let minute = this.getMinutes()[e.detail.value[4]];
        let time = year + "/" + month + "/" + day + '\xa0\xa0\xa0\xa0' + hour + ":" + minute
        this.setData({
            firstTime: time
        })
        this.updatePickerDate(true, year, month, day, hour, minute);
    },

    onBindColumnChange: function(e) {
        var nowDate = new Date();
        if (e.detail.column == 0) {
            let year = this.getYears()[e.detail.value];
            this.updatePickerDate(true ,year, 1, 1, nowDate.getHours(), nowDate.getMinutes());
        } else if (e.detail.column == 1) {
            let month = this.getMonths()[e.detail.value];
            this.updatePickerDate(true, 2022, month, 1, nowDate.getHours(), nowDate.getMinutes());
        }
    },

    getYears: function() {
        return [2022];
    },

    getMonths: function() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    },

    getMonthDays: function(year, month) {
        var feb = 28;
        if ((year % 400 == 0) || (year % 4 == 0) && (year % 100 != 0)) {
            feb = 29;
        }
        let month_days = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let day = month_days[month - 1];
        var days = [];
        for (let i = 1; i < day + 1; i++) {
            days.push(i);
        }
        return days;
    },

    getHours: function() {
        var hours = [];
        for (let i = 0; i < 24; i++) {
            hours.push(i);
        }
        return hours;
    },

    getMinutes: function() {
        var minutes = [];
        for (let i = 0; i < 60; i++) {
            minutes.push(i);
        }
        return minutes;
    },

    updatePickerDate: function(first, year, month, day, hour, minute) {
        let years = this.getYears();
        let months = this.getMonths();
        let days = this.getMonthDays(year, month);
        let hours = this.getHours();
        let minutes = this.getMinutes();
        let yearsStr = years.map(e => e + "年");
        let monthsStr = months.map(e => e + "月");
        let daysStr = days.map(e => e + "日");
        let hoursStr = hours.map(e => e + "时");
        let minutesStr = minutes.map(e => e  + "分");
        this.setData({
            test_range: [yearsStr, monthsStr, daysStr, hoursStr, minutesStr],
            test_value: first ? [year, month - 1, day - 1, hour, minute] : []
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var nowDate = new Date();
        let year = nowDate.getFullYear();
        let month = this.getMonths()[nowDate.getMonth()];
        let day = nowDate.getDate() - 1;
        let hour = nowDate.getHours();
        let minute = nowDate.getMinutes();
        this.updatePickerDate(true, year, month, day, hour, minute);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})