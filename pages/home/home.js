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
        test_range: [],
        hour: ""
    },

    on24ButtonAction: function() {
        this.setData({
            isSeletedTag: 1,
            button1: "primary",
            button2: "default",
            button3: "default",
            button4: "default"
        });
        this.calculateEndTime();
    },

    on48ButtonAction: function() {
        this.setData({
            isSeletedTag: 2,
            button1: "default",
            button2: "primary",
            button3: "default",
            button4: "default"
        });
        this.calculateEndTime();
    },

    on72ButtonAction: function() {
        this.setData({
            isSeletedTag: 3,
            button1: "default",
            button2: "default",
            button3: "primary",
            button4: "default"
        });
        this.calculateEndTime();
    },

    on7dButtonAction: function() {
        this.setData({
            isSeletedTag: 4,
            button1: "default",
            button2: "default",
            button3: "default",
            button4: "primary"
        })
        this.calculateEndTime();
    },

    onPickerChange: function(e) {
        let year = this.getYears()[e.detail.value[0]];
        var month = this.getMonths()[e.detail.value[1]];
        if (month < 10) {
            month = "0" + month;
        }
        var day = this.getMonthDays(year, month)[e.detail.value[2]];
        if (day < 10) {
            day = "0" + day;
        }
        var hour = this.getHours()[e.detail.value[3]];
        if (hour < 10) {
            hour = "0" + hour;
        }
        var minute = this.getMinutes()[e.detail.value[4]];
        if (minute < 10) {
            minute = "0" + minute;
        }
        let time = year + "-" + month + "-" + day + ' ' + hour + ":" + minute
        this.setData({
            firstTime: time
        })
        this.updatePickerDate(true, year, month, day, hour, minute);
        this.calculateEndTime();
    },

    calculateEndTime: function() {
        if (this.data.firstTime != null && this.data.firstTime != "" && this.data.isSeletedTag != 0) {
            var date = new Date(this.data.firstTime);
            var timestamp = Date.parse(date);
            var future = 0;
            if (this.data.isSeletedTag == 1) {
                future = timestamp + 1000 * 60 * 60 * 24 * 1;
            } else if (this.data.isSeletedTag == 2) {
                future = timestamp + 1000 * 60 * 60 * 24 * 2;
            } else if (this.data.isSeletedTag == 3) {
                future = timestamp + 1000 * 60 * 60 * 24 * 3;
            } else {
                future = timestamp + 1000 * 60 * 60 * 24 * 7;
            }
            let futureDate = new Date(future);
            var year = futureDate.getFullYear();
            var month = futureDate.getMonth() + 1;
            if (month < 10) {
                month = "0" + month;
            }
            var day = futureDate.getDate();
            if (day < 10) {
                day = "0" + day;
            }
            var hour = futureDate.getHours();
            if (hour < 10) {
                hour = "0" + hour;
            }
            var minute = futureDate.getMinutes();
            if (minute < 10) {
                minute = "0" + minute;
            }
            let time = year + "-" + month + "-" + day + ' ' + hour + ":" + minute;

            let nowDate = new Date()
            var intervalHour = ""
            if (Date.parse(nowDate) >= future) {
                intervalHour = "0"
            } else {
                let interval = future - Date.parse(nowDate) 
                intervalHour = interval / (1000 * 60 * 60)
                intervalHour = Math.floor(intervalHour);
            }

            this.setData({
                lastTime: time,
                hour: intervalHour
            })
        } else {
            console.log("采样时间没有设定");
        }
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

    onSure: function() {
        wx.setStorageSync('firstTime', this.data.firstTime);
        wx.setStorageSync('lastTime', this.data.lastTime);
        wx.setStorageSync('indx', this.data.isSeletedTag);
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
        let day = nowDate.getDate();
        let hour = nowDate.getHours();
        let minute = nowDate.getMinutes();
        this.updatePickerDate(true, year, month, day, hour, minute);

        let firstTime = wx.getStorageSync('firstTime');
        if (firstTime != null && firstTime != "") {
            this.setData({
                firstTime: firstTime
            })
        }
        let lastTime = wx.getStorageSync('lastTime');
        if (lastTime != null && lastTime != "") {
            let nowDate = new Date()
            let lastDate = new Date(lastTime)
            var intervalHour = ""
            if (Date.parse(nowDate) >= Date.parse(lastTime)) {
                intervalHour = "0"
            } else {
                let interval = Date.parse(lastDate) - Date.parse(nowDate) 
                intervalHour = interval / (1000 * 60 * 60)
                intervalHour = Math.floor(intervalHour);
            }
            this.setData({
                lastTime: lastTime,
                hour: intervalHour
            })
        }
        let currentIndex = wx.getStorageSync("indx");
        if (currentIndex != 0 && currentIndex != null) {
            var button1 = "default"
            var button2 = "default"
            var button3 = "default"
            var button4 = "default"
            if (currentIndex == 1) {
                button1 = "primary"
            } else if (currentIndex == 2) {
                 button2 = "primary"
            } else if (currentIndex == 3) {
                button3 = "primary"
            } else {
                button4 = "primary"
            }
            this.setData({
                isSeletedTag: currentIndex,
                button1: button1,
                button2: button2,
                button3: button3,
                button4: button4
            })
        }
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